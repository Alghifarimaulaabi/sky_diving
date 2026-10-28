# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Beginners and youth in Bandung & West Java who want to learn freediving safely from scratch, understand equipment without getting overwhelmed, and join an active community with an established buddy system. Secondary users include intermediate freedivers looking for training sessions and reliable gear recommendations.

## Product Purpose
Demystify freediving for newcomers by combining structured, safety-first education with approachable community onboarding (Bandung Apnea Community) and curated, consultative gear selection (Every Dive.id). Success means visitors feel confident to start learning, join weekly pool training, and acquire suitable gear without fear or confusion.

## Positioning
The unified bridge between local grassroots community training (BAC's weekly pool sessions at Sesko AD) and practical, honest gear consultation (Every Dive.id WhatsApp consultation kit) — eliminating the intimidating barrier to entry in freediving through education, safety-first culture, and direct human guidance.

## Operating Context
- Browsed primarily on mobile devices (smartphones at pool decks, on the go, or shared via social media/WhatsApp groups) and desktop.
- Operates as a responsive Progressive Web App (PWA) with offline capability and standalone homescreen mode.
- Conversion workflows terminate in WhatsApp conversations (admin chat for gear consultation and community joining) rather than automated e-commerce checkout.

## Capabilities and Constraints
- **Stack & Architecture:** Vanilla HTML5, modern CSS3 (custom properties, responsive grid/flexbox), vanilla ES modules/JS, PWA Service Worker (`sw.js`, `manifest.webmanifest`).
- **Interactive Tools:**
  - Dynamic gear catalog with category filtering, level filter (Pemula / Lanjut), and custom package selection.
  - Interactive "Kit saya" shopping drawer generating formatted pre-filled WhatsApp consultation messages.
  - Interactive Wetsuit & Weight estimation calculator (`#calc`).
  - Scroll-linked interactive depth gauge indicator (`#depthFill`, `#depthNum`).
  - Dark / light theme toggle (`data-theme`).
- **Constraints:**
  - Static hosting (Vercel-ready static files, no backend server or database).
  - WhatsApp is the single transactional channel for inquiries, sales confirmation, and onboarding.
  - No payment gateway integration; stock and prices are confirmed directly via WhatsApp.

## Brand Commitments
- **Entities:** Dual-brand partnership between Bandung Apnea Community (BAC) and Every Dive.id (formerly fundive.id).
- **Tone & Voice:** Welcoming, encouraging, youthful, yet uncompromisingly rigorous on safety ("Safety First", "Never freedive alone", "100% Buddy system").
- **Identity Assets:** Official logos for BAC (`assets/logo-bac.webp`) and Every Dive.id (`assets/logo-everydive.webp`); oceanic deep blue theme palette (`#04152B`).

## Evidence on Hand
- Active community numbers: 100+ community members, 2x weekly pool sessions at Sesko AD Bandung, 100% buddy system adherence.
- Real structured catalog items and curated beginner packs defined in `js/catalog-data.js`.
- Active WhatsApp contact line (+62 822-4955-1110) and social media handles (@everydive.id on Instagram/TikTok, @BandungApneaCommunity on YouTube).
- Gallery and events currently contain template placeholders that await real member photos and scheduled dates.

## Product Principles
1. **Safety Over Ego:** Emphasize safety fundamentals, equalization, and the strict buddy system before any pursuit of depth or breath-hold records.
2. **Consultation Over Cart:** Prioritize educating the diver and confirming fit over fast sales; gear decisions are validated through WhatsApp consultation.
3. **Approachable Onboarding:** Keep language jargon-free, friendly, and empowering for complete beginners who may be intimidated by ocean sports.
4. **Mobile-First Utility:** Optimize for fast loading, thumb-friendly navigation (tab bar on mobile), and quick access to tools and WhatsApp.

## Accessibility & Inclusion
- High-contrast visual markers across dark and light modes.
- Accessible semantic headings, ARIA attributes on interactive dialogs/drawers, keyboard navigation with skip links (`#main`).
- Clear visual and textual warnings regarding freediving risks and medical safety considerations.
