'use client'

import { useCallback, useState } from 'react'
import { Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ConnectGoogleButtonProps {
  businessId: string
  connected?: boolean
}

export function ConnectGoogleButton({ businessId, connected = false }: ConnectGoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(connected)

  const handleConnect = useCallback(() => {
    if (!businessId || isConnected) return
    setIsLoading(true)

    window.location.href = `/api/google/auth?businessId=${encodeURIComponent(businessId)}`
  }, [businessId, isConnected])

  return (
    <Button
      type="button"
      variant={isConnected ? 'secondary' : 'default'}
      onClick={handleConnect}
      disabled={isConnected || isLoading}
      className="flex items-center gap-2"
    >
      {isConnected ? (
        <>
          <Check className="h-4 w-4" />
          Verbunden
        </>
      ) : isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Verbinden...
        </>
      ) : (
        'Google Business verbinden'
      )}
    </Button>
  )
}

