// Advanced animations and interactions
class AnimationManager {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        this.initializeScrollAnimations();
        this.initializeHoverEffects();
        this.initializeParallax();
    }

    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-animate');
                    element.classList.add(`animate-${animationType}`);
                    animationObserver.unobserve(element);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    initializeHoverEffects() {
        // Add hover effects to interactive elements
        const hoverElements = document.querySelectorAll('.feature-card, .roleplay-card, .social-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', this.handleHoverEnter);
            element.addEventListener('mouseleave', this.handleHoverLeave);
        });
    }

    handleHoverEnter(e) {
        const element = e.currentTarget;
        element.style.transform = 'translateY(-5px)';
        element.style.transition = 'all 0.3s ease';
    }

    handleHoverLeave(e) {
        const element = e.currentTarget;
        element.style.transform = 'translateY(0)';
    }

    initializeParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Method to add custom animations
    addAnimation(element, animationClass) {
        element.classList.add(animationClass);
        return new Promise(resolve => {
            element.addEventListener('animationend', () => {
                element.classList.remove(animationClass);
                resolve();
            }, { once: true });
        });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
});