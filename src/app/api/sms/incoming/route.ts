import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isApprovalKeyword } from '@/lib/twilio';
import { postReviewResponseToGoogle } from '@/lib/gmb';

export async function POST(request: NextRequest) {
  try {
    // Twilio Webhook Daten
    const formData = await request.formData();
    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;
    
    console.log('Incoming SMS:', { from, body });
    
    // Finde offene Approval für diese Nummer
    const approval = await prisma.reviewApproval.findFirst({
      where: {
        business: { phoneNumber: from },
        status: 'pending',
        expiresAt: { gt: new Date() },
      },
      include: { business: true },
      orderBy: { createdAt: 'desc' },
    });
    
    if (!approval) {
      console.log('No pending approval found for:', from);
      return new NextResponse('OK', { status: 200 });
    }
    
    // Prüfe ob Approval-Keyword
    if (isApprovalKeyword(body)) {
      console.log('Approval keyword detected, posting response...');
      
      // Poste zu Google
      await postReviewResponseToGoogle({
        businessId: approval.business.googlePlaceId,
        reviewId: approval.googleReviewId,
        response: approval.finalResponse,
      });
      
      // Update Status
      await prisma.reviewApproval.update({
        where: { id: approval.id },
        data: {
          status: 'approved',
          userResponse: body,
          responsePostedAt: new Date(),
        },
      });
      
      console.log('Response posted successfully');
    }
    
    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    console.error('Incoming SMS error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}

