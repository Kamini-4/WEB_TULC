# The Unbounded Leadership Co. — Institutional System Architecture

## Core Architectural Directives

### 1. Executive Newsletters & Value-Driven Dispatches (Simon Sinek, Deepali Vyas & Brené Brown Tone)
- **1-on-1 Conversational Letters from Suchita Sancheti**: Each dispatch features an intimate, heartfelt opening from Suchita's desk painting the real-time picture of boardroom fatigue, late-night office hours, and the burden of leadership. Validates their human reality without corporate jargon or taboo words.
- **The Big Questions Answered**: Explicitly highlights and resolves the fundamental questions keeping leaders awake (e.g. *Why does my team freeze without permission?*, *Why does scaling feel exhausting?*, *How do I transition from indispensable hero to sovereign architect?*).
- **Featured Book Frameworks**: Excerpts and core principles drawn directly from Suchita Sancheti's book: *"Sovereign Architecture: The Modern Leader's Guide to Building an Enduring, Self-Governing Enterprise"*.
- **AEO & GEO Optimization**:
  - Direct Executive Answer node (`.article-direct-answer`) optimized for Google AI Overviews, Perplexity, Gemini, and ChatGPT citation.
  - Dynamic Schema.org `TechArticle` and `FAQPage` JSON-LD injection via `SEOHead` for rich search engine snippets.
  - Real-world FAQ Q&A accordion addressing high-intent executive search queries.
- **High-Trust Services Conviction**: Concludes with a warm, reassuring invitation ("You Do Not Have to Carry This Alone. We Re-Architect Your Operating System in 90 Days"), conveying deep faith in TULC's services and guiding them into private dialogue.

### 2. Sovereign Header & Landing Page Layout
- **Clean Executive Header**: Removed direct phone numbers and email ribbons from the top header navigation and mobile drawer for an uncluttered, high-prestige presence.
- **Center-Oriented Landing Page**: Centered the hero section typography, including institutional kicker, official crest seal, primary H1 headline, sub-headline, strategic insight, dedicated 90-day operating system statement box, CTA buttons, and boardroom privilege trust seals.
- **Founder Authority & Photo**: Locked executive insignia/portrait in the About section with verified authority badges; removed drag-and-drop file uploaders or client-side overrides.
- **Icon-Only Back Navigation**: Subpage back navigation across the site uses clean icon-only arrow buttons (`<ArrowLeft className="w-5 h-5" />`), retaining accessibility labels.

### 3. Frictionless & Deposit-Free Inquiry Protocol
- **Zero Deposit Fees for Inquiries**: Completely eliminated all deposit fees, paywalls, and retainer reservation charges from the Confidential Inquiry docket (`ConfidentialInquiry.tsx`) and the Rapid Diagnostic Assessment (`SimpleNeedsTest.tsx`):
  - Removed the `$500` "Deposit" button and "or Lock Retainer ($500)" copy from the priority scheduling banner in `ConfidentialInquiry.tsx`.
  - Removed the `$2,500` "Lock Retainer" payment button from the bottom of the inquiry form, replacing it with dual direct paths: **"Submit Confidential Inquiry"** (direct transmission) and **"Book on Calendly (Direct)"** (instant calendar reservation) — both 100% complimentary.
  - Replaced the `$2,500` Forensic Audit Deposit button in `SimpleNeedsTest.tsx` with a direct, zero-fee **"Request Forensic Audit · Free Inquiry"** action.
  - Enhanced post-submission receipt with instant access to schedule a private briefing on Calendly immediately upon submitting.

### 4. Institutional Clearance Portal Target Destination
- **Updated App URL**: Calibrated the portal redirect target across `InstitutionalPortal.tsx`, `Portal.tsx`, `database.ts`, and `server.js` to `https://institutional-assessment.ai.studio/`.
- Verified seamless passkey authorization handoff directly redirecting verified clients to the new institutional assessment application.

### 5. Language & Taboo Word Compliance
- Strict zero-tolerance compliance verified across the entire codebase for:
  - `fear`
  - `empathise` / `empathize`
  - `hide` / `hides`
  - `live in slack`
  - `PDF`
- 100% clean TypeScript type check and production build verified.
