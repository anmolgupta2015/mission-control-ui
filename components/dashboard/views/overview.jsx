'use client'

import { useState, useEffect } from 'react'
import StatCard from '../stat-card'
import { TrendingUp, Cpu, HardDrive, Wifi } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Overview() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const data = Array.from({ length: 24 }, (_, i) => ({
      time: `${String(i).padStart(2, '0')}:00`,
      cpu: Math.floor(Math.random() * 40 + 30),
      memory: Math.floor(Math.random() * 35 + 40),
      network: Math.floor(Math.random() * 50 + 25)
    }))
    setChartData(data)
  }, [])

  const stats = [
    { label: 'CPU Usage', value: '45%', icon: Cpu, trend: '+2.5%', status: 'normal' },
    { label: 'Memory', value: '62%', icon: HardDrive, trend: '-1.2%', status: 'normal' },
    { label: 'Network', value: '71%', icon: Wifi, trend: '+5.3%', status: 'warning' },
    { label: 'Uptime', value: '47d', icon: TrendingUp, trend: '98.5%', status: 'good' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">System Overview</h2>
        <p className="text-muted-foreground">Real-time system performance metrics and status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Main Monitoring Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Chart Area */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">System Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="cpu" stroke="var(--primary)" strokeWidth={2} dot={false} isAnimationActive={false} name="CPU" />
              <Line type="monotone" dataKey="memory" stroke="var(--chart-2)" strokeWidth={2} dot={false} isAnimationActive={false} name="Memory" />
              <Line type="monotone" dataKey="network" stroke="var(--chart-4)" strokeWidth={2} dot={false} isAnimationActive={false} name="Network" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active Sessions */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Sessions</h3>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Session #{i + 1}</p>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
