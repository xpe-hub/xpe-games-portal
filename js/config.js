/**
 * GameZone - Configuration File
 * Global configuration for the application
 */

const Config = {
    // Application Info
    APP_NAME: 'GameZone',
    VERSION: '1.0.0',
    CREATOR: 'MiniMax Agent',
    COPYRIGHT: '© 2025 GameZone. Todos los derechos reservados.',
    
    // API Endpoints
    API_BASE_URL: 'https://api.gamezone.com',
    DISCORD_CLIENT_ID: 'your_discord_client_id',
    DISCORD_REDIRECT_URI: 'https://gamezone.com/auth/discord/callback',
    
    // Local Storage Keys
    STORAGE_KEYS: {
        USER_TOKEN: 'gamezone_user_token',
        USER_DATA: 'gamezone_user_data',
        GAME_PROGRESS: 'gamezone_game_progress',
        SETTINGS: 'gamezone_settings',
        THEME: 'gamezone_theme',
        LANGUAGE: 'gamezone_language'
    },
    
    // Default Game Settings
    GAME_DEFAULTS: {
        SNAKE: {
            SPEED: 150,
            GRID_SIZE: 20,
            INITIAL_LENGTH: 3
        },
        TETRIS: {
            SPEED: 1000,
            LINES_PER_LEVEL: 10
        },
        STICKMAN: {
            AI_DIFFICULTY: 'medium',
            COMBAT_SPEED: 16
        },
        PACMAN: {
            GHOST_SPEED: 80,
            PLAYER_SPEED: 100
        },
        PONG: {
            BALL_SPEED: 5,
            PADDLE_SPEED: 8
        }
    },
    
    // UI Configuration
    UI: {
        ANIMATION_DURATION: 300,
        MODAL_ANIMATION_DURATION: 300,
        LOADING_TIMEOUT: 3000,
        TOAST_DURATION: 3000,
        DEBOUNCE_DELAY: 300
    },
    
    // Social Media Links
    SOCIAL: {
        DISCORD: 'https://discord.gg/gamezone',
        TWITTER: 'https://twitter.com/gamezone',
        FACEBOOK: 'https://facebook.com/gamezone',
        INSTAGRAM: 'https://instagram.com/gamezone',
        YOUTUBE: 'https://youtube.com/gamezone'
    },
    
    // Feature Flags
    FEATURES: {
        DISCORD_INTEGRATION: true,
        REAL_TIME_CHAT: true,
        TOURNAMENTS: true,
        ACHIEVEMENTS: true,
        SOCIAL_LOGIN: true,
        ANALYTICS: true,
        NOTIFICATIONS: true
    },
    
    // Local Storage Helper
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                return false;
            }
        },
        
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        },
        
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return false;
            }
        }
    },
    
    // Utility Functions
    utils: {
        // Debounce function for performance
        debounce(func, wait, immediate = false) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func(...args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func(...args);
            };
        },
        
        // Throttle function for performance
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        // Format numbers with commas
        formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        
        // Format time duration
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
        },
        
        // Generate unique ID
        generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        },
        
        // Check if device is mobile
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        // Check if device is touch
        isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        },
        
        // Copy text to clipboard
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                console.error('Failed to copy text: ', err);
                return false;
            }
        },
        
        // Get random element from array
        random(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
        
        // Clamp number between min and max
        clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        },
        
        // Linear interpolation
        lerp(start, end, factor) {
            return start + (end - start) * factor;
        }
    },
    
    // Color Palette for Games
    COLORS: {
        PRIMARY: '#7c3aed',
        SECONDARY: '#f59e0b',
        SUCCESS: '#10b981',
        WARNING: '#f59e0b',
        ERROR: '#ef4444',
        INFO: '#3b82f6',
        
        // Game Specific Colors
        SNAKE: {
            HEAD: '#4ade80',
            BODY: '#22c55e',
            FOOD: '#ef4444',
            GRID: '#374151'
        },
        
        TETRIS: {
            I: '#06b6d4',
            O: '#fbbf24',
            T: '#a855f7',
            S: '#10b981',
            Z: '#ef4444',
            J: '#3b82f6',
            L: '#f97316'
        },
        
        STICKMAN: {
            PLAYER: '#4ade80',
            AI: '#ef4444',
            HEALTH_BG: '#374151',
            HEALTH_PLAYER: '#10b981',
            HEALTH_AI: '#ef4444'
        },
        
        PACMAN: {
            PLAYER: '#fbbf24',
            GHOST_RED: '#ef4444',
            GHOST_PINK: '#ec4899',
            GHOST_CYAN: '#06b6d4',
            GHOST_ORANGE: '#f97316',
            DOTS: '#fbbf24',
            WALLS: '#3b82f6'
        }
    },
    
    // Sound Effects (placeholder URLs)
    SOUNDS: {
        CLICK: 'https://example.com/sounds/click.mp3',
        SUCCESS: 'https://example.com/sounds/success.mp3',
        ERROR: 'https://example.com/sounds/error.mp3',
        POWERUP: 'https://example.com/sounds/powerup.mp3',
        EXPLOSION: 'https://example.com/sounds/explosion.mp3',
        CLICK_SNAKE: 'https://example.com/sounds/snake.mp3',
        TETRIS_LINE: 'https://example.com/sounds/tetris.mp3',
        STICKMAN_HIT: 'https://example.com/sounds/hit.mp3'
    },
    
    // Achievement Definitions
    ACHIEVEMENTS: {
        FIRST_GAME: {
            id: 'first_game',
            title: '¡Primer Juego!',
            description: 'Juega tu primer juego',
            icon: '🎮',
            points: 10
        },
        
        SNAKE_MASTER: {
            id: 'snake_master',
            title: 'Maestro de Snake',
            description: 'Llega a 500 puntos en Snake',
            icon: '🐍',
            points: 50
        },
        
        TETRIS_LEGEND: {
            id: 'tetris_legend',
            title: 'Leyenda del Tetris',
            description: 'Llena 100 líneas en Tetris',
            icon: '🧩',
            points: 100
        },
        
        STICKMAN_WARRIOR: {
            id: 'stickman_warrior',
            title: 'Guerrero Stickman',
            description: 'Vence 50 partidas de Stickman Fighter',
            icon: '⚔️',
            points: 75
        },
        
        SOCIAL_BUTTERFLY: {
            id: 'social_butterfly',
            title: 'Mariposa Social',
            description: 'Conecta con Discord',
            icon: '🦋',
            points: 25
        },
        
        GAMING_LEGEND: {
            id: 'gaming_legend',
            title: 'Leyenda Gaming',
            description: 'Juega 100 partidas',
            icon: '👑',
            points: 200
        }
    },
    
    // Leaderboard Configuration
    LEADERBOARD: {
        UPDATE_INTERVAL: 30000, // 30 seconds
        MAX_ENTRIES: 50,
        CACHE_DURATION: 60000, // 1 minute
        GAMES: {
            snake: 'Snake',
            tetris: 'Tetris',
            stickman: 'Stickman Fighter',
            pacman: 'Pac-Man',
            pong: 'Pong'
        }
    },
    
    // Performance Monitoring
    PERFORMANCE: {
        ENABLED: true,
        METRICS: {
            FPS: true,
            MEMORY: false, // Privacy concern
            LOAD_TIME: true,
            USER_INTERACTIONS: true
        },
        SAMPLING_RATE: 0.1 // 10% of sessions
    },
    
    // Analytics Configuration
    ANALYTICS: {
        ENABLED: false, // Privacy first
        EVENTS: {
            GAME_START: 'game_start',
            GAME_END: 'game_end',
            ACHIEVEMENT_UNLOCK: 'achievement_unlock',
            USER_LOGIN: 'user_login',
            USER_REGISTER: 'user_register',
            DISCORD_CONNECT: 'discord_connect'
        }
    },
    
    // Error Handling
    ERROR_HANDLING: {
        MAX_LOG_ENTRIES: 100,
        AUTO_REPORT: false,
        STORAGE_PREFIX: 'gamezone_error_'
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Config;
}

// Make available globally
window.Config = Config;