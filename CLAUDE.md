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

- **No framework.** Vanilla HTML/CSS/JS only. The page is one screen, one video, one form — no React needed.
- **No build tools.** No webpack, vite, npm scripts. Edit and deploy directly.
- **Single HTML file.** `index.html` is the only entry point. Never add secondary HTML files without removing old ones.
- **CSS custom properties** in `:root` for all brand colors. Never hardcode colors outside of `:root`.
- **No external fonts or CDN dependencies.** System font stack only. Page must load with zero network requests except its own assets.

---

## Email Form

**Service:** Formspree (free tier — 50 submissions/month)

### To activate (one-time setup):
1. Go to [formspree.io](https://formspree.io) and sign up for a free account
2. Create a new form, set the destination email to `hello@loveistheanswer.to`
3. Copy the form ID (looks like `xpzgkwqr`)
4. Open `js/main.js` and replace `YOUR_FORM_ID` on line 2:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
5. Deploy — submissions will arrive at your inbox immediately

The form submits via `fetch()` (no page reload). Success and error states are shown in `#successMessage` without any alerts.

---

## Audit History

### 2026-05-02 — Project Restart Audit

**Score: 15/25** — Continued (not restarted).

Issues found and fixed:
- Deleted stale draft file `index-simple-video1.html.html` (double-extension artifact from early iteration)
- Added CSS for all unstyled elements: h1, .tagline, .sub-tagline, .coming-soon, .description, .notify-form, .email-input, .notify-btn, .success-message, .footer, .logo-container, .logo
- Removed orphaned CSS (`.cta-container`, `.email-link`) left over from old video-only iteration
- Removed `overflow: hidden` on body which clipped content on small screens
- Implemented Formspree AJAX form handler with loading, success, and error states
- Updated brand messaging: "Turning L❤️VE into Action / Peace • Unity • Respect • Nature"
- Updated OG/meta descriptions to match current brand copy
- Uncommented logo — shows above heading, responsive 80px–140px
- Fixed success-message animation (was firing on page load; now only fires when message appears)
- Cleaned up commented-out social link clutter in HTML

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

- [x] Video plays automatically (muted/loop) on all major browsers including iOS Safari
- [x] Email form submits and shows confirmation without page reload
- [x] Page is fully responsive: 375px → 1440px
- [x] All brand copy matches the canonical values table above
- [x] No unstyled elements, no orphaned CSS, no stale files
- [x] Social links open correct profiles in new tabs
- [ ] **Formspree form ID wired in** — replace `YOUR_FORM_ID` in `js/main.js` (see Email Form section above)
