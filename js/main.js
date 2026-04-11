// Main JavaScript for LITA Coming Soon Page

document.addEventListener('DOMContentLoaded', function() {
    initializeVideo();
    initializeAnimations();
});

/**
 * Initialize video element
 */
function initializeVideo() {
    const video = document.querySelector('.main-video');
    
    if (video) {
        // Ensure video plays on mobile devices
        video.play().catch(error => {
            console.log('Autoplay prevented:', error);
            // Add a play button overlay if autoplay fails
            addPlayButton(video);
        });
    }
}

/**
 * Add play button if autoplay is prevented
 * @param {HTMLVideoElement} video - Video element
 */
function addPlayButton(video) {
    const playButton = document.createElement('button');
    playButton.textContent = '▶ Play';
    playButton.style.cssText = `
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
    
    playButton.addEventListener('click', function() {
        video.play();
        this.remove();
    });
    
    video.parentElement.style.position = 'relative';
    video.parentElement.appendChild(playButton);
}

/**
 * Initialize page animations and interactions
 */
function initializeAnimations() {
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add parallax effect to logo on scroll (if page scrolls)
    const logo = document.querySelector('.logo');
    if (logo) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            logo.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
}

/**
 * Handle social link clicks
 * @param {string} platform - Social media platform name
 */
function trackSocialClick(platform) {
    console.log(`Social link clicked: ${platform}`);
    // Add analytics tracking here
}

// Expose function for inline onclick if needed
window.trackSocialClick = trackSocialClick;
