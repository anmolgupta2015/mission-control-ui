'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'

export default function Home() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    disk: 38,
    network: 71,
    latency: 23
  })

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const saved = localStorage.getItem('theme')
    let initialDark = true

    if (saved) {
      initialDark = saved === 'dark'
    } else {
      // Default to dark mode
      initialDark = true
    }

    console.log('[v0] Initial theme load - isDark:', initialDark)
    setIsDark(initialDark)
    applyTheme(initialDark)
    setMounted(true)
  }, [])

  const applyTheme = (dark) => {
    console.log('[v0] Applying theme:', dark ? 'dark' : 'light')
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
      console.log('[v0] Dark class added')
    } else {
      html.classList.remove('dark')
      console.log('[v0] Dark class removed')
    }
  }

  const handleThemeChange = (dark) => {
    console.log('[v0] Theme change triggered:', dark)
    setIsDark(dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    applyTheme(dark)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        cpu: Math.max(20, Math.min(95, prev.cpu + (Math.random() - 0.5) * 15)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 12)),
        disk: Math.max(20, Math.min(90, prev.disk + (Math.random() - 0.5) * 8)),
        network: Math.max(10, Math.min(100, prev.network + (Math.random() - 0.5) * 20)),
        latency: Math.max(5, Math.min(100, prev.latency + (Math.random() - 0.5) * 10))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDark={isDark} setIsDark={handleThemeChange} />
        <MainContent activeSection={activeSection} systemHealth={systemHealth} />
      </div>
    </div>
  )
}
