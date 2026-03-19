# Mission Control - Design Guidelines & Principles

## Design Philosophy Statement

Mission Control Dashboard is built on the principle of **clarity through constraint**. We believe that the most powerful dashboards are those that present complex information in the simplest way possible.

### Core Principles

1. **Hierarchy Over Clutter** - Only show what's essential, organize by importance
2. **Professional Minimalism** - Clean lines, generous whitespace, purposeful color
3. **Real-time Awareness** - Live updates without overwhelming the user
4. **Trust Through Consistency** - Familiar patterns across all views
5. **Accessible by Default** - WCAG AA compliance not as afterthought but foundation

---

## Color System

### Palette Overview

```
Primary Brand Color:    #1f6feb (Professional Blue)
Secondary Accent:       #58a6ff (Light Blue)
Tertiary Accent:        #79c0ff (Sky Blue)

Dark Background:        #0f1117 (Deep Navy)
Card Background:        #161b22 (Lighter Navy)
Text Primary:           #f0f6fc (Almost White)
Text Secondary:         #8b949e (Muted Gray)

Border Color:           #21262d (Dark Gray)
Status Good:            #3fb950 (Green)
Status Warning:         #d29922 (Amber)
Status Critical:        #f85149 (Red)
```

### Why This Palette?

- **Professional** - Inspired by GitHub's enterprise design
- **Accessible** - 13:1 contrast ratio (text vs background)
- **Monochromatic Base** - Blues reduce design fatigue
- **Status Colors** - Universal across platforms (green/amber/red)
- **Dark Theme** - Optimal for monitoring dashboards

### Usage Guidelines

```jsx
// Use semantic token names, not colors directly
<div className="bg-card text-foreground border-border">

// Status-based colors
<span className={`text-${statusColor}`}>
  
// Text hierarchy
<h1 className="text-foreground">          {/* Primary text */}
<p className="text-muted-foreground">      {/* Secondary text */}
```

---

## Typography

### Font Families

- **Headings:** Geist Sans (via Next.js fonts)
- **Body:** Geist Sans (consistent hierarchy)
- **Monospace:** Geist Mono (data values)

### Size Scale

```
Headings
  h1: text-3xl (30px) - Page titles
  h2: text-2xl (24px) - Section titles
  h3: text-lg  (18px) - Card titles

Body
  Large:  text-base (16px) - Primary content
  Normal: text-sm   (14px) - Secondary content
  Small:  text-xs   (12px) - Labels & meta

Monospace
  Data:   font-mono text-base - Metric values
  Logs:   font-mono text-xs   - Event timestamps
```

### Line Height

- **Headings:** leading-tight (1.25) - Compact, strong
- **Body:** leading-relaxed (1.625) - Readable, scannable

### Weight Scale

```
Headings:     font-bold       (700)
Subheadings:  font-semibold   (600)
Normal text:  font-normal     (400)
Disabled:     font-normal     (400) + opacity-50
```

### Example Hierarchy

```jsx
<h1 className="text-3xl font-bold text-foreground">
  System Overview
</h1>

<p className="text-muted-foreground text-sm mb-6">
  Real-time system performance metrics and status
</p>

<h3 className="text-lg font-semibold text-foreground mb-4">
  CPU Performance
</h3>

<p className="text-sm text-muted-foreground">
  Last updated: 2 seconds ago
</p>
```

---

## Layout System

### Spacing Scale

Built on 4px base unit (Tailwind default):

```
xs:   2px   (p-0.5, gap-0.5)
sm:   4px   (p-1, gap-1)
md:   8px   (p-2, gap-2)
lg:   16px  (p-4, gap-4)
xl:   24px  (p-6, gap-6)
2xl:  32px  (p-8, gap-8)
```

### Grid System

**Primary Layout (Flexbox):**
```jsx
// Sidebar + Content
<div className="flex h-screen">
  <aside className="w-72">...</aside>
  <main className="flex-1">...</main>
</div>

// Navigation Row
<header className="flex justify-between items-center">
```

**Card Grid (CSS Grid):**
```jsx
// 4 columns on large screens, responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard />
</div>

// 2x2 grid for gauges
<div className="grid grid-cols-2 gap-6">
  <CircularProgress />
</div>
```

### Responsive Breakpoints

```
Mobile:     < 640px   (sm:)
Tablet:     640-1024px (md:)
Desktop:    > 1024px  (lg:)

Example:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* 1 col mobile, 2 col tablet, 4 col desktop */}
</div>
```

### Maximum Content Width

```jsx
// Keep long content readable
<main className="max-w-7xl mx-auto px-6">
```

---

## Component Patterns

### Card Container

```jsx
<div className="bg-card rounded-lg border border-border p-6">
  <h3 className="text-lg font-semibold text-foreground mb-4">
    Title
  </h3>
  {/* Content */}
</div>
```

**Always includes:**
- Consistent padding (p-6)
- Border (border border-border)
- Rounded corners (rounded-lg)
- Background (bg-card)

### Stat Card Pattern

```jsx
<div className="bg-card rounded-lg border border-border p-6">
  <div className="flex items-center justify-between mb-4">
    <span className="text-muted-foreground">{label}</span>
    <Icon className="w-5 h-5 text-primary" />
  </div>
  
  <div className="mb-3">
    <span className="text-3xl font-bold text-foreground">
      {value}
    </span>
  </div>
  
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{description}</span>
    <span className={`text-${statusColor}`}>{trend}</span>
  </div>
</div>
```

### List/Log Pattern

