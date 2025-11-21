// Background image optimization and management
class BackgroundManager {
    constructor() {
        this.backgroundImage = new Image();
        this.init();
    }

    init() {
        this.preloadBackground();
        this.handleBackgroundLoad();
    }

    preloadBackground() {
        this.backgroundImage.src = 'images/background.jpg';
        this.backgroundImage.onload = () => {
            console.log('Background image loaded successfully');
            document.body.classList.add('background-loaded');
        };

        this.backgroundImage.onerror = () => {
            console.error('Failed to load background image');
            this.setFallbackBackground();
        };
    }

    setFallbackBackground() {
        document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    }

    handleBackgroundLoad() {
        // Add loading state if needed
        const loader = document.createElement('div');
        loader.id = 'background-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background-dark);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-family: 'Orbitron', sans-serif;
        `;
        loader.innerHTML = 'Loading LegoCraft Experience...';
        
        document.body.appendChild(loader);

        // Remove loader when background is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('background-loader');
                if (loader) {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => loader.remove(), 500);
                }
            }, 1000);
        });
    }
}

// Initialize background manager
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundManager();
});