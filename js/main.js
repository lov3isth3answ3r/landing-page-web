// ─── Media config — add/remove items here ─────────────────────────────────
const MEDIA_ITEMS = [
    { type: 'video', src: 'assets/LITA-video.mp4' },
    { type: 'image', src: 'assets/close-up-heart-shaped-earth-globe-holded-painted-hands-love-care-hope-planet-kindness-support-togetherness-international-405455777.webp' },
    { type: 'image', src: 'assets/glowing-universal-heart-shaped-portal-radiating-infinite-love-divine-energy-symbolizing-soul-s-journey-cosmic-425848740.webp' },
    { type: 'image', src: 'assets/xplore-beauty-cosmic-energy-breathtaking-d-render-where-hands-form-heart-shape-cradling-radiant-golden-blue-364432893.webp' },
];

const HEART_EMOJIS = ['❤️', '🧡', '💛', '💚', '🩵', '💙', '💜'];

document.addEventListener('DOMContentLoaded', function () {
    initializeSlideshow();
    initializeHearts();
    initializeAnimations();
    initializeForm();
    initializeFloatingHearts();
    initializeTypewriter();
    initializeParallax();
});

// ─── Slideshow ──────────────────────────────────────────────────────────────

function initializeSlideshow() {
    const container = document.getElementById('slideshowContainer');
    if (!container || MEDIA_ITEMS.length === 0) return;

    const track = document.createElement('div');
    track.className = 'slides-track';

    const slides = MEDIA_ITEMS.map((item, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide' + (i === 0 ? ' active' : '');

        if (item.type === 'video') {
            const video = document.createElement('video');
            video.className = 'slide-media';
            video.muted = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            const source = document.createElement('source');
            source.src = item.src;
            source.type = 'video/mp4';
            video.appendChild(source);
            slide.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.className = 'slide-media';
            img.src = item.src;
            img.alt = 'Love Is The Answer';
            slide.appendChild(img);
        }

        track.appendChild(slide);
        return slide;
    });

    container.appendChild(track);

    let dots = [];
    if (MEDIA_ITEMS.length > 1) {
        const controls = document.createElement('div');
        controls.className = 'slideshow-controls';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'slide-arrow';
        prevBtn.innerHTML = '&#8249;';
        prevBtn.setAttribute('aria-label', 'Previous slide');

        const dotsEl = document.createElement('div');
        dotsEl.className = 'slideshow-dots';

        dots = MEDIA_ITEMS.map((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', () => goTo(i));
            dotsEl.appendChild(dot);
            return dot;
        });

        const nextBtn = document.createElement('button');
        nextBtn.className = 'slide-arrow';
        nextBtn.innerHTML = '&#8250;';
        nextBtn.setAttribute('aria-label', 'Next slide');

        controls.appendChild(prevBtn);
        controls.appendChild(dotsEl);
        controls.appendChild(nextBtn);
        container.appendChild(controls);

        prevBtn.addEventListener('click', () => goTo((current - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length));
        nextBtn.addEventListener('click', () => goTo((current + 1) % MEDIA_ITEMS.length));
    }

    let current = 0;
    let timer = null;

    function goTo(index) {
        clearTimeout(timer);
        const prevVideo = slides[current].querySelector('video');
        if (prevVideo) prevVideo.pause();
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');

        current = index;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
        scheduleNext();
    }

    function scheduleNext() {
        if (MEDIA_ITEMS.length <= 1) return;
        const item = MEDIA_ITEMS[current];
        if (item.type === 'video') {
            const video = slides[current].querySelector('video');
            video.currentTime = 0;
            video.play().catch(() => addPlayButton(video));
            video.addEventListener('ended', function onEnded() {
                video.removeEventListener('ended', onEnded);
                clearTimeout(timer);
                goTo((current + 1) % MEDIA_ITEMS.length);
            });
            timer = setTimeout(() => goTo((current + 1) % MEDIA_ITEMS.length), 10000);
        } else {
            timer = setTimeout(() => goTo((current + 1) % MEDIA_ITEMS.length), 6000);
        }
    }

    // Kick off first slide
    if (MEDIA_ITEMS[0].type === 'video') {
        const video = slides[0].querySelector('video');
        video.play().catch(() => addPlayButton(video));
        if (MEDIA_ITEMS.length > 1) {
            video.addEventListener('ended', function onEnded() {
                video.removeEventListener('ended', onEnded);
                clearTimeout(timer);
                goTo(1);
            });
            timer = setTimeout(() => goTo(1), 10000);
        }
    } else {
        scheduleNext();
    }
}

function addPlayButton(video) {
    const btn = document.createElement('button');
    btn.textContent = '▶ Play';
    btn.style.cssText = `
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        padding:1rem 2rem;background:rgba(102,126,234,0.9);
        color:white;border:none;border-radius:50px;
        font-size:1.25rem;cursor:pointer;z-index:10;
    `;
    btn.addEventListener('click', function () {
        video.play();
        this.remove();
    });
    const parent = video.closest('.slide') || video.parentElement;
    parent.style.position = 'relative';
    parent.appendChild(btn);
}

// ─── Rainbow Heart Cycling ──────────────────────────────────────────────────

function initializeHearts() {
    let index = 0;
    setInterval(() => {
        index = (index + 1) % HEART_EMOJIS.length;
        document.querySelectorAll('.love-heart').forEach(h => {
            h.textContent = HEART_EMOJIS[index];
        });
    }, 400);
}

// ─── Social Link Hover Animations ──────────────────────────────────────────

function initializeAnimations() {
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        link.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

// ─── Email Form ─────────────────────────────────────────────────────────────

function initializeForm() {
    const form = document.getElementById('notifyForm');
    if (!form) return;
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value.trim();
    const successMsg = document.getElementById('successMessage');
    const btn = document.querySelector('.notify-btn');
    if (!email) return;

    window.location.href = `mailto:hello@loveistheanswer.to?subject=Notify%20Me&body=Please%20notify%20me%20at%3A%20${encodeURIComponent(email)}`;

    btn.disabled = true;
    btn.textContent = 'Thanks!';
    successMsg.innerHTML = 'You\'re on the list. We\'ll be in touch soon. <span class="love-heart">❤️</span>';
    document.getElementById('emailInput').value = '';

    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Notify Me';
    }, 4000);
}

