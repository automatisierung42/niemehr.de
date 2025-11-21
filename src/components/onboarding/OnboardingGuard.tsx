'use client';

import React, { useState, useEffect } from 'react';
import { SignatureModal } from './SignatureModal';

interface OnboardingGuardProps {
  children: React.ReactNode;
  userId?: string;
}

/**
 * OnboardingGuard Komponente
 * 
 * Prüft ob der User das Signatur-Onboarding abgeschlossen hat.
 * Falls nicht, zeigt es das SignatureModal als Soft Block.
 */
export default function OnboardingGuard({ children, userId }: OnboardingGuardProps) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialNames, setInitialNames] = useState<string[]>([]);

  useEffect(() => {
    // Prüfe Onboarding-Status beim Laden
    const checkOnboardingStatus = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/signature?userId=' + userId);
        
        if (response.ok) {
          const data = await response.json();
          
          // Zeige Modal wenn Onboarding nicht abgeschlossen
          if (!data.hasCompletedSignatureOnboarding) {
            setShowModal(true);
            setInitialNames(data.signatureNames || []);
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [userId]);

  const handleSaveSuccess = () => {
    setShowModal(false);
    // Optional: Reload page oder update state
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <>
      {children}
      <SignatureModal 
        isOpen={showModal} 
        onSaveSuccess={handleSaveSuccess}
        initialNames={initialNames}
      />
    </>
  );
}

