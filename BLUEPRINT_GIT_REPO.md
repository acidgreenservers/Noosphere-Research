# Git-Based Paper Repository: Architectural Blueprint

This diagram illustrates how a static React app can behave like a dynamic repository (arXiv-style) by using GitHub itself as the backend storage and versioning engine.

```ascii
+-----------------------------------------------------------------------+
|                                                                       |
|   USER INTERFACE (React / Vite)                                       |
|                                                                       |
|   +-------------------+       +-----------------------------------+   |
|   |  SUBMISSION FORM  |       |        REPOSITORY GALLERY        |   |
|   |                   |       |                                   |   |
|   | 1. Upload PDF     |       | 1. Scans /papers/ Directory       |   |
|   | 2. Edit Metadata  |       | 2. Renders "ArXiv" style cards    |   |
|   | 3. [POST PAPER]   |       | 3. Handles Versioning Display    |   |
|   +---------+---------+       +-----------------+-----------------+   |
|             |                                   ^                     |
+-------------|-----------------------------------|---------------------+
              |                                   |
              | (Auth via GitHub App/PAT)         | (Build-time or Client-side Fetch)
              |                                   |
              V                                   |
+-------------+-----------------------------------|---------------------+
|                                                 |                     |
|   GITHUB REPOSITORY (The "Backend")             |                     |
|                                                 |                     |
|   /papers/                                      |                     |
|     |                                           |                     |
|     +-- [paper-id-v1]/                          |                     |
|     |      +-- metadata.json  <-----------------+                     |
|     |      +-- document.pdf                                           |
|     |                                                                 |
|     +-- [paper-id-v2]/                                                |
|            +-- metadata.json (New Title/Abstract)                     |
|            +-- document.pdf                                           |
|                                                                       |
|   +---------------------------------------------------------------+   |
|   |  GIT HISTORY (The Accountability Layer)                       |   |
|   |  - Every 'Edit' is a Commit                                   |   |
|   |  - Every 'Peer Review' is a Pull Request                      |   |
|   +---------------------------------------------------------------+   |
|                                                                       |
+-----------------------------------------------------------------------+

Logic Flow:
1. INGESTION: User fills out form. React App calls GitHub API (octokit).
2. PERSISTENCE: GitHub API creates a new branch/commit with the files.
3. TRIGGER: GitHub Actions notices new files and re-builds the site.
4. DELIVERY: The site now includes the new paper in its JSON index.
```

## Why this works for a Research Hub:
1. **Verifiable History:** Science requires a paper trail. Git provides a cryptographic history of every edit and submission.
2. **Low Maintenance:** You don't need to pay for a database or manage server security.
3. **Collaboration:** Other researchers can submit papers via Pull Requests directly if they are technical, or via your UI if they aren't.
4. **Permanent Links:** Every file in GitHub has a raw URL that never changes unless the file is deleted.
