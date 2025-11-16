/**
 * GameZone - Discord Integration
 * Handles Discord OAuth, community features, and real-time chat
 */

class DiscordManager {
    constructor() {
        this.isConnected = false;
        this.user = null;
        this.voiceChannel = null;
        this.textChannels = [];
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadDiscordStatus();
    }
    
    setupEventListeners() {
        window.connectDiscord = () => this.connect();
        window.disconnectDiscord = () => this.disconnect();
        window.joinVoiceChannel = (channelId) => this.joinVoiceChannel(channelId);
        window.sendMessage = (channelId, message) => this.sendMessage(channelId, message);
    }
    
    loadDiscordStatus() {
        // Check if user has Discord connected
        if (window.authManager && window.authManager.currentUser) {
            this.isConnected = window.authManager.currentUser.discordConnected || false;
            this.user = window.authManager.currentUser.discordId ? {
                id: window.authManager.currentUser.discordId,
                username: window.authManager.currentUser.username,
                avatar: window.authManager.currentUser.avatar
            } : null;
        }
        
        this.updateDiscordUI();
    }
    
    async connect() {
        try {
            // Show connection modal
            this.showConnectionModal();
            
            // Simulate OAuth flow (in real implementation, use Discord OAuth2)
            await this.simulateOAuthFlow();
            
            // Mock successful connection
            const discordUser = {
                id: 'discord_' + Date.now(),
                username: 'GameZoneUser',
                discriminator: '1234',
                avatar: 'https://cdn.discordapp.com/avatars/default.png',
                email: 'user@example.com',
                verified: true
            };
            
            this.user = discordUser;
            this.isConnected = true;
            
            // Update user in auth manager
            if (window.authManager && window.authManager.currentUser) {
                window.authManager.currentUser.discordConnected = true;
                window.authManager.currentUser.discordId = discordUser.id;
                Config.storage.set(Config.STORAGE_KEYS.USER_DATA, window.authManager.currentUser);
            }
            
            this.updateDiscordUI();
            this.showSuccessModal();
            
            // Unlock achievement
            if (window.authManager) {
                window.authManager.unlockAchievement('social_butterfly');
            }
            
            // Track analytics
            this.trackEvent('discord_connect');
            
        } catch (error) {
            console.error('Discord connection failed:', error);
            this.showErrorModal('Error al conectar con Discord. Verifica tu conexión e inténtalo de nuevo.');
        }
    }
    
    disconnect() {
        this.isConnected = false;
        this.user = null;
        this.voiceChannel = null;
        this.textChannels = [];
        
        // Update user in auth manager
        if (window.authManager && window.authManager.currentUser) {
            window.authManager.currentUser.discordConnected = false;
            window.authManager.currentUser.discordId = null;
            Config.storage.set(Config.STORAGE_KEYS.USER_DATA, window.authManager.currentUser);
        }
        
        this.updateDiscordUI();
        
        if (window.authManager) {
            window.authManager.showNotification('Desconectado de Discord', 'info');
        }
    }
    
    async simulateOAuthFlow() {
        // Simulate OAuth popup and authorization
        return new Promise((resolve, reject) => {
            const popup = this.createOAuthPopup();
            
            // Simulate user authorization after 2 seconds
            setTimeout(() => {
                popup.close();
                resolve();
            }, 2000);
        });
    }
    
