'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

interface AuthErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function AuthError({ error, reset }: AuthErrorProps) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-2">
      <Icons.alertCircle className="h-8 w-8 text-destructive" />
      <h2 className="text-2xl font-bold tracking-tight">Authentication Error</h2>
      <p className="text-muted-foreground">
        {error.message || "Something went wrong during authentication."}
      </p>
      <div className="mt-6 flex gap-2">
        <Button onClick={() => router.push('/login')}>
          Try Again
        </Button>
        <Button variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  )
} 