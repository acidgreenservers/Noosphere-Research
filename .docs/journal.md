# Scribe's Journal 📘

Critical learnings and discoveries made during documentation passes.

---

## 2025-05-22 - [Doc-System Discrepancy]
**Observation:** The existing `PROJECT_BLUEPRINT.md` and some AI-facing guides (`CLAUDE.md`, `GEMINI.md`) referenced `memory-bank/` and `paper-submissions/` directories. However, these directories were not present in the actual repository file system.

**Learning:** It appears these are "planned" or "architectural intent" directories rather than current implementations. Communicating this distinction is vital for newcomers to avoid confusion when cloning the repo.

**Action:** Updated `README.md` to explicitly note that these directories are part of the roadmap and not yet present in the live system.

## 2025-05-22 - [Ephemeral Keys Policy]
**Observation:** Interactive tools in `src/pages/tools/` utilize an ephemeral OpenRouter API key provided by the user via `ApiKeyContext`.

**Learning:** Security is maintained by strictly avoiding any persistence (localStorage/sessionStorage). The app relies on React state which clears on refresh.

**Action:** Documented this behavior in `SECURITY.md` and `ARCHITECTURE.md` to ensure future developers maintain this strict no-persistence rule.
