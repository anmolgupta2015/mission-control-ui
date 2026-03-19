'use client'

import Overview from './views/overview'
import Performance from './views/performance'
import Events from './views/events'
import Health from './views/health'
import Settings from './views/settings'

const viewMap = {
  overview: <Overview />,
  metrics: <Performance />,
  logs: <Events />,
  health: <Health />,
  settings: <Settings />
}

export default function MainContent({ activeSection }) {
  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="p-6 max-w-7xl mx-auto">
        {viewMap[activeSection] || viewMap.overview}
      </div>
    </main>
  )
}
