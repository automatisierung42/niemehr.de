import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !phoneNumber) {
  throw new Error('Twilio credentials missing');
}

const client = twilio(accountSid, authToken);

export async function sendApprovalSMS(params: {
  to: string;
  businessName: string;
  reviewText: string;
  reviewRating: number;
  finalResponse: string;
}): Promise<string> {
  const { to, businessName, reviewText, reviewRating, finalResponse } = params;
  
  // Kürze Review-Text wenn zu lang
  const truncatedReview = reviewText.length > 150 
    ? reviewText.substring(0, 150) + '...'
    : reviewText;
  
  const message = `🔔 Neue ${reviewRating}★ Review bei ${businessName}



"${truncatedReview}"



Unsere Antwort:

"${finalResponse}"



→ Antworte mit "1" = jetzt posten

→ Ignorieren oder 👍 = geht in 15 Min automatisch live`;

  try {
    const result = await client.messages.create({
      body: message,
      from: phoneNumber,
      to: to,
    });
    
    console.log('SMS sent:', result.sid);
    return result.sid;
  } catch (error) {
    console.error('SMS send error:', error);
    throw error;
  }
}

export function isApprovalKeyword(text: string): boolean {
  const keywords = ['1', 'ja', 'ok', 'los', 'go', 'yes'];
  const normalized = text.toLowerCase().trim();
  return keywords.includes(normalized) || text.includes('👍');
}

export async function sendSMS(params: {
  to: string;
  body: string;
}): Promise<string> {
  const { to, body } = params;

  try {
    const result = await client.messages.create({
      body: body,
      from: phoneNumber,
      to: to,
    });
    
    console.log('SMS sent:', result.sid);
    return result.sid;
  } catch (error) {
    console.error('SMS send error:', error);
    throw error;
  }
}

