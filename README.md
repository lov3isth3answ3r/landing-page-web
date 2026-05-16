# Love Is The Answer (LITA) - Coming Soon Landing Page

**Live:** https://loveistheanswer.to

A modern, responsive "coming soon" landing page for the Love Is The Answer brand.

## 📁 Project Structure

```
landing-page-web/
├── index.html               # Main HTML file (single entry point)
├── css/
│   └── styles.css           # All styles — no preprocessor
├── js/
│   └── main.js              # Vanilla JS: slideshow, animations, form handler
├── assets/
│   ├── LITA-logo.svg        # Brand logo (SVG)
│   ├── LITA-video.mp4       # Hero video (slide 1)
│   └── *.webp               # Slideshow images
├── .github/
│   └── workflows/
│       └── release.yml      # CI: build → package → GitHub Release
├── CLAUDE.md                # Project source of truth
└── README.md                # This file
```

## ✨ Features

- **Responsive Design**: Works on all devices (375px → 1440px)
- **Modern CSS**: Grid, Flexbox, custom properties, CSS animations
- **Email Notification**: Form with mailto fallback; `#successMessage` ready for API integration
- **Social Media Links**: Instagram + email, extensible
- **Accessible**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Zero external dependencies, no CDN, no build step
- **Animated**: Smooth transitions, rainbow hearts, floating particles, typewriter, parallax

## 🎬 Media Slideshow

To add or remove slideshow items, edit the `MEDIA_ITEMS` array at the top of `js/main.js`:

```js
const MEDIA_ITEMS = [
    { type: 'video', src: 'assets/my-clip.mp4' },
    { type: 'image', src: 'assets/my-photo.jpg' },
    // add as many as you like
];
```

- **Videos** auto-advance when the clip ends (10s hard cap)
- **Images** display for 6 seconds then fade to the next item
- Dots and arrows appear automatically when there is more than one item

## 🎨 Design Highlights

- Dark gradient background with floating rainbow heart particles
- Rainbow-cycling pulsing hearts on every L❤️VE mention
- Configurable media slideshow (video + images) with cross-fade
- Typewriter reveal on the sub-tagline
- Mouse-parallax 3D tilt on the main card (desktop only)
- Glassmorphism form + social links
- Mobile-first, fluid typography (375px → 1440px)

## 🚀 Getting Started

1. **Open the page**: Open `index.html` in any modern browser — no build step
2. **Customize copy**: Edit `index.html` for brand text, social URLs, email address
3. **Add media**: Drop files into `assets/` and update `MEDIA_ITEMS` in `js/main.js`
4. **Deploy**: Upload all files to your hosting — the CI zip (`lita-site.zip`) is ready to upload

## 🛠️ Customization

### Colors
Edit the CSS custom properties in `css/styles.css`:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --accent-color: #ffa07a;
    /* ... more colors */
}
```

### Social Links
Update the social media URLs in `index.html`:
```html
<a href="YOUR_INSTAGRAM_URL" class="social-link">📷</a>
```

### Email Integration
Replace the simulated form submission in `js/main.js` with your actual API endpoint or email service (e.g., Mailchimp, SendGrid, etc.)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚙️ CI/CD

GitHub Actions (`.github/workflows/release.yml`) runs automatically:

| Job | Trigger | What it does |
|-----|---------|--------------|
| **Build** | push to `develop`, PR → `develop` | Validates required files, one-HTML-file rule, no stale artifacts |
| **Package** | after build passes | Creates `lita-site.zip` as a downloadable artifact (30-day retention) |
| **Release** | `v*.*.*` tag on `main` | Publishes a GitHub Release with the zip attached |

**To cut a release:**
```bash
git checkout main && git merge develop
git tag v1.0.0
git push origin main --tags
```

## 📄 License

This project is free to use and modify for your needs.

## 🕰️ Recent Improvements

### May 2026 — Brand Audit & Animation Update
- Deleted stale draft file `index-simple-video1.html.html`
- Fixed all CSS/HTML mismatches (orphaned classes removed, unstyled elements added)
- Updated all brand copy to canonical values (taglines, CTA, social handles, footer)
- Added `CLAUDE.md` as single source of truth for the project
- Implemented email form handler with mailto fallback wired to `#successMessage`
- Added rainbow-cycling pulsing hearts on every `L❤️VE` mention
- Replaced single video with configurable PNG/MP4 slideshow (dots + arrows)
- Added floating hearts background animation (ambient CSS particles)
- Added typewriter reveal effect on sub-tagline
- Added mouse-parallax depth effect on main card (desktop only)

## 💖 About Love Is The Answer

Love Is The Answer (LITA) is a brand dedicated to turning L❤️VE into action — Peace • Unity • Respect • Nature.

- Instagram: [@LOVEistheANSW3R](https://instagram.com/LOVEistheANSW3R)
- Email: hello@loveistheanswer.to

---

**Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript**
