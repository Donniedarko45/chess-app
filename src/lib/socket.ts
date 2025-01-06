import { Server as NetServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import { NextApiResponse } from 'next'
import { prisma } from './prisma'

interface GameMove {
  gameId: string
  from: string
  to: string
  piece: string
}

interface GameMessage {
  gameId: string
  senderId: string
  content: string
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function SocketHandler(req: any, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket: Socket) => {
      console.log('Client connected')

      socket.on('join-game', async (gameId: string) => {
        socket.join(gameId)
      })

      socket.on('move', async ({ gameId, from, to, piece }: GameMove) => {
        await prisma.move.create({
          data: { gameId, from, to, piece }
        })
        
        io.to(gameId).emit('move', { from, to, piece })
      })

      socket.on('message', async ({ gameId, senderId, content }: GameMessage) => {
        const message = await prisma.message.create({
          data: { gameId, senderId, content }
        })
        
        io.to(gameId).emit('message', message)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }

  res.end()
} 