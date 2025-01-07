'use client'

import { useEffect, useState } from 'react'
import { useSocket } from '@/src/hooks/useSocket'
import { ChessBoard } from './ChessBoard'
import { ChatBubble } from '../chat/ChatBubble'

interface GameRoomProps {
  gameId: string
  currentUserId: string
  playerColor: 'white' | 'black'
}

export const GameRoom = ({ gameId, currentUserId, playerColor }: GameRoomProps) => {
  const socket = useSocket(gameId)
  const [messages, setMessages] = useState<any[]>([])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    if (!socket) return

    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.off('message')
    }
  }, [socket])

  const sendMessage = () => {
    if (!socket || !inputMessage.trim()) return

    socket.emit('message', {
      gameId,
      senderId: currentUserId,
      content: inputMessage,
    })

    setInputMessage('')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
      <div className="lg:col-span-2">
        <ChessBoard
          gameId={gameId}
          socket={socket}
          playerColor={playerColor}
        />
      </div>
      <div className="flex flex-col h-[600px] bg-surface rounded-lg p-4">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              sender={message.senderId}
              timestamp={message.timestamp}
              isCurrentUser={message.senderId === currentUserId}
            />
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-overlay text-text rounded-lg px-4 py-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-pine hover:bg-pine/80 text-text px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
} 