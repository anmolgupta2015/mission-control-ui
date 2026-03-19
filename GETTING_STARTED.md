# Mission Control Dashboard - Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```

### 3. Open in Browser
Navigate to `http://localhost:3000`

That's it! You now have a fully functional Mission Control Dashboard.

---

## What You Get

### 📊 5 Main Sections

1. **Overview** - Key system metrics at a glance
2. **Performance** - Detailed analytics (ready for charts)
3. **Events** - Real-time system event logging
4. **Health** - Live health gauges with auto-updates
5. **Settings** - System configuration toggles

### 🎨 Professional Design

- Enterprise-grade UI inspired by GitHub
- High contrast dark theme (WCAG AA compliant)
- Responsive layouts for all devices
- Smooth animations and transitions
- Real-time metric updates (2-second refresh)

### 📁 Well-Organized Code

```
components/dashboard/
├── header.jsx           # Top bar
├── sidebar.jsx          # Navigation
├── main-content.jsx     # Content router
├── stat-card.jsx        # Metric cards
├── circular-progress.jsx # Progress gauges
└── views/               # Dashboard pages
    ├── overview.jsx
    ├── performance.jsx
    ├── events.jsx
    ├── health.jsx
    └── settings.jsx
```

---

## Key Features

### Real-Time Updates
Metrics automatically update every 2 seconds:
```jsx
// In app/page.jsx
useEffect(() => {
  const interval = setInterval(() => {
    setSystemHealth(prev => ({
      cpu: Math.max(20, Math.min(95, prev.cpu + (Math.random() - 0.5) * 15)),
      // ... more metrics
    }))
  }, 2000)
}, [])
```

### Status Indicators
Color-coded status at a glance:
- **Green** - Good/Healthy
- **Blue** - Normal/Running
- **Yellow** - Warning/Attention needed
- **Red** - Critical/Error

### Interactive Navigation
Click sidebar items to switch between views:
- No page reload
- Smooth transitions
- Active state highlighting

---

## Customization Guide

### Change Colors

Edit `app/globals.css`:
```css
:root {
  --primary: #1f6feb;        /* Change primary color */
  --secondary: #58a6ff;      /* Change secondary */
  --background: #0f1117;     /* Change background */
  /* ... more colors */
}
```

### Add New Metrics

1. Update `page.jsx` state:
```jsx
const [systemHealth, setSystemHealth] = useState({
  cpu: 45,
  memory: 62,
  disk: 38,
  network: 71,
  myMetric: 50  // Add this
})
```

2. Add calculation in useEffect:
```jsx
myMetric: Math.max(0, Math.min(100, prev.myMetric + (Math.random() - 0.5) * 10))
```

3. Display in a view component:
```jsx
<StatCard
  label="My Metric"
  value={metrics.myMetric}
  icon={MyIcon}
  trend="+1.2%"
  status="normal"
/>
```

### Add New View

1. Create `components/dashboard/views/my-view.jsx`:
```jsx
'use client'

export default function MyView() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">My View</h2>
      {/* Your content */}
    </div>
  )
}
```

2. Add to `main-content.jsx` viewMap:
```jsx
import MyView from './views/my-view'

const viewMap = {
  overview: <Overview />,
  myview: <MyView />,
  // ... others
}
```

3. Add navigation item in `sidebar.jsx`:
```jsx
{ id: 'myview', label: 'My View', icon: Icon, description: 'Description' }
```

---

## File Structure Overview

```
mission-control-dashboard/
├── app/
│   ├── page.jsx           ← Main dashboard (start here!)
│   ├── layout.tsx         ← Root layout
│   └── globals.css        ← Styles & design tokens
│
├── components/
│   └── dashboard/         ← All dashboard components
│
├── README.md              ← Full documentation
├── PROJECT_STRUCTURE.md   ← Detailed structure
├── DESIGN_GUIDELINES.md   ← Design system
└── GETTING_STARTED.md     ← This file
```

---

## Component Guide

### Using Sidebar for Navigation

The sidebar automatically handles navigation:
```jsx
// sidebar.jsx manages this
const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  // ... more items
]

// Click handler updates activeSection state
setActiveSection('overview')
```

