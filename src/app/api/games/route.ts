import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { opponentId } = await req.json()

    const game = await prisma.game.create({
      data: {
        whiteId: session.user.id,
        blackId: opponentId,
      },
      include: {
        white: true,
        black: true,
      },
    })

    return NextResponse.json(game)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const games = await prisma.game.findMany({
      where: {
        OR: [
          { whiteId: session.user.id },
          { blackId: session.user.id },
        ],
      },
      include: {
        white: true,
        black: true,
        moves: true,
      },
      orderBy: {
        startTime: 'desc',
      },
    })

    return NextResponse.json(games)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 