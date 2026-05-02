// Replace YOUR_FORM_ID after signing up free at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

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

async function handleFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value.trim();
    const successMsg = document.getElementById('successMessage');
    const btn = document.querySelector('.notify-btn');

    if (!email) return;

    clearMessage(successMsg);
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (res.ok) {
            document.getElementById('emailInput').value = '';
            showMessage(successMsg, "You're on the list. We'll be in touch. ❤️", false);
            btn.textContent = 'Thanks!';
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Notify Me';
            }, 4000);
        } else {
            const data = await res.json().catch(() => ({}));
            throw new Error(data?.errors?.[0]?.message || 'Submission failed');
        }
    } catch {
        showMessage(successMsg, 'Something went wrong — please try again.', true);
        btn.disabled = false;
        btn.textContent = 'Notify Me';
    }
}

function showMessage(el, text, isError) {
    el.textContent = text;
    el.className = 'success-message is-visible' + (isError ? ' is-error' : '');
}

function clearMessage(el) {
    el.textContent = '';
    el.className = 'success-message';
}

function trackSocialClick(platform) {
    console.log(`Social link clicked: ${platform}`);
    // Wire up analytics here (e.g. gtag, plausible)
}

window.trackSocialClick = trackSocialClick;
