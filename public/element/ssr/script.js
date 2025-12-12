// SSR Support Card Animation

const card = document.getElementById('ssr-support');
const visualization = document.querySelector('.feature__visualization');

let hasAnimated = false;

// Start animation on hover
card.addEventListener('mouseenter', () => {
    if (!hasAnimated) {
        visualization.classList.add('active');
        hasAnimated = true;
    }
});

// Intersection Observer for scroll-triggered animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            visualization.classList.add('active');
            hasAnimated = true;
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px'
});

observer.observe(card);

console.log('✅ SSR Support Card Script Loaded');
