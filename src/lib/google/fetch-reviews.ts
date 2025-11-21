import { prisma } from '@/lib/prisma'
import { refreshGoogleToken } from './oauth'
import { generateResponse } from '@/lib/ai/response-generator'

const GOOGLE_REVIEWS_ENDPOINT = 'https://mybusiness.googleapis.com/v4'

interface GoogleReview {
  reviewId: string
  reviewer: {
    displayName?: string
    profilePhotoUrl?: string
  }
  starRating: string
  comment?: string
  reviewReply?: {
    comment?: string
    updateTime?: string
  }
  updateTime?: string
  createTime?: string
  reviewerLanguage?: string
}

function parseRating(starRating: string | undefined): number {
  if (!starRating) return 0
  const match = starRating.match(/\d+/)
  if (!match) return 0
  return Number(match[0])
}

function detectLanguage(text: string): string {
  const lower = text.toLowerCase()
  const germanIndicators = [' und ', ' der ', ' die ', ' das ', 'nicht', 'danke', 'gern', 'super', 'essen']
  for (const word of germanIndicators) {
    if (lower.includes(word.trim())) {
      return 'de'
    }
  }
  return 'en'
}

function sentimentFromRating(rating: number): 'positive' | 'neutral' | 'negative' {
  if (rating >= 4) return 'positive'
  if (rating === 3) return 'neutral'
  return 'negative'
}

async function ensureValidAccessToken(businessId: string) {
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: {
      googleAccessToken: true,
      googleTokenExpiry: true,
    },
  })

  if (!business?.googleAccessToken) {
    throw new Error('Business has no Google access token')
  }

  const tokenExpiry = business.googleTokenExpiry ? new Date(business.googleTokenExpiry) : null
  const shouldRefresh = !tokenExpiry || tokenExpiry.getTime() < Date.now() + 60_000

  if (shouldRefresh) {
    const credentials = await refreshGoogleToken(businessId)

    if (!credentials.access_token) {
      throw new Error('Unable to refresh Google access token')
    }

    return credentials.access_token
  }

  return business.googleAccessToken
}

export async function fetchNewReviews(businessId: string): Promise<number> {
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: {
      id: true,
      name: true,
      language: true,
      preferredTone: true,
      googleAccessToken: true,
      googlePlaceId: true,
      googleTokenExpiry: true,
      lastReviewFetch: true,
    },
  })

  if (!business) {
    throw new Error(`Business ${businessId} not found`)
  }
  if (!business.googleAccessToken) {
    throw new Error('Business has no Google OAuth token')
  }
  if (!business.googlePlaceId) {
    throw new Error('Business has no Google Place/Location ID configured')
  }

  const accessToken = await ensureValidAccessToken(businessId)

  const lastFetch = business.lastReviewFetch ? new Date(business.lastReviewFetch) : null

  const response = await fetch(
    `${GOOGLE_REVIEWS_ENDPOINT}/${business.googlePlaceId}/reviews?orderBy=updateTime%20desc`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    if (response.status === 401) {
      const creds = await refreshGoogleToken(businessId)
      if (!creds.access_token) {
        throw new Error('Failed to refresh Google token after 401 error')
      }
      const retry = await fetch(
        `${GOOGLE_REVIEWS_ENDPOINT}/${business.googlePlaceId}/reviews?orderBy=updateTime%20desc`,
        {
          headers: {
            Authorization: `Bearer ${creds.access_token}`,
          },
        },
      )
      if (!retry.ok) {
        const errBody = await retry.text()
        throw new Error(`Google Reviews API error: ${retry.status} - ${errBody}`)
      }
      return processReviews(await retry.json(), businessId, business, lastFetch)
    }
    const errBody = await response.text()
    throw new Error(`Google Reviews API error: ${response.status} - ${errBody}`)
  }

  const payload = await response.json()
  return processReviews(payload, businessId, business, lastFetch)
}

async function processReviews(
  payload: any,
  businessId: string,
  business: {
    id: string
    name: string
    language: string
    preferredTone: string
  },
  lastFetch: Date | null,
): Promise<number> {
  const reviews: GoogleReview[] = payload?.reviews ?? []
  if (!Array.isArray(reviews) || reviews.length === 0) {
    await prisma.business.update({
      where: { id: businessId },
      data: {
        lastReviewFetch: new Date(),
      },
    })
    return 0
  }

  const newReviews = reviews.filter((review) => {
    const timestamp = review.updateTime ?? review.createTime
    if (!timestamp) return true
    const reviewDate = new Date(timestamp)
    if (!lastFetch) return true
    return reviewDate.getTime() > lastFetch.getTime()
  })

  let createdCount = 0

  for (const review of newReviews) {
    const rating = parseRating(review.starRating)
    const text = review.comment ?? ''
    const language = review.reviewerLanguage ?? (text ? detectLanguage(text) : business.language)

    const publishedAt = new Date(review.createTime ?? Date.now())

    const savedReview = await prisma.review.upsert({
      where: { googleReviewId: review.reviewId },
      create: {
        businessId,
        googleReviewId: review.reviewId,
        reviewerName: review.reviewer?.displayName ?? 'Google Nutzer',
        reviewerPhoto: review.reviewer?.profilePhotoUrl ?? null,
        rating,
        text,
        language,
        publishedAt,
        responseStatus: 'PENDING',
        sentiment: sentimentFromRating(rating),
      },
      update: {
        reviewerName: review.reviewer?.displayName ?? 'Google Nutzer',
        reviewerPhoto: review.reviewer?.profilePhotoUrl ?? null,
        rating,
        text,
        language,
        publishedAt,
        sentiment: sentimentFromRating(rating),
      },
    })

    const isNewlyCreated = savedReview.createdAt.getTime() === savedReview.updatedAt.getTime()
    if (isNewlyCreated) {
      createdCount += 1
    }

    if (!savedReview.aiResponse) {
      const response = await generateResponse(
        savedReview.text,
        savedReview.rating,
        (business.preferredTone as 'professional' | 'friendly' | 'casual') || 'professional',
        savedReview.language ?? business.language,
        business.name,
      )

      await prisma.review.update({
        where: { id: savedReview.id },
        data: {
          aiResponse: response,
          aiResponseTone: business.preferredTone,
        },
      })
    }
  }

  const totalReviews = await prisma.review.count({
    where: { businessId },
  })

  await prisma.business.update({
    where: { id: businessId },
    data: {
      lastReviewFetch: new Date(),
      totalReviews,
    },
  })

  return createdCount
}

