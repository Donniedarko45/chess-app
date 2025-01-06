import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { motion } from 'framer-motion'

interface ChessBoardProps {
  gameId: string
  socket: any
  playerColor: 'white' | 'black'
}

export const ChessBoard = ({ gameId, socket, playerColor }: ChessBoardProps) => {
  const [game, setGame] = useState(new Chess())
  const [board, setBoard] = useState<string[][]>([])

  useEffect(() => {
    updateBoard()
    
    socket.on('move', ({ from, to }) => {
      makeMove(from, to)
    })

    return () => {
      socket.off('move')
    }
  }, [])

  const updateBoard = () => {
    setBoard(game.board())
  }

  const makeMove = (from: string, to: string) => {
    try {
      game.move({ from, to })
      updateBoard()
      socket.emit('move', { gameId, from, to })
    } catch (error) {
      console.error('Invalid move')
    }
  }

  return (
    <div className="grid grid-cols-8 gap-0.5 bg-surface p-4 rounded-lg shadow-xl">
      {board.flat().map((piece, index) => {
        const row = Math.floor(index / 8)
        const col = index % 8
        const isBlack = (row + col) % 2 === 1
        
        return (
          <motion.div
            key={index}
            className={`
              w-16 h-16 flex items-center justify-center
              ${isBlack ? 'bg-pine' : 'bg-rose'}
              ${isBlack ? 'hover:bg-pine/80' : 'hover:bg-rose/80'}
              transition-colors
            `}
            whileHover={{ scale: 1.05 }}
          >
            {piece && (
              <span className="text-4xl">
                {getPieceSymbol(piece)}
              </span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

const getPieceSymbol = (piece: any) => {
  const symbols: Record<string, string> = {
    'p': '♟',
    'n': '♞',
    'b': '♝',
    'r': '♜',
    'q': '♛',
    'k': '♚',
    'P': '♙',
    'N': '♘',
    'B': '♗',
    'R': '♖',
    'Q': '♕',
    'K': '♔',
  }
  return symbols[piece.type]
} 