```jsx
<div className="space-y-2">
  {events.map(event => (
    <div className="flex items-start gap-3 p-3 bg-background rounded border border-border/50">
      <IconComponent className="w-4 h-4 mt-1" />
      <div className="flex-1 min-w-0">
        <p className="text-foreground text-sm">{event.message}</p>
        <p className="text-muted-foreground text-xs">{event.time}</p>
      </div>
    </div>
  ))}
</div>
```

---

## Interactive Elements

### Button Styling

```jsx
// Primary button
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
  Action
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
  Secondary
</button>
```

### Hover States

```css
/* Smooth transition on hover */
.hover\:opacity-90:hover {
  opacity: 0.9;
  transition: opacity 200ms ease;
}

.hover\:bg-secondary:hover {
  background-color: var(--secondary);
  transition: background-color 200ms ease;
}
```

### Focus States

```jsx
<button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Accessible Button
</button>
```

### Disabled State

```jsx
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</button>
```

---

## Icon Usage

### Principles

1. **Use Lucide React** - Consistent 24px icons, professionally designed
2. **Icon + Label** - Never use icons without accompanying text
3. **Consistent Sizing** - 
   - Navigation: w-5 h-5 (20px)
   - Cards: w-5 h-5 (20px)
   - Headings: w-6 h-6 (24px)

### Examples

```jsx
// Navigation icon
<Navigation className="w-5 h-5" />

// Status icon
<AlertCircle className="w-4 h-4 text-destructive" />

// Large icon
<Gauge className="w-6 h-6 text-primary" />
```

### Icon Colors

```jsx
// Primary action
<icon className="text-primary" />

// Muted/secondary
<icon className="text-muted-foreground" />

// Status colors
<icon className="text-green-500" />  // Good
<icon className="text-yellow-500" /> // Warning
<icon className="text-red-500" />    // Critical
```

---

## Animation & Motion

### Principles

- **Purposeful** - Every animation communicates something
- **Subtle** - Animations enhance, don't distract
- **Consistent** - Reuse animation patterns

### Custom Animations

```css
@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.pulse-glow {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Transition Utilities

```jsx
// On hover
<div className="hover:bg-secondary transition-colors duration-200">

// On state change
<div className="transition-all duration-300 ease-in-out">

// Smooth scroll
<div className="scroll-smooth">
```

---

## Status Indicators

### Color Mapping

```jsx
const statusColors = {
  good:      'text-green-500 bg-green-500/10',
  normal:    'text-blue-500 bg-blue-500/10',
  warning:   'text-yellow-500 bg-yellow-500/10',
  critical:  'text-red-500 bg-red-500/10'
}
```

### Badge Pattern

```jsx
<span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
  {label}
</span>
```

### Circular Indicator

```jsx
<div className={`w-3 h-3 rounded-full ${statusColor}`} />
```

---

## Accessibility Standards

### WCAG AA Compliance

**Color Contrast:**
- Text vs Background: 4.5:1 minimum
- Large text: 3:1 minimum
- Our palette: 13:1 (exceeds requirements)

**Keyboard Navigation:**
```jsx
<button tabIndex={0} onKeyDown={handleKeyboard}>
  Keyboard accessible
</button>
```

**Screen Reader Labels:**
```jsx
<button aria-label="Close menu">
  <X />
</button>

<div role="status" aria-live="polite">
  Real-time updates
</div>
```

### Semantic HTML

```jsx
// Always use semantic elements
<header>...</header>        // Not <div>
<nav>...</nav>              // Not <div>
<main>...</main>            // Not <div>
<section>...</section>      // Not <div>
<article>...</article>      // Not <div>
<button>...</button>        // Not <div onclick>
```

---

## Best Practices Checklist

### Before Shipping Any Component

- [ ] Color contrast meets WCAG AA (4.5:1 for normal text)
- [ ] Component works with keyboard navigation
- [ ] Semantic HTML used appropriately
- [ ] No hard-coded colors (use design tokens)
- [ ] Responsive across mobile, tablet, desktop
- [ ] Hover/focus states clearly visible
- [ ] Icon + label used together
- [ ] Consistent spacing (uses gap/padding utilities)
- [ ] Uses provided color tokens
- [ ] No magic numbers (all spacing from scale)

### Code Style

```jsx
// ✓ Good
<div className="bg-card text-foreground border-border p-6 rounded-lg">
  <h3 className="text-lg font-semibold mb-4">Title</h3>
  <p className="text-muted-foreground text-sm">Description</p>
</div>

// ✗ Avoid
<div style="background: white; padding: 24px; border-radius: 8px;">
  <h3 style="font-size: 18px; font-weight: bold;">Title</h3>
</div>
```

---

## Design Tokens Reference

All values defined in `app/globals.css`:

```css
/* Backgrounds */
--background: #0f1117
--card: #161b22

/* Text */
--foreground: #f0f6fc
--muted-foreground: #8b949e

/* Interactive */
--primary: #1f6feb
--secondary: #58a6ff
--accent: #79c0ff

/* Utility */
--border: #21262d
--input: #0d1117
--ring: #58a6ff

/* Status */
--destructive: #f85149 (Red)
--success: #3fb950 (Green)
--warning: #d29922 (Amber)

/* Components */
--sidebar: #0d1117
--sidebar-foreground: #f0f6fc
--sidebar-primary: #1f6feb
--sidebar-border: #21262d

/* Layout */
--radius: 0.375rem (6px)
```

---

**Last Updated:** March 2026
**Design System Version:** 1.0
**WCAG Compliance:** AA (Enhanced)
