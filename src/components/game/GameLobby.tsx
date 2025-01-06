'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreateGameModal } from './CreateGameModal'

interface Game {
  id: string
  white: { name: string }
  black: { name: string | null }
  startTime: string
}

export function GameLobby() {
  const [games, setGames] = useState<Game[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchGames()
    const interval = setInterval(fetchGames, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games/public')
      const data = await response.json()
      setGames(data)
    } catch (error) {
      console.error('Failed to fetch games:', error)
    }
  }

  const joinGame = async (gameId: string) => {
    try {
      await fetch(`/api/games/${gameId}/join`, {
        method: 'POST',
      })
      router.push(`/game/${gameId}`)
    } catch (error) {
      console.error('Failed to join game:', error)
    }
  }

  return (
    <div className="p-6 bg-base">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading text-text">Game Lobby</h1>
        <CreateGameModal />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="p-4 bg-surface rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-text font-medium">{game.white.name}</p>
                <p className="text-muted text-sm">
                  {new Date(game.startTime).toLocaleTimeString()}
                </p>
              </div>
              {!game.black?.name && (
                <Button
                  onClick={() => joinGame(game.id)}
                  className="bg-pine hover:bg-pine/80"
                >
                  Join Game
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 