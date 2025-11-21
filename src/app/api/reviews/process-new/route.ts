import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isCriticalReview } from '@/utils/reviewClassifier';
import { generateResponse } from '@/lib/ai/response-generator';
import { postReviewResponseToGoogle } from '@/lib/gmb';
import { sendSMS, sendApprovalSMS } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const { reviewId, businessId, reviewText, reviewRating, reviewAuthor, reviewDate } = await request.json();

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { user: true },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // Generiere AI-Antwort (nutze Ton vom Onboarding)
    const aiResponse = await generateResponse({
      reviewText,
      rating: reviewRating,
      tone: (business.preferredTone as 'professional' | 'friendly' | 'casual') || 'professional',
      language: 'de', // TODO: Aus Review languageCode holen
      businessName: business.businessName || business.name,
    });

    // Prüfe ob kritisch
    const criticalCheck = isCriticalReview(reviewText, reviewRating);

    // Auto-Pilot aktiv && nicht kritisch?
    if (business.user.autoPilotEnabled && !criticalCheck.isCritical && reviewRating >= 4) {
      // AUTOMATISCH POSTEN
      await postReviewResponseToGoogle({
        businessId: business.googlePlaceId,
        reviewId: reviewId,
        response: aiResponse,
      });

      // Stats updaten
      await prisma.user.update({
        where: { id: business.userId },
        data: { autoRepliesCount: { increment: 1 } },
      });

      // Mini-SMS Benachrichtigung
      await sendSMS({
        to: business.phoneNumber,
        body: `✅ Automatisch beantwortet



${reviewRating}★ von ${reviewAuthor}



"${reviewText.substring(0, 80)}..."



Antwort: "${aiResponse.substring(0, 80)}..."



niemehr.de`,
      });

      return NextResponse.json({ 
        success: true, 
        autoPosted: true,
        reason: 'Auto-Pilot active & not critical',
      });
    }

    // MANUELLE FREIGABE (SMS mit "1" oder ignorieren)
    const approval = await prisma.reviewApproval.create({
      data: {
        businessId: businessId,
        googleReviewId: reviewId,
        reviewText: reviewText,
        reviewRating: reviewRating,
        reviewAuthor: reviewAuthor,
        reviewDate: reviewDate ? new Date(reviewDate) : new Date(),
        finalResponse: aiResponse,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    // Stats updaten
    await prisma.user.update({
      where: { id: business.userId },
      data: { manualRepliesCount: { increment: 1 } },
    });

    // Sende Freigabe-SMS
    const messageSid = await sendApprovalSMS({
      to: business.phoneNumber,
      businessName: business.businessName || business.name,
      reviewText: reviewText,
      reviewRating: reviewRating,
      finalResponse: aiResponse,
    });

    // Update Approval mit SMS Info
    await prisma.reviewApproval.update({
      where: { id: approval.id },
      data: {
        smsSentAt: new Date(),
        smsMessageSid: messageSid,
      },
    });

    return NextResponse.json({ 
      success: true, 
      autoPosted: false,
      approvalId: approval.id,
      criticalReason: criticalCheck.reason,
    });
  } catch (error: any) {
    console.error('Process review error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

