'use client'

import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'

export default function Events() {
  const events = [
    { id: 1, message: 'System startup completed', type: 'info', time: '09:45:23', severity: 'low' },
    { id: 2, message: 'CPU usage exceeded threshold', type: 'warning', time: '09:43:15', severity: 'medium' },
    { id: 3, message: 'All systems operational', type: 'success', time: '09:40:00', severity: 'low' },
    { id: 4, message: 'Memory pressure detected', type: 'warning', time: '09:35:42', severity: 'medium' },
  ]

  const iconMap = {
    info: <Info className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    success: <CheckCircle className="w-4 h-4" />,
    error: <AlertCircle className="w-4 h-4" />
  }

  const typeColors = {
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">System Events</h2>
        <p className="text-muted-foreground">Real-time system event log</p>
      </div>

      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">Event Log</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition">Clear Log</button>
        </div>

        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {events.map(event => (
            <div key={event.id} className="p-4 hover:bg-background/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded border ${typeColors[event.type]}`}>
                  {iconMap[event.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium mb-1">{event.message}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>

                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap ml-4">
                  {event.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
