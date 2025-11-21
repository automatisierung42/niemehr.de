import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateResponse } from '@/lib/ai/response-generator'

const ALLOWED_TONES = ['professional', 'friendly', 'casual'] as const
type AllowedTone = (typeof ALLOWED_TONES)[number]

function isAllowedTone(value: unknown): value is AllowedTone {
  return typeof value === 'string' && ALLOWED_TONES.includes(value as AllowedTone)
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body.reviewId !== 'string' || !isAllowedTone(body.newTone)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const review = await prisma.review.findUnique({
    where: { id: body.reviewId },
    select: {
      id: true,
      text: true,
      rating: true,
      language: true,
      business: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  const language = review.language ?? 'de'

  const aiResponse = await generateResponse(
    review.text,
    review.rating,
    body.newTone,
    language,
    review.business.name,
  )

  await prisma.review.update({
    where: { id: review.id },
    data: {
      aiResponse,
      aiResponseTone: body.newTone,
    },
  })

  return NextResponse.json({
    success: true,
    aiResponse,
    tone: body.newTone,
    reviewId: review.id,
  })
}

