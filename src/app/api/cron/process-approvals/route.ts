import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { postReviewResponseToGoogle } from '@/lib/gmb';

// Cron Job: Läuft alle 5 Minuten
export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    
    // Finde abgelaufene Approvals (älter als 15 Min seit SMS)
    const expiredApprovals = await prisma.reviewApproval.findMany({
      where: {
        status: 'pending',
        smsSentAt: { not: null },
        smsSentAt: { lt: new Date(now.getTime() - 15 * 60 * 1000) },
      },
      include: { business: true },
    });
    
    console.log(`Processing ${expiredApprovals.length} expired approvals`);
    
    for (const approval of expiredApprovals) {
      try {
        // Zufällige Verzögerung 8-18 Min seit SMS
        const delay = Math.floor(Math.random() * (18 - 8 + 1) + 8) * 60 * 1000;
        const smsSentTime = approval.smsSentAt!.getTime();
        const shouldPostAt = smsSentTime + delay;
        
        if (Date.now() < shouldPostAt) {
          console.log(`Approval ${approval.id} not ready yet`);
          continue;
        }
        
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
            status: 'auto_approved',
            responsePostedAt: new Date(),
          },
        });
        
        console.log(`Auto-posted approval ${approval.id}`);
      } catch (error) {
        console.error(`Error processing approval ${approval.id}:`, error);
        
        await prisma.reviewApproval.update({
          where: { id: approval.id },
          data: { status: 'failed' },
        });
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      processed: expiredApprovals.length 
    });
  } catch (error: any) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

