---
name: "Bandung Apnea Community x Every Dive.id"
description: "Bioluminescent Abyss: High-craft oceanic design system for youth freediving education, community, and gear curation"
colors:
  abyss-navy: "#04152B"
  midnight-trench: "#071f3d"
  bioluminescent-cyan: "#00C2D1"
  living-coral: "#FF6B4A"
  safety-amber: "#ffb020"
  whatsapp-emerald: "#25D366"
  glacial-white: "#F4FBFF"
  mist-blue: "#9db8cc"
  surface-glass: "rgba(255, 255, 255, 0.06)"
  border-pelagic: "rgba(255, 255, 255, 0.12)"
typography:
  display:
    fontFamily: "'Sora', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 9vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 1.15
  headline:
    fontFamily: "'Sora', system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "'Sora', system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Sora', system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "14px"
  xl: "20px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "24px"
  xl: "36px"
  xxl: "64px"
  section: "90px"
components:
  button-primary:
    backgroundColor: "{colors.bioluminescent-cyan}"
    textColor: "{colors.abyss-navy}"
    rounded: "{rounded.full}"
    padding: "0.85rem 1.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.glacial-white}"
    rounded: "{rounded.full}"
    padding: "0.85rem 1.5rem"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp-emerald}"
    textColor: "#06301a"
    rounded: "{rounded.full}"
    padding: "0.85rem 1.5rem"
  card-glass:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.glacial-white}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.glacial-white}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
---

# Design System: Bandung Apnea Community x Every Dive.id

## Overview

**Creative North Star: "Bioluminescent Abyss"**

The visual world evokes the stillness, depth, and focused clarity of descending into the ocean. Rich oceanic dark backgrounds anchor the interface into deep pelagic depths (`#04152B`), creating an immersive, serene canvas that immediately distinguishes the experience from sterile corporate web design. Against this atmospheric darkness, radiant accents inspired by deep-sea organisms emerge with crisp intent: bioluminescent cyan (`#00C2D1`) directs focus and action, living coral (`#FF6B4A`) provides energetic counterpoints, and cautionary safety amber (`#ffb020`) commands respect without inducing panic.

Surfaces feel tactile and suspended underwater. Elements do not sit on opaque, rigid slabs; instead, they float as translucent frosted glass planes with subtle optical borders and soft backdrop blurring. Every component prioritizes athletic ergonomics and thumb-friendly mobile navigation, designed specifically for divers browsing on mobile devices at the pool deck or between open-water training sessions.

**Key Characteristics:**
- Deep pelagic dark canvas with oceanic radial vignettes and subtle atmospheric gradients.
- Crisp bioluminescent accents used with surgical purpose, avoiding sensory overload.
- Translucent frosted glass containers (`backdrop-filter: blur(10px)`) with hairline borders.
- Ergonomic, thumb-first mobile layout featuring bottom sheets, an interactive kit bar, and sticky tab navigation.
- Uncompromising rejection of discount badges, cheesy tropical clipart, and generic corporate SaaS blues.

## Colors

The palette is rooted in oceanic depths, using nocturnal pelagic tones for structure and vibrant marine bioluminescence for interaction and safety telemetry.

### Primary
- **Bioluminescent Cyan** (`#00C2D1`): The electric primary accent. Applied to primary action buttons, active navigation states, interactive slider indicators, and key metric callouts. In light mode, automatically shifts to deep cyan (`#007f8a`) to preserve AA contrast.

### Secondary
- **Living Coral** (`#FF6B4A`): The warm biological counter-accent. Used for the dual-brand connector (`x`), advanced level badges (`.lvl--lanjut`), and hero headline gradient transitions.

### Tertiary
- **Safety Amber** (`#ffb020`): Dedicated exclusively to dive safety protocols, emergency awareness guidelines, and physiological risk indicators (blackout/samba warnings). Never diluted for commercial promotions.
- **WhatsApp Emerald** (`#25D366`): A functional third-party brand accent reserved solely for direct consultation triggers, floating chat buttons, and final kit checkout actions.

### Neutral
- **Abyss Navy** (`#04152B`): The foundational background canvas representing true ocean depth.
- **Midnight Trench** (`#071f3d`): Secondary sectional background (`.section--alt`), dialog containers, and depth cards.
- **Submerged Glass** (`rgba(255, 255, 255, 0.06)`): Translucent card backgrounds, inputs, and interactive chips.
- **Pelagic Border** (`rgba(255, 255, 255, 0.12)`): Hairline structural division across containers and form fields.
- **Glacial White** (`#F4FBFF`): High-legibility headline and primary typography.
- **Mist Blue** (`#9db8cc`): Subdued secondary text, metadata labels, and inactive icon states.