    createOAuthPopup() {
        const width = 500;
        const height = 600;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        
        const popup = window.open(
            'about:blank',
            'discord_auth',
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=no`
        );
        
        // Mock Discord OAuth page
        popup.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Autorizar GameZone</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        margin: 0;
                        padding: 40px;
                        background: #36393f;
                        color: #dcddde;
                        text-align: center;
                    }
                    .logo {
                        font-size: 2rem;
                        margin-bottom: 30px;
                        color: #5865F2;
                    }
                    .content {
                        background: #2f3136;
                        padding: 30px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }
                    .avatar {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        margin: 0 auto 15px;
                        background: #5865F2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                    }
                    .btn {
                        background: #5865F2;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 4px;
                        font-weight: 600;
                        cursor: pointer;
                        margin: 5px;
                    }
                    .btn:hover { background: #4752c4; }
                    .loading {
                        color: #888;
                        font-style: italic;
                    }
                </style>
            </head>
            <body>
                <div class="logo">
                    <i class="fab fa-discord"></i>
                    Discord
                </div>
                <div class="content">
                    <div class="avatar">
                        <i class="fas fa-gamepad"></i>
                    </div>
                    <h2>GameZone quiere acceder a tu cuenta</h2>
                    <p>Esta aplicación podrá:</p>
                    <ul style="text-align: left; display: inline-block;">
                        <li>Ver tu nombre de usuario y avatar</li>
                        <li>Ver tu dirección de correo electrónico</li>
                        <li>Unirte a servidores automáticamente</li>
                    </ul>
                    <br>
                    <button class="btn" onclick="authorize()">Autorizar</button>
                    <button class="btn" onclick="cancel()">Cancelar</button>
                    <div id="status" style="margin-top: 20px;"></div>
                </div>
                
                <script>
                    function authorize() {
                        document.getElementById('status').innerHTML = '<div class="loading">Autorizando...</div>';
                        setTimeout(() => {
                            window.opener.postMessage({ type: 'discord_auth_success' }, '*');
                            window.close();
                        }, 1500);
                    }
                    
                    function cancel() {
                        window.opener.postMessage({ type: 'discord_auth_cancel' }, '*');
                        window.close();
                    }
                    
                    // Listen for messages from parent
                    window.addEventListener('message', (e) => {
                        if (e.data.type === 'discord_auth_cancel') {
                            window.close();
                        }
                    });
                </script>
            </body>
            </html>
        `);
        
        return popup;
    }
    
    updateDiscordUI() {
        // Update Discord button in navigation
        const discordBtns = document.querySelectorAll('.discord-btn');
        discordBtns.forEach(btn => {
            if (this.isConnected && this.user) {
                btn.innerHTML = `
                    <img src="${this.user.avatar}" alt="Avatar" class="discord-avatar" style="width: 20px; height: 20px; border-radius: 50%; margin-right: 8px;">
                    <span>${this.user.username}</span>
                `;
                btn.title = 'Conectado a Discord - Click para desconectar';
                btn.onclick = () => this.disconnect();
                btn.classList.add('connected');
            } else {
                btn.innerHTML = '<i class="fab fa-discord"></i> Discord';
                btn.title = 'Conectar con Discord';
                btn.onclick = () => this.connect();
                btn.classList.remove('connected');
            }
        });
        
        // Update mobile Discord button
        const mobileDiscordBtn = document.querySelector('.mobile-discord');
        if (mobileDiscordBtn) {
            mobileDiscordBtn.innerHTML = this.isConnected && this.user ? 
                `<i class="fab fa-discord"></i> ${this.user.username}` :
                '<i class="fab fa-discord"></i> Discord';
        }
    }
    
