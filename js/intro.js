// ===== INTRO ANIMATION SCRIPT =====

class IntroAnimation {
    constructor() {
        this.isInitialized = false;
        this.loadingTexts = [
            "Preparando la experiencia de juego...",
            "Cargando categorías épicas...",
            "Conectando con la comunidad...",
            "¡Casi listo para jugar!"
        ];
        this.currentTextIndex = 0;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createIntroElements();
        this.bindEvents();
        this.startAnimation();
        this.isInitialized = true;
    }

    createIntroElements() {
        // Check if intro already exists
        if (document.getElementById('intro-container')) return;

        const introHTML = `
            <div id="intro-container" class="intro-container">
                <div class="intro-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
                
                <div class="intro-logo">
                    <div class="logo-icon">
                        <i class="fas fa-crown"></i>
                    </div>
                    <div class="logo-text">xpe.games</div>
                    <div class="logo-subtitle">Tu Máquina del Tiempo Digital</div>
                </div>
                
                <div class="intro-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text" id="progress-text">Iniciando...</div>
                </div>
                
                <div class="loading-text">
                    <p>Preparando la experiencia de juego...</p>
                    <p>Cargando categorías épicas...</p>
                    <p>Conectando con la comunidad...</p>
                    <p>¡Casi listo para jugar!</p>
                </div>
                
                <div class="welcome-message">
                    <div class="welcome-text">¡Bienvenido de vuelta!</div>
                    <div class="welcome-subtitle">Tu aventura gaming está a punto de comenzar</div>
                </div>
                
                <div class="intro-sparkles">
                    <span class="sparkle">✨</span>
                    <span class="sparkle">⭐</span>
                    <span class="sparkle">✨</span>
                    <span class="sparkle">⭐</span>
                    <span class="sparkle">✨</span>
                    <span class="sparkle">⭐</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', introHTML);
        
        // Hide all content except intro
        const allElements = document.body.children;
        for (let i = 0; i < allElements.length; i++) {
            if (!allElements[i].id || !allElements[i].id.includes('intro')) {
                allElements[i].style.visibility = 'hidden';
            }
        }
    }

    startAnimation() {
        this.animateProgress();
        this.animateLoadingText();
        this.scheduleWelcome();
    }

    animateProgress() {
        const progressText = document.getElementById('progress-text');
        const progressFill = document.querySelector('.progress-fill');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                progressText.textContent = '¡Completado!';
                this.endIntro();
            } else {
                progressText.textContent = `${Math.round(progress)}% completado`;
            }
        }, 150);

        // Stop animation after 5 seconds max
        setTimeout(() => {
            if (progress < 100) {
                clearInterval(interval);
                progressFill.style.width = '100%';
                this.endIntro();
            }
        }, 5000);
    }

    animateLoadingText() {
        const textElements = document.querySelectorAll('.loading-text p');
        
        textElements.forEach((text, index) => {
            setTimeout(() => {
                text.style.opacity = '1';
            }, (index + 1) * 800);
        });
    }

    scheduleWelcome() {
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 3500);
    }

    showWelcomeMessage() {
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.style.opacity = '1';
            welcomeMessage.style.transform = 'translateY(0)';
        }
    }

    endIntro() {
        setTimeout(() => {
            this.fadeOutIntro();
        }, 1000);
    }

    fadeOutIntro() {
        const introContainer = document.getElementById('intro-container');
        const allElements = document.body.children;
        
        introContainer.classList.add('fade-out');
        
        setTimeout(() => {
            // Remove intro
            introContainer.remove();
            
            // Show all content
            for (let i = 0; i < allElements.length; i++) {
                allElements[i].style.visibility = 'visible';
            }
            
            // Trigger main app initialization
            this.initializeMainApp();
        }, 1000);
    }

    initializeMainApp() {
        // Initialize main app functionality
        if (typeof window.initializeApp === 'function') {
            window.initializeApp();
        }
        
        // Add fade-in animation to main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.classList.add('fade-in-up');
        }
    }

    bindEvents() {
        // Skip intro if user clicks
        document.addEventListener('click', (e) => {
            if (document.getElementById('intro-container')) {
                this.endIntro();
            }
        });

        // Skip intro with Enter or Space
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                if (document.getElementById('intro-container')) {
                    e.preventDefault();
                    this.endIntro();
                }
            }
        });
    }
}

// Christmas Theme Integration
class ChristmasIntro extends IntroAnimation {
    setup() {
        super.setup();
        this.applyChristmasTheme();
    }

    applyChristmasTheme() {
        const introContainer = document.getElementById('intro-container');
        if (introContainer) {
            introContainer.classList.add('christmas-theme');
        }
    }

    showWelcomeMessage() {
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.classList.add('christmas-welcome');
            welcomeMessage.style.opacity = '1';
            welcomeMessage.style.transform = 'translateY(0)';
        }
    }
}

// Initialize intro based on theme
function initIntro() {
    const isChristmasTheme = localStorage.getItem('christmas-theme') === 'true';
    
    if (isChristmasTheme) {
        new ChristmasIntro();
    } else {
        new IntroAnimation();
    }
}

// Auto-start intro unless user has disabled it
if (!localStorage.getItem('skip-intro')) {
    initIntro();
} else {
    // Skip intro for returning users
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.classList.add('fade-in-up');
    }
}

// Export for global access
window.IntroAnimation = IntroAnimation;
window.ChristmasIntro = ChristmasIntro;