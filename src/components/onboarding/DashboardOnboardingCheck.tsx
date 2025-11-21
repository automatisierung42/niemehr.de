'use client';

import React, { useState, useEffect } from 'react';
import { SignatureModal } from './SignatureModal';

interface DashboardOnboardingCheckProps {
  userId: string;
  hasCompletedOnboarding: boolean;
  initialSignatureNames?: string[];
  businessName?: string;
  industry?: string;
}

/**
 * Client-Komponente für Dashboard Onboarding Check
 * 
 * Wird in der Dashboard-Seite verwendet, um das Signatur-Modal zu triggern
 */
export default function DashboardOnboardingCheck({
  userId,
  hasCompletedOnboarding: initialStatus,
  initialSignatureNames = [],
  businessName,
  industry,
}: DashboardOnboardingCheckProps) {
  const [showModal, setShowModal] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Prüfe Onboarding-Status beim Mount
    const checkStatus = async () => {
      if (!userId) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/signature?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          
          // Zeige Modal wenn Onboarding nicht abgeschlossen
          if (!data.hasCompletedSignatureOnboarding) {
            setShowModal(true);
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setIsChecking(false);
      }
    };

    // Prüfe nur wenn initial Status false ist
    if (!initialStatus) {
      checkStatus();
    } else {
      setIsChecking(false);
    }
  }, [userId, initialStatus]);

  const handleSaveSuccess = () => {
    setShowModal(false);
    // Optional: Reload page oder update state
    window.location.reload();
  };

  if (isChecking) {
    return null; // Oder Loading Spinner
  }

  return (
    <SignatureModal
      isOpen={showModal}
      onSaveSuccess={handleSaveSuccess}
      initialNames={initialSignatureNames}
      businessName={businessName}
      industry={industry}
    />
  );
}

