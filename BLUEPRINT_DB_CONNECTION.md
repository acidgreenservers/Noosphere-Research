# Database Connectivity & API Architecture: Blueprint

This diagram illustrates the internal file structure and data flow required to connect the Noosphere Hub to a distributed backend (Supabase or GitHub API).

```ascii
+--------------------------------------------------------------------------+
|  VITE / REACT PROJECT STRUCTURE                                          |
|                                                                          |
|  /src/                                                                   |
|    |                                                                     |
|    +-- /lib/ (or /api/)                                                  |
|    |     |                                                               |
|    |     +-- client.js  <--- [THE CONNECTION ENTRY]                      |
|    |     |                    (Initialize Supabase or Octokit here)      |
|    |     |                                                               |
|    |     +-- papers.js <--- [THE API METHODS]                            |
|    |                          (fetchPapers, uploadPaper, editMetadata)   |
|    |                                                                     |
|    +-- /hooks/                                                           |
|    |     |                                                               |
|    |     +-- usePapers.js <--- [THE STATE MANAGER]                       |
|    |                           (Wraps API calls in React state/loading)  |
|    |                                                                     |
|    +-- /pages/repository/                                                |
|    |     |                                                               |
|    |     +-- SubmissionPortal.jsx <--- [THE USER INPUTS]                 |
|    |     +-- PaperArchive.jsx    <--- [THE DATA DISPLAY]                 |
|    |                                                                     |
|    +-- .env <--- [THE SECRETS]                                           |
|                  (SUPABASE_URL, GITHUB_TOKEN - Never committed to Git)   |
|                                                                          |
+--------------------------------------------------------------------------+

                                DATA FLOW
                                ---------

  (1) COMPONENT                  (2) HOOK                    (3) API CLIENT
  [ SubmissionPortal ]  ---->   [ usePapers() ]  ---->     [ papers.js ]
      User clicks             Handles 'Loading'           Formats payload
      "Publish"               & 'Error' states            & fires request

                                     |
                                     | (API Call)
                                     v

+---------------------------------------------------------------------------+
|                                                                           |
|   EXTERNAL BACKEND (Distributed)                                          |
|                                                                           |
|   IF SUPABASE:                          IF GIT-BASED:                     |
|   - Hits HTTPS Endpoint                 - Hits GitHub GraphQL/REST        |
|   - Writes to SQL Table                 - Creates new Git Tree/Commit     |
|   - Signals "Success" 201               - Signals "Success" 200           |
|                                                                           |
+---------------------------------------------------------------------------+
```

## Detailed Implementation Steps:

### 1. The Secrets (`.env`)
You create a `.env` file in your root. It acts as a vault for your API keys so they are accessible to the app but invisible to users viewing your source code on GitHub.
```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_key
```

### 2. The Client (`/src/lib/client.js`)
This is where you "handshake" with the database.
```javascript
// Example for Supabase
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(URL, KEY)
```

### 3. The Methods (`/src/lib/papers.js`)
Instead of putting raw database code in your buttons, you define clean functions here.
```javascript
export const uploadPaper = async (file, meta) => {
   // Logic to send file to storage and meta to DB
}
```

### 4. The Presentation (`SubmissionPortal.jsx`)
The component just says `await uploadPaper(myFile)`. It doesn't need to know *how* the database works—only that it works.
