# CLAUDE.md — Love Is The Answer Landing Page

Single source of truth for this project. Update this file whenever decisions change.

---

## Project Overview

**Brand:** Love Is The Answer (LITA) — #LoveIsThenAnswer
**Tagline:** Turning L❤️VE into Action. Peace • Unity • Respect • Nature
**Goal:** "Coming soon" landing page that collects interest and directs visitors to social channels before the full site launches.
**Stack:** Pure static HTML/CSS/JS — no framework, no build tooling, intentionally minimal.
**Deploy:** Upload all files to web hosting as-is. No build step needed.

---

## File Structure

```
landing-page-web/
├── index.html          ← canonical entry point (only HTML file)
├── css/
│   └── styles.css      ← all styles, no preprocessor
├── js/
│   └── main.js         ← vanilla JS: video init, animations, form handler
├── assets/
│   ├── LITA-logo.svg   ← brand logo
│   └── LITA-video.mp4  ← hero video (autoplay, loop, muted)
├── README.md
└── CLAUDE.md           ← this file
```

---

## Brand Canonical Values

| Field | Value |
|-------|-------|
| Brand name | Love Is The Answer / LITA |
| Primary tagline | Turning L❤️VE into Action |
| Sub-tagline | Peace • Unity • Respect • Nature |
| CTA phrase | Join the global L❤️VEvolution |
| Instagram | @LOVEistheANSW3R |
| Email | hello@loveistheanswer.to |
| Footer copyright | © 2026 NUNIVERSE.NET |

---

## Architecture Decisions

- **No framework.** Vanilla HTML/CSS/JS only. The page is one screen, one video, one form — no React needed.
- **No build tools.** No webpack, vite, npm scripts. Edit and deploy directly.
- **Single HTML file.** `index.html` is the only entry point. Never add secondary HTML files without removing old ones.
- **CSS custom properties** in `:root` for all brand colors. Never hardcode colors outside of `:root`.
- **No external fonts or CDN dependencies.** System font stack only. Page must load with zero network requests except its own assets.

---

## Email Form

The form currently uses a `mailto:` fallback. When a real email backend is integrated:
- Replace the `mailto:` handler in `js/main.js → handleFormSubmit()`
- Target endpoint options: Mailchimp, ConvertKit, Formspree, or custom API
- The `#successMessage` div is already wired for feedback display

---

## Audit History

### 2026-05-02 — Project Restart Audit

**Score: 15/25** — Continued (not restarted).

Issues found and fixed:
- Deleted stale draft file `index-simple-video1.html.html` (double-extension artifact from early iteration)
- Added CSS for all unstyled elements in `index.html`: h1, .tagline, .coming-soon, .description, .notify-form, .email-input, .notify-btn, .success-message, .footer
- Removed orphaned CSS (`.cta-container`, `.email-link`) left over from old video-only iteration
- Implemented basic form handler with mailto fallback in `main.js`
- Updated brand messaging to match current tagline
- Fixed `overflow: hidden` on body which clipped content on small screens

---

## Development Guidelines

- **One HTML file rule.** If you prototype a new layout, do it in a branch and delete the old file before merging.
- **CSS coverage.** Every HTML element with a class must have a corresponding CSS rule. Check for orphaned classes before committing.
- **No inline styles** except for dynamically injected elements in JS (play button overlay).
- **Test on mobile.** The page must look correct at 375px width. `overflow: hidden` on body must never be restored unless tested.
- **Form submissions** must show feedback in `#successMessage`, never in an alert().
- **Assets:** Keep video under 10MB. Optimize SVG logo — no raster images unless SVG is unavailable.

---

## What "Done" Looks Like

The landing page is complete when:
- [ ] Video plays automatically (muted/loop) on all major browsers including iOS Safari
- [ ] Email form submits and shows confirmation without page reload
- [ ] Page is fully responsive: 375px → 1440px
- [ ] All brand copy matches the canonical values table above
- [ ] No unstyled elements, no orphaned CSS, no stale files
- [ ] Social links open correct profiles in new tabs
