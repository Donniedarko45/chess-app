'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export function CreateGameModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [gameType, setGameType] = useState<'public' | 'private'>('public')
  const router = useRouter()

  const createGame = async () => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: gameType }),
      })

      const game = await response.json()
      router.push(`/game/${game.id}`)
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to create game:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-pine hover:bg-pine/80">
          Create Game
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-surface text-text">
        <DialogHeader>
          <DialogTitle>Create New Game</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={gameType === 'public' ? 'default' : 'outline'}
              onClick={() => setGameType('public')}
              className={gameType === 'public' ? 'bg-pine' : ''}
            >
              Public Game
            </Button>
            <Button
              variant={gameType === 'private' ? 'default' : 'outline'}
              onClick={() => setGameType('private')}
              className={gameType === 'private' ? 'bg-pine' : ''}
            >
              Private Game
            </Button>
          </div>
          <Button onClick={createGame} className="w-full bg-pine hover:bg-pine/80">
            Create Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 