
# 🛰️ Mission Control UI: Constellation Dashboard

[![Status: Production Ready](https://img.shields.io/badge/Status-Production--Ready-3fb950?style=for-the-badge)](https://github.com/)
[![Framework: Next.js 15](https://img.shields.io/badge/Framework-Next.js%2015-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![UI: Tailwind v4](https://img.shields.io/badge/UI-Tailwind%20v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A high-performance, real-time instrumentation and hardware monitoring interface engineered for the **Constellation** framework. This dashboard translates complex system telemetry into actionable, "glanceable" insights using modern reactive patterns, zero-latency visualizations, and enterprise-grade UI principles.

---

### 📺 Project Media & Demo

> **Note to Reviewers:** Visualizing real-time telemetry is best experienced through a live interaction.

---

### 🖼️ Interface Preview

| System Overview (Dark Theme) | Analytics & Performance (Light Theme) |
| :--- | :--- |
| ![Dark Mode](https://github.com/user-attachments/assets/65b6e301-f9e9-4b5a-8e38-4e98108b3d8f) | ![Light Mode](https://github.com/user-attachments/assets/d5175deb-7b5d-4d75-899a-5f4b4cf28791) |

### 🎥 Walkthrough

[**Watch the 30-second Demo Video**](https://github.com/user-attachments/assets/900ef47d-1375-47cd-b3eb-44f377bb83ad)

* **Highlights:** Theme persistence, SVG gauge precision, and Recharts synchronization.

---

## 🌟 Extraordinary Features

### 1. Adaptive Theme Engine
A robust, persistence-aware theme system designed for 24/7 laboratory operations.
* **Context-Aware:** Instant toggle between High-Contrast Dark (low-light control rooms) and Clean Light (documentation/office).
* **Zero-Latency:** Implemented via **CSS Variables** to ensure state changes don't trigger heavy JS re-calculations.
* **Persistence:** Integrated with `localStorage` to preserve operator environment preferences across sessions.

### 2. Live Telemetry Suite (Recharts)
Engineered for **"Data Truth"**—ensuring what the sensor sees is what the operator gets.
* **High-Frequency Streams:** 4 synchronized charts tracking CPU, Memory, Disk, and Network traffic.
* **Scientific Tuning:** Chart animations are explicitly set to `isAnimationActive={false}` to ensure raw telemetry is displayed the millisecond it arrives, avoiding visual interpolation lag.

### 3. Precision Health Monitoring
* **SVG Circular Gauges:** Custom-engineered radial indicators with mathematically centered labels and flexbox alignment.
* **Threshold Logic:** Dynamic color-coding ($Success < 60\% < Warning < 80\% < Critical$) providing immediate status recognition.

---

## 🏗️ Architecture & Structure

### Component Hierarchy
I followed a **Unidirectional Data Flow** pattern to ensure system-wide data integrity.

```text
Page (page.jsx) ⮕ [Source of Truth & Polling Logic]
 ├─ Sidebar (sidebar.jsx) ⮕ [Navigation Controller]
 ├─ Header (header.jsx) ⮕ [Clock & Theme Persistence]
 └─ MainContent (main-content.jsx) ⮕ [View Router]
     ├─ Overview View ⮕ 4x StatCard Metrics
     ├─ Performance View ⮕ 4x Real-time Recharts
     ├─ Events View ⮕ Logged Event Stream
     ├─ Health View ⮕ 4x SVG Circular Gauges
     └─ Settings View ⮕ System Configuration
```

### Directory Organization
```text
mission-control-dashboard/
├── app/
│   ├── layout.tsx        # Root layout & metadata
│   ├── page.jsx          # Root Entry Point (Metrics & Theme Logic)
│   └── globals.css       # Design tokens & Global animations
├── components/
│   ├── dashboard/        # Core UI Layout components
│   │   ├── header.jsx    # Nav + Theme Toggle
│   │   ├── sidebar.jsx   # Nav Menu
│   │   └── views/        # Page-specific views (Overview, Health, etc.)
│   └── ui/               # Base Atomic Components (shadcn/ui)
├── hooks/
│   └── use-local-storage # Persistence logic
└── lib/                  # Shared Utility Functions
```

---

## 🎨 Design System & Tokens
Visual consistency is driven by modular CSS variables to allow for rapid UI scaling.

```css
/* Core Design Tokens */
--background: #0f1117;   /* Lab-Dark Background */
--foreground: #f0f6fc;   /* Primary Reading Text */
--primary: #1f6feb;      /* Interaction Blue */
--secondary: #58a6ff;    /* Highlight Blue */
--destructive: #f85149;  /* Critical Alert Red */
--radius: 0.375rem;      /* Standardized 6px rounding */
```

---

## 🧠 Engineering Highlights

* **Hydration Resilience:** Implemented a `mounted` state pattern in the Header and Clock components. This prevents Next.js server/client mismatches, ensuring a stable and professional console output.
* **Socket-Ready:** The internal data generation is decoupled from the UI. The mock `setInterval` polling can be replaced with a real **WebSocket/gRPC** stream in minutes without changing UI components.
* **WCAG AA Compliance:** Hand-picked color contrast ratios ensure that the dashboard remains accessible for all operators in diverse lighting environments.

---

## 🚀 Quick Start & Deployment

### 1. Installation
```bash
npm install
```

### 2. Launch Development
```bash
npm run dev
```
*Dashboard will be accessible at `http://localhost:3000`*

### 3. Build for Production
```bash
npm run build
```

---

**Author:** Anmol Gupta  
**Project:** CERN HSF / Constellation  
**License:** MIT
