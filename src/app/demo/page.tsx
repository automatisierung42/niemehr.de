'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoHeader } from '@/components/demo/DemoHeader';
import { LoadingState } from '@/components/demo/LoadingState';
import { StyleSelector } from '@/components/demo/StyleSelector';
import { ResultsView } from '@/components/demo/ResultsView';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface BusinessContext {
  type: string;
  priceSegment: string;
  formalityScore: number;
  location: string;
}

interface GeneratedResponses {
  reviewId: string;
  professional: string;
  friendly: string;
  casual: string;
}

interface DemoData {
  businessName: string;
  context: BusinessContext;
  reviews: Review[];
  responses: GeneratedResponses[];
}

function DemoPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const businessName = searchParams.get('business') || '';
  
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [demoData, setDemoData] = useState<DemoData | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<'professional' | 'friendly' | 'casual' | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!businessName) {
      router.push('/');
      return;
    }

    const fetchDemoData = async () => {
      setLoading(true);
      setLoadingProgress(0);

      // Simulate progress steps
      const progressSteps = [
        { progress: 30, message: 'Google Reviews gefunden' },
        { progress: 60, message: 'Business-Profil erkannt' },
        { progress: 90, message: 'KI-Antworten werden generiert...' },
      ];

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoadingProgress(step.progress);
      }

      try {
        const response = await fetch(`/api/generate-demo?business=${encodeURIComponent(businessName)}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setDemoData(data);
        setLoadingProgress(100);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching demo data:', error);
        setLoading(false);
      }
    };

    fetchDemoData();
  }, [businessName, router]);

  const handleStyleSelect = (style: 'professional' | 'friendly' | 'casual') => {
    setSelectedStyle(style);
    setTimeout(() => {
      setShowResults(true);
    }, 300);
  };

  if (loading) {
    return (
      <>
        <DemoHeader businessName={businessName} step={1} />
        <LoadingState businessName={businessName} progress={loadingProgress} />
      </>
    );
  }

  if (!demoData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary-dark mb-4">Fehler beim Laden der Daten</p>
          <Link href="/" className="text-secondary hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedStyle || !showResults) {
    return (
      <>
        <DemoHeader businessName={businessName} step={1} />
        <StyleSelector
          reviews={demoData.reviews}
          responses={demoData.responses}
          businessName={demoData.businessName}
          onSelect={handleStyleSelect}
        />
      </>
    );
  }

  return (
    <>
      <DemoHeader businessName={businessName} step={2} />
      <ResultsView
        reviews={demoData.reviews}
        responses={demoData.responses}
        selectedStyle={selectedStyle}
        businessName={demoData.businessName}
      />
    </>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-primary-dark">Lade Demo...</p>
        </div>
      </div>
    }>
      <DemoPageContent />
    </Suspense>
  );
}

