'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export function LoginButtons() {
  return (
    <div className="grid gap-4">
      <Button
        variant="outline"
        onClick={() => signIn('github', { callbackUrl: '/' })}
        className="bg-surface text-text hover:bg-overlay"
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="bg-surface text-text hover:bg-overlay"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  )
} 