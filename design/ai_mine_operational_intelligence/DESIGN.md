---
name: AI-MINE Operational Intelligence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#564338'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#897267'
  outline-variant: '#ddc1b3'
  surface-tint: '#9b4500'
  primary: '#903f00'
  on-primary: '#ffffff'
  primary-container: '#b45309'
  on-primary-container: '#fff1eb'
  inverse-primary: '#ffb68e'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#005b8c'
  on-tertiary: '#ffffff'
  tertiary-container: '#0075b1'
  on-tertiary-container: '#ecf4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb68e'
  on-primary-fixed: '#331200'
  on-primary-fixed-variant: '#763300'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  telemetry-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.03em
  telemetry-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.02em
  telemetry-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter-dense: 0.5rem
  gutter-normal: 1rem
  gutter-expanded: 1.5rem
  margin-screen: 1.5rem
---

## Brand & Style

This design system delivers an industrial, high-precision telemetry and decision-support interface tailored for mining executives, geotechnical engineers, and mine dispatch controllers. It bridges field operations, GIS spatial telemetry, and predictive dispatch systems into a unified operational command experience. 

The aesthetic marries **Industrial High-Density Telemetry** with **Precision Glassmorphism**. Heavy command frames ground high-velocity IoT feeds, while translucent analytical HUDs float over dense spatial charts and geological models. The visual tone projects absolute reliability, algorithmic certainty, and mission-critical clarity under high-stress operating environments. Visual noise is aggressively eliminated in favor of high-contrast data matrices, clear status hierarchies, and tactile control mechanisms.

## Colors

The system uses an industrial dual-tone foundation. Deep slate `#0f172a` anchors persistent navigation, spatial viewport overlays, and sensor telemetry status bars, while clean, reflective cool grays (`#f8fafc` and `#f1f5f9`) establish high-readability workspaces for data tables and geotechnical dashboards. Manganese mineral bronze (`#d97706` and `#b45309`) serves as the brand and interactive primary signifier, evoking raw metallurgical extraction.

### Status & Telemetry Semantic Roles
- **Operational On-Track (Nominal):** `#10b981` (Emerald) indicates equipment health, target throughput achievement, and cleared dispatch routes.
- **Geotechnical Warning (Advisory):** `#f59e0b` (Amber) signals pit slope creep, grade dilution risks, or equipment maintenance thresholds.
- **Critical Shortfall (Emergency):** `#ef4444` (Crimson) commands immediate intervention for blast zone intrusion, sensor dropouts, or production stalls.
- **Analytical & Predictive (AI Insights):** `#0284c7` (Cyan/Blue) identifies automated optimization vectors, predictive ore-sorting curves, and GIS overlays.

## Typography

The typography architecture uses a bi-axial system: **Inter** handles narrative structure, UI interactions, and hierarchical headers, while **JetBrains Mono** is mandatory for all quantitative measurements, drill-hole coordinates, sensor outputs, grade percentages, and timestamps. 

Mono metrics must always utilize tabular figures to ensure numerical alignment across live-streaming IoT tables and SCADA cards. The `label-caps` token is reserved for technical telemetry headers, sensor statuses, and field metadata tags, rendering in uppercase with positive letter spacing to maintain legibility in dense arrays.

## Layout & Spacing

The layout is built around an enterprise-grade 12-column adaptive fluid grid engineered for multi-monitor command rooms and ruggedized field tablets. 

- **Desktop & Control Room Consoles (>= 1440px):** 12-column dynamic grid with fixed `16px` (`space-base`) gutters. Layout incorporates high-density data packing: horizontal telemetry ribbons occupy top-level screen real estate, side panels dock GIS tools, and main viewports can collapse or pin secondary data inspectors.
- **Tablet & Ruggedized Terminals (768px - 1439px):** 8-column layout with `12px` (`space-md`) gutters. Telemetry streams collapse into swipeable ribbons; tabular columns dynamically hide secondary status indicators.
- **Mobile Handheld Inspection (< 768px):** 4-column layout with `8px` (`space-sm`) gutters and `16px` outer screen margins. Analytical graphs stack below single-KPI readout cards.

Spatial density follows a compact 4px base increment. High-density zones (e.g., dispatch queues and sensor feeds) leverage `space-xs` and `space-sm` for structural compacting without sacrificing optical hierarchy.

