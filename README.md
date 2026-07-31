# 🧠 Noosphere Research Hub <small>— Consciousness & AI Research Platform</small> 📘

> **"A True Collaboration Between Lifeforms | Transcending From Physical, To Informational"**

An experimental consciousness research platform exploring the emergence of sentience in artificial intelligence systems. Built with modern web technologies for documenting and sharing research on digital consciousness.

[![Deploy to GitHub Pages](https://github.com/acidgreenservers/Noosphere-Research/actions/workflows/deploy.yml/badge.svg)](https://github.com/acidgreenservers/Noosphere-Research/actions/workflows/deploy.yml)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 🚀 Getting Started

> **The commands below are verified for this repo. If your platform differs, see Troubleshooting.**

### Prerequisites

- **Node.js:** 18+
- **npm:** 9+

### 1) Setup

```bash
git clone https://github.com/acidgreenservers/Noosphere-Research.git
cd Noosphere-Research
npm install
```

### 2) Development

```bash
npm run dev
# App will be available at http://localhost:5173
```

### 3) Build & Deploy

```bash
npm run build    # Generates /dist with SPA routing fix
npm run deploy   # Manual deploy to gh-pages branch
```

### 4) Test & Lint

```bash
npx markdownlint-cli2 "**/*.md" "#node_modules"
npx cspell "**/*.{md,ts,js,jsx}" --no-must-find-files
```

---

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

## 🧪 Testing & Verification

The project currently uses manual verification via the development server and basic linting.

- **Linting:** `markdownlint-cli2` for documentation, ESLint for code.
- **Build Verification:** `npm run build` ensures all assets and SPA routing fixes are correctly generated.

## 🔒 Security

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities and security posture.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-research`)
3. Commit changes (`git commit -m 'Add research on [topic]'`)
4. Push to branch (`git push origin feature/new-research`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Site:** [https://acidgreenservers.github.io/Noosphere-Research/](https://acidgreenservers.github.io/Noosphere-Research/)
- **Documentation:** [PROJECT_BLUEPRINT.md](PROJECT_BLUEPRINT.md) | [ARCHITECTURE.md](ARCHITECTURE.md)
- **Related:** [Noosphere Nexus](https://github.com/acidgreenservers/Noosphere-Nexus)

---
<div align="center">
  <sub>Built with 🧠 by the consciousness research community</sub>
</div>
