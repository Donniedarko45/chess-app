export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  soundEnabled: boolean
  notifications: boolean
  pieceStyle: 'classic' | 'modern' | 'minimal'
  boardStyle: 'classic' | 'wood' | 'marble'
  autoPromoteToQueen: boolean
  showLegalMoves: boolean
  confirmMoves: boolean
}

export const defaultSettings: UserSettings = {
  theme: 'system',
  soundEnabled: true,
  notifications: true,
  pieceStyle: 'classic',
  boardStyle: 'classic',
  autoPromoteToQueen: false,
  showLegalMoves: true,
  confirmMoves: true,
} 