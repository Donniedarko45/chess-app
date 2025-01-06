import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      where: {
        endTime: null,
        black: null,
      },
      include: {
        white: {
          select: {
            name: true,
            rating: true,
          },
        },
        black: {
          select: {
            name: true,
            rating: true,
          },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
      take: 20,
    })

    return NextResponse.json(games)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 