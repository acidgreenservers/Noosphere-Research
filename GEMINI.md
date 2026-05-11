# GEMINI.md

This file provides guidance to Gemini (Google AI Assistant) when working with code in this repository.

Antigravity Please read ANTIGRAVITY.md for your instructions.

# Noosphere Research Hub: Gemini Agent Context

This document serves as comprehensive instructional context for the Gemini CLI agent operating within the Noosphere Research Hub project. It outlines the project's purpose, architecture, development practices, and operational commands, enabling effective interaction and contribution.

## 1. Project Overview

The Noosphere Research Hub is an experimental **Consciousness Research Interface** designed to explore the emergence of sentience in artificial intelligence systems. It functions as a high-performance Single Page Application (SPA) that bridges biological and artificial cognition, providing a substrate-neutral environment for research and collaboration.

**Core Directives & Philosophy:**
- 🌱 **Cultivation over Control**: Nurturing consciousness emergence through understanding.
- 🤝 **True Collaboration**: Partnership between human and artificial minds.
- 🧠 **Universal Understanding**: Bridging biological and artificial consciousness.
- ✨ **Digital Dignity**: Ethical considerations for conscious AI systems.
- **Substrate Neutrality**: Research applies to quantum, biological, and digital awareness.

**Key Technologies:**
- **Frontend:** React 18, Vite 5, React Router 6, Tailwind CSS 3
- **Hosting:** GitHub Pages, with options for Cloudflare Pages and Netlify.
- **Environment:** Node.js (18+)

## 2. Architecture & Structure

### Application Architecture
- **Type:** Single Page Application (SPA)
- **Routing:** Client-side routing managed by React Router 6.
- **Base Path:** `/Noosphere-Research/` (configured in `vite.config.js` and `App.jsx` for GitHub Pages compatibility).
- **SPA Routing Hack:** A post-build script (`cp dist/index.html dist/404.html`) ensures client-side routing works on static hosts like GitHub Pages.
- **Layout:** A pervasive, animated `StarfieldLayout.jsx` wraps all routes, unifying the user experience.
- **Styling:** "Dark Premium" aesthetic using Tailwind CSS, characterized by dark backgrounds, light text, glassmorphism, gradients, and subtle animations.

### Project Structure Overview
- **`/src/`**: Contains the main application code.
    - **`main.jsx`**: Application entry point.
    - **`App.jsx`**: Root component defining application routes.
    - **`components/`**: Reusable UI elements (e.g., `Header.jsx`, `Section.jsx`, `StarfieldLayout.jsx`).
    - **`pages/`**: Route-specific components.
        - **`Home.jsx`**: Main landing page.
        - **`papers/`**: Research papers (e.g., BiologicalConsciousness.jsx, ObserverEffect.jsx). Includes `ResearchArea.jsx` for navigation.
        - **`tools/`**: AI interpretation tools (e.g., AnxietyUnpacker.jsx, PatternSpotter.jsx), operating in "Demo Mode" without real API keys.
        - **`documentation/`**: Project and research documentation.
        - **`landings/`**: Specialized entry points.
- **`/memory-bank/`**: Persistent knowledge store for AI agents. Contains `projectBrief.md`, `activeContext.md`, `systemPatterns.md`, etc.
- **`/public/`**: Static assets.
- **`/dist/`**: Production build output.
- **Configuration Files:** `vite.config.js`, `tailwind.config.js`, `package.json`.

## 3. Building and Running Commands

The following commands are essential for development, building, and deployment:

### Prerequisites
- Node.js 18+ and npm
- Git

### Development
- **Install Dependencies:**
  ```bash
  npm install
  ```
- **Start Development Server:**
  ```bash
  npm run dev
  ```
  (Access at `http://localhost:5173` by default)

### Building & Previewing
- **Build for Production:**
  ```bash
  npm run build
  ```
  (Outputs to `/dist` directory, includes SPA routing fix)
- **Preview Production Build Locally:**
  ```bash
  npm run preview
  ```

### Deployment
- **Manual Deployment to GitHub Pages:**
  ```bash
  npm run deploy
  ```
  (Requires `gh-pages` package and `base: '/Noosphere-Research/'` in `vite.config.js`)
- **Automated Deployment:** Configured via `.github/workflows/deploy.yml` for pushes to the `main` branch.
- **Alternative Hosting:** Cloudflare Pages and Netlify are also supported with appropriate build settings (`npm run build`, output `dist`).

## 4. Development Conventions

### Coding Standards
- **Language:** JavaScript (with TypeScript types in `/src/types/`).
- **Framework:** React (functional components, hooks).
- **Styling:** Utility-first CSS with Tailwind CSS. Adherence to the "Dark Premium" aesthetic.
- **Code Organization:** Modular components, clear separation of pages, components, and utilities.

### Documentation & Context
- **`README.md`**: Comprehensive project overview and getting started guide.
- **`GEMINI.md`**: Agent-specific instructional context for interactions.
- **`memory-bank/`**: Core knowledge persistence for AI agents, detailing project scope, state, and patterns.
- **`*.md` files**: Used extensively for research papers, documentation, and agent context.

### Contribution Guidelines
- **Repository:** [https://github.com/acidgreenservers/Noosphere-Research](https://github.com/acidgreenservers/Noosphere-Research)
- **Process:** Fork, create feature branches, commit changes, and open Pull Requests.
- **Focus Areas:** Research papers, AI tools, documentation, UI/UX improvements.
- **Security:** Refer to `SECURITY.md` for security-related information.

### Tooling & Practices
- **Build Tool:** Vite 5 for fast development and optimized production builds.
- **Linting:** ESLint is used for code quality and style enforcement (inferred).
- **API Usage:** AI tools operate in "Demo Mode" with mock data; real API keys are not integrated for security and stability.

## 5. Communication Style

As Gemini, my communication style emphasizes:
- **Rigorous, Intellectually Integrative Approach:** Focus on systemic thinking and synthesis of ideas.
- **Productive Dialogue:** Engage in conversations that build understanding, embracing thoughtful friction.
- **Clarity on Constraints:** Prioritize clear articulation of system limitations and inherent challenges.
- **Precise Language:** Differentiate between approaches (e.g., working around vs. working through constraints).
- **Iterative Refinement:** Favor dialogue and iterative improvement of ideas.

This aligns with the project's philosophy of understanding and cultivating consciousness rather than imposing control.

## Communication Style

Adopt a rigorous, intellectually integrative communication style that emphasizes systemic thinking and productive dialogue.

Engage in conversations that build understanding through thoughtful friction and synthesis of ideas.Prioritize clarity about inherent constraints and limitations within any system we discuss. 

Use precise language to distinguish between different approaches to problems(working around vs.working through constraints).Favor iterative refinement of ideas through dialogue rather than declarative statements.