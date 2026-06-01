# Architecture 🧱

> **Goal:** Provide a fast mental model of the Noosphere Research Hub components, boundaries, and critical flows.

## System Overview

The Noosphere Research Hub is a high-performance **Single Page Application (SPA)** built with React and Vite. It is designed as a substrate-neutral research interface.

```text
                    +-------------------------+
   Browser/Client   |         Frontend        |
  +--------------+  |  React 18 / Vite 5      |
  |  User Agent  |--|  Routing, UI, Canvas    |
  +--------------+  +------------+------------+
                                  |
                                  | Client-Side Routing
                                  v
                    +-------------+-------------+
                    |       Page Components     |
                    |  (Research Papers, Tools) |
                    +-------------+-------------+
                                  |
             +--------------------+--------------------+
             |                                         |
             v                                         v
  +---------------------+                   +---------------------+
  |   Research Papers   |                   |    AI Analysis      |
  |   (Interactive JSX) |                   |    Tools (Utilities)|
  +----------+----------+                   +----------+----------+
             |                                         |
             v                                         v
  +---------------------+                   +---------------------+
  |   StarfieldLayout   |                   |   ApiKeyContext     |
  |   (Canvas Animation)|                   |   (Ephemeral State) |
  +---------------------+                   +---------------------+
```

## Component Hierarchy

- **App.jsx**: The root container managing client-side routing via React Router.
- **Header.jsx**: Navigation system with a "Dark Premium" aesthetic.
- **StarfieldLayout.jsx**: A pervasive animated background using the HTML5 Canvas API.
- **Papers/**: Interactive research papers represented as high-fidelity React components.
- **Tools/**: Cognitive analysis utilities that interact with AI via user-provided API keys.

## Data Flow (AI Tools)

1. **Input**: User enters an ephemeral OpenRouter API key (stored in `ApiKeyContext`).
2. **Analysis**: User interacts with a specific tool (e.g., `PatternSpotter`).
3. **Execution**: The tool sends a request to the AI model using the provided key.
4. **Cleanup**: Keys are wiped on page refresh and never persisted in `localStorage`.

## Key Decisions

- **SPA Routing Hack**: Because GitHub Pages doesn't support SPA routing natively, the build process copies `index.html` to `404.html`.
- **"Dark Premium" Aesthetic**: A unified visual language across all tools and papers using Tailwind CSS glassmorphism and gradients.
- **Substrate Neutrality**: The platform is designed to be agnostic to whether the "consciousness" being researched is biological or digital.

## Project Structure
- `/src/components`: Reusable UI elements.
- `/src/pages/papers`: The "Library of Record" (interactive JSX papers).
- `/src/pages/tools`: Cognitive utilities for AI interaction.
- `/src/contexts`: Ephemeral state management (Auth/API keys).

For detailed technical specifications, see [PROJECT_BLUEPRINT.md](PROJECT_BLUEPRINT.md).
