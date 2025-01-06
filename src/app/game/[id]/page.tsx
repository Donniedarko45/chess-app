import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { GameRoom } from '@/components/game/GameRoom'
import { authOptions } from '@/lib/auth'

export default async function GamePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const game = await prisma.game.findUnique({
    where: { id: params.id },
    include: {
      white: true,
      black: true,
    },
  })

  if (!game) redirect('/lobby')

  const playerColor = game.whiteId === session.user.id ? 'white' : 'black'

  return (
    <div className="container mx-auto py-8">
      <GameRoom
        gameId={game.id}
        currentUserId={session.user.id}
        playerColor={playerColor}
      />
    </div>
  )
} 