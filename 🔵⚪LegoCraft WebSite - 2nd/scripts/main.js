// Main JavaScript functionality
class LegoCraftWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.initializeTheme();
        this.initializeAnimations();
        this.initializeEventListeners();
        this.initializeParticles();
    }

    initializeTheme() {
        const themeSwitch = document.getElementById('themeSwitch');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            themeSwitch.checked = true;
            document.body.classList.add('dark-theme');
        }

        themeSwitch.addEventListener('change', (e) => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
        });
    }

    initializeAnimations() {
        this.animateStats();
        this.animateRoleplayCards();
        this.animateSkillBars();
    }

    initializeEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Copy IP functionality
        document.querySelectorAll('.ip-copy-btn, .cta-primary').forEach(btn => {
            if (btn.textContent.includes('Copy') || btn.textContent.includes('Join')) {
                btn.addEventListener('click', this.copyIP.bind(this));
            }
        });
    }

    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ff3c3c" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ff3c3c",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }

    animateStats() {
        const statValues = document.querySelectorAll('.stat-value');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statValue = entry.target;
                    const target = parseInt(statValue.getAttribute('data-count'));
                    this.animateValue(statValue, 0, target, 1500);
                    observer.unobserve(statValue);
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(stat => observer.observe(stat));
    }

    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value === end && element.getAttribute('data-count') === '100+' ? '100+' : value;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    animateRoleplayCards() {
        const roleplayCards = document.querySelectorAll('.roleplay-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        roleplayCards.forEach(card => observer.observe(card));
    }

    animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const skillLevel = item.getAttribute('data-skill');
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.setProperty('--skill-level', skillLevel + '%');
            }
        });
    }

    copyIP() {
        const ip = "play.legocraft.net";
        navigator.clipboard.writeText(ip).then(() => {
            this.showNotification('✅ Server IP copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('❌ Failed to copy IP', 'error');
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `copy-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LegoCraftWebsite();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LegoCraftWebsite;
}