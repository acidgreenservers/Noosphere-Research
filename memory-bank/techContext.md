# Technology Context & Dependencies
# Technical Context: Noosphere Research Hub

This document defines the technical environment, dependencies, and infrastructure constraints of the project.

## 🛠️ Core Technology Stack

### Frontend Framework
- **React 18**: The foundational UI library.
- **Vite**: Ultra-fast build tool and development server.
- **React Router Dom 6**: Managing SPA navigation and clean URL routing.

### Styling & Animation
- **Tailwind CSS**: Utility-first styling with responsive design primitives.
- **Material Design 3 (MD3)**: Guidelines for spacing, elevation, and interactive states.
- **HTML5 Canvas**: Powers the high-performance animated starfield background.

### Research & Data
- **MathJax 3**: Rendering high-fidelity LaTeX equations for consciousness papers.
- **Prism.js**: Code syntax highlighting for technical documentation.
- **Markdown**: The primary storage format for raw research submissions.

## 📁 Development Infrastructure

### Deployment Strategy: Strict Static Hosting
- **Primary Hosting**: GitHub Pages.
- **CI/CD**: Automatic deployment via GitHub Actions (potential) or manual production builds.
- **Removed Infrastructure**: Deleted `nginx.conf` and Docker-related setup to maintain a lean, 100% static repository.

### Key Architectural Files (The Blueprints)
- **`PROJECT_BLUEPRINT.md`**: The master ASCII map of the system.
- **`ROADMAP.md`**: Strategic development phases for the Lexicon and Vault.
- **`BLUEPRINT_GIT_REPO.md`**: Design for Git-as-a-backend storage.
- **`BLUEPRINT_SUPABASE_REPO.md`**: Design for Supabase-based metadata management.
- **`BLUEPRINT_DB_CONNECTION.md`**: Technical connectivity logic.

## 🚉 Development Constraints

### 1. SPA Navigation
All internal links must use the `react-router-dom` `<Link>` component to prevent full page reloads, as a reload will reset the global background canvas.

### 2. Environment Variables
- `VITE_OPENROUTER_API_KEY`: Required for AI Tool functionality in local development.
- Tokens for GitHub/Supabase integration (future state) must be prefixed with `VITE_`.

### 3. Subdirectory Support
The project is configured to run in a subdirectory (e.g., `/Noosphere-Research`) on GitHub Pages. This requires:
- `base: '/Noosphere-Research/'` in `vite.config.js`.
- `<Router basename="/Noosphere-Research">` in `App.jsx`.

---

*This technical context ensures all developers and AI collaborators operate within the established constraints of the Noosphere ecosystem.*

### Development Scripts
```json
{
  "scripts": {
    "dev": "vite --open --host",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && npm run deploy"
  }
}
```

### Recommended IDE Setup
- **Primary IDE**: VS Code / VSCodium with React/JSX extensions
- **Extensions**: ES7+, Tailwind CSS IntelliSense, Auto Rename Tag, Prettier
- **Terminal**: Git Bash or native terminal with Git integration

## Dependencies Overview

### Production Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "@vitejs/plugin-react": "^4.0.0"
}
```

### Development Dependencies
```json
{
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.24",
  "tailwindcss": "^3.3.2",
  "vite": "^5.4.21"
}
```

### External CDNs (No Local Dependencies)
- **Tailwind CSS**: Latest stable version
- **MathJax**: v3.2.x for equation rendering
- **Prism.js**: v1.29.0 for syntax highlighting
- **Google Fonts**: Material Icons and Symbols fonts

## Configuration Files

### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Noosphere-Research/',
  plugins: [react()],
})
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... custom color palette
        }
      }
    },
  },
  plugins: [],
}
```

### PostCSS Configuration
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Technical Constraints

### Browser Compatibility
- **Target Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **ES Module Support**: Modern browser features assumed
- **CSS Grid/Flexbox**: Core layout technologies
- **ES6+ Features**: Arrow functions, destructuring, async/await

### Performance Constraints
- **Bundle Size Target**: Under 1MB compressed JavaScript
- **Image Optimization**: WebP formats with responsive loading
- **Caching Strategy**: Aggressive caching for static assets
- **Core Web Vitals**: FCP < 2.5s, LCP < 4.0s

### Deployment Constraints
- **GitHub Pages Limitations**: No server-side rendering, limited API usage
- **Single Page Application**: Client-side routing challenges
- **Security Restrictions**: Content Security Policy compliance
- **Update Frequency**: Manual deployment to gh-pages branch

### Content Constraints
- **File Size Limits**: GitHub repository size < 10GB
- **Markdown Processing**: Client-side only, no server rendering
- **External Links**: No CORS restrictions for documentation access
- **Accessibility**: WCAG 2.1 AA compliance targets

## Development Workflow Patterns

### Git Strategy
- **Main Branch**: Production-ready code
- **Development Branch**: Feature integration
- **Feature Branches**: Individual feature development
- **Release Process**: Versioned releases with deployment scripts

### Code Organization
- **Component Structure**: Feature-based organization in src/
- **Styling Approach**: Utility-first with component-specific overrides
- **Asset Management**: Centralized in public/ folder
- **Configuration**: Root-level config files with clear naming

### Quality Assurance
- **Linting**: ESLint with React-specific rules
- **Formatting**: Prettier with consistent code style
- **Type Checking**: Potential TypeScript migration path
- **Testing Strategy**: Component testing with React Testing Library

## Future Technology Migration Paths

### Potential Enhancements
- **TypeScript Migration**: Gradual adoption for better type safety
- **Next.js Migration**: If server-side features become necessary
- **CMS Integration**: For dynamic content management
- **Internationalization**: Multi-language support preparation

### Scaling Considerations
- **Component Library**: Extracted design system for consistency
- **State Management**: Context API or Redux for complex state
- **Performance Monitoring**: Bundle size and runtime metrics
- **Accessibility Audit**: Comprehensive WCAG compliance

## Environment Variables

### Build-Time Variables
- **BASE_URL**: Deployment base path (configured in Vite)
- **DEV_MODE**: Development vs production flags
- **API_ENDPOINTS**: External service URLs

### Configuration Management
- **Environment Specific**: Different configs for dev/staging/prod
- **Secret Management**: GitHub repository secrets for deployments
- **Build Configuration**: Vite environment variables

## Security Considerations

### Content Security Policy
```javascript
// Example CSP for secure external resource loading
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data:;
```

### Vulnerability Management
- **Dependency Updates**: Regular npm audit and updates
- **Bundle Analysis**: Identification of large or vulnerable packages
- **External Scripts**: Trusted CDNs with integrity hashes
- **Code Review**: Security-focused code review processes

## Maintenance & Operations

### Monitoring & Debugging
- **Console Logging**: Structured logging for troubleshooting
- **Performance Metrics**: Core Web Vitals monitoring
- **Error Boundaries**: React error boundary implementation
- **User Feedback**: Issue reporting mechanisms

### Backup & Recovery
- **Git History**: Complete code version control
- **Deployment Rollback**: Quick reversion to previous versions
- **Content Backup**: Regular exports of research papers
- **Configuration Backup**: Infrastructure as code approach

This technical foundation provides a robust, scalable platform that can evolve with the project's research objectives while maintaining stability and performance.
