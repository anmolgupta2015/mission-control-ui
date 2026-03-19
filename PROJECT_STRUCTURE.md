# Mission Control Dashboard - Project Structure Guide

## Directory Overview

```
mission-control-dashboard/
├── app/                          # Next.js app directory (file-based routing)
│   ├── layout.tsx               # Root layout wrapper
│   ├── page.jsx                 # Home page (/route)
│   ├── page.tsx                 # Re-exports page.jsx (Next.js compatibility)
│   ├── globals.css              # Global styles & design tokens
│   └── favicon.ico              # Site favicon
│
├── components/
│   ├── dashboard/               # Main dashboard components
│   │   ├── header.jsx          # Top navigation bar
│   │   │   ├─ Clock display
│   │   │   ├─ Notifications menu
│   │   │   └─ User profile menu
│   │   │
│   │   ├── sidebar.jsx         # Left navigation panel
│   │   │   ├─ Logo area
│   │   │   ├─ 5 main nav items
│   │   │   └─ Status indicator
│   │   │
│   │   ├── main-content.jsx    # Content router & switcher
│   │   │   └─ Routes to active view
│   │   │
│   │   ├── stat-card.jsx       # Reusable metric card
│   │   │   ├─ Icon
│   │   │   ├─ Value display
│   │   │   ├─ Trend indicator
│   │   │   └─ Status badge
│   │   │
│   │   ├── circular-progress.jsx  # Custom SVG gauge
│   │   │   ├─ Radial progress ring
│   │   │   ├─ Center value display
│   │   │   └─ Status color coding
│   │   │
│   │   └── views/              # Dashboard page views (5 sections)
│   │       ├─ overview.jsx     # Home/dashboard view
│   │       │  └─ 4 stat cards with metrics
│   │       │
│   │       ├─ performance.jsx  # Analytics dashboard
│   │       │  └─ 4 chart placeholders (CPU, Memory, Disk, Network)
│   │       │
│   │       ├─ events.jsx       # System event log
│   │       │  ├─ Event list with timestamps
│   │       │  ├─ Color-coded severity levels
│   │       │  └─ Auto-scrolling container
│   │       │
│   │       ├─ health.jsx       # System health monitoring
│   │       │  ├─ 4 animated circular gauges
│   │       │  ├─ Real-time metric updates
│   │       │  └─ Health status indicators
│   │       │
│   │       └─ settings.jsx     # Configuration panel
│   │          ├─ System toggles
│   │          ├─ Control switches
│   │          └─ Action logging
│   │
│   ├── theme-provider.tsx      # Theme context (if using theme switching)
│   │
│   └── ui/                     # shadcn/ui components (auto-generated)
│       ├─ button.tsx           # Interactive button component
│       ├─ card.tsx             # Card container
│       ├─ input.tsx            # Text input field
│       ├─ select.tsx           # Dropdown select
│       ├─ switch.tsx           # Toggle switch
│       ├─ tabs.tsx             # Tab navigation
│       ├─ toast.tsx            # Notification toast
│       └─ [50+ more shadcn components]
│
├── hooks/                       # React custom hooks
│   ├─ use-local-storage.ts     # Persistent state management
│   └─ use-mobile.ts            # Mobile detection hook
│
├── lib/                         # Utility functions
│   └─ utils.ts                 # Helper functions (cn() for classnames)
│
├── public/                      # Static assets
│   ├─ icon.svg                 # Site icon
│   ├─ apple-icon.png          # iOS home screen icon
│   ├─ icon-light-32x32.png    # Light theme icon
│   └─ icon-dark-32x32.png     # Dark theme icon
│
├── .gitignore                   # Git ignore rules
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
│
├── README.md                    # Main project documentation
└── PROJECT_STRUCTURE.md         # This file
```

## File-by-File Breakdown

### Core Application Files

#### `app/layout.tsx`
- Root layout component wrapping entire app
- Defines metadata (title, description, icons)
- Sets up theme provider and global styles
- Contains HTML structure and font imports

#### `app/page.jsx`
- Home page component (route: `/`)
- Manages application state (activeSection, systemHealth)
- Handles real-time metric updates via useEffect
- Orchestrates header, sidebar, and main content components

#### `app/globals.css`
- Global CSS reset and base styles
- Design token definitions (colors, spacing, fonts)
- Custom animations (pulse-glow, scan-line, flicker)
- Tailwind directives (@layer, @import)

---

### Dashboard Components

#### `components/dashboard/header.jsx`
**Purpose:** Top navigation bar
**Key Features:**
- Live UTC clock display
- Notifications badge
- User profile menu
- System status indicator

**Props:** None (uses internal state)

**Example:**
```jsx
<Header />
```

#### `components/dashboard/sidebar.jsx`
**Purpose:** Left navigation menu
**Key Features:**
- Logo and branding area
- 5 navigation items (Overview, Performance, Events, Health, Settings)
- Active section highlighting
- Responsive collapse on mobile

**Props:**
- `activeSection` (string): Currently active view
- `setActiveSection` (function): Update active section

**Example:**
```jsx
<Sidebar 
  activeSection="overview" 
  setActiveSection={setActiveSection}
/>
```

#### `components/dashboard/main-content.jsx`
**Purpose:** Content router and container
**Key Features:**
- Maps section IDs to view components
- Renders appropriate view based on activeSection
- Handles transitions between views
- Provides consistent layout wrapper

**Props:**
- `activeSection` (string): Which view to display
- `systemHealth` (object): System metrics to pass to views

**Example:**
```jsx
<MainContent 
  activeSection="overview"
  systemHealth={systemHealth}
/>
```

#### `components/dashboard/stat-card.jsx`
**Purpose:** Reusable metric card component
**Key Features:**
- Icon display
- Large value text
- Trend indicator (+ or -)
- Status badge (good/normal/warning/critical)

