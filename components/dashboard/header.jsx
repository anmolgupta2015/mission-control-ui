'use client'

import { useState, useEffect } from 'react'
import { Bell, Settings, User, Clock, Moon, Sun } from 'lucide-react'

export default function Header({ isDark, setIsDark }) {
  const [time, setTime] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const mins = String(now.getMinutes()).padStart(2, '0')
      const secs = String(now.getSeconds()).padStart(2, '0')
      setTime(`${hours}:${mins}:${secs}`)
    }
    
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleThemeToggle = () => {
    console.log('[v0] Theme toggle clicked, current isDark:', isDark)
    const newTheme = !isDark
    console.log('[v0] Calling setIsDark with:', newTheme)
    setIsDark(newTheme)
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mission Control</h1>
          <p className="text-sm text-muted-foreground">Real-time System Monitoring</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {mounted && time ? (
          <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border border-border">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-foreground tracking-wider">{time}</span>
          </div>
        ) : (
          <div className="h-10 w-32 bg-background rounded-lg border border-border animate-pulse" />
        )}

        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded-lg" title="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute mt-1 w-2 h-2 bg-primary rounded-full" />
        </button>

        <button
          onClick={handleThemeToggle}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded-lg cursor-pointer"
          title="Toggle theme"
          type="button"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded-lg" title="Settings">
          <Settings className="w-5 h-5" />
        </button>

        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors rounded-lg" title="Account">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
