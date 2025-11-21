import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'
import LogoutButton from '@/components/dashboard/LogoutButton'
import ComplianceInfoBanner from '@/components/compliance/ComplianceInfoBanner'
import DashboardOnboardingCheck from '@/components/onboarding/DashboardOnboardingCheck'

export default async function DashboardPage() {
  const user = await getSession()

  if (!user) {
    redirect('/?error=unauthorized')
  }

  // Hole User-Daten aus DB für Onboarding-Status
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      hasCompletedSignatureOnboarding: true,
      signatureNames: true,
      businesses: {
        select: {
          name: true,
        },
        take: 1,
      },
    },
  })

  const hasCompletedOnboarding = dbUser?.hasCompletedSignatureOnboarding ?? false
  const signatureNames = dbUser?.signatureNames ?? []
  const businessName = dbUser?.businesses[0]?.name

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <ComplianceInfoBanner />
        
        {/* Onboarding Check - zeigt Modal wenn nicht abgeschlossen */}
        <DashboardOnboardingCheck
          userId={user.id}
          hasCompletedOnboarding={hasCompletedOnboarding}
          initialSignatureNames={signatureNames}
          businessName={businessName}
        />

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary-dark mb-2">
              Willkommen {user.name}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {user.picture && (
            <div className="mb-6">
              <img
                src={user.picture}
                alt={user.name}
                className="w-20 h-20 rounded-full border-2 border-secondary"
              />
            </div>
          )}

          <div className="mt-8">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