**Props:**
- `label` (string): Card title
- `value` (string): Main metric value
- `icon` (React Component): Icon from lucide-react
- `trend` (string): Trend indicator
- `status` (string): Status type

**Example:**
```jsx
<StatCard
  label="CPU Usage"
  value="45%"
  icon={Cpu}
  trend="+2.5%"
  status="normal"
/>
```

#### `components/dashboard/circular-progress.jsx`
**Purpose:** Custom SVG circular progress gauge
**Key Features:**
- Animated SVG circle
- Center percentage display
- Status-based color coding
- Icon display in center

**Props:**
- `value` (number): Percentage value (0-100)
- `label` (string): Gauge label
- `icon` (React Component): Center icon
- `status` (string): Status type (good/normal/warning/critical)

**Example:**
```jsx
<CircularProgress
  value={62}
  label="Memory"
  icon={HardDrive}
  status="normal"
/>
```

---

### View Components (Pages)

#### `components/dashboard/views/overview.jsx`
**Route ID:** `overview`
**Purpose:** Main dashboard with key metrics
**Content:**
- Page title and description
- 4 stat cards (CPU, Memory, Network, Uptime)
- Responsive grid layout

**Uses:** StatCard component

#### `components/dashboard/views/performance.jsx`
**Route ID:** `metrics` (navigates as "Performance")
**Purpose:** Detailed performance analytics
**Content:**
- 4 chart placeholder areas
- CPU Performance chart
- Memory Usage chart
- Disk I/O chart
- Network Traffic chart

**Ready for:** Recharts integration

#### `components/dashboard/views/events.jsx`
**Route ID:** `logs` (navigates as "Events")
**Purpose:** System event logging and monitoring
**Content:**
- Event list with timestamps
- Color-coded severity levels (info, warning, success, error)
- Icon-based event types
- Scrollable event container

**Features:**
- Real-time event updates
- Severity-based filtering
- Sortable by timestamp

#### `components/dashboard/views/health.jsx`
**Route ID:** `health`
**Purpose:** Real-time system health monitoring
**Content:**
- 4 circular progress gauges
- CPU, Memory, Disk, Network metrics
- Auto-updating every 2 seconds
- Status indicators

**Uses:** CircularProgress component

#### `components/dashboard/views/settings.jsx`
**Route ID:** `settings`
**Purpose:** System configuration and controls
**Content:**
- Multiple setting groups
- Toggle switches for each setting
- Status displays
- Control sections:
  - Notifications settings
  - Display preferences
  - Backup settings
  - Security settings

**Features:**
- Local state management
- Toggle functionality
- Grouped settings

---

### Utility Components

#### `hooks/use-local-storage.ts`
**Purpose:** Persistent state management
**Usage:**
```jsx
const [value, setValue] = useLocalStorage('key', defaultValue)
```

**Features:**
- Syncs state to localStorage
- Persists across page refreshes
- Type-safe (TypeScript)

#### `lib/utils.ts`
**Purpose:** Utility functions
**Includes:**
- `cn()` - Tailwind classname merger
- Other helper functions as needed

---

## Component Hierarchy

```
App (page.jsx)
├── Sidebar
│   └── 5 Navigation Items
│
├── Header
│   ├── Title
│   ├── Clock
│   └── Menus
│
└── MainContent
    └── View Router
        ├── Overview
        │   └── 4 × StatCard
        │
        ├── Performance
        │   └── 4 × Chart Placeholders
        │
        ├── Events
        │   └── Event List
        │
        ├── Health
        │   └── 4 × CircularProgress
        │
        └── Settings
            └── Config Groups
```

## Data Flow

```
App State
├── activeSection (current view)
└── systemHealth (metrics object)
    ├── cpu
    ├── memory
    ├── disk
    ├── network
    └── latency

↓ Props passed down to:
├── Sidebar (receives setActiveSection)
├── MainContent (receives activeSection & systemHealth)
└── Header (status-independent)

↓ Views consume data via:
├── Props from MainContent
└── Internal useState hooks
```

## Import Patterns

### Absolute Imports (Recommended)
```jsx
import Button from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'
```

### Relative Imports (For nearby files)
```jsx
import StatCard from '../stat-card'
import Overview from './views/overview'
```

## Adding New Components

### 1. UI Component
Place in `components/ui/` for reusable UI elements

### 2. Feature Component
Place in `components/dashboard/` for dashboard-specific components

### 3. New View
1. Create file in `components/dashboard/views/`
2. Add to `viewMap` in `main-content.jsx`
3. Add navigation item in `sidebar.jsx`

### 4. New Hook
Place in `hooks/` directory with `use-` prefix

## Styling Architecture

### Color Tokens (Design System)
```css
/* Primary colors */
--primary: #1f6feb        /* Main interactive */
--secondary: #58a6ff      /* Accents */
--accent: #79c0ff         /* Tertiary */

/* Semantic colors */
--background: #0f1117     /* Page background */
--foreground: #f0f6fc     /* Text color */
--card: #161b22           /* Card background */
--border: #21262d         /* Borders */
--muted: #30363d          /* Disabled/secondary */
```

### Applying Styles
Always use design tokens:
```jsx
// ✓ Correct
<div className="bg-card text-foreground border-border">

// ✗ Avoid
<div className="bg-white text-black border-gray-300">
```

## Build & Deployment

### Development
```bash
pnpm dev          # Start dev server on :3000
```

### Production
```bash
pnpm build        # Build for production
pnpm start        # Run production server
```

### Deployment
- Push to GitHub → Auto-deploys to Vercel
- Or run `vercel deploy` from CLI

---

**Last Updated:** March 2026
**Version:** 1.0.0