    showConnectionModal() {
        const modal = this.createModal('Conectando con Discord', `
            <div class="discord-connecting">
                <div class="discord-logo">
                    <i class="fab fa-discord"></i>
                </div>
                <p>Abriendo ventana de autorización...</p>
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
    }
    
    showSuccessModal() {
        const modal = this.createModal('¡Conectado a Discord!', `
            <div class="discord-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <p>¡Bienvenido a la comunidad de GameZone en Discord!</p>
                <div class="discord-benefits">
                    <h4>Beneficios de estar conectado:</h4>
                    <ul>
                        <li><i class="fas fa-users"></i> Chatea con otros jugadores</li>
                        <li><i class="fas fa-trophy"></i> Participa en torneos</li>
                        <li><i class="fas fa-bell"></i> Recibe notificaciones de nuevos juegos</li>
                        <li><i class="fas fa-star"></i> Acceso a canales exclusivos</li>
                    </ul>
                </div>
                <button class="btn btn-primary" onclick="discordManager.openDiscordServer()">
                    <i class="fab fa-discord"></i>
                    Ir al Servidor
                </button>
            </div>
        `);
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
        
        // Auto close after 5 seconds
        setTimeout(() => this.closeModal(modal), 5000);
    }
    
    showErrorModal(message) {
        const modal = this.createModal('Error de Conexión', `
            <div class="discord-error">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <p>${message}</p>
                <div class="error-actions">
                    <button class="btn btn-primary" onclick="discordManager.connect()">
                        <i class="fas fa-redo"></i>
                        Intentar de Nuevo
                    </button>
                    <button class="btn btn-secondary" onclick="discordManager.closeModal(this.closest('.modal'))">
                        <i class="fas fa-times"></i>
                        Cerrar
                    </button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
    }
    
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content discord-modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-btn" onclick="discordManager.closeModal(this.closest('.modal'))">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Add close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
        
        return modal;
    }
    
    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    openDiscordServer() {
        window.open(Config.SOCIAL.DISCORD, '_blank');
        this.closeModal(document.querySelector('.modal.show'));
    }
    
    joinVoiceChannel(channelId) {
        if (!this.isConnected) {
            this.showErrorModal('Primero debes conectar con Discord');
            return;
        }
        
        // Simulate joining voice channel
        this.voiceChannel = {
            id: channelId,
            name: 'General',
            members: Math.floor(Math.random() * 50) + 10,
            type: 'voice'
        };
        
        this.updateVoiceUI();
        
        if (window.authManager) {
            window.authManager.showNotification(`Unido al canal de voz: ${this.voiceChannel.name}`, 'success');
        }
    }
    
    updateVoiceUI() {
        // Update voice indicators in UI
        const voiceIndicators = document.querySelectorAll('.voice-indicator');
        voiceIndicators.forEach(indicator => {
            if (this.voiceChannel) {
                indicator.classList.add('active');
                indicator.title = `En canal: ${this.voiceChannel.name}`;
            } else {
                indicator.classList.remove('active');
                indicator.title = 'No conectado a voz';
            }
        });
    }
    
    sendMessage(channelId, message) {
        if (!this.isConnected) return;
        
        // Simulate sending message
        const mockMessage = {
            id: Date.now(),
            channelId: channelId,
            content: message,
            author: this.user.username,
            timestamp: new Date().toISOString(),
            type: 'user_message'
        };
        
        // In a real implementation, this would send to Discord API
        console.log('Sending message to Discord:', mockMessage);
        
        this.trackEvent('discord_message_sent', {
            channel_id: channelId,
            message_length: message.length
        });
    }
    
    getServerInfo() {
        return {
            name: 'GameZone Community',
            id: 'gamezone_server',
            description: 'La comunidad oficial de GameZone - Donde los gamers se reúnen',
            memberCount: 5420,
            onlineCount: 234,
            channels: [
                { id: 'general', name: 'general', type: 'text', memberCount: 5420 },
                { id: 'gaming', name: 'gaming', type: 'text', memberCount: 3420 },
                { id: 'voice-general', name: 'General', type: 'voice', memberCount: 45 },
                { id: 'voice-gaming', name: 'Gaming', type: 'voice', memberCount: 23 },
                { id: 'announcements', name: 'anuncios', type: 'text', memberCount: 5420 }
            ],
            roles: [
                { name: 'Administradores', color: '#ff6b6b', memberCount: 5 },
                { name: 'Moderadores', color: '#4ecdc4', memberCount: 12 },
                { name: 'Gamers', color: '#45b7d1', memberCount: 2340 },
                { name: 'Miembros', color: '#96ceb4', memberCount: 3055 }
            ]
        };
    }
    
