'use client'

export function CircularProgress({ value, status = 'normal' }) {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  const statusColor = {
    good: '#10b981',
    warning: '#f59e0b',
    critical: '#f85149'
  }[status]

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        className="text-border"
      />

      {/* Progress circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={statusColor}
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
      />
    </svg>
  )
}
