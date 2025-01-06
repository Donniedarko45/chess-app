'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { StatsGraph } from '../stats/StatsGraph'

interface UserStats {
  rating: number
  wins: number
  losses: number
  draws: number
  winRate: number
  totalGames: number
}

interface UserProfileProps {
  user: {
    id: string
    name: string
    email: string
    image: string
  }
  stats: UserStats
  recentGames: {
    date: string
    rating: number
  }[]
}

export function UserProfile({ user, stats, recentGames }: UserProfileProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-surface text-text">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-heading">{user.name}</CardTitle>
            <p className="text-muted">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Rating" value={stats.rating} />
            <StatCard title="Win Rate" value={`${stats.winRate}%`} />
            <StatCard title="Total Games" value={stats.totalGames} />
            <StatCard 
              title="W/L/D" 
              value={`${stats.wins}/${stats.losses}/${stats.draws}`} 
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-heading text-lg">Rating Progress</h3>
            <StatsGraph data={recentGames} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-overlay p-4 rounded-lg">
      <p className="text-muted text-sm">{title}</p>
      <p className="text-2xl font-bold text-text">{value}</p>
    </div>
  )
} 