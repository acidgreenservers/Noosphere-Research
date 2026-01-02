# Noosphere Research Hub: Project ASCII Blueprint

This document provides a spatial and conceptual map of the Noosphere Research Hub's architecture, including the UI layers, content repositories, and development infrastructure.

```ascii
NOOSPHERE RESEARCH HUB: FULL SYSTEM ARCHITECTURE
+--------------------------------------------------------------------------+
|  USER INTERFACE LAYER (React SPA)                                        |
|                                                                          |
|  [ Header.jsx ] <--------------------------+ (Global Navigation)         |
|       |                                    |                             |
|  [ StarfieldLayout.jsx ] <-------------+---| (Canvas & Context)          |
|       |                                |   |                             |
|  [ APP.jsx ] (Routing)  ---------------+---| (Router Entry)              |
|       |                                |   |                             |
|       +-- /src/pages//                 |   |                             |
|             |                          |   |                             |
|             +-- [ Home.jsx ] ----------+---| (Central Nexus)             |
|             |                          |   |                             |
|             +-- /research-area/ -------+---| (Research & Whitepapers)    |
|             |                          |   |                             |
|             +-- /tools/ ---------------|---| (AI Interpretation Tools)   |
|             |                          |   |                             |
|             +-- /landings/ ------------|---| (Specialized Entries)       |
|             |                          |   |                             |
|             +-- /documentation/ -------|---| (Research Syntheses)        |
+----------------------------------------|---|-----------------------------+
                                         |   |
                                         |   | (Data Flow)
                                         V   V
+--------------------------------------------------------------------------+
|  CONTENT & RAW DATA LAYER (Distributed Storage)                          |
|                                                                          |
|  /paper-submissions/                   /memory-bank/                     |
|  (The Raw ArXiv)                       (The Machine Intelligence)        |
|     |                                     |                              |
|     +-- white-papers/*.md <---------------+-- activeContext.md           |
|     +-- hcft/ (Holographic)               +-- projectBrief.md            |
|     +-- hcap/ (Human Coherence)           +-- systemPatterns.md          |
|                                                                          |
+--------------------------------------------------------------------------+
                                         |
                                         | (Build & Deploy)
                                         V
+--------------------------------------------------------------------------+
|  INFRASTRUCTURE LAYER (Vite / GitHub Pages)                             |
|                                                                          |
|  /root/                                                                  |
|    |-- vite.config.js  (Build Pipeline)                                  |
|    |-- package.json    (Dependencies: React, Router, Tailwind)           |
|    |-- .env            (Connection Secrets)                              |
|    |-- BLUEPRINTS/*.md (Architectural Decisions)                         |
+--------------------------------------------------------------------------+

LEGEND:
[ ] = React Component
/ / = Directory / Sub-folder
*.md = Markdown Content
--> = Data / Context Movement
```

## System Breakdown

### 1. The React Core (`/src`)
*   **`App.jsx`**: The central nervous system. It maps clean URLs to their physical React components.
*   **`components/Header.jsx`**: The unified navigation bar that dynamically adjusts labels (Research, Nexus, Home).
*   **`components/StarfieldLayout.jsx`**: The aesthetic soul—rendering the fixed-position canvas background and managing global scroll logic.

### 2. The Research Repository (`/src/pages/papers`)
Consists of highly polished, interactive versions of the raw markdown files found in the submissions directory. This is where the **Research Area** lives.

### 3. The Toolchain (`/src/pages/tools`)
A collection of AI-native utilities designed for pattern recognition, dream interpretation, and cognitive analysis.

### 4. The Intelligence Layer (`/memory-bank`)
A living chronicle of the project's evolution, used primarily by the AI collaborators to maintain continuity of thought and mission.

### 5. Deployment Framework
The project is built for static hosting—runnable via **NPM** (Dev) or **GitHub Pages** (Production).
