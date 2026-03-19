'use client'

import { useState } from 'react'
import { Bell, Moon, Lock, Database, Shield } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoBackup: true,
    twoFactor: false
  })

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const settingGroups = [
    {
      title: 'Notifications',
      description: 'Manage system alerts and notifications',
      icon: Bell,
      items: [
        { key: 'notifications', label: 'Enable Notifications', description: 'Receive system alerts' }
      ]
    },
    {
      title: 'Appearance',
      description: 'Customize dashboard appearance',
      icon: Moon,
      items: [
        { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme (default)' }
      ]
    },
    {
      title: 'Data Management',
      description: 'Backup and data options',
      icon: Database,
      items: [
        { key: 'autoBackup', label: 'Auto Backup', description: 'Automatically backup system data' }
      ]
    },
    {
      title: 'Security',
      description: 'Security and access settings',
      icon: Shield,
      items: [
        { key: 'twoFactor', label: 'Two-Factor Auth', description: 'Enable 2FA for account' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">Configure dashboard and system preferences</p>
      </div>

      <div className="space-y-6">
        {settingGroups.map((group) => {
          const Icon = group.icon

          return (
            <div key={group.title} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
              </div>

              <div className="divide-y divide-border">
                {group.items.map(item => (
                  <div key={item.key} className="px-6 py-4 flex items-center justify-between hover:bg-background/30 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>

                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[item.key] ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
        <button className="px-6 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
          Reset to Default
        </button>
      </div>
    </div>
  )
}