### Named Rules
**The Luminous Scarcity Rule.** Bioluminescent cyan (`#00C2D1`) must never cover more than 10% of any viewport. Its power comes from glowing out of deep darkness; bathing large surfaces in cyan destroys its signal value.

**The Safety Exclusivity Rule.** Safety Amber (`#ffb020`) is strictly reserved for safety rules, medical disclaimers, and dive risks. It may never be used for sales badges, urgency counters, or general notifications.

## Typography

**Display Font:** Sora (with `system-ui, -apple-system, sans-serif` fallback)
**Body Font:** Inter (with `system-ui, -apple-system, sans-serif` fallback)
**Label/Mono Font:** Sora (tabular-nums enabled for numbers, metrics, and depth indicators)

**Character:** Sora brings geometric confidence, athletic modernity, and oceanic curves to headlines and badges, while Inter delivers flawless, neutral legibility for long-form instructional copy, safety guides, and gear specifications.

### Hierarchy
- **Display** (800 weight, `clamp(2.6rem, 9vw, 5.6rem)`, 1.15 line-height): Reserved for the hero title (`Tahan napas. Selami biru.`). High impact with dual-color gradient clip.
- **Headline** (700 weight, `clamp(1.8rem, 5vw, 2.8rem)`, 1.15 line-height): Section titles (`Disiplin Freedive`, `Katalog Gear`, `Safety First`).
- **Title** (600 weight, `1.15rem` - `1.25rem`, 1.25 line-height): Card headers, modal titles, and gear item titles.
- **Body** (400 weight, `1rem` / 16px, 1.65 line-height, max-width 65–75ch): Educational steps, product descriptions, and community narrative.
- **Label** (600 weight, `0.8rem`, 0.14em letter-spacing, uppercase): Section eyebrows (`PILIH GAYAMU`, `ROADMAP PEMULA`, `WAJIB BACA`).

### Named Rules
**The 16px Form Floor Rule.** All text inputs, textareas, and select menus must maintain at least 16px font size to prevent iOS Safari from triggering disruptive auto-zoom upon field focus.

## Layout

The spatial model uses an centered responsive container with fluid vertical pacing and dedicated safe-area handling for notch-enabled mobile displays.

