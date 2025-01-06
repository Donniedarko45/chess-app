import { useState } from 'react'
import { motion } from 'framer-motion'

interface ChatBubbleProps {
  message: string
  sender: string
  timestamp: Date
  isCurrentUser: boolean
}

export const ChatBubble = ({ message, sender, timestamp, isCurrentUser }: ChatBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          max-w-[70%] rounded-2xl px-4 py-2
          ${isCurrentUser ? 'bg-pine text-text' : 'bg-surface text-text'}
        `}
      >
        <p className="text-sm font-medium">{sender}</p>
        <p className="mt-1">{message}</p>
        <p className="text-xs text-muted mt-1">
          {new Date(timestamp).toLocaleTimeString()}
        </p>
      </div>
    </motion.div>
  )
} 