// ─── Floating Hearts Background ─────────────────────────────────────────────

function initializeFloatingHearts() {
    const bg = document.getElementById('heartsBg');
    if (!bg) return;

    function spawnHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
        const size = 0.8 + Math.random() * 1.4;
        const left = 5 + Math.random() * 90;
        const duration = 9 + Math.random() * 8;
        heart.style.cssText = `left:${left}%;font-size:${size}rem;animation-duration:${duration}s;`;
        bg.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000 + 300);
    }

    for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 500);
    setInterval(spawnHeart, 1800);
}

// ─── Typewriter Effect ──────────────────────────────────────────────────────

function initializeTypewriter() {
    const el = document.querySelector('.sub-tagline');
    if (!el) return;
    const full = el.textContent.trim();
    el.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor">|</span>';
    const textEl = el.querySelector('.typewriter-text');
    const cursor = el.querySelector('.typewriter-cursor');
    let i = 0;

    function type() {
        if (i <= full.length) {
            textEl.textContent = full.slice(0, i++);
            setTimeout(type, 55);
        } else {
            cursor.classList.add('done');
        }
    }

    setTimeout(type, 900);
}

// ─── Mouse Parallax (desktop only) ─────────────────────────────────────────

function initializeParallax() {
    if (window.matchMedia('(hover: none)').matches) return;
    const container = document.querySelector('.container');
    if (!container) return;

    document.addEventListener('mousemove', function (e) {
        const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        container.style.transform = `perspective(1200px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
    });

    document.addEventListener('mouseleave', function () {
        container.style.transform = '';
    });
}

// ─── Analytics stub ─────────────────────────────────────────────────────────

function trackSocialClick(platform) {
    console.log(`Social link clicked: ${platform}`);
    // Wire up analytics here (e.g. gtag, plausible)
}

window.trackSocialClick = trackSocialClick;
