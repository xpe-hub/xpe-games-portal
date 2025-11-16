/**
 * GameZone - Main Application Controller
 * Handles page initialization, navigation, and general functionality
 */

class GameZoneApp {
    constructor() {
        this.isLoading = true;
        this.currentSection = 'home';
        this.scrollThrottle = null;
        this.init();
    }
    
    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize components
            await this.initializeComponents();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup navigation
            this.setupNavigation();
            
            // Setup animations
            this.setupAnimations();
            
            // Setup statistics counter
            this.setupStatsCounter();
            
            // Hide loading screen
            await this.hideLoadingScreen();
            
            console.log('🎮 GameZone initialized successfully');
            
        } catch (error) {
            console.error('Error initializing GameZone:', error);
            this.hideLoadingScreen();
        }
    }
    
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }
    
    async hideLoadingScreen() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        resolve();
                    }, 500);
                } else {
                    resolve();
                }
            }, 1500); // Show loading for at least 1.5 seconds
        });
    }
    
    async initializeComponents() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Small delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setupEventListeners() {
        // Navigation
        window.toggleMobileMenu = () => this.toggleMobileMenu();
        window.closeMobileMenu = () => this.closeMobileMenu();
        window.scrollToGames = () => this.scrollToGames();
        window.connectDiscord = () => window.discordManager?.connect();
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', Config.utils.debounce(() => {
                this.filterGames();
            }, 300));
        }
        
        // Click outside to close menus
        document.addEventListener('click', (e) => {
            this.handleClickOutside(e);
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        // Scroll events
        window.addEventListener('scroll', Config.utils.throttle(() => {
            this.handleScroll();
        }, 100));
        
        // Window resize
        window.addEventListener('resize', Config.utils.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Filter buttons
        this.setupFilterButtons();
    }
    
    setupFilterButtons() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                if (window.gamesManager) {
                    window.gamesManager.filterByCategory(filter);
                }
            });
        });
    }
    
    setupNavigation() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.navigateToSection(href.substring(1));
                }
            });
        });
    }
    
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Update active nav link
            this.updateActiveNavLink(sectionId);
            
            // Smooth scroll to section
            const headerHeight = 80; // Height of fixed header
            const sectionTop = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            this.closeMobileMenu();
        }
    }
    
    updateActiveNavLink(activeSection) {
        // Update desktop nav
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupAnimations() {
        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation
            const animatedElements = document.querySelectorAll('.game-card, .stat-card, .community-card, .about-card');
            animatedElements.forEach(el => {
                el.classList.add('animate-element');
                observer.observe(el);
            });
        }
    }
    
    setupStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) return;
        
        // Use Intersection Observer to trigger counter when visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                        this.animateCounter(entry.target);
                        entry.target.classList.add('counted');
                    }
                });
            }, { threshold: 0.5 });
            
            statNumbers.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            statNumbers.forEach(el => this.animateCounter(el));
        }
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target')) || 0;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const startValue = 0;
        
        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
            
            element.textContent = this.formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    }
    
    formatNumber(num) {
        return Config.utils.formatNumber(num);
    }
    
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('show');
            
            // Update hamburger icon
            const menuBtn = document.querySelector('.mobile-menu-btn i');
            if (menuBtn) {
                menuBtn.className = mobileMenu.classList.contains('show') ? 
                    'fas fa-times' : 'fas fa-bars';
            }
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('show') ? 'hidden' : '';
        }
    }
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
            
            // Reset hamburger icon
            const menuBtn = document.querySelector('.mobile-menu-btn i');
            if (menuBtn) {
                menuBtn.className = 'fas fa-bars';
            }
        }
    }
    
    handleClickOutside(e) {
        // Close user dropdown if clicking outside
        const userDropdown = document.getElementById('userDropdown');
        const userBtn = document.querySelector('.user-btn');
        
        if (userDropdown && userBtn && !userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('show');
        }
        
        // Close mobile menu if clicking outside
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenuBtn && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) &&
            mobileMenu.classList.contains('show')) {
            this.closeMobileMenu();
        }
    }
    
    handleKeyboardShortcuts(e) {
        // Escape key closes modals and menus
        if (e.key === 'Escape') {
            this.closeMobileMenu();
            
            // Close any open modals
            const openModals = document.querySelectorAll('.modal.show, .game-modal.show');
            openModals.forEach(modal => {
                modal.classList.remove('show');
            });
        }
        
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        // Update navbar background on scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update active navigation based on scroll position
        this.updateNavigationOnScroll();
    }
    
    updateNavigationOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.updateActiveNavLink(sectionId);
            }
        });
    }
    
    handleResize() {
        // Close mobile menu on desktop resize
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
        
        // Recalculate any size-dependent elements
        this.recalculateLayout();
    }
    
    recalculateLayout() {
        // Force redraw of any problematic elements
        const animatedElements = document.querySelectorAll('.animate-element');
        animatedElements.forEach(el => {
            el.style.transform = 'translateZ(0)'; // Force hardware acceleration
        });
    }
    
    scrollToGames() {
        this.navigateToSection('games');
    }
    
    filterGames() {
        if (window.gamesManager) {
            window.gamesManager.filterGames();
        }
    }
    
    // Utility Methods
    showNotification(message, type = 'info') {
        if (window.authManager) {
            window.authManager.showNotification(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
    
    // Theme Management
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        Config.storage.set(Config.STORAGE_KEYS.THEME, theme);
    }
    
    getTheme() {
        return Config.storage.get(Config.STORAGE_KEYS.THEME, 'dark');
    }
    
    // Language Management
    setLanguage(language) {
        document.documentElement.setAttribute('lang', language);
        Config.storage.set(Config.STORAGE_KEYS.LANGUAGE, language);
    }
    
    getLanguage() {
        return Config.storage.get(Config.STORAGE_KEYS.LANGUAGE, 'es');
    }
    
    // Performance Monitoring
    monitorPerformance() {
        if (!Config.PERFORMANCE.ENABLED) return;
        
        // Monitor FPS
        let lastTime = performance.now();
        let frameCount = 0;
        
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
                
                if (fps < 30) {
                    console.warn(`Low FPS detected: ${fps}`);
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
        
        // Monitor memory usage (if available)
        if (window.performance && window.performance.memory) {
            setInterval(() => {
                const memory = window.performance.memory;
                if (memory.usedJSHeapSize / 1024 / 1024 > 50) { // 50MB threshold
                    console.warn('High memory usage detected');
                }
            }, 10000);
        }
    }
    
    // Error Handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.logError('JavaScript Error', e.error.message, e.filename, e.lineno);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.logError('Promise Rejection', e.reason?.message || e.reason);
        });
    }
    
    logError(type, message, file, line) {
        const errorLog = {
            type,
            message,
            file,
            line,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Store error locally for debugging
        const errors = Config.storage.get('gamezone_errors', []);
        errors.push(errorLog);
        
        // Keep only last 10 errors
        if (errors.length > 10) {
            errors.splice(0, errors.length - 10);
        }
        
        Config.storage.set('gamezone_errors', errors);
        
        // In a real app, you might send this to an error tracking service
        if (Config.ERROR_HANDLING.AUTO_REPORT) {
            this.reportError(errorLog);
        }
    }
    
    reportError(errorLog) {
        // In a real implementation, send to error tracking service
        console.log('Reporting error:', errorLog);
    }
}