- **Desktop Container:** Maximum width `min(1140px, 100% - 40px)`, auto centered.
- **Narrow Container:** Maximum width `min(760px, 100% - 40px)` for focused reading (FAQ, Join Form, Safety).
- **Vertical Rhythm:** Standard sections use `90px` vertical padding on desktop, scaling down to `64px` on mobile screens.
- **Grid Patterns:** Auto-fitting grids with fluid minmax definitions:
  - 2-Column: `repeat(auto-fit, minmax(min(100%, 300px), 1fr))`
  - 3-Column: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`
  - 4-Column: `repeat(auto-fit, minmax(min(100%, 230px), 1fr))`
- **Mobile Safe Areas:** Dynamic integration with `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` ensuring zero UI overlap with home indicators or notches.

## Elevation & Depth

This system avoids heavy drop shadows and faux-3D bevels, relying instead on **frosted optical layering** and **luminous hover states**.

### Shadow Vocabulary
- **Bioluminescent Hover Glow** (`box-shadow: 0 8px 24px rgba(0, 194, 209, 0.35)`): Triggered on primary button and interactive card hover, simulating a light source underwater.
- **Floating Kit Drawer** (`box-shadow: 0 12px 32px rgba(0, 0, 0, 0.40)`): Elevated floating bottom sheet on mobile and desktop, separating action controls from scrolling page content.
- **WhatsApp Action Elevation** (`box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35)`): Anchors the persistent floating WhatsApp trigger.
- **Modal Glass Backdrop** (`background: rgba(2, 10, 22, 0.75)`, `backdrop-filter: blur(4px)`): Suspends dialog sheets over deep water.

### Named Rules
**The Frosted Layering Rule.** Elevation is expressed primarily through backdrop blur (`10px` to `16px`) and hairline border contrast (`rgba(255, 255, 255, 0.12)`). Heavy black shadows are prohibited on static content cards.

## Shapes

- **Hero & Card Curvature:** Generous, soft rounded corners with a standard radius of `20px` (`var(--radius)`).
- **Interactive Controls (Pills):** Full pill radius (`999px`) for action buttons, filter tags, and quantity steppers, creating inviting touch targets.
- **Input Fields & Segments:** Moderately curved `12px` radius for form inputs and segmented option selectors.
- **Interactive Badges:** Circular `50%` radius for numeric timeline steps, step indicators, and circular avatar logos.

## Components

### Buttons
- **Shape:** Full pill (`999px` radius), minimum 48px height on mobile (`44px` for `.btn--sm`).
- **Primary:** Gradient from cyan to light aqua (`linear-gradient(135deg, #00C2D1, #1de0ee)`), deep abyss navy text (`#04152B`), font weight 600.
- **Hover / Focus:** Translates upward `-2px` with a diffused cyan glow (`0 8px 24px rgba(0, 194, 209, 0.35)`). Focus-visible shows an outline of `3px solid var(--teal)` with `3px` offset.
- **Ghost:** Transparent background, `1.5px solid rgba(255, 255, 255, 0.12)`, hovering to border color `var(--teal)`.
- **WhatsApp Button:** Solid WhatsApp green (`#25D366`), dark ink text (`#06301a`), pill shape, inline SVG icon.

### Cards / Containers
- **Corner Style:** `20px` radius.
- **Background:** `rgba(255, 255, 255, 0.06)` with `backdrop-filter: blur(10px)`.
- **Border:** `1px solid rgba(255, 255, 255, 0.12)`.
- **Hover:** Smooth lift (`transform: translateY(-6px)`) and border shift to `var(--teal)` with `0.3s` ease transition.
- **Internal Padding:** `24px` on desktop, `20px` on mobile.

### Chips & Filter Pills
- **Category Chips:** Horizontal scrolling pill row on mobile (`scroll-snap-type: x proximity`), vertical stacked on desktop.
- **Default State:** Glass surface, border `1px solid var(--border)`, muted text.
- **Active State (`aria-pressed="true"`):** Solid cyan fill (`#00C2D1`), abyss navy text, active icon stroke inversion.

### Inputs & Select Fields
- **Style:** Minimum 48px height, `12px` radius, background `rgba(255, 255, 255, 0.06)`, border `1px solid var(--border)`.
- **Select Fields:** Custom inline SVG chevron in bioluminescent cyan; native dropdown styled to dark navy.
- **Focus:** Border transitions to `var(--teal)` with custom outline.

### Navigation
- **Desktop Navbar:** Fixed header with `14px` blur, `rgba(4, 21, 43, 0.82)` background, dual logos with coral `x`, scroll progress gradient bar along the bottom edge.
- **Mobile Menu:** Full viewport drawer descending below navbar with high-contrast oversized typography.
- **Mobile Tab Bar:** Fixed 5-column bottom navigation bar with thumb-friendly icons (`56px` height) and safe-area padding.

### Signature Components
- **Depth Meter Telemetry:** A fixed vertical track on the right viewport edge that dynamically fills from cyan to coral as the user scrolls, displaying current simulated depth in meters.
- **Interactive Kit Bar:** Sticky floating bottom dock that animates into view when gear items are selected, showcasing stacked thumbnail badges, item counter, and a one-tap WhatsApp order launcher.
- **Gear Consultation Sheet:** Native HTML5 `<dialog>` rendered as a centered modal on desktop and an animated bottom sheet (`max-height: 85vh`) on mobile.

## Do's and Don'ts

### Do:
- **Do** maintain the 48px minimum touch target for all interactive elements across mobile viewports.
- **Do** route all gear and membership transactions into formatted, consultative WhatsApp messages.
- **Do** preserve the dual-brand parity between Bandung Apnea Community and Every Dive.id.
- **Do** pair every depth, apnea technique, or gear mention with responsible safety reminders and buddy checks.
- **Do** use `tabular-nums` on all price displays, depth gauges, and quantity steppers.

### Don't:
- **Don't** add fake discount countdown timers, high-pressure scarcity badges, or strike-through sale pricing.
- **Don't** use generic stock photography of scuba divers with oxygen tanks or cartoon sea animals.
- **Don't** place opaque solid grey or white cards that destroy the deep oceanic immersion.
- **Don't** use Safety Amber for anything other than actual physiological warnings and safety protocols.
- **Don't** introduce multi-step e-commerce shopping carts or payment gateways that break the direct WhatsApp consultation model.
