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
- **Founder Authority & Photo**: Suchita Sancheti's photo (`/assets/suchita-sancheti.jpg`) integrated into the founder bio card in the About section with verified authority badges.
- **Icon-Only Back Navigation**: All subpage back buttons across the site are icon-only arrow buttons (`<ArrowLeft className="w-5 h-5" />`), removing text while retaining accessibility labels.

### 3. Language & Taboo Word Compliance
- Strict zero-tolerance compliance verified across the entire codebase for:
  - `fear`
  - `empathise` / `empathize`
  - `hide` / `hides`
  - `live in slack`
  - `PDF`
- 100% clean TypeScript type check and production build verified.