// Global Functions
window.showAbout = () => {
    const aboutInfo = `
GameZone - Portal Profesional de Juegos Web

Creado por: ${Config.CREATOR}
Versión: ${Config.VERSION}
© 2025 GameZone. Todos los derechos reservados.

Nuestra misión es crear la mejor plataforma de juegos web 
que una a jugadores de todo el mundo en una experiencia 
divertida y emocionante.

Características:
• Juegos 100% gratuitos
• Compatible con todos los dispositivos  
• Comunidad Discord activa
• Rankings y logros
• Sin descargas necesarias

¡Gracias por usar GameZone! 🎮
    `;
    
    alert(aboutInfo);
};

window.showContact = () => {
    const contactInfo = `
Contacta con GameZone:

📧 Email: contacto@gamezone.com
💬 Discord: ${Config.SOCIAL.DISCORD}
🐦 Twitter: ${Config.SOCIAL.TWITTER}
📘 Facebook: ${Config.SOCIAL.FACEBOOK}

Soporte técnico y sugerencias son bienvenidas.
¡Síguenos en redes sociales para las últimas novedades!
    `;
    
    alert(contactInfo);
};

// Initialize the application
const app = new GameZoneApp();

// Add some additional CSS for animations
const additionalStyles = `
    .animate-element {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar.scrolled {
        background: rgba(15, 23, 42, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .loading-dots {
        display: flex;
        gap: 4px;
        justify-content: center;
        margin-top: 10px;
    }
    
    .loading-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-color);
        animation: loadingDots 1.4s infinite ease-in-out;
    }
    
    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes loadingDots {
        0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .fade-in {
        animation: fadeInUp 0.5s ease-out;
    }
    
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .game-placeholder {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-secondary);
    }
    
    .game-placeholder i {
        font-size: 4rem;
        color: var(--primary-color);
        margin-bottom: 20px;
        opacity: 0.7;
    }
    
    .game-placeholder h3 {
        font-size: 1.5rem;
        margin-bottom: 15px;
        color: var(--text-primary);
    }
    
    .game-placeholder p {
        margin-bottom: 30px;
        line-height: 1.6;
    }
    
    .game-features {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
        margin: 0 auto;
    }
    
    .game-features .feature {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        background: rgba(124, 58, 237, 0.1);
        border-radius: 8px;
        font-size: 0.9rem;
    }
    
    .game-features .feature i {
        font-size: 1rem;
        color: var(--accent-green);
        margin: 0;
    }
    
    .game-error {
        text-align: center;
        padding: 40px 20px;
        color: var(--accent-red);
    }
    
    .game-error i {
        font-size: 3rem;
        margin-bottom: 20px;
    }
    
    .game-error h3 {
        margin-bottom: 15px;
    }
    
    .game-error p {
        margin-bottom: 25px;
    }
    
    .game-over-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
    }
    
    .game-over-content {
        background: var(--bg-secondary);
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        border: 1px solid var(--bg-tertiary);
    }
    
    .game-over-content h3 {
        margin-bottom: 15px;
        color: var(--accent-red);
    }
    
    .game-over-content p {
        margin-bottom: 20px;
    }
`;

