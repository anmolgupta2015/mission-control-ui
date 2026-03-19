'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

export default function StatCard({ label, value, icon: Icon, trend, status }) {
  const statusColors = {
    good: 'bg-green-500/10 text-green-400 border-green-500/30',
    normal: 'bg-primary/10 text-primary border-primary/30',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    critical: 'bg-red-500/10 text-red-400 border-red-500/30'
  }

  const trendUp = trend.startsWith('+')

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${statusColors[status]} border`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {trend}
        </div>
      </div>

      <div>
        <p className="text-muted-foreground text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}
