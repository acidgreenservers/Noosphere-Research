# Scribe's Journal 📘

Critical learnings and discoveries made during documentation passes.

---

## 2026-09-01 - [Markdown Linting Standard & SPA Routing Verification Pass]

**Observation:** Executing `markdownlint-cli2` across all documentation files identified lint violations in `CLAUDE.md`, `PROJECT_BLUEPRINT.md`, and `ROADMAP.md` (specifically MD036 emphasis-as-heading, MD040 missing fenced code language, MD041 missing first-line h1 header, MD024 duplicate headings, and MD051 broken link fragments).

**Learning:** Keeping repository-wide documentation clean and compliant requires active lint checks against `.markdownlint.json` rules. Standardizing headings and link anchors prevents silent breakage in doc renderers and static site generators.

**Action:** Resolved all markdown lint issues in `CLAUDE.md`, `PROJECT_BLUEPRINT.md`, and `ROADMAP.md`. Verified zero errors output from `npx markdownlint-cli2 "**/*.md" "#node_modules"` and verified `npm run build` execution.

## 2026-07-02 - [Scribe Full Technical Surface & Command Pass]

**Observation:** Analyzed the repository's artifacts and confirmed that the project is purely a client-side Single Page Application (SPA) built using React 18, Vite 5, React Router 7, and Tailwind CSS 3. There is no Python backend, virtual environments, Docker files, or Docker Compose setups. Build command is `npm run build` which generates static assets in `dist/` and copies `index.html` to `404.html` to support client-side SPA routing on GitHub Pages.

**Learning:** When writing "Getting Started" guides, a high-fidelity documentation policy requires highlighting that Python and Docker are *not* present or supported in this specific repository. This eliminates newcomer guesswork. Additionally, we found that all linters and code checkers (such as `markdownlint-cli2` and `cspell`) are node-based tools rather than python/python-based tools.

**Action:** Updated `README.md`, `QUICKSTART.md`, `ARCHITECTURE.md`, and `SECURITY.md` to cleanly document prerequisites, node/npm version constraints, clear up stale placeholders (e.g., Troubleshooting), and explicitly state the absence of Python/Docker setups.

## 2026-07-01 - [Scribe Full Documentation Pass]

**Observation:** Discovered broken links in `ClinesLandingPage.jsx` pointing to a non-existent `cline/` directory. Confirmed that `memory-bank/` and `paper-submissions/` are also non-existent in the live repo but referenced in blueprints.

**Learning:** It is crucial to manage expectations for newcomers by explicitly marking these directories as "planned" or "roadmap" items in the README to avoid confusion.

**Action:** Updated `README.md` to include a clear note about these non-existent directories. Refreshed all core documentation (`README`, `QUICKSTART`, `ARCHITECTURE`, `SECURITY`) to be production-ready and consistent with the actual codebase.

## 2025-05-22 - [Doc-System Discrepancy]

**Observation:** The existing `PROJECT_BLUEPRINT.md` and some AI-facing guides (`CLAUDE.md`, `GEMINI.md`) referenced `memory-bank/` and `paper-submissions/` directories. However, these directories were not present in the actual repository file system.

**Learning:** It appears these are "planned" or "architectural intent" directories rather than current implementations. Communicating this distinction is vital for newcomers to avoid confusion when cloning the repo.

**Action:** Updated `README.md` to explicitly note that these directories are part of the roadmap and not yet present in the live system.

## 2025-05-22 - [Ephemeral Keys Policy]

**Observation:** Interactive tools in `src/pages/tools/` utilize an ephemeral OpenRouter API key provided by the user via `ApiKeyContext`.

**Learning:** Security is maintained by strictly avoiding any persistence (localStorage/sessionStorage). The app relies on React state which clears on refresh.

**Action:** Documented this behavior in `SECURITY.md` and `ARCHITECTURE.md` to ensure future developers maintain this strict no-persistence rule.