// Add the additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameZoneApp;
}

// ========== PREMIUM FEATURES & MONETIZATION ==========

// Donation Functions
let selectedDonationAmount = 0;

function showDonationModal() {
    document.getElementById('donationModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideDonationModal() {
    document.getElementById('donationModal').classList.remove('active');
    document.body.style.overflow = '';
    selectedDonationAmount = 0;
}

function selectDonation(amount) {
    selectedDonationAmount = amount;
    // Remove previous selection
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    // Add selection to clicked button
    event.target.classList.add('selected');
}

function donateWithPayPal() {
    if (selectedDonationAmount === 0) {
        alert('Por favor selecciona un monto para donar.');
        return;
    }
    window.open(`https://paypal.me/xpegames/${selectedDonationAmount}`, '_blank');
    hideDonationModal();
    showDonationConfirmation();
}

function donateWithCrypto() {
    hideDonationModal();
    showCryptoModal();
}

function donateWithStripe() {
    if (selectedDonationAmount === 0) {
        alert('Por favor selecciona un monto para donar.');
        return;
    }
    // Here you would integrate with Stripe
    alert(`Donación de $${selectedDonationAmount} procesada. ¡Gracias por tu apoyo!`);
    hideDonationModal();
    showDonationConfirmation();
}

function showDonationConfirmation() {
    // Show a thank you message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: var(--accent-green); color: white; padding: 1rem 2rem; border-radius: 0.5rem; z-index: 10000; animation: slideIn 0.3s ease;">
            <i class="fas fa-heart"></i> ¡Gracias por apoyar xpe.games! ❤️
        </div>
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// Premium Functions
function showPremiumModal() {
    document.getElementById('premiumModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hidePremiumModal() {
    document.getElementById('premiumModal').classList.remove('active');
    document.body.style.overflow = '';
}

function subscribePremium() {
    // Here you would integrate with payment processor
    alert('Funcionalidad premium próximamente. ¡Mantente atento!');
}

function subscribeVIP() {
    // Here you would integrate with payment processor
    alert('Funcionalidad VIP próximamente. ¡Mantente atento!');
}

// Crypto Functions
function showCryptoModal() {
    document.getElementById('cryptoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideCryptoModal() {
    document.getElementById('cryptoModal').classList.remove('active');
    document.body.style.overflow = '';
}

function copyAddress(address) {
    navigator.clipboard.writeText(address).then(() => {
        // Show copy confirmation
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: var(--primary-color); color: white; padding: 1rem 2rem; border-radius: 0.5rem; z-index: 10000; animation: slideIn 0.3s ease;">
                <i class="fas fa-copy"></i> ¡Dirección copiada!
            </div>
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
    }).catch(err => {
        console.error('Error copying address:', err);
        alert('Error al copiar la dirección. Por favor cópiala manualmente.');
    });
}

// Analytics
function trackEvent(eventName, eventData = {}) {
    if (Config.FEATURES.ANALYTICS && Config.ANALYTICS.GOOGLE_ANALYTICS.ENABLED) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, eventData);
}

// Tournament System
const TournamentSystem = {
    currentTournament: null,
    
    init() {
        this.checkActiveTournaments();
        this.setupTournamentNotifications();
    },
    
    checkActiveTournaments() {
        // Simulate tournament data
        this.currentTournament = {
            name: 'Torneo Semanal Snake',
            game: 'snake',
            prize: '$25 Gift Card',
            participants: 156,
            maxParticipants: 500,
            endsIn: '2 días',
            status: 'active'
        };
    },
    
    setupTournamentNotifications() {
        // Show tournament banner if active
        if (this.currentTournament) {
            this.showTournamentBanner();
        }
    },
    
    showTournamentBanner() {
        const banner = document.createElement('div');
        banner.className = 'tournament-banner';
        banner.innerHTML = `
            <div class="tournament-content">
                <i class="fas fa-trophy"></i>
                <div>
                    <h4>${this.currentTournament.name}</h4>
                    <p>Premio: ${this.currentTournament.prize} | Termina en: ${this.currentTournament.endsIn}</p>
                </div>
                <button class="tournament-btn" onclick="TournamentSystem.joinTournament()">
                    Unirse
                </button>
            </div>
        `;
        document.body.insertBefore(banner, document.querySelector('.navbar').nextSibling);
    },
    
    joinTournament() {
        if (!authSystem.isAuthenticated()) {
            alert('Debes iniciar sesión para unirte al torneo.');
            return;
        }
        alert('¡Te has unido al torneo! Buena suerte.');
        trackEvent('tournament_join', { tournament: this.currentTournament.name });
    }
};

// Initialize tournament system when app loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof TournamentSystem !== 'undefined') {
        TournamentSystem.init();
    }
});

