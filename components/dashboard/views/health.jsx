'use client'

import { useState, useEffect } from 'react'

function CircularProgress({ value, label, color }) {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{Math.round(value)}%</span>
          <span className="text-xs text-muted-foreground mt-1">{label}</span>
        </div>
      </div>
    </div>
  )
}

export default function Health() {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 62,
    disk: 38,
    network: 71
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = {
          cpu: Math.max(20, Math.min(95, prev.cpu + (Math.random() - 0.5) * 15)),
          memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 12)),
          disk: Math.max(20, Math.min(90, prev.disk + (Math.random() - 0.5) * 8)),
          network: Math.max(10, Math.min(100, prev.network + (Math.random() - 0.5) * 20))
        }
        return newMetrics
      })
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">System Health</h2>
        <p className="text-muted-foreground">Real-time resource utilization and system status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <CircularProgress value={metrics.cpu} label="CPU Usage" color="var(--primary)" />
        <CircularProgress value={metrics.memory} label="Memory" color="var(--chart-2)" />
        <CircularProgress value={metrics.disk} label="Disk Space" color="var(--chart-3)" />
        <CircularProgress value={metrics.network} label="Network" color="var(--chart-4)" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Status Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Temperature</span>
              <span className="text-foreground font-semibold">45°C</span>
            </div>
            <div className="h-1 bg-background rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary rounded-full" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-muted-foreground">Power Draw</span>
              <span className="text-foreground font-semibold">245W / 500W</span>
            </div>
            <div className="h-1 bg-background rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-chart-2 rounded-full" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Alerts & Events</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border/50">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground">Normal operation</p>
                <p className="text-xs text-muted-foreground">All systems nominal</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border/50">
              <div className="w-2 h-2 rounded-full bg-chart-4 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground">Network stable</p>
                <p className="text-xs text-muted-foreground">71% utilization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
