import { Suspense } from 'react'
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="bg-surface">
        <CardHeader>
          <CardTitle className="text-3xl font-heading text-text">
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <LeaderboardTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
} 