// ========== ENHANCED GAMING FEATURES ==========

// Game Statistics and Analytics
const GameAnalytics = {
    sessionData: {
        startTime: Date.now(),
        gamesPlayed: 0,
        totalPlayTime: 0,
        favoriteGame: null
    },
    
    trackGameStart(gameId) {
        this.sessionData.gamesPlayed++;
        this.startTime = Date.now();
        trackEvent('game_start', { game_id: gameId });
    },
    
    trackGameEnd(gameId, score, playTime) {
        this.sessionData.totalPlayTime += playTime;
        
        // Update local statistics
        const userStats = Config.storage.get('user_stats', {});
        if (!userStats[gameId]) {
            userStats[gameId] = {
                gamesPlayed: 0,
                totalScore: 0,
                bestScore: 0,
                totalPlayTime: 0
            };
        }
        
        userStats[gameId].gamesPlayed++;
        userStats[gameId].totalScore += score;
        userStats[gameId].bestScore = Math.max(userStats[gameId].bestScore, score);
        userStats[gameId].totalPlayTime += playTime;
        
        Config.storage.set('user_stats', userStats);
        
        trackEvent('game_end', { 
            game_id: gameId, 
            score: score, 
            play_time: playTime 
        });
    },
    
    getPlayerStats() {
        return Config.storage.get('user_stats', {});
    }
};

