import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendApprovalSMS } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const { reviewApprovalId } = await request.json();
    
    const approval = await prisma.reviewApproval.findUnique({
      where: { id: reviewApprovalId },
      include: { business: true },
    });
    
    if (!approval) {
      return NextResponse.json({ error: 'Approval not found' }, { status: 404 });
    }
    
    if (approval.smsSentAt) {
      return NextResponse.json({ error: 'SMS already sent' }, { status: 400 });
    }
    
    // Sende SMS
    const messageSid = await sendApprovalSMS({
      to: approval.business.phoneNumber,
      businessName: approval.business.name,
      reviewText: approval.reviewText,
      reviewRating: approval.reviewRating,
      finalResponse: approval.finalResponse,
    });
    
    // Update DB
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 Min
    
    await prisma.reviewApproval.update({
      where: { id: reviewApprovalId },
      data: {
        smsSentAt: new Date(),
        smsMessageSid: messageSid,
        expiresAt: expiresAt,
      },
    });
    
    return NextResponse.json({ success: true, messageSid });
  } catch (error: any) {
    console.error('Send approval SMS error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

