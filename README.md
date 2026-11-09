# The Unbounded Leadership Co. — Executive Operating Architecture

Global leadership consultancy founded by Suchita Sancheti. We help founders, CEOs, and leadership teams address founder dependency, decision bottlenecks, and organizational misalignment through leadership architecture.

---

## ⚠️ CRITICAL SECURITY NOTICE: IMMEDIATE SECRET ROTATION REQUIRED

> **WARNING FOR PRODUCTION DEPLOYMENT & REPOSITORY MAINTAINERS:**
>
> If any API key, service token, or credential was previously committed as a string literal anywhere in the source tree (including historical commits in git history, older config files, or build artifacts), **that value must be treated as permanently compromised**.
>
> Git history preserves all previous file snapshots. Simply deleting a secret from a file or editing a line does **NOT** revoke the secret from commit history.
>
> ### Mandatory Actions Prior to Public / Production Launch:
> 1. **Rotate the Gemini API Key**: Immediately revoke any previously generated Google Gemini API keys in the [Google AI Studio Console](https://aistudio.google.com/app/apikey) and generate a fresh key.
> 2. **Rotate the Resend API Key**: Revoke and regenerate any Resend API keys in the [Resend Console](https://resend.com/api-keys).
> 3. **Rotate the Bing IndexNow Key**: Generate a new IndexNow key in the [Bing Webmaster Tools Console](https://www.bing.com/webmasters).
> 4. **Rotate Portal Clearance Keys**: Configure unique, high-entropy passkeys via the `PORTAL_CLEARANCE_KEYS` environment variable.
> 5. **Audit Git History**: If this repository is ever made public or transferred, use tools such as `git filter-repo` or BFG Repo-Cleaner to scrub any historical commits, or publish from a clean fresh repository.

---

## 🔒 Security Architecture & Secret Management

1. **Zero Client-Side Secret Exposure**:
   - `GEMINI_API_KEY` is maintained **server-side only** inside `server.js` or backend environment variables.
   - Vite `define` no longer inlines private API keys into client-side JavaScript bundles.
   - The browser communicates via `/api/ai/*` server-side endpoints and utilizes resilient in-app executive fallbacks if offline.
2. **Environment Variable Separation**:
   - Server-only secrets (`GEMINI_API_KEY`, `RESEND_API_KEY`, `BING_INDEXNOW_KEY`, `PORTAL_CLEARANCE_KEYS`) are never prefixed with `VITE_`.
   - Only public-safe metadata (`VITE_ADMIN_EMAIL`, `VITE_APP_URL`) utilizes the `VITE_` prefix.
   - `.env` and all credential patterns are strictly excluded in `.gitignore`.
   - A sanitized `.env.example` template is provided for all deployment environments.
3. **Log & Response Sanitization**:
   - Error handlers and console logs strip secret tokens, sensitive payloads, and headers.
   - API endpoints return status flags and verified text without echoing back secret credentials.

---

## 🛠️ Development & Deployment Commands

```bash
# Install dependencies
npm install

# Run local development server (port 3000)
npm run dev

# Build production bundle and pre-render static directory fallbacks
npm run build

# Start production zero-dependency server (port 3000 or process.env.PORT)
npm start

# Run TypeScript linter
npm run lint
```

---

## 🌐 Deployment Targets

- **Hostinger / LiteSpeed / Apache**: Upload contents of `dist/` or `hostinger-build.zip`. The included `.htaccess` and pre-rendered subdirectories provide native HTTP 200 responses on all 16 primary routes without 404 errors.
- **Google Cloud Run / Node.js**: Executes `npm start` which runs `server.js` with zero external dependencies and built-in SPA fallbacks.
- **GitHub Pages / Netlify**: `.nojekyll`, `CNAME`, `404.html`, and `_redirects` are generated automatically during `npm run build`.
