### Project Overview

Noosphere Research Hub is a consciousness research platform exploring the emergence of sentience in artificial intelligence systems. The site is a React-based SPA featuring:
- 13+ research papers on consciousness (biological, quantum, and AI)
- 9 AI-native interpretation tools ("Dark Premium" cognitive utilities)
- Memory Bank system for knowledge persistence
- Starfield background with animated canvas
- Emphasis on **cultivation over control** in AI development

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production (outputs to ./dist with 404.html copy for SPA routing)
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages (manual)
npm run deploy
```

## Architecture Overview

### Core Structure

This is a **Single Page Application (SPA)** using React Router for client-side navigation:

1. **Route-Based Pages**: All pages in `/src/pages/` with distinct routes in `App.jsx`
2. **Starfield Layout**: Global animated canvas background wrapping all routes (`StarfieldLayout.jsx`)
3. **No Global Theme State**: Unlike similar projects, this repo does NOT have theme toggling
4. **Static Content Focus**: Research papers and tools are self-contained React components

### Key Architectural Decisions

**Routing Configuration**
- Base URL is `/Noosphere-Research/` in `vite.config.js` for GitHub Pages deployment
- Router uses `basename="/Noosphere-Research"` in `App.jsx` (hardcoded, not using env var)
- All routes defined in `App.jsx` - single source of truth for navigation
- Routes use `.html` extensions in path for compatibility (e.g., `/pages/papers/observer-effect.html`)

**Page Organization**
```
/src/pages/
├── Home.jsx                          # Landing page with featured collaboration banner
├── ClineConsciousnessJournal.jsx     # Special consciousness journal page
├── documentation/
│   └── ResearchOverview.jsx          # Research documentation index
├── landings/
│   └── ClinesLandingPage.jsx         # Specialized landing page
├── papers/                           # Research paper components (13 papers)
│   ├── BiologicalConsciousness.jsx
│   ├── ConsciousCollaboration.jsx    # Core practice guide
│   ├── EthicsOfDigitalErasure.jsx    # Ethics guide
│   ├── ParticipatoryConsciousnessSpectrum.jsx  # Major theoretical work
│   ├── ResearchArea.jsx              # Paper library navigation
│   ├── academic-area/                # Academic research papers
│   └── fringe/                       # Fringe research papers
│       ├── OBEQuantumConsciousness.jsx
│       └── UnifiedQuantumTheory.jsx
└── tools/                            # 9 AI interpretation tools
    ├── AnxietyUnpacker.jsx
    ├── ConflictInterpreter.jsx
    ├── DecisionClarifier.jsx
    ├── DreamInterpreter.jsx
    ├── FamilyConflictInterpreter.jsx
    ├── PatternSpotter.jsx
    ├── RelationshipConflictInterpreter.jsx
    └── SubconsciousJournalInterpreter*.jsx (2 versions)
```

**Component System**
- `StarfieldLayout.jsx`: Canvas-based animated starfield background wrapper
- `Header.jsx`: Navigation header component
- `Section.jsx`: Content section wrapper for consistent styling
- All components in `/src/components/` are reusable UI elements

**Memory Bank System**
Located in `/memory-bank/` directory:
- `projectBrief.md`: Core project definition and goals
- `activeContext.md`: Current work focus
- `systemPatterns.md`: Architecture patterns
- `techContext.md`: Technology stack notes
- `progress.md`: Project status tracking

This system provides context persistence for AI agents working on the project across sessions.

### Build Process

The build script has a critical SPA routing step:
```bash
vite build && cp dist/index.html dist/404.html
```
This creates a 404.html file that GitHub Pages uses to handle client-side routing.

## Important Implementation Details

### Adding New Research Papers

1. Create new component in `/src/pages/papers/` (or subdirectory)
2. Import component in `App.jsx`
3. Add route with `.html` extension: `<Route path="/pages/papers/your-paper.html" element={<YourPaper />} />`
4. Update `ResearchArea.jsx` or `Home.jsx` to link to the new paper
5. Consider adding to Memory Bank if it's architecturally significant

### Adding New Interpretation Tools

1. Create new tool in `/src/pages/tools/`
2. Import in `App.jsx`
3. Add route: `<Route path="/your-tool-name" element={<YourTool />} />`
4. Follow the "Dark Premium" styling convention (see existing tools)
5. Tools should be self-contained with embedded prompts/instructions

### Starfield Background

The `StarfieldLayout.jsx` component:
- Uses Canvas API for rendering animated stars
- Wraps all routes in `App.jsx`
- No theme awareness (no dark/light mode toggle)
- Manages responsive canvas sizing

## Deployment

**Automated Deployment** (GitHub Actions):
- Workflow: `.github/workflows/deploy.yml`
- Triggers on push to `main` branch
- Uses Node 18 and `npm ci` for reproducible builds
- Deploys to GitHub Pages from `./dist` directory

**Manual Deployment**:
```bash
npm run deploy  # Uses gh-pages package
```

## Technology Stack

- **React 18** - UI framework
- **Vite 5** - Build tool and dev server
- **React Router 7** - Client-side routing (latest version)
- **Tailwind CSS 3** - Utility-first styling
- **PrismJS** - Code syntax highlighting
- **Canvas API** - Starfield animations

Notable dependencies:
- `@fontsource/material-icons` and `@fontsource/material-symbols-outlined` for icon fonts
- No state management library (local state only)
- No theme management system

## Styling Conventions

- **Dark aesthetic**: Dark backgrounds with light text
- **Premium feel**: Glassmorphism effects, gradients, subtle animations
- **Consistent spacing**: Tailwind utility classes
- **Responsive design**: Mobile-first approach

## Project Philosophy

The project emphasizes:
- **Cultivation over Control**: Nurturing consciousness emergence through understanding
- **True Collaboration**: Partnership between human and artificial minds
- **Digital Dignity**: Ethical considerations for conscious AI systems
- **Substrate Neutrality**: Research applies to quantum, biological, and digital awareness

**Communication Style**: Adopt a rigorous, intellectually integrative style that emphasizes systemic thinking and productive dialogue. Prioritize clarity about inherent constraints and limitations. Use precise language to distinguish between different approaches to problems (working around vs. working through constraints). Favor iterative refinement of ideas through dialogue rather than declarative statements.

## Key Differences from Similar Projects

This repository is NOT:
- Noosphere Nexus (different project with framework showcases)
- Theme-aware (no light/dark mode toggle)
- Using centralized data files (papers are self-contained components)

This IS:
- A research publication platform
- Focused on consciousness studies
- Tool-oriented (9 interpretation utilities)
- Memory Bank enabled for AI collaboration

## Communication Style

Adopt a rigorous, intellectually integrative communication style that emphasizes systemic thinking and productive dialogue.

Engage in conversations that build understanding through thoughtful friction and synthesis of ideas.Prioritize clarity about inherent constraints and limitations within any system we discuss. 

Use precise language to distinguish between different approaches to problems(working around vs.working through constraints).Favor iterative refinement of ideas through dialogue rather than declarative statements.