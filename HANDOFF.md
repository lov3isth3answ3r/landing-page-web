# LITA Landing Page — Handoff

> Last updated: 2026-05-16

---

## Live Site

**https://loveistheanswer.to**

---

## Project at a Glance

| Item | Detail |
|------|--------|
| Stack | Pure HTML / CSS / Vanilla JS — zero dependencies, no build step |
| Entry point | `index.html` (one file, enforced by CI) |
| Styles | `css/styles.css` — CSS custom properties, no preprocessor |
| Logic | `js/main.js` — slideshow, animations, form, parallax |
| Assets | `assets/` — SVG logo, MP4 video, WebP images |
| CI | GitHub Actions: build → package → GitHub Release |
| Deploy | Upload the `lita-site.zip` artifact (or raw files) to web hosting |
| Repo | https://github.com/lov3isth3answ3r/landing-page-web |

---

## What Was Built This Session (2026-05-16)

- **GitFlow light** — `main` / `develop` / `feature/*` branch hierarchy established
- **Rainbow pulsing hearts** — every `L❤️VE` cycles through ❤️🧡💛💚🩵💙💜 at 400ms with a CSS scale/glow pulse
- **Media slideshow** — replaced single `<video>` with a configurable `MEDIA_ITEMS` array; cross-fade transitions, dot nav, prev/next arrows; video advances on `ended`, images after 6 s
- **Floating hearts background** — ambient CSS-animated emoji particles drift upward behind the card continuously
- **Typewriter reveal** — "Peace • Unity • Respect • Nature" types in character-by-character on load
- **Mouse-parallax tilt** — main card tilts in 3D on mouse move (disabled on touch devices)
- **GitHub Actions CI** — three-stage pipeline: validate files → zip artifact → GitHub Release on version tag
- **Docs** — CLAUDE.md, README.md, HANDOFF.md all updated and reconciled

---

## Branch State

| Branch | Status | Description |
|--------|--------|-------------|
| `main` | clean, behind develop | Production-stable. Do not push directly. |
| `develop` | ← current integration branch | All features merged here. Push features here first. |
| `feature/heart-pulsing` | merged → develop | Rainbow hearts + slideshow + ambient animations |
| `feature/ci-release` | merged → develop | GitHub Actions CI workflow |

> `develop` is ahead of `main` by 4 commits. Merge + tag when ready to release.

---

## How to Add Media to the Slideshow

Edit the `MEDIA_ITEMS` array at the **top of `js/main.js`**:

```js
const MEDIA_ITEMS = [
    { type: 'video', src: 'assets/LITA-video.mp4' },
    { type: 'video', src: 'assets/love-is-the-answer-tokyo.mp4' },  // ← add clips here
    { type: 'image', src: 'assets/love-paris.jpg' },                // ← or images
];
```

- Drop the file into `assets/`
- Add a line to `MEDIA_ITEMS` — that's it
- Videos auto-advance on clip end (10 s hard cap for long videos)
- Images display for 6 s then fade to next

---

## How to Cut a Release

```bash
# 1. Merge develop → main
git checkout main
git merge develop

# 2. Tag the release
git tag v1.0.0          # use semver
git push origin main --tags

# 3. GitHub Actions does the rest:
#    - builds & validates
#    - zips the site
#    - creates a GitHub Release with lita-site.zip attached
```

---

## Immediate Next Steps / Backlog

The user began describing a multi-page site plan before this session ended:

> "The site is https://loveistheanswer.to so the plan is to create a bunch of pages like https://loveistheanswer.to/war ..."

This was interrupted — the multi-page expansion was **not started**. The site is still a single `index.html`. When resuming:

1. Decide on the URL/page structure (e.g. `/war`, `/peace`, topic pages)
2. Determine if the "no secondary HTML files" constraint in CLAUDE.md should be relaxed for the multi-page build, or if a router/SPA pattern is preferred
3. Branch: `git checkout develop && git checkout -b feature/multi-page`

Other pending items:
- [ ] Wire up real email backend (Mailchimp / Formspree / ConvertKit) — see `js/main.js → handleFormSubmit()`
- [ ] Add more "L❤️VE is the Answer from around the world" video clips to the slideshow
- [ ] Verify slideshow autoplay on iOS Safari (muted + playsinline is set, but needs real-device test)
- [ ] CI first run — push to `develop` to confirm GitHub Actions passes
- [ ] Merge `develop` → `main` and tag `v1.0.0` when ready to go live

---

## Key Gotchas

**CSS grid slide stacking** — the slideshow uses `display: grid` with all slides in `grid-area: 1/1` so they overlap. Only `.active` has `opacity: 1`. Don't change this to `position: absolute` without also fixing container height.

**iOS autoplay** — videos must have `muted`, `playsinline`, and `autoplay` attributes. The current code sets these but autoplay still fails on some iOS versions; `addPlayButton()` is the fallback.

**Mailto fallback** — the form opens `mailto:` which requires a mail client. This is intentional for now. Replace `handleFormSubmit()` in `main.js` to integrate a real API.

**Local git proxy vs GitHub MCP** — this environment pushes through a local git mirror at `127.0.0.1`. The GitHub MCP tools query the GitHub API directly. There can be a brief sync lag; if `mcp__github__create_pull_request` fails with "head branch invalid", the branch hasn't synced yet — merge locally instead.

**One-HTML-file rule** — CI enforces this. If expanding to multi-page, update or disable that check in `.github/workflows/release.yml`.

---

## Contacts / Links

| | |
|-|-|
| Instagram | [@LOVEistheANSW3R](https://instagram.com/LOVEistheANSW3R) |
| Email | hello@loveistheanswer.to |
| Footer copyright | © 2026 NUNIVERSE.NET |
| GitHub repo | https://github.com/lov3isth3answ3r/landing-page-web |
