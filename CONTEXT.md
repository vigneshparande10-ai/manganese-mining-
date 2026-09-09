# MOIL AI Mine Intelligence Platform - Project Context

## Project Overview
This project is a React-based front-end application built for a hackathon. It serves as a mock "AI Mine Intelligence Platform" for MOIL (Manganese Ore India Limited). The dashboard provides a high-level command center view of mining operations, fleet tracking, risk analysis, and predictive simulations.

## Tech Stack
*   **Framework**: React 19 (via Vite 8)
*   **Styling**: Vanilla CSS (Global styles in `index.css`) + CSS Modules (for individual views). It utilizes a dark-mode, glassmorphism aesthetic (`--card` variable) with monospace fonts for data.
*   **Icons**: `lucide-react`
*   **Mapping**: `mapbox-gl` and `react-map-gl` (listed in dependencies)
*   **Linting**: Oxlint

## Application Architecture

### Entry Point (`src/App.jsx`)
The main application shell consists of a `Sidebar`, a `Topbar`, and a `<main>` content area. 
State is managed using simple React `useState` to toggle between different views (`activeView`). A custom event listener (`'notify'`) is set up to display toast notifications globally.

### Views (`src/views/`)
The application is divided into 6 primary modular views:
1.  **CommandCenter (`CommandCenter.jsx`)**: The default operational dashboard. Displays today's ore output, dispatch adherence, fleet availability, and blended Mn grade. Includes a static interactive map and production performance charts.
2.  **LiveOperations (`LiveOperations.jsx`)**: Focuses on live fleet tracking and operational status.
3.  **RiskShortfall (`RiskShortfall.jsx`)**: Analyzes production risks and shortfalls.
4.  **EquipmentHealth (`EquipmentHealth.jsx`)**: Monitors the health of the mining fleet and assets.
5.  **Simulator (`Simulator.jsx`)**: A gamified, predictive simulation view to adjust parameters and see potential outcomes.
6.  **ReserveIntelligence (`ReserveIntelligence.jsx`)**: Focuses on manganese reserve data and exploration.

### Components (`src/components/`)
*   **Sidebar**: Navigation menu to switch between the main views.
*   **Topbar**: Top header bar.

### Hooks (`src/hooks/`)
*   **`useLiveSimulation.js`**: A custom hook used to simulate real-time telemetry. It provides mock data for `throughput` (which fluctuates randomly) and interpolates `truckPosition` along a set of hardcoded `haulRoutePoints` to simulate movement on a map.

## Styling & Theming (`src/index.css`)
The project avoids utility frameworks like Tailwind and relies on custom CSS. 
*   **Theme**: Dark navy background (`--bg: #0f1115`) with frosted glass panels (`rgba(26, 32, 44, 0.6)`).
*   **Typography**: `Inter` for standard text and `JetBrains Mono` (`--mono`) for numbers and tabular data.
*   **Colors**: Uses semantic colors (`--green`, `--amber`, `--red`, `--orange`) to denote operational status.

## Current State & Hackathon Potential
The project is currently a visual prototype. Most of the data is hardcoded or simulated via simple `setInterval` logic. To win a hackathon, the focus should be on polishing the UI/UX (adding animations, better 3D map integrations) and integrating a clear "AI" narrative (like an interactive Chatbot or dynamic predictive charts).
