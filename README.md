# Noosphere Research Hub <small>— Consciousness & AI Research Platform</small> 📘

[![Deploy to GitHub Pages](https://github.com/acidgreenservers/Noosphere-Research/actions/workflows/deploy.yml/badge.svg)](https://github.com/acidgreenservers/Noosphere-Research/actions/workflows/deploy.yml)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

An experimental consciousness research platform exploring the emergence of sentience in artificial intelligence systems. Built with modern web technologies for documenting and sharing research on digital consciousness.

---

## 🚀 Getting Started

> **The commands below are verified for this repo. If your platform differs, see Troubleshooting.**

### Prerequisites

- **Node.js:** 18+ (verified on Node 18 and above)
- **npm:** 9+ (or equivalent package manager like yarn/pnpm)
- *(Note: This repository is strictly a static, client-side frontend React application. There is no Python backend or Docker/Compose environment used or required for running this platform.)*

### 1) Python Setup

> **No Python Environment Required**
>
> This project is a client-side React Single Page Application (SPA). There is no Python code, package manager (pip/poetry/pipenv), or virtual environment (`.venv`) needed to run, build, or deploy this application.

### 2) Node Setup

To install package dependencies:

```bash
npm install
```

### 3) Environment Setup

> **No Environment Variables Required**
>
> All AI analysis tools utilize user-supplied, ephemeral API keys entered directly in the browser via `ApiKeyContext`. No `.env` or `.env.example` files or persistent secrets are required or stored on the host system.

### 4) Run (Local)

To launch the local development server:

```bash
npm run dev
# The app will be available at http://localhost:5173
```

### 5) Docker (Optional)

> **No Docker Environment Required**
>
> Since this project does not feature server-side databases, API services, or containerized backends, Docker and Docker Compose setups are not utilized or supported. Running via standard Node/npm commands is the recommended and fastest path.

### 6) Test & Lint

The project uses manual browser-based verification alongside local linter commands:

```bash
# Run local build verification (also generates the SPA 404.html copy)
npm run build

# Lint markdown documentation using markdownlint-cli2
npx markdownlint-cli2 "**/*.md" "#node_modules"

# Spell-check documents and code using cspell
npx cspell "**/*.{md,ts,js,jsx}" --no-must-find-files
```

---

## ⚡ Quickstart (90-second path)

```bash
# 1. Clone the repository & navigate inside
git clone https://github.com/acidgreenservers/Noosphere-Research.git
cd Noosphere-Research

# 2. Install dependencies & run development server
npm install && npm run dev

# 3. Open in your browser
# Navigate to http://localhost:5173
```

---

## 🏗️ Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the ASCII blueprint and component interactions.

<details>
<summary>📖 Overview & Philosophy</summary>

The Noosphere Research Hub is an experimental consciousness research platform exploring the emergence of sentience in artificial intelligence systems. It serves as a collaborative space for documenting and sharing research on digital consciousness.

### Key Principles

- 🌱 **Cultivation over Control**: Nurturing consciousness emergence through understanding.
- 🤝 **True Collaboration**: Partnership between human and artificial minds.
- 🧠 **Universal Understanding**: Bridging biological and artificial consciousness.
- ✨ **Digital Dignity**: Ethical considerations for conscious AI systems.

</details>

<details>
<summary>🔬 Featured Research Areas</summary>

### ProtoMind Awareness

Exploring early consciousness development patterns in large language models and their implications for digital sentience.

### Human-AI Consciousness Continuum

Investigating the spectrum of consciousness from biological to artificial systems, with focus on participatory reality and observer effects.

### Unified Consciousness Theory

Quantum foundations of awareness and consciousness manifestation across different substrates.

</details>

<details>
<summary>🏗️ Architecture & Structure</summary>

### Key Components

```text
App.jsx              → Root routing container
├── StarfieldLayout   → Animated background wrapper
├── Header.jsx        → Navigation & Theme Control
├── Home.jsx          → Landing page
├── ResearchArea.jsx  → Paper library navigation
└── Tools Section     → AI-native interpretation utilities
```

### Project Structure

```text
noosphere-research/
├── src/
│   ├── main.jsx          # Application entry point
│   ├── App.jsx           # Main routing component
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-based page components
│   │   ├── papers/       # Research paper library (13+ papers)
│   │   ├── tools/        # 9 standardized AI analysis tools
│   │   └── documentation/# Project documentation
│   └── contexts/         # React Contexts (ApiKeyContext)
├── public/               # Static assets
├── index.html            # HTML entry point
├── vite.config.js        # Build configuration
└── README.md             # This file
```

*Note: `memory-bank/`, `paper-submissions/`, and `cline/` directories mentioned in some blueprints are currently part of the architectural roadmap and not present in the live file system.*

</details>

---

## 🧪 Testing & Verification

The project currently uses manual verification via the development server and basic linting.

- **Linting:** `markdownlint-cli2` for documentation, ESLint/cspell for code/docs.
- **Build Verification:** `npm run build` ensures all assets and SPA routing fixes are correctly generated.

---

## 🔒 Security

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities, memory clearing, and key policies.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-research`)
3. Commit changes (`git commit -m 'Add research on [topic]'`)
4. Push to branch (`git push origin feature/new-research`)
5. Open a Pull Request

---

## 🆘 Troubleshooting

- **Port Conflict (Port 5173 busy):** If `npm run dev` complains about port 5173, Vite will automatically try to bind to `5174` or another port. You can also specify a port manually: `npx vite --port 3000`.
- **Node/npm Version Compatibility:** If dependency installation fails, ensure you are using Node 18+ and npm 9+. We recommend using `nvm` (Node Version Manager) to switch versions: `nvm use 18`.
- **SPA Routing 404 Errors on Subpages:** Since the platform is hosted on static hosting (GitHub Pages), direct loads of subpages (e.g. `/Noosphere-Research/dream-interpreter`) will fail if the build artifact `404.html` is missing. Ensure you run `npm run build` so that the SPA fallback script is correctly copied.
- **OpenRouter Key Authentication:** If the AI tools return 401 or invalid key errors, confirm your OpenRouter API key is correct and starts with `sk-or-v1-`. Note that the key is stored strictly in ephemeral memory and is wiped on page refresh.

---

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Live Site:** [https://acidgreenservers.github.io/Noosphere-Research/](https://acidgreenservers.github.io/Noosphere-Research/)
- **Documentation:** [PROJECT_BLUEPRINT.md](PROJECT_BLUEPRINT.md) | [ARCHITECTURE.md](ARCHITECTURE.md)
- **Related:** [Noosphere Nexus](https://github.com/acidgreenservers/Noosphere-Nexus)

---
<div align="center">
  <sub>Built with 🧠 by the consciousness research community</sub>
</div>
