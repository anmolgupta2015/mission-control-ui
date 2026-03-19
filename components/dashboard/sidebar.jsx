'use client'

import { Gauge, BarChart3, Terminal, Settings, Activity } from 'lucide-react'

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Gauge, description: 'System overview' },
  { id: 'metrics', label: 'Performance', icon: BarChart3, description: 'Metrics & analytics' },
  { id: 'logs', label: 'Events', icon: Terminal, description: 'System logs' },
  { id: 'health', label: 'Health', icon: Activity, description: 'System health' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'Configuration' }
]

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo Area */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Gauge className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground text-lg">Control</h2>
            <p className="text-xs text-muted-foreground">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {sidebarItems.map(item => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-sidebar-primary text-white'
                  : 'text-sidebar-foreground hover:bg-background/20'
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <p className="text-xs text-muted-foreground ml-8">{item.description}</p>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="bg-background/30 rounded-lg px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground mb-2">System Status</p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm font-semibold text-sidebar-foreground">Operational</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
