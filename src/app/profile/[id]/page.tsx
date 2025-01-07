import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/src/lib/prisma'
import { UserProfile } from '@/src/components/profile/UserProfile'
import { authOptions } from '@/src/lib/auth'

async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      games: {
        orderBy: { startTime: 'desc' },
        take: 20,
      },
    },
  })

  if (!user) return null

  const stats = {
    rating: user.rating,
    wins: user.wins,
    losses: user.losses,
    draws: user.draws,
    winRate: calculateWinRate(user.wins, user.losses),
    totalGames: user.wins + user.losses + user.draws,
  }

  const recentGames = user.games.map(game => ({
    date: game.startTime.toISOString().split('T')[0],
    rating: user.rating, // You'll need to store historical ratings
  }))

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
    stats,
    recentGames,
  }
}

function calculateWinRate(wins: number, losses: number): number {
  if (wins + losses === 0) return 0
  return Math.round((wins / (wins + losses)) * 100)
}

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const profile = await getUserProfile(params.id)
  if (!profile) redirect('/404')

  return (
    <div className="container mx-auto py-8 px-4">
      <UserProfile {...profile} />
    </div>
  )
} 