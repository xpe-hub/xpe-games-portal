/**
 * GameZone - Authentication System
 * Handles user authentication, registration, and session management
 */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.authListeners = [];
        this.init();
    }
    
    init() {
        this.loadStoredUser();
        this.setupEventListeners();
        this.updateUI();
    }
    
    setupEventListeners() {
        // Modal controls
        window.showLoginModal = () => this.showLoginModal();
        window.hideLoginModal = () => this.hideLoginModal();
        window.showRegisterModal = () => this.showRegisterModal();
        window.hideRegisterModal = () => this.hideRegisterModal();
        
        // Form handlers
        window.handleLogin = (event) => this.handleLogin(event);
        window.handleRegister = (event) => this.handleRegister(event);
        
        // Discord auth
        window.loginWithDiscord = () => this.loginWithDiscord();
        window.logout = () => this.logout();
        
        // User menu
        window.toggleUserMenu = () => this.toggleUserMenu();
    }
    
    // Modal Management
    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus first input
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }
    
    hideLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            this.clearForm('login');
        }
    }
    
    showRegisterModal() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus first input
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }
    
    hideRegisterModal() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            this.clearForm('register');
        }
    }
    
    clearForm(type) {
        const form = document.querySelector(`#${type}Modal .auth-form`);
        if (form) {
            form.reset();
            this.clearValidationErrors(form);
        }
    }
    
    // Authentication Methods
    async handleLogin(event) {
        event.preventDefault();
        
        const form = event.target;
        const email = form.querySelector('#loginEmail').value;
        const password = form.querySelector('#loginPassword').value;
        
        if (!this.validateLogin(email, password)) {
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        this.setButtonLoading(submitBtn, true);
        
        try {
            // Simulate API call
            await this.simulateAPICall(1000);
            
            // Create mock user
            const user = {
                id: this.generateUserId(),
                username: email.split('@')[0],
                email: email,
                avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(email.split('@')[0]),
                discordConnected: false,
                achievements: [],
                totalGames: 0,
                joinedAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            this.login(user, 'mock_token_' + Date.now());
            this.hideLoginModal();
            
            this.showNotification('¡Bienvenido de vuelta!', 'success');
            
        } catch (error) {
            this.showNotification('Error al iniciar sesión. Verifica tus credenciales.', 'error');
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }
    
    async handleRegister(event) {
        event.preventDefault();
        
        const form = event.target;
        const username = form.querySelector('#registerUsername').value;
        const email = form.querySelector('#registerEmail').value;
        const password = form.querySelector('#registerPassword').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;
        
        if (!this.validateRegister(username, email, password, confirmPassword)) {
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        this.setButtonLoading(submitBtn, true);
        
        try {
            // Simulate API call
            await this.simulateAPICall(1500);
            
            // Create new user
            const user = {
                id: this.generateUserId(),
                username: username,
                email: email,
                avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(username),
                discordConnected: false,
                achievements: ['first_game'],
                totalGames: 0,
                joinedAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            this.login(user, 'mock_token_' + Date.now());
            this.hideRegisterModal();
            
            this.showNotification('¡Cuenta creada exitosamente!', 'success');
            this.unlockAchievement('first_game');
            
        } catch (error) {
            this.showNotification('Error al crear la cuenta. Intenta de nuevo.', 'error');
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }
    
    async loginWithDiscord() {
        // Simulate Discord OAuth
        const discordBtn = document.querySelector('.btn-discord');
        this.setButtonLoading(discordBtn, true);
        
        try {
            await this.simulateAPICall(2000);
            
            // Mock Discord user data
            const user = {
                id: this.generateUserId(),
                username: 'DiscordUser',
                email: 'user@discord.com',
                avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
                discordConnected: true,
                discordId: 'discord_' + Date.now(),
                achievements: ['first_game', 'social_butterfly'],
                totalGames: 0,
                joinedAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            this.login(user, 'discord_token_' + Date.now());
            this.hideLoginModal();
            
            this.showNotification('¡Conectado con Discord!', 'success');
            this.unlockAchievement('social_butterfly');
            
        } catch (error) {
            this.showNotification('Error al conectar con Discord.', 'error');
        } finally {
            this.setButtonLoading(discordBtn, false);
        }
    }
    
    login(user, token) {
        this.currentUser = user;
        this.isAuthenticated = true;
        
        // Store in localStorage
        Config.storage.set(Config.STORAGE_KEYS.USER_TOKEN, token);
        Config.storage.set(Config.STORAGE_KEYS.USER_DATA, user);
        
        // Update UI
        this.updateUI();
        
        // Notify listeners
        this.notifyAuthListeners('login', user);
        
        // Track analytics
        if (Config.ANALYTICS.ENABLED) {
            this.trackEvent(Config.ANALYTICS.EVENTS.USER_LOGIN, {
                method: user.discordConnected ? 'discord' : 'email'
            });
        }
    }
    
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Clear storage
        Config.storage.remove(Config.STORAGE_KEYS.USER_TOKEN);
        Config.storage.remove(Config.STORAGE_KEYS.USER_DATA);
        
        // Update UI
        this.updateUI();
        
        // Notify listeners
        this.notifyAuthListeners('logout');
        
        // Hide user menu if open
        this.hideUserMenu();
        
        this.showNotification('Sesión cerrada exitosamente', 'info');
    }
    
    loadStoredUser() {
        const token = Config.storage.get(Config.STORAGE_KEYS.USER_TOKEN);
        const userData = Config.storage.get(Config.STORAGE_KEYS.USER_DATA);
        
        if (token && userData) {
            this.currentUser = userData;
            this.isAuthenticated = true;
        }
    }
    
    // UI Updates
    updateUI() {
        const userMenu = document.getElementById('userMenu');
        const loginBtn = document.querySelector('.login-btn');
        
        if (this.isAuthenticated && this.currentUser) {
            // Show user menu
            if (userMenu) {
                userMenu.style.display = 'flex';
                const username = document.getElementById('username');
                const avatar = userMenu.querySelector('.user-avatar');
                
                if (username) {
                    username.textContent = this.currentUser.username;
                }
                
                if (avatar && this.currentUser.avatar) {
                    avatar.src = this.currentUser.avatar;
                    avatar.alt = this.currentUser.username;
                }
            }
            
            // Hide login button
            if (loginBtn) {
                loginBtn.style.display = 'none';
            }
        } else {
            // Hide user menu
            if (userMenu) {
                userMenu.style.display = 'none';
            }
            
            // Show login button
            if (loginBtn) {
                loginBtn.style.display = 'block';
            }
        }
    }
    
    toggleUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }
    
    hideUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
    
    // Validation
    validateLogin(email, password) {
        const errors = [];
        
        if (!email || !email.includes('@')) {
            errors.push('Email válido requerido');
        }
        
        if (!password || password.length < 6) {
            errors.push('Contraseña de al menos 6 caracteres');
        }
        
        if (errors.length > 0) {
            this.showValidationErrors('login', errors);
            return false;
        }
        
        return true;
    }
    
    validateRegister(username, email, password, confirmPassword) {
        const errors = [];
        
        if (!username || username.length < 3) {
            errors.push('Nombre de usuario de al menos 3 caracteres');
        }
        
        if (!email || !email.includes('@')) {
            errors.push('Email válido requerido');
        }
        
        if (!password || password.length < 6) {
            errors.push('Contraseña de al menos 6 caracteres');
        }
        
        if (password !== confirmPassword) {
            errors.push('Las contraseñas no coinciden');
        }
        
        if (errors.length > 0) {
            this.showValidationErrors('register', errors);
            return false;
        }
        
        return true;
    }
    
    showValidationErrors(type, errors) {
        const form = document.querySelector(`#${type}Modal .auth-form`);
        if (!form) return;
        
        // Remove existing error
        const existingError = form.querySelector('.auth-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error';
        errorDiv.innerHTML = errors.map(error => `• ${error}`).join('<br>');
        
        const submitBtn = form.querySelector('button[type="submit"]');
        form.insertBefore(errorDiv, submitBtn);
    }
    
    clearValidationErrors(form) {
        const error = form.querySelector('.auth-error');
        if (error) {
            error.remove();
        }
    }
    
    // Utility Methods
    setButtonLoading(button, loading) {
        if (loading) {
            button.disabled = true;
            button.classList.add('btn-loading');
            button.setAttribute('data-original-text', button.textContent);
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        } else {
            button.disabled = false;
            button.classList.remove('btn-loading');
            const originalText = button.getAttribute('data-original-text');
            if (originalText) {
                button.textContent = originalText;
            }
        }
    }
    
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    simulateAPICall(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Achievement System
    unlockAchievement(achievementId) {
        if (!this.currentUser) return;
        
        const achievement = Config.ACHIEVEMENTS[achievementId.toUpperCase()];
        if (!achievement) return;
        
        // Check if already unlocked
        if (this.currentUser.achievements.includes(achievementId)) {
            return;
        }
        
        // Add to user achievements
        this.currentUser.achievements.push(achievementId);
        
        // Update storage
        Config.storage.set(Config.STORAGE_KEYS.USER_DATA, this.currentUser);
        
        // Show achievement notification
        this.showAchievementNotification(achievement);
        
        // Track analytics
        if (Config.ANALYTICS.ENABLED) {
            this.trackEvent(Config.ANALYTICS.EVENTS.ACHIEVEMENT_UNLOCK, {
                achievement: achievementId
            });
        }
    }
    
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>¡Logro Desbloqueado!</h4>
                    <p><strong>${achievement.title}</strong></p>
                    <p>${achievement.description}</p>
                    <span class="achievement-points">+${achievement.points} puntos</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, Config.UI.TOAST_DURATION);
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    // Event System
    addAuthListener(callback) {
        this.authListeners.push(callback);
    }
    
    removeAuthListener(callback) {
        this.authListeners = this.authListeners.filter(cb => cb !== callback);
    }
    
    notifyAuthListeners(event, data) {
        this.authListeners.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                console.error('Error in auth listener:', error);
            }
        });
    }
    
    // Analytics
    trackEvent(eventName, data = {}) {
        if (Config.ANALYTICS.ENABLED && window.gtag) {
            window.gtag('event', eventName, data);
        }
    }
}

// Initialize authentication system
window.authManager = new AuthManager();

// Add achievement notification styles
const achievementStyles = `
    .achievement-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #7c3aed, #a855f7);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 350px;
    }
    
    .achievement-notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .achievement-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .achievement-icon {
        font-size: 2rem;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .achievement-info h4 {
        margin: 0 0 5px 0;
        font-size: 0.9rem;
        opacity: 0.9;
    }
    
    .achievement-info p {
        margin: 0 0 5px 0;
        font-size: 0.85rem;
    }
    
    .achievement-points {
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: bold;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--bg-tertiary);
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        min-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification-success {
        border-left: 4px solid var(--accent-green);
    }
    
    .notification-error {
        border-left: 4px solid var(--accent-red);
    }
    
    .notification-warning {
        border-left: 4px solid var(--accent-yellow);
    }
    
    .notification-info {
        border-left: 4px solid var(--accent-blue);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i:first-child {
        color: var(--accent-green);
    }
    
    .notification-error .notification-content i:first-child {
        color: var(--accent-red);
    }
    
    .notification-warning .notification-content i:first-child {
        color: var(--accent-yellow);
    }
    
    .notification-info .notification-content i:first-child {
        color: var(--accent-blue);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        margin-left: auto;
        padding: 5px;
        border-radius: 4px;
        transition: all 0.2s;
    }
    
    .notification-close:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = achievementStyles;
document.head.appendChild(styleSheet);