    getRecentMessages(channelId = 'general', limit = 50) {
        // Mock recent messages
        const users = ['GameMaster', 'PlayerOne', 'SnakeKing', 'TetrisPro', 'StickmanFighter', 'PacManMaster'];
        const messages = [];
        
        for (let i = 0; i < limit; i++) {
            messages.push({
                id: Date.now() - i * 60000,
                content: this.generateMockMessage(),
                author: users[Math.floor(Math.random() * users.length)],
                timestamp: new Date(Date.now() - i * 60000).toISOString(),
                type: 'user_message'
            });
        }
        
        return messages;
    }
    
    generateMockMessage() {
        const messages = [
            '¡Hola a todos! ¿Alguien quiere jugar Snake?',
            'Acabo de conseguir mi mejor puntuación en Tetris: 50,000 puntos! 🎉',
            'El nuevo juego de Stickman Fighter está increíble',
            '¿Hay torneo de Pac-Man esta semana?',
            'Buenos días gamers!',
            'Acabo de desbloquear el logro de Snake Master 🐍',
            '¿Qué tal el gameplay de los nuevos juegos?',
            'Mi ratón de gaming se rompió, recomendaciones?',
            'Recordando los buenos tiempos de los arcades',
            'GameZone sigue siendo la mejor plataforma de juegos web'
        ];
        
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    trackEvent(eventName, data = {}) {
        if (Config.ANALYTICS.ENABLED && window.gtag) {
            window.gtag('event', eventName, {
                ...data,
                platform: 'discord'
            });
        }
    }
    
    // Utility Methods
    isUserInVoiceChannel() {
        return this.voiceChannel !== null;
    }
    
    getVoiceChannelName() {
        return this.voiceChannel ? this.voiceChannel.name : null;
    }
    
    getVoiceChannelMembers() {
        return this.voiceChannel ? this.voiceChannel.members : 0;
    }
}

// Initialize Discord manager
window.discordManager = new DiscordManager();

// Add Discord-specific styles
const discordStyles = `
    .discord-modal {
        max-width: 500px;
    }
    
    .discord-connecting {
        text-align: center;
        padding: 40px 20px;
    }
    
    .discord-logo {
        font-size: 4rem;
        color: #5865F2;
        margin-bottom: 20px;
    }
    
    .discord-success {
        text-align: center;
        padding: 20px;
    }
    
    .success-icon {
        font-size: 3rem;
        color: var(--accent-green);
        margin-bottom: 15px;
    }
    
    .discord-benefits {
        background: rgba(124, 58, 237, 0.1);
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: left;
    }
    
    .discord-benefits h4 {
        margin-bottom: 15px;
        color: var(--text-primary);
    }
    
    .discord-benefits ul {
        list-style: none;
        padding: 0;
    }
    
    .discord-benefits li {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        color: var(--text-secondary);
    }
    
    .discord-benefits i {
        color: var(--primary-color);
        width: 16px;
    }
    
    .discord-error {
        text-align: center;
        padding: 20px;
    }
    
    .error-icon {
        font-size: 3rem;
        color: var(--accent-red);
        margin-bottom: 15px;
    }
    
    .error-actions {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
    }
    
    .discord-btn.connected {
        background: #5865F2;
        color: white;
    }
    
    .discord-avatar {
        border: 2px solid rgba(255, 255, 255, 0.3);
    }
    
    .voice-indicator {
        position: relative;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--text-muted);
        transition: all 0.3s ease;
    }
    
    .voice-indicator.active {
        background: var(--accent-green);
        animation: voicePulse 2s infinite;
    }
    
    @keyframes voicePulse {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
`;

// Add Discord styles to the document
const discordStyleSheet = document.createElement('style');
discordStyleSheet.textContent = discordStyles;
document.head.appendChild(discordStyleSheet);