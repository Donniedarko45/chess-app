'use client'

import { useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'

export const useSocket = (gameId: string) => {
  const socketRef = useRef<Socket>()

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000')
    socketRef.current = socket

    socket.emit('join-game', gameId)

    return () => {
      socket.disconnect()
    }
  }, [gameId])

  return socketRef.current
} 