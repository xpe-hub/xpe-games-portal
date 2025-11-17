/**
 * xpe.games - Main Application (SIMPLIFIED)
 * Handles basic page initialization and navigation
 */

class GameZoneApp {
    constructor() {
        this.isLoading = true;
        this.currentSection = 'home';
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 Iniciando xpe.games...');
            
            // Show loading screen
            this.showLoadingScreen();
            
            // Wait for DOM
            await this.waitForDOM();
            
            // Initialize components
            await this.initializeComponents();
            
            // Setup basic navigation
            this.setupNavigation();
            
            // Hide loading screen
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1500);
            
            console.log('✅ xpe.games cargado exitosamente');
            
        } catch (error) {
            console.error('❌ Error:', error);
            this.hideLoadingScreen();
        }
    }
    
    async waitForDOM() {
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
    }
    
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        this.isLoading = false;
    }
    
    async initializeComponents() {
        console.log('⚙️ Inicializando componentes...');
        
        // Setup basic event listeners
        this.setupEventListeners();
        
        // Small delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setupEventListeners() {
        console.log('👂 Configurando event listeners...');
        
        // Global functions for HTML onclick handlers
        window.toggleMobileMenu = () => this.toggleMobileMenu();
        window.closeMobileMenu = () => this.closeMobileMenu();
        window.scrollToGames = () => this.scrollToGames();
        window.connectDiscord = () => {
            console.log('🔗 Conectar Discord clickeado');
            alert('Discord se conectará próximamente...');
        };
        
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    this.navigateToSection(href.substring(1));
                }
            });
        });
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                console.log('🔍 Buscando:', searchInput.value);
                // Simple filter
                this.filterGames(searchInput.value);
            });
        }
    }
    
    setupNavigation() {
        console.log('🧭 Configurando navegación...');
        
        // Update active nav link based on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('show');
        }
    }
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('show');
        }
    }
    
    scrollToGames() {
        const gamesSection = document.getElementById('games');
        if (gamesSection) {
            gamesSection.scrollIntoView({ behavior: 'smooth' });
        }
        this.closeMobileMenu();
    }
    
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            this.closeMobileMenu();
        }
    }
    
    filterGames(searchTerm) {
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            const title = card.querySelector('.game-title');
            if (title) {
                const text = title.textContent.toLowerCase();
                if (text.includes(searchTerm.toLowerCase()) || searchTerm === '') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
}

// Initialize the app when DOM is ready
let app;

// Wait for DOM and then initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new GameZoneApp();
    });
} else {
    app = new GameZoneApp();
}