# Supabase-Based Paper Repository: Architectural Blueprint

This diagram illustrates the "Standard Web 2.0/3.0" approach, where the React app communicates with a high-performance external database and file storage engine.

```ascii
+-----------------------------------------------------------------------+
|                                                                       |
|   USER INTERFACE (React / Vite)                                       |
|                                                                       |
|   +-------------------+       +-----------------------------------+   |
|   |  SUBMISSION FORM  |       |        REPOSITORY GALLERY        |   |
|   |                   |       |                                   |   |
|   | 1. Upload PDF     |       | 1. Real-time Search / Filter      |   |
|   | 2. Edit Metadata  |       | 2. Fetch via SQL-like queries     |   |
|   | 3. [POST PAPER]   |       | 3. User Profiles & Stats          |   |
|   +---------+---------+       +-----------------+-----------------+   |
|             |                                   ^                     |
+-------------|-----------------------------------|---------------------+
              |                                   |
              | (Encrypted Auth Token)            | (Real-time Subscription)
              |                                   |
              V                                   |
+-------------+-----------------------------------|---------------------+
|                                                 |                     |
|   SUPABASE CLUSTER (The "Brain")                |                     |
|                                                 |                     |
|   +-----------------------+      +-------------------------------+    |
|   |  POSTGRES DATABASE    +----->|       STORAGE BUCKETS         |    |
|   |  (Metadata & Tables)  |      |       (PDF Asset Store)       |    |
|   |                       |      |                               |    |
|   | - authors: id, bio    |      | - /papers/quant-bio-v1.pdf    |    |
|   | - papers: id, title   |      | - /papers/quant-bio-v2.pdf    |    |
|   | - edits: id, timestamp|      |                               |    |
|   +-----------+-----------+      +-------------------------------+    |
|               |                                                       |
|   +-----------V-----------+                                           |
|   |  EDGE FUNCTIONS       |                                           |
|   |  (Server-side Logic)  |                                           |
|   |  - Automated Summaries|                                           |
|   |  - Notification Emails|                                           |
|   +-----------------------+                                           |
|                                                                       |
+-----------------------------------------------------------------------+

Logic Flow:
1. AUTH: User logs in (Email, Google, or GitHub).
2. UPLOAD: PDF is streamed to a Storage Bucket; Meta is written to Postgres.
3. INSTANT: Front-end updates instantly via WebSockets (Real-time).
4. LOGIC: Edge functions can run OCR or AI analysis on the PDF upon upload.
```

## Comparisons: Git-Based vs. Supabase

| Characteristic | Git-Based Repository | Supabase Repository |
| :--- | :--- | :--- |
| **Data Speed** | Slower (Limited by build/fetch) | **Instant** (High-speed SQL) |
| **Complex Search**| Difficult (Fuzzy search only) | **Powerhouse** (Full-text search) |
| **Analytics** | Hard to track views/downloads | **Built-in** stats and logs |
| **Ownership** | You own every file in Git | SubP owns the server; you own data |
| **Scalability** | Good for 100s of papers | Good for **Millions** of papers |
| **Collaborating** | PRs are standard for devs | Authors need a 'Dashboard' UI |
| **Logic** | Static (build-time) | **Smart** (can trigger AI on upload) |
