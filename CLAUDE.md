# CLAUDE.md — Love Is The Answer Landing Page

Single source of truth for this project. Update this file whenever decisions change.

---

## Project Overview

**Brand:** Love Is The Answer (LITA) — #LoveIsTheAnswer
**Tagline:** Turning L❤️VE into Action. Peace • Unity • Respect • Nature
**Live URL:** https://loveistheanswer.to
**Goal:** "Coming soon" landing page that collects interest and directs visitors to social channels before the full site launches.
**Stack:** Pure static HTML/CSS/JS — no framework, no build tooling, intentionally minimal.
**Deploy:** Upload all files to web hosting as-is. No build step needed. CI packages a zip automatically.

---

## File Structure

```
landing-page-web/
├── index.html          ← canonical entry point (only HTML file)
├── css/
│   └── styles.css      ← all styles, no preprocessor
├── js/
│   └── main.js         ← vanilla JS: slideshow, animations, form handler
├── assets/
│   ├── LITA-logo.svg   ← brand logo
│   ├── LITA-video.mp4  ← hero video (slide 1 of slideshow)
│   └── *.webp          ← slideshow images
├── .github/
│   └── workflows/
│       └── release.yml ← CI: build → package → GitHub Release
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

- **No framework.** Vanilla HTML/CSS/JS only. The page is one screen, a media slideshow, and a form — no React needed.
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

### 2026-05-16 — Animation, Slideshow & CI Session

Work completed on `feature/heart-pulsing` and `feature/ci-release`, both merged to `develop`:

- Set up GitFlow light: `main` → `develop` → `feature/*` branch hierarchy
- Wrapped every `❤️` in `.love-heart` spans; JS cycles rainbow emojis (❤️🧡💛💚🩵💙💜) at 400ms with CSS pulse/glow keyframe
- Replaced single `<video>` with a configurable `MEDIA_ITEMS` slideshow — cross-fade, dot nav, prev/next arrows; videos advance on `ended`, images after 6s
- Added floating hearts background: CSS-animated emoji particles continuously drift upward behind the card
- Added typewriter reveal on "Peace • Unity • Respect • Nature" sub-tagline
- Added mouse-parallax 3D tilt on main container (desktop/hover-capable only)
- Added three-stage GitHub Actions CI: build validation → zip package artifact → GitHub Release on `v*.*.*` tag
- Updated CLAUDE.md, README.md, and added HANDOFF.md

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

## GitFlow & CI/CD

**Branch rules:**
- `main` — stable/production only. Never push features directly here.
- `develop` — integration branch. All features merge here first.
- `feature/*` — branch from `develop`, merge back to `develop`.
- To release: merge `develop` → `main`, then tag `vX.Y.Z`.

**Release workflow** (`.github/workflows/release.yml`):
- **Build** — runs on every push to `develop` and every PR targeting `develop`. Validates required files, enforces the one-HTML-file rule, rejects double-extension artifacts.
- **Package** — zips `index.html`, `css/`, `js/`, `assets/`, `README.md` into `lita-site.zip` and uploads it as a CI artifact (30-day retention).
- **Release** — triggers only on `v*.*.*` tags pushed to `main`. Creates a GitHub Release and attaches the zip.

**To cut a release:**
```bash
git checkout main && git merge develop
git tag v1.0.0
git push origin main --tags
```

---

## What "Done" Looks Like

The landing page is complete when:
- [ ] Slideshow plays automatically (muted/loop) on all major browsers including iOS Safari
- [ ] Email form submits and shows confirmation without page reload
- [x] Page is fully responsive: 375px → 1440px
- [x] All brand copy matches the canonical values table above
- [x] No unstyled elements, no orphaned CSS, no stale files
- [ ] Social links open correct profiles in new tabs
- [ ] CI passes clean on `develop` (build + package jobs green)
- [ ] Real email backend wired up (replacing mailto fallback)