// Achievement System
const AchievementSystem = {
    achievements: [
        { id: 'first_game', name: 'Primer Juego', description: 'Juega tu primer juego', icon: '🎮' },
        { id: 'snake_master', name: 'Maestro Serpiente', description: 'Alcanza 100 puntos en Snake', icon: '🐍' },
        { id: 'high_scorer', name: 'Puntuador Alto', description: 'Alcanza 500 puntos en cualquier juego', icon: '⭐' },
        { id: 'social_player', name: 'Jugador Social', description: 'Conecta con Discord', icon: '👥' },
        { id: 'premium_user', name: 'Usuario Premium', description: 'Suscríbete a Premium', icon: '👑' },
        { id: 'tournament_winner', name: 'Campeón', description: 'Gana un torneo', icon: '🏆' }
    ],
    
    unlocked: new Set(),
    
    checkAchievements(action, data = {}) {
        this.achievements.forEach(achievement => {
            if (this.unlocked.has(achievement.id)) return;
            
            let unlocked = false;
            
            switch (achievement.id) {
                case 'first_game':
                    unlocked = action === 'game_start';
                    break;
                case 'snake_master':
                    unlocked = action === 'game_end' && data.gameId === 'snake' && data.score >= 100;
                    break;
                case 'high_scorer':
                    unlocked = action === 'game_end' && data.score >= 500;
                    break;
                case 'social_player':
                    unlocked = action === 'discord_connected';
                    break;
                case 'premium_user':
                    unlocked = action === 'premium_subscribed';
                    break;
                case 'tournament_winner':
                    unlocked = action === 'tournament_win';
                    break;
            }
            
            if (unlocked) {
                this.unlockAchievement(achievement);
            }
        });
    },
    
    unlockAchievement(achievement) {
        this.unlocked.add(achievement.id);
        
        // Save to storage
        const unlockedAchievements = Config.storage.get('unlocked_achievements', []);
        unlockedAchievements.push({
            ...achievement,
            unlockedAt: new Date().toISOString()
        });
        Config.storage.set('unlocked_achievements', unlockedAchievements);
        
        // Show notification
        this.showAchievementNotification(achievement);
        
        trackEvent('achievement_unlock', { achievement_id: achievement.id });
    },
    
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>¡Logro Desbloqueado!</h4>
                    <p>${achievement.name}</p>
                    <span>${achievement.description}</span>
                </div>
                <button class="close-achievement" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    },
    
    getUnlockedAchievements() {
        return Array.from(this.unlocked);
    }
};

// PWA Installation
const PWAInstaller = {
    deferredPrompt: null,
    
    init() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallBanner();
        });
    },
    
    showInstallBanner() {
        const banner = document.createElement('div');
        banner.className = 'pwa-install-banner';
        banner.innerHTML = `
            <div class="install-content">
                <i class="fas fa-download"></i>
                <div>
                    <h4>¡Instala xpe.games!</h4>
                    <p>Agrega xpe.games a tu pantalla de inicio para acceso rápido</p>
                </div>
                <div class="install-actions">
                    <button onclick="PWAInstaller.installApp()">Instalar</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">Ahora no</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
    },
    
    async installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                trackEvent('pwa_install', { result: 'accepted' });
            }
            this.deferredPrompt = null;
            document.querySelector('.pwa-install-banner')?.remove();
        }
    }
};

// Initialize PWA installer
document.addEventListener('DOMContentLoaded', () => {
    PWAInstaller.init();
});