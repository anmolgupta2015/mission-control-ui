# Quick Start Guide

## Installation & Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open browser
# Navigate to http://localhost:3000
```

## Features Overview

### Dashboard Sections
1. **Overview** - Main dashboard with system metrics
2. **Performance** - Real-time charts for CPU, Memory, Disk, Network
3. **Events** - System event logs with severity levels
4. **Health** - System health gauges and diagnostics
5. **Settings** - Configuration options

### Theme Toggle
- Click the Sun/Moon icon in the header
- Theme preference is automatically saved
- Changes apply instantly across the entire app

### Real-Time Updates
- Metrics update every 2 seconds
- Charts show 20-point rolling data
- Smooth animations on transitions

## Component Structure

```
Page Root (page.jsx)
├── Theme Management (isDark, setIsDark)
├── System Health State
├── Header (with theme toggle)
├── Sidebar (navigation)
└── MainContent (view router)
    ├── Overview
    ├── Performance (with charts)
    ├── Events
    ├── Health (with gauges)
    └── Settings
```

## Key Technologies

- **React 19** - UI framework
- **Next.js 16** - Full-stack framework
- **Tailwind CSS v4** - Utility-first styling
- **Recharts** - Chart visualizations
- **Lucide Icons** - Icon library

## Customization

### Change Primary Color
Edit `app/globals.css`:
```css
--primary: #your-color;
--chart-1: #your-color;
```

### Modify Chart Data
Edit `components/dashboard/views/performance.jsx`:
```javascript
const generateData = () => {
  // Customize data generation logic
}
```

### Add New Views
1. Create file in `components/dashboard/views/`
2. Add to `viewMap` in `main-content.jsx`
3. Add sidebar item in `sidebar.jsx`

## Troubleshooting

### Theme not persisting?
- Clear browser localStorage
- Check browser storage settings

### Charts not showing?
- Verify Recharts is installed
- Check browser console for errors
- Ensure dummy data is being generated

### Hydration errors?
- These should be fixed - all client-only rendering is wrapped with `mounted` state
- Hard refresh browser cache

## Performance Tips

- Charts disable animations for better performance
- Use responsive containers for better scaling
- Limit data points for chart efficiency
- Consider pagination for large event logs

## Deployment

### Vercel (Recommended)
```bash
# Connect to Vercel
vercel link

# Deploy
vercel deploy
```

### Other Platforms
Works with any Next.js-compatible host:
- Netlify
- Railway
- Render
- AWS Amplify
- etc.

## Support & Documentation
- See `FINAL_BUILD.md` for detailed feature documentation
- See `DESIGN_GUIDELINES.md` for design system
- See `PROJECT_STRUCTURE.md` for architecture details
