'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { UserSettings, defaultSettings } from '@/types/settings'
import { useToast } from '@/components/ui/use-toast'

export function SettingsForm({ initialSettings = defaultSettings }) {
  const [settings, setSettings] = useState<UserSettings>(initialSettings)
  const { toast } = useToast()

  const saveSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!response.ok) throw new Error('Failed to save settings')

      toast({
        title: 'Settings saved',
        description: 'Your preferences have been updated successfully.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="bg-surface text-text">
      <CardHeader>
        <CardTitle>Game Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(value: any) =>
                setSettings({ ...settings, theme: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="pieceStyle">Piece Style</Label>
            <Select
              value={settings.pieceStyle}
              onValueChange={(value: any) =>
                setSettings({ ...settings, pieceStyle: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select piece style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sound">Sound Effects</Label>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, soundEnabled: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, notifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showLegalMoves">Show Legal Moves</Label>
            <Switch
              id="showLegalMoves"
              checked={settings.showLegalMoves}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, showLegalMoves: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="confirmMoves">Confirm Moves</Label>
            <Switch
              id="confirmMoves"
              checked={settings.confirmMoves}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, confirmMoves: checked })
              }
            />
          </div>
        </div>

        <Button
          onClick={saveSettings}
          className="w-full bg-pine hover:bg-pine/80"
        >
          Save Settings
        </Button>
      </CardContent>
    </Card>
  )
} 