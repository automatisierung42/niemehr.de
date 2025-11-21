import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Business context analyzer
interface BusinessContext {
  type: string; // 'doctor', 'restaurant', 'salon'
  priceSegment: 'budget' | 'mid' | 'upscale' | 'premium';
  formalityScore: number; // 1-10
  location: string;
}

function analyzeBusinessContext(businessName: string): BusinessContext {
  // Simple keyword matching (we'll make this smarter later)
  const name = businessName.toLowerCase();
  
  let type = 'restaurant'; // default
  if (name.includes('dr.') || name.includes('praxis') || name.includes('arzt') || name.includes('doktor')) {
    type = 'doctor';
  } else if (name.includes('salon') || name.includes('friseur')) {
    type = 'salon';
  }
  
  // Determine price segment and formality based on type
  let priceSegment: 'budget' | 'mid' | 'upscale' | 'premium' = 'mid';
  let formalityScore = 6;
  
  if (type === 'doctor') {
    priceSegment = 'premium';
    formalityScore = 9; // Doctors are more formal
  } else if (type === 'restaurant') {
    if (name.includes('palace') || name.includes('fine') || name.includes('gourmet')) {
      priceSegment = 'upscale';
      formalityScore = 7;
    } else {
      priceSegment = 'mid';
      formalityScore = 5;
    }
  }
  
  // Extract location from business name if possible
  const locationMatch = businessName.match(/(Berlin|München|Hamburg|Köln|Frankfurt|Stuttgart|Düsseldorf|Dortmund|Essen|Leipzig)/i);
  const location = locationMatch ? locationMatch[1] : 'Berlin';
  
  return {
    type,
    priceSegment,
    formalityScore,
    location
  };
}

// Smart mock reviews based on business type
function getMockReviewsForBusiness(businessName: string, businessType: string): Array<{
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}> {
  if (businessType === 'doctor') {
    return [
      {
        id: '1',
        author: 'Maria K.',
        rating: 5,
        text: 'Sehr kompetente Behandlung und freundliches Personal. Kann ich nur empfehlen!',
        date: 'vor 3 Tagen'
      },
      {
        id: '2',
        author: 'Thomas S.',
        rating: 4,
        text: 'Gute Praxis, nur die Wartezeiten könnten kürzer sein.',
        date: 'vor einem Monat'
      },
      {
        id: '3',
        author: 'Anna L.',
        rating: 5,
        text: 'Top! Sehr einfühlsam und professionell.',
        date: 'vor 2 Tagen'
      }
    ];
  }
  
  // Default restaurant reviews
  return [
    {
      id: '1',
      author: 'Rafael',
      rating: 4,
      text: 'Kam direkt zwei Tage hintereinander. Burger sind für den Preis nicht zu schlagen, keine 6€ für einen Cheeseburger.',
      date: 'vor einem Monat'
    },
    {
      id: '2',
      author: 'Alexandra',
      rating: 5,
      text: '', // No text review
      date: 'vor 11 Stunden'
    },
    {
      id: '3',
      author: 'pL4YsC0Pe',
      rating: 1,
      text: 'Habe dort Bestellt und meine Bestellung kam nie an. Man wartet über 2 Stunden, man erreicht auch niemanden',
      date: 'vor 7 Monaten'
    }
  ];
}

// Generate 3 style variations
async function generateResponses(
  review: { author: string; rating: number; text: string },
  businessContext: BusinessContext,
  businessName: string
): Promise<{ professional: string; friendly: string; casual: string }> {
  
  const basePrompt = `Du bist der Inhaber von "${businessName}", einem ${businessContext.type} in ${businessContext.location}.

Review von ${review.author} (${review.rating}/5 Sterne):

"${review.text}"

Schreibe eine professionelle Antwort auf diese Review.

WICHTIG:
- Sprache: Deutsch
- Länge: 40-60 Wörter
- Sei authentisch, nicht corporate
- Keine Floskeln wie "Vielen Dank für Ihr Feedback"
- Gehe auf spezifische Punkte aus der Review ein

`;

  const styles = {
    professional: {
      prompt: basePrompt + `\n\nSTIL: Professionell
- Siezen ("Sie")
- Keine Emojis
- Formell aber freundlich
- "Mit freundlichen Grüßen" am Ende`,
      temperature: 0.5
    },
    
    friendly: {
      prompt: basePrompt + `\n\nSTIL: Freundlich
- Duzen ("du") oder neutral
- 1-2 passende Emojis (🙏, 😊, 👍)
- Persönlich aber professionell
- Kein förmliches Ende, einfach "Bis bald!" oder ähnlich`,
      temperature: 0.7
    },
    
    casual: {
      prompt: basePrompt + `\n\nSTIL: Locker/Casual
- Duzen ("du")
- 2-3 Emojis (🙌, 🔥, 💪, 😊)
- Umgangssprache ok ("mega", "top")
- Kurz und knackig
- Energie und Begeisterung zeigen`,
      temperature: 0.8
    }
  };

  const [professionalRes, friendlyRes, casualRes] = await Promise.all([
    openai.chat.completions.create({
      model: 'gpt-4o-mini', // Faster + cheaper for MVP
      messages: [{ role: 'user', content: styles.professional.prompt }],
      temperature: styles.professional.temperature,
      max_tokens: 150
    }),
    openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: styles.friendly.prompt }],
      temperature: styles.friendly.temperature,
      max_tokens: 150
    }),
    openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: styles.casual.prompt }],
      temperature: styles.casual.temperature,
      max_tokens: 150
    })
  ]);

  return {
    professional: professionalRes.choices[0].message.content || '',
    friendly: friendlyRes.choices[0].message.content || '',
    casual: casualRes.choices[0].message.content || ''
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessName = searchParams.get('business');
    
    if (!businessName) {
      return NextResponse.json({ error: 'Business name required' }, { status: 400 });
    }

    // 1. Analyze business context
    const context = analyzeBusinessContext(businessName);
    
    // 2. Fetch reviews from Google Places API
    // TODO: Replace with real Google Places API call when API key is available
    // For now: Use smart mock data based on business type
    const mockReviews = getMockReviewsForBusiness(businessName, context.type);
    
    // 3. Generate responses for each review
    const responsesPromises = mockReviews.map(async (review) => {
      if (!review.text) {
        // For reviews without text (just stars)
        return {
          reviewId: review.id,
          professional: `Vielen Dank für die ${review.rating}-Sterne-Bewertung! Wir freuen uns über Ihren Besuch.`,
          friendly: `Danke für die ${review.rating} Sterne! 🙏 Bis zum nächsten Mal!`,
          casual: `${review.rating} Sterne! 🙌 Du bist der Beste!`
        };
      }
      
      const responses = await generateResponses(review, context, businessName);
      return {
        reviewId: review.id,
        ...responses
      };
    });
    
    const allResponses = await Promise.all(responsesPromises);
    
    return NextResponse.json({
      businessName,
      context,
      reviews: mockReviews,
      responses: allResponses
    });
    
  } catch (error) {
    console.error('Error generating demo:', error);
    return NextResponse.json(
      { error: 'Failed to generate responses' },
      { status: 500 }
    );
  }
}