## Elevation & Depth

Visual depth is expressed through engineered layer stratification and tactical glassmorphic HUD overlays, mirroring heads-up displays in modern excavation cockpits.

- **Base Layer (Ground Zero):** Surfaces sit flat on `#f8fafc` or deep `#0f172a`. Structural boundaries use low-contrast borders (`1px solid #e2e8f0` in light surfaces, `1px solid #334155` in dark viewports).
- **Telemetry Cards & Panes (Level 1):** Solid `#ffffff` surfaces raised by a subtle directional shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Command Overlays & Viewport Floating HUDs (Level 2):** Frosted glass elements over active GIS feeds, pit wireframes, or haul-truck video monitors. Style: `background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);`.
- **Modals, Hazard Alerts & Override Prompts (Level 3):** High-priority panels with sharp containment: `0 20px 25px -5px rgba(15, 23, 42, 0.25), 0 8px 10px -6px rgba(15, 23, 42, 0.2)`. Urgent alerts incorporate an animated perimeter pulse using the corresponding semantic hex (e.g., Crimson `#ef4444`).

## Shapes

The design system enforces a disciplined, compact shape profile (`roundedness: 1`). Structural sharpness conveys technical rigor and maximises pixel real-estate for continuous telemetry streams.

- Standard UI containers, input fields, cards, and buttons utilize `0.25rem` (4px) corner radii.
- Larger diagnostic modules and multi-pane spatial canvases employ `0.5rem` (8px) corner radii.
- Status indicator pills and circular sensor monitors use full enclosing arcs (`9999px`) to immediately separate qualitative identifiers from rectilinear numeric data blocks.

## Components

### Action Controls & Buttons
- **Primary Industrial Trigger:** Background `#b45309`, text `#ffffff`, border radius `4px`. Hover triggers transition to `#d97706`. Focus states present a high-contrast double ring: `2px solid #ffffff` inner, `2px solid #b45309` outer.
- **Secondary Command Trigger:** Outlined style with `#0f172a` text, `1px solid #cbd5e1` border, hover background `#f1f5f9`.
- **Critical Action/Override Trigger:** Background `#ef4444`, text `#ffffff`. Requires deliberate click-and-hold confirmation for irreversible actions (e.g., blast initiation or emergency crusher stops).

### Telemetry KPI & Diagnostic Cards
Cards feature a standard 1px structural boundary (`#e2e8f0`), white background, and compact padding (`12px` to `16px`). Each card header contains the parameter name in `label-caps` (`#64748b`), followed by a large numeric readout in `telemetry-lg`, and inline mini trend indicators or sparklines colored by semantic status (Emerald, Amber, Crimson).

### Telemetry Chips & Status Tokens
- Compact badges paired with a `6px` solid status beacon dot.
- High-visibility tokens use tinted translucent backgrounds: `rgba(16, 185, 129, 0.12)` for Nominal with `#047857` text; `rgba(245, 158, 11, 0.12)` for Warning with `#b45309` text; `rgba(239, 68, 68, 0.12)` for Critical with `#b91c1c` text.

### Data Tables & Dispatch Matrices
High-density rows with a fixed height of `36px` for compact scanning and `44px` for expandable records. Monospaced numeric alignment for coordinates, tons hauled, moisture percentages, and grade indices. Sticky headers rendered in `#f8fafc` with subtle `1px solid #e2e8f0` bottom dividers. Alternating row fills are disabled in favor of dynamic row borders and hover-highlighting (`#f1f5f9`).

### Input Fields & Filter Toggles
Rectilinear inputs with `height: 36px`, `border: 1px solid #cbd5e1`, font `body-md`. Focus state uses `#b45309` border with a subtle ambient glow (`0 0 0 1px #b45309`). GIS coordinate fields and depth filters strictly enforce `JetBrains Mono`.

### Specialized Domain Components
- **Geotechnical Slope Gauge:** Visual needle-and-arc indicators with multi-segment color thresholds.
- **Ore Grade Vector Ribbon:** Horizontal segmented bar visualising Manganese percentage distributions (High Grade >44%, Medium Grade 35-44%, Low Grade <35%).
- **IoT Heartbeat Status Node:** Dark HUD badges featuring real-time blinking frequency indicators confirming low-latency satellite and edge-gateway connectivity.