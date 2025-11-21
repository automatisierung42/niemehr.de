import { NextRequest, NextResponse } from 'next/server';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  publishedAt: string;
  date: string;
  selectedReason?: 'newest' | 'five_star_with_text' | 'lowest_rating';
}

interface BusinessInfo {
  placeId: string;
  name: string;
  location: string;
  type: 'restaurant' | 'doctor' | 'salon';
}

// Mock-Daten für verschiedene Businesses
const MOCK_REVIEWS_DB: Record<string, Review[]> = {
  'burger-palace': [
    {
      id: 'review_1',
      author: 'Alexandra',
      rating: 5,
      text: 'Absolut empfehlenswert! Beste Burger in Berlin.',
      publishedAt: '2024-11-13T10:30:00Z',
      date: 'vor 11 Stunden',
    },
    {
      id: 'review_2',
      author: 'Rafael',
      rating: 4,
      text: 'Kam direkt zwei Tage hintereinander. Burger sind für den Preis nicht zu schlagen, keine 6€ für einen Cheeseburger.',
      publishedAt: '2024-10-15T14:20:00Z',
      date: 'vor einem Monat',
    },
    {
      id: 'review_3',
      author: 'pL4YsC0Pe',
      rating: 1,
      text: 'Habe dort Bestellt und meine Bestellung kam nie an. Man wartet über 2 Stunden, man erreicht auch niemanden',
      publishedAt: '2024-04-15T08:00:00Z',
      date: 'vor 7 Monaten',
    },
    {
      id: 'review_4',
      author: 'Max M.',
      rating: 5,
      text: 'Perfekter Service und leckeres Essen! Komme gerne wieder.',
      publishedAt: '2024-11-12T16:45:00Z',
      date: 'vor 2 Tagen',
    },
    {
      id: 'review_5',
      author: 'Sarah K.',
      rating: 2,
      text: 'Essen war ok, aber Service sehr langsam.',
      publishedAt: '2024-11-01T12:00:00Z',
      date: 'vor 2 Wochen',
    },
  ],
  'praxis-mueller': [
    {
      id: 'review_1',
      author: 'Maria K.',
      rating: 5,
      text: 'Sehr kompetente Behandlung und freundliches Personal. Kann ich nur empfehlen!',
      publishedAt: '2024-11-10T14:20:00Z',
      date: 'vor 3 Tagen',
    },
    {
      id: 'review_2',
      author: 'Thomas S.',
      rating: 4,
      text: 'Gute Praxis, nur die Wartezeiten könnten kürzer sein.',
      publishedAt: '2024-10-15T09:30:00Z',
      date: 'vor einem Monat',
    },
    {
      id: 'review_3',
      author: 'Anna L.',
      rating: 5,
      text: 'Top! Sehr einfühlsam und professionell.',
      publishedAt: '2024-11-11T11:15:00Z',
      date: 'vor 2 Tagen',
    },
    {
      id: 'review_4',
      author: 'Peter W.',
      rating: 1,
      text: 'Sehr unfreundlich. Wartezeit viel zu lang.',
      publishedAt: '2024-09-20T10:00:00Z',
      date: 'vor 2 Monaten',
    },
  ],
  'bella-italia': [
    {
      id: 'review_1',
      author: 'Giovanni',
      rating: 5,
      text: 'Authentische italienische Küche! Die Pasta ist fantastisch.',
      publishedAt: '2024-11-08T19:30:00Z',
      date: 'vor 5 Tagen',
    },
    {
      id: 'review_2',
      author: 'Sarah M.',
      rating: 4,
      text: 'Schönes Ambiente, gutes Essen. Etwas teuer aber es lohnt sich.',
      publishedAt: '2024-10-30T18:00:00Z',
      date: 'vor 2 Wochen',
    },
    {
      id: 'review_3',
      author: 'Michael R.',
      rating: 3,
      text: 'Ok, aber Service war etwas langsam.',
      publishedAt: '2024-10-15T20:15:00Z',
      date: 'vor einem Monat',
    },
    {
      id: 'review_4',
      author: 'Lisa T.',
      rating: 2,
      text: 'Essen kalt, Service schlecht. Nicht empfehlenswert.',
      publishedAt: '2024-09-10T17:30:00Z',
      date: 'vor 2 Monaten',
    },
  ],
};

const BUSINESS_INFO: Record<string, BusinessInfo> = {
  'burger-palace': {
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    name: 'Burger Palace Berlin-Mitte',
    location: 'Berlin-Mitte',
    type: 'restaurant',
  },
  'praxis-mueller': {
    placeId: 'ChIJPraxisMuellerBerlin',
    name: 'Praxis Dr. Müller Berlin',
    location: 'Berlin-Charlottenburg',
    type: 'doctor',
  },
  'bella-italia': {
    placeId: 'ChIJBellaItaliaBerlin',
    name: 'Ristorante Bella Italia',
    location: 'Berlin-Prenzlauer Berg',
    type: 'restaurant',
  },
};

function selectReviews(reviews: Review[]): Review[] {
  if (reviews.length === 0) return [];

  // 1. Neueste Review (newest publishedAt)
  const newest = [...reviews]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];
  newest.selectedReason = 'newest';

  // 2. 5-Sterne mit Text
  const fiveStarWithText = reviews
    .filter(r => r.rating === 5 && r.text.length > 0)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];
  
  let selectedFiveStar = fiveStarWithText;
  if (!selectedFiveStar) {
    // Fallback: Höchstes Rating mit Text
    selectedFiveStar = reviews
      .filter(r => r.text.length > 0)
      .sort((a, b) => b.rating - a.rating || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];
  }
  if (selectedFiveStar) {
    selectedFiveStar.selectedReason = 'five_star_with_text';
  }

  // 3. Schlechteste Review (lowest rating)
  const lowest = [...reviews]
    .sort((a, b) => {
      if (a.rating !== b.rating) return a.rating - b.rating;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })[0];
  lowest.selectedReason = 'lowest_rating';

  // Entferne Duplikate
  const selected = [newest, selectedFiveStar, lowest].filter(
    (review, index, self) => review && self.findIndex(r => r.id === review.id) === index
  );

  return selected;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');

    if (!placeId) {
      return NextResponse.json({ error: 'placeId required' }, { status: 400 });
    }

    // Finde Business anhand placeId
    const businessKey = Object.keys(BUSINESS_INFO).find(
      key => BUSINESS_INFO[key].placeId === placeId
    );

    if (!businessKey) {
      // Fallback: Verwende ersten Business als Mock
      const firstKey = Object.keys(BUSINESS_INFO)[0];
      const businessInfo = BUSINESS_INFO[firstKey];
      const reviews = selectReviews(MOCK_REVIEWS_DB[firstKey] || []);

      return NextResponse.json({
        success: true,
        businessInfo,
        reviews,
      });
    }

    const businessInfo = BUSINESS_INFO[businessKey];
    const allReviews = MOCK_REVIEWS_DB[businessKey] || [];
    const selectedReviews = selectReviews(allReviews);

    return NextResponse.json({
      success: true,
      businessInfo,
      reviews: selectedReviews,
    });
  } catch (error) {
    // Sicheres Error Logging
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching reviews:', error);
    } else {
      console.error('Error fetching reviews:', {
        timestamp: new Date().toISOString(),
        errorCode: error instanceof Error ? error.message : 'Unknown error',
      });
    }
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

