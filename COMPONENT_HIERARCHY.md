# Component Hierarchy & Data Flow

## Component Tree

```
Home (app/page.jsx)
├── State: isDark, activeSection, systemHealth, mounted
├── Effects: Theme setup, System health updates
│
├── Header
│   ├── Props: isDark, setIsDark
│   ├── State: time, mounted
│   ├── Features: Clock display, theme toggle, notifications
│   └── Children: Sun/Moon icon toggle
│
├── Sidebar
│   ├── Props: activeSection, setActiveSection
│   ├── State: None (controlled component)
│   └── Features: Navigation menu, section selection
│
└── MainContent
    ├── Props: activeSection, systemHealth
    ├── State: None (controlled component)
    ├── Logic: View router based on activeSection
    │
    └── Views:
        ├── Overview
        │   ├── StatCard (x4)
        │   │   └── Props: label, value, icon, trend, status
        │   └── Sessions display
        │
        ├── Performance
        │   ├── State: cpuData, memoryData, diskData, networkData
        │   └── Charts (Recharts):
        │       ├── AreaChart (CPU)
        │       ├── LineChart (Memory)
        │       ├── AreaChart (Disk)
        │       └── LineChart (Network)
        │
        ├── Events
        │   ├── State: events array
        │   └── EventLog items with color-coding
        │
        ├── Health
        │   ├── State: metrics (cpu, memory, disk, network)
        │   ├── Effects: Update metrics every 2s
        │   └── Components:
        │       ├── CircularProgress (x4)
        │       └── Diagnostic checklist
        │
        └── Settings
            ├── State: config toggles
            └── Features: System configuration
```

## Data Flow

```
┌─────────────────────────────────────────┐
│         Home (page.jsx)                  │
│  - Theme State (isDark)                  │
│  - Navigation State (activeSection)      │
│  - Health Metrics State                  │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┼──────────┬────────────┐
    │          │          │            │
    v          v          v            v
┌────────┐ ┌────────┐ ┌──────────┐ ┌──────────┐
│ Header │ │Sidebar │ │MainContent│ (Sidebar  │
│        │ │        │ │           │  already  │
│-isDark │ │-active │ │-activeView│  mounted  │
│-setIsDark Section│ │-health    │          │
└────────┘ └────────┘ └──────────┘ └──────────┘
    │          │          │
    │          └──────────┼──────────┐
    │                     │          │
    │                     v          v
    │                ┌─────────────────┐
    │                │ Views (based on  │
    │                │ activeSection)   │
    │                │                  │
    │                ├─ Overview        │
    │                ├─ Performance     │
    │                ├─ Events          │
    │                ├─ Health          │
    │                └─ Settings        │
    │
    └────→ Apply Theme to HTML
           └── document.classList.add('dark')
```

## State Management Flow

### Theme State
```
Home (isDark state)
  ↓
localStorage.setItem('theme', ...)
  ↓
Header receives: isDark, setIsDark
  ↓
Toggle button → setIsDark → applyTheme()
  ↓
HTML classList updated
  ↓
CSS variables activated
  ↓
All components re-render with new colors
```

### Navigation State
```
Home (activeSection state)
  ↓
Sidebar receives: activeSection, setActiveSection
  ↓
User clicks nav item
  ↓
setActiveSection(newSection)
  ↓
MainContent receives updated activeSection
  ↓
viewMap[activeSection] renders correct view
```

### Metrics State
```
Home (systemHealth state)
  ↓
useEffect: setInterval every 2000ms
  ↓
setSystemHealth updates metrics
  ↓
Components receive updated systemHealth
  ↓
Views and gauges re-render with new values
  ↓
Charts animate to new data
```

## Props Passing

### Down the Tree
```
Home
  ↓ isDark, setIsDark
  └─→ Header
        ↓ (no props down, only callbacks up)

Home
  ↓ activeSection, setActiveSection
  └─→ Sidebar

Home
  ↓ activeSection, systemHealth
  └─→ MainContent
        ↓
        └─→ Views (receive no props)
              (use parent's state indirectly)
```

### Callbacks Up
```
Sidebar
  ← onClick → Home (setActiveSection)

Header
  ← onClick → Home (setIsDark)

Chart
  ← (internal state)
```

## Component Communication Patterns

### 1. Parent to Child (Props)
- Home → Header: isDark, setIsDark
- Home → Sidebar: activeSection, setActiveSection
- Home → MainContent: activeSection, systemHealth
- MainContent → Views: viewMap injection

### 2. Child to Parent (Callbacks)
- Header clicks theme button → calls setIsDark()
- Sidebar clicks nav item → calls setActiveSection()

### 3. Local State (Internal)
- Header: time, mounted
- Performance: cpuData, memoryData, diskData, networkData
- Health: metrics
- Views: managed independently

## Rendering Optimization

### Controlled Components
- Sidebar: fully controlled by Home
- Doesn't maintain internal state
- Updates immediately on parent state change

### Memoization Opportunities
```javascript
// Could add React.memo() to optimize:
- StatCard (receives same props often)
- EventLog items (static content)
- Chart components (only update on data change)
```

### Re-render Prevention
- Non-essential components don't re-render
- Charts have `isAnimationActive={false}`
- Views only render when activeSection changes

## Event Flow

### Theme Toggle Event
```
User clicks Sun/Moon icon
  ↓
Header onClick handler fires
  ↓
Calls setIsDark(!isDark)
  ↓
Home state updates
  ↓
applyTheme() executes
  ↓
localStorage.setItem('theme', ...)
  ↓
HTML classList updated
  ↓
All components re-render
  ↓
CSS variables take effect
```

### Navigation Click
```
User clicks sidebar item
  ↓
Sidebar onClick handler fires
  ↓
Calls setActiveSection(itemId)
  ↓
Home state updates
  ↓
MainContent receives new activeSection
  ↓
viewMap[activeSection] renders new view
  ↓
Smooth transition to new page
```

### Metrics Update
```
2000ms timer fires
  ↓
setSystemHealth() updates metrics
  ↓
Home state updates
  ↓
All components receive new metrics
  ↓
Health gauges animate
  ↓
Charts update with new data
  ↓
(Repeat every 2 seconds)
```

## Key Design Decisions

1. **Centralized Theme State**
   - Easier to manage across components
   - Single source of truth
   - Persistent without extra wrappers

2. **Router Pattern in MainContent**
   - Simple object-based routing
   - No Next.js routing overhead
   - Instant view switching

3. **Local Metric Generation**
   - No backend dependency
   - Immediate feedback
   - Can be replaced with API later

4. **Callback Functions for Updates**
   - Avoids prop drilling
   - Clear parent-child relationships
   - Easy to refactor

5. **CSS Classes for Theming**
   - No context provider needed
   - Works with localStorage
   - Compatible with Tailwind dark: mode

## Scalability Path

As the project grows:

1. **Add Context API** for deeply nested props
2. **Implement Redux/Zustand** for complex state
3. **Create Custom Hooks** for shared logic
4. **Add API Layer** replacing metric generation
5. **Use React Router** replacing viewMap pattern
6. **Extract View Components** into separate files
7. **Add TypeScript** for type safety
