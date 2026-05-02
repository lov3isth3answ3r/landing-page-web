document.addEventListener('DOMContentLoaded', function() {
    initializeVideo();
    initializeAnimations();
    initializeForm();
});

function initializeVideo() {
    const video = document.querySelector('.main-video');
    if (!video) return;

    video.play().catch(() => {
        addPlayButton(video);
    });
}

function addPlayButton(video) {
    const btn = document.createElement('button');
    btn.textContent = '▶ Play';
    btn.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem 2rem;
        background: rgba(102, 126, 234, 0.9);
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.25rem;
        cursor: pointer;
        z-index: 10;
    `;
    btn.addEventListener('click', function() {
        video.play();
        this.remove();
    });
    video.parentElement.style.position = 'relative';
    video.parentElement.appendChild(btn);
}

function initializeAnimations() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

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

    // Mailto fallback — replace this with your email API (Mailchimp, Formspree, etc.)
    window.location.href = `mailto:hello@loveistheanswer.to?subject=Notify%20Me&body=Please%20notify%20me%20at%3A%20${encodeURIComponent(email)}`;

    btn.disabled = true;
    btn.textContent = 'Thanks!';
    successMsg.textContent = "You're on the list. We'll be in touch soon. ❤️";
    document.getElementById('emailInput').value = '';

    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Notify Me';
    }, 4000);
}

function trackSocialClick(platform) {
    console.log(`Social link clicked: ${platform}`);
    // Wire up analytics here (e.g. gtag, plausible)
}

window.trackSocialClick = trackSocialClick;
