'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LeaderboardUser {
  id: string
  name: string
  image: string
  rating: number
  wins: number
  losses: number
  draws: number
}

export function LeaderboardTable() {
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    }
  }

  return (
    <div className="rounded-md border border-surface bg-surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Rating</TableHead>
            <TableHead className="text-right">W/L/D</TableHead>
            <TableHead className="text-right">Win Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              className="cursor-pointer hover:bg-overlay"
              onClick={() => router.push(`/profile/${user.id}`)}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{user.rating}</TableCell>
              <TableCell className="text-right">
                {user.wins}/{user.losses}/{user.draws}
              </TableCell>
              <TableCell className="text-right">
                {calculateWinRate(user.wins, user.losses)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function calculateWinRate(wins: number, losses: number): number {
  if (wins + losses === 0) return 0
  return Math.round((wins / (wins + losses)) * 100)
} 