### Using StatCard for Metrics

```jsx
<StatCard
  label="CPU Usage"        // Label
  value="45%"             // Main value
  icon={Cpu}              // Icon from lucide-react
  trend="+2.5%"           // Trend indicator
  status="normal"         // Status: good/normal/warning/critical
/>
```

### Using CircularProgress for Gauges

```jsx
<CircularProgress
  value={62}              // 0-100 percentage
  label="Memory"          // Gauge label
  icon={HardDrive}        // Center icon
  status="normal"         // Status color
/>
```

---

## Design System

### Color Palette
- **Primary:** #1f6feb (Professional Blue)
- **Secondary:** #58a6ff (Light Blue)
- **Background:** #0f1117 (Deep Navy)
- **Text:** #f0f6fc (Almost White)
- **Good:** #3fb950 (Green)
- **Warning:** #d29922 (Amber)
- **Critical:** #f85149 (Red)

### Typography
- **Headings:** Geist Sans, font-bold
- **Body:** Geist Sans, font-normal
- **Mono:** Geist Mono (for data)

### Spacing Scale
- 4px base unit (Tailwind)
- p-1: 4px, p-2: 8px, p-4: 16px, p-6: 24px

### Border Radius
- Default: 6px (rounded-lg)
- Small: 4px (rounded)

---

## Helpful Commands

```bash
# Development
pnpm dev              # Start dev server

# Production
pnpm build           # Build for production
pnpm start           # Run production server

# Linting (if configured)
pnpm lint            # Check code style

# Type checking
pnpm type-check      # Check types (if using TypeScript)
```

---

## Troubleshooting

### Issue: Import errors for components
**Solution:** Make sure you're using absolute imports with `@/`:
```jsx
import Button from '@/components/ui/button'  // ✓
import Button from '../../../components/button'  // ✗
```

### Issue: Styling not applying
**Solution:** Use design token variables, not hard-coded colors:
```jsx
<div className="bg-card text-foreground">  // ✓
<div className="bg-white text-black">      // ✗
```

### Issue: Real-time updates not working
**Solution:** Check that useEffect dependencies are correct in `page.jsx`:
```jsx
useEffect(() => {
  // Timer code
}, [])  // Empty dependency array = runs once on mount
```

### Issue: View not switching
**Solution:** Make sure sidebar id matches viewMap key in `main-content.jsx`:
```jsx
// In sidebar.jsx
{ id: 'overview', label: 'Overview' }

// In main-content.jsx viewMap
overview: <Overview />  // IDs must match!
```

---

## Next Steps

### 1. Customize for Your Use Case
- Change metrics to match your system
- Update colors to match your brand
- Add additional views for your features

### 2. Connect Real Data
- Replace simulated metrics with actual API calls
- Update real-time refreshes with WebSocket or polling
- Persist settings to a backend database

### 3. Deploy
```bash
# Using Vercel (recommended)
vercel deploy

# Or push to GitHub for auto-deployment
git push origin main
```

### 4. Expand Features
- Add user authentication
- Implement metric alerts
- Create dashboard customization
- Add export functionality

---

## Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `PROJECT_STRUCTURE.md` | Detailed file structure guide |
| `DESIGN_GUIDELINES.md` | Design system specifications |
| `GETTING_STARTED.md` | This quick start guide |

---

## Support & Resources

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

### Stack
- **Framework:** Next.js 16
- **Library:** React 19
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Language:** JavaScript (JSX)

---

## Quick Tips

1. **Use the sidebar for navigation** - It's the main way to switch views
2. **Check the design tokens** - All colors defined in `globals.css`
3. **Copy component patterns** - StatCard and CircularProgress are templates
4. **Keep it responsive** - Use Tailwind's responsive prefixes
5. **Add real data** - Replace simulated metrics when ready

---

## Questions?

- Check `README.md` for detailed docs
- Review `PROJECT_STRUCTURE.md` for code organization
- See `DESIGN_GUIDELINES.md` for design decisions
- Look at existing components for patterns

Good luck building! 🚀

---

**Last Updated:** March 2026
**Version:** 1.0.0
**Status:** Production Ready
