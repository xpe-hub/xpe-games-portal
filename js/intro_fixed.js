// ===== INTRO ANIMATION FIXED VERSION =====

class SimpleIntro {
    constructor() {
        this.container = null;
        this.progress = 0;
        this.loadingTexts = [
            "Cargando xpe.games...",
            "Preparando tu aventura gaming...",
            "Conectando con servidores...",
            "¡Casi listo para jugar!"
        ];
        this.init();
    }

    init() {
        console.log('Iniciando intro...');
        
        // Ensure DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createIntro());
        } else {
            // DOM is already ready
            setTimeout(() => this.createIntro(), 100);
        }
    }

    createIntro() {
        console.log('Creando elementos de intro...');
        
        // Remove existing intro if any
        const existingIntro = document.getElementById('simple-intro');
        if (existingIntro) {
            existingIntro.remove();
        }

        // Create intro HTML
        const introHTML = `
            <div id="simple-intro" class="simple-intro">
                <div class="intro-content">
                    <div class="intro-logo">
                        <i class="fas fa-crown crown-icon"></i>
                        <h1 class="intro-title">xpe.games</h1>
                        <p class="intro-subtitle">Tu Máquina del Tiempo Digital</p>
                    </div>
                    
                    <div class="progress-section">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <div class="progress-text" id="progress-text">0% completado</div>
                    </div>
                    
                    <div class="loading-text" id="loading-text">Cargando xpe.games...</div>
                </div>
                
                <!-- Christmas decorations -->
                <div class="christmas-decorations">
                    <div class="snowflake">❄️</div>
                    <div class="snowflake">🎄</div>
                    <div class="snowflake">❄️</div>
                    <div class="snowflake">🎁</div>
                    <div class="snowflake">❄️</div>
                </div>
                
                <!-- Skip option -->
                <div class="skip-intro" onclick="window.skipIntro()">
                    <i class="fas fa-forward"></i> Saltar
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', introHTML);
        this.container = document.getElementById('simple-intro');
        
        // Hide main content temporarily
        this.hideMainContent();
        
        // Start animation
        this.startLoading();
    }

    hideMainContent() {
        // Hide all content except intro
        const mainContent = document.querySelector('main');
        const sidebar = document.querySelector('.sidebar');
        const header = document.querySelector('header');
        
        if (mainContent) mainContent.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        if (header) header.style.display = 'none';
    }

    showMainContent() {
        // Show all main content
        const mainContent = document.querySelector('main');
        const sidebar = document.querySelector('.sidebar');
        const header = document.querySelector('header');
        
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.classList.add('fade-in');
        }
        if (sidebar) {
            sidebar.style.display = 'block';
            sidebar.classList.add('fade-in');
        }
        if (header) {
            header.style.display = 'block';
            header.classList.add('fade-in');
        }
    }

    startLoading() {
        console.log('Iniciando carga...');
        let currentTextIndex = 0;
        let currentProgress = 0;

        // Progress animation
        const progressInterval = setInterval(() => {
            currentProgress += Math.random() * 20 + 10;
            
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressInterval);
                this.completeLoading();
            }
            
            // Update progress
            this.updateProgress(currentProgress);
            
            // Update text every 25% progress
            if (currentProgress >= (currentTextIndex + 1) * 25 && currentTextIndex < 3) {
                currentTextIndex++;
                this.updateLoadingText(this.loadingTexts[currentTextIndex]);
            }
        }, 200);

        // Maximum 6 seconds timeout
        setTimeout(() => {
            console.log('Timeout reached, forcing completion...');
            clearInterval(progressInterval);
            this.updateProgress(100);
            this.completeLoading();
        }, 6000);
    }

    updateProgress(progress) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progressText) {
            progressText.textContent = Math.round(progress) + '% completado';
        }
    }

    updateLoadingText(text) {
        const loadingText = document.getElementById('loading-text');
        if (loadingText) {
            loadingText.textContent = text;
        }
    }

    completeLoading() {
        console.log('Carga completada, cerrando intro...');
        
        // Update final text
        this.updateLoadingText('¡Listo para jugar!');
        
        setTimeout(() => {
            this.closeIntro();
        }, 500);
    }

    closeIntro() {
        console.log('Cerrando intro...');
        
        if (this.container) {
            this.container.style.opacity = '0';
            this.container.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.container.remove();
                this.showMainContent();
                
                // Initialize main app
                if (typeof window.initializeApp === 'function') {
                    window.initializeApp();
                }
                
                console.log('Intro cerrada completamente');
            }, 500);
        }
    }
}

// Global function to skip intro
window.skipIntro = function() {
    console.log('Intro saltada por usuario');
    if (window.currentIntro && typeof window.currentIntro.closeIntro === 'function') {
        window.currentIntro.closeIntro();
    }
};

// Initialize intro when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM listo, iniciando intro simple...');
    window.currentIntro = new SimpleIntro();
});

// Fallback: If DOMContentLoaded already fired
if (document.readyState !== 'loading') {
    setTimeout(() => {
        if (!window.currentIntro) {
            console.log('Iniciando intro como fallback...');
            window.currentIntro = new SimpleIntro();
        }
    }, 100);
}