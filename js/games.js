/**
 * xpe.games - Premium Games Management System
 * Handles game loading, management, monetization and advanced features
 */

class GamesManager {
    constructor() {
        this.games = [];
        this.currentGame = null;
        this.gameState = {};
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadGames();
        this.renderGames();
    }
    
    setupEventListeners() {
        window.openGame = (gameId) => this.openGame(gameId);
        window.closeGame = () => this.closeGame();
        window.toggleFullscreen = () => this.toggleFullscreen();
        window.filterGames = Config.utils.debounce(() => this.filterGames(), 300);
        window.filterByCategory = (category) => this.filterByCategory(category);
        window.scrollToGames = () => this.scrollToGames();
    }
    
    loadGames() {
        this.games = [
            {
                id: 'snake',
                title: 'Snake',
                description: 'El clásico juego de la serpiente. Come las manzanas y crece sin tocarte a ti mismo.',
                category: 'classic',
                icon: '🐍',
                thumbnail: './assets/games/snake-thumb.jpg',
                plays: 125000,
                rating: 4.8,
                difficulty: 2,
                playTime: '5-15 min',
                tags: ['clásico', 'arcade', 'diversión'],
                isNew: false,
                isPopular: true
            },
            {
                id: 'tetris',
                title: 'Tetris',
                description: 'Rompe líneas y conquista el tablero. El puzzle más emblemático de todos los tiempos.',
                category: 'puzzle',
                icon: '🧩',
                thumbnail: './assets/games/tetris-thumb.jpg',
                plays: 98000,
                rating: 4.9,
                difficulty: 3,
                playTime: '10-30 min',
                tags: ['puzzle', 'líneas', 'estrategia'],
                isNew: false,
                isPopular: true
            },
            {
                id: 'pacman',
                title: 'Pac-Man',
                description: 'Come todos los puntos y evita los fantasmas. Una aventura llena de nostalgia.',
                category: 'classic',
                icon: '👻',
                thumbnail: './assets/games/pacman-thumb.jpg',
                plays: 156000,
                rating: 4.7,
                difficulty: 3,
                playTime: '5-20 min',
                tags: ['clásico', 'fantasmas', 'laberinto'],
                isNew: false,
                isPopular: true
            },
            {
                id: 'pong',
                title: 'Pong',
                description: 'El juego que comenzó todo. Simplicidad épica en su forma más pura.',
                category: 'classic',
                icon: '🏓',
                thumbnail: './assets/games/pong-thumb.jpg',
                plays: 89000,
                rating: 4.6,
                difficulty: 2,
                playTime: '1-5 min',
                tags: ['clásico', 'ping pong', 'retro'],
                isNew: false,
                isPopular: false
            },
            {
                id: 'stickman',
                title: 'Stickman Fighter',
                description: 'Combate épico de palos. Lucha contra IA inteligente en arenas dinámicas.',
                category: 'action',
                icon: '⚔️',
                thumbnail: './assets/games/stickman-thumb.jpg',
                plays: 203000,
                rating: 4.5,
                difficulty: 4,
                playTime: '5-25 min',
                tags: ['combate', 'acción', 'lucha'],
                isNew: true,
                isPopular: true
            },
            {
                id: 'breakout',
                title: 'Breakout',
                description: 'Destruye todos los bloques. Un desafío de precisión que requiere habilidad.',
                category: 'arcade',
                icon: '🧱',
                thumbnail: './assets/games/breakout-thumb.jpg',
                plays: 76000,
                rating: 4.4,
                difficulty: 3,
                playTime: '3-10 min',
                tags: ['bloques', 'pelota', 'destreza'],
                isNew: false,
                isPopular: false
            },
            {
                id: 'memory',
                title: 'Memory Match',
                description: 'Encuentra las parejas iguales. Un desafío para tu memoria y concentración.',
                category: 'puzzle',
                icon: '🧠',
                thumbnail: './assets/games/memory-thumb.jpg',
                plays: 67000,
                rating: 4.3,
                difficulty: 2,
                playTime: '2-8 min',
                tags: ['memoria', 'parejas', 'concentración'],
                isNew: false,
                isPopular: false
            },
            {
                id: 'space_invaders',
                title: 'Space Invaders',
                description: 'Defiende la Tierra de invasores alienígenas. Un clásico atemporal.',
                category: 'action',
                icon: '🚀',
                thumbnail: './assets/games/space-thumb.jpg',
                plays: 134000,
                rating: 4.7,
                difficulty: 4,
                playTime: '5-15 min',
                tags: ['espacio', 'aliens', 'defensa'],
                isNew: true,
                isPopular: true
            },
            {
                id: 'asteroids',
                title: 'Asteroids',
                description: 'Pilota tu nave espacial y destruye asteroides en el espacio profundo.',
                category: 'action',
                icon: '🪐',
                thumbnail: './assets/games/asteroids-thumb.jpg',
                plays: 92000,
                rating: 4.5,
                difficulty: 4,
                playTime: '3-12 min',
                tags: ['nave', 'asteroides', 'espacio'],
                isNew: false,
                isPopular: false
            },
            {
                id: 'chess',
                title: 'Chess',
                description: 'El juego de estrategia más sofisticado. Desafía a la IA en partidas épicas.',
                category: 'strategy',
                icon: '♔',
                thumbnail: './assets/games/chess-thumb.jpg',
                plays: 187000,
                rating: 4.8,
                difficulty: 5,
                playTime: '15-60 min',
                tags: ['estrategia', 'IA', 'clásico'],
                isNew: false,
                isPopular: true
            }
        ];
    }
    
    renderGames() {
        const gamesGrid = document.getElementById('gamesGrid');
        if (!gamesGrid) return;
        
        const filteredGames = this.getFilteredGames();
        
        gamesGrid.innerHTML = filteredGames.map(game => this.createGameCard(game)).join('');
        
        // Add loading animation
        gamesGrid.classList.add('fade-in');
        setTimeout(() => gamesGrid.classList.remove('fade-in'), 300);
    }
    
    createGameCard(game) {
        const categoryClass = `category-${game.category}`;
        const badges = [];
        
        if (game.isNew) badges.push('<span class="game-badge new">Nuevo</span>');
        if (game.isPopular) badges.push('<span class="game-badge popular">Popular</span>');
        
        const difficultyStars = '★'.repeat(game.difficulty) + '☆'.repeat(5 - game.difficulty);
        
        return `
            <div class="game-card" onclick="openGame('${game.id}')" data-category="${game.category}">
                <div class="game-thumbnail">
                    ${game.thumbnail ? 
                        `<img src="${game.thumbnail}" alt="${game.title}" loading="lazy">` : 
                        `<div class="game-thumbnail-placeholder">${game.icon}</div>`
                    }
                    ${badges.join('')}
                    <div class="game-thumbnail-overlay">
                        <button class="play-btn">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
                
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-description">${game.description}</p>
                    
                    <div class="game-meta">
                        <span class="game-category ${categoryClass}">
                            <i class="fas fa-${this.getCategoryIcon(game.category)}"></i>
                            ${this.getCategoryName(game.category)}
                        </span>
                    </div>
                    
                    <div class="game-stats">
                        <div class="stat plays">
                            <i class="fas fa-play"></i>
                            ${this.formatNumber(game.plays)}
                        </div>
                        <div class="stat rating">
                            <i class="fas fa-star"></i>
                            ${game.rating}
                        </div>
                    </div>
                    
                    <div class="game-footer">
                        <div class="difficulty">
                            <span>Dificultad:</span>
                            <div class="difficulty-stars">
                                ${[...Array(5)].map((_, i) => 
                                    `<i class="fas fa-star ${i < game.difficulty ? 'text-yellow-400' : 'text-gray-400'}"></i>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="play-time">
                            <i class="fas fa-clock"></i>
                            ${game.playTime}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getCategoryIcon(category) {
        const icons = {
            classic: 'history',
            action: 'zap',
            puzzle: 'puzzle-piece',
            arcade: 'gamepad',
            sports: 'futbol',
            strategy: 'chess'
        };
        return icons[category] || 'gamepad';
    }
    
    getCategoryName(category) {
        const names = {
            classic: 'Clásicos',
            action: 'Acción',
            puzzle: 'Puzzle',
            arcade: 'Arcade',
            sports: 'Deportes',
            strategy: 'Estrategia'
        };
        return names[category] || category;
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    getFilteredGames() {
        const searchInput = document.getElementById('searchInput');
        const currentSearch = searchInput ? searchInput.value.toLowerCase() : '';
        
        return this.games.filter(game => {
            const matchesSearch = !currentSearch || 
                game.title.toLowerCase().includes(currentSearch) ||
                game.description.toLowerCase().includes(currentSearch) ||
                game.tags.some(tag => tag.toLowerCase().includes(currentSearch));
            
            return matchesSearch;
        });
    }
    
    filterGames() {
        this.renderGames();
    }
    
    filterByCategory(category) {
        // Update active filter button
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        const activeBtn = document.querySelector(`[data-filter="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Filter games
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
        
        // Remove animation classes after animation
        setTimeout(() => {
            gameCards.forEach(card => card.classList.remove('fade-in'));
        }, 300);
    }
    
    async openGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;
        
        const gameModal = document.getElementById('gameModal');
        const gameTitle = document.getElementById('gameTitle');
        const gameContent = document.getElementById('gameContent');
        
        if (!gameModal || !gameTitle || !gameContent) return;
        
        // Show loading
        gameTitle.textContent = game.title;
        gameContent.innerHTML = this.getGameLoadingContent();
        gameModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        this.currentGame = game;
        
        // Load game content
        try {
            await this.loadGameContent(gameId, gameContent);
            
            // Track analytics
            if (Config.ANALYTICS.ENABLED) {
                this.trackEvent(Config.ANALYTICS.EVENTS.GAME_START, {
                    game_id: gameId,
                    game_title: game.title
                });
            }
            
        } catch (error) {
            console.error('Error loading game:', error);
            gameContent.innerHTML = `
                <div class="game-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error al cargar el juego</h3>
                    <p>No se pudo cargar ${game.title}. Inténtalo de nuevo.</p>
                    <button class="btn btn-primary" onclick="closeGame()">
                        <i class="fas fa-arrow-left"></i>
                        Volver
                    </button>
                </div>
            `;
        }
    }
    
    closeGame() {
        const gameModal = document.getElementById('gameModal');
        if (!gameModal) return;
        
        // Stop current game if running
        if (this.gameState[this.currentGame?.id]?.stop) {
            this.gameState[this.currentGame.id].stop();
        }
        
        gameModal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Clear current game
        this.currentGame = null;
        
        // Track analytics
        if (Config.ANALYTICS.ENABLED && window.gameEnded) {
            this.trackEvent(Config.ANALYTICS.EVENTS.GAME_END, {
                game_id: this.currentGame?.id
            });
        }
    }
    
    toggleFullscreen() {
        const gameModal = document.getElementById('gameModal');
        if (!gameModal) return;
        
        gameModal.classList.toggle('fullscreen');
        
        const fullscreenBtn = gameModal.querySelector('.fa-expand').parentElement;
        if (fullscreenBtn) {
            const icon = fullscreenBtn.querySelector('i');
            if (gameModal.classList.contains('fullscreen')) {
                icon.className = 'fas fa-compress';
                fullscreenBtn.setAttribute('title', 'Salir de pantalla completa');
            } else {
                icon.className = 'fas fa-expand';
                fullscreenBtn.setAttribute('title', 'Pantalla completa');
            }
        }
    }
    
    async loadGameContent(gameId, container) {
        // Add loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        switch (gameId) {
            case 'snake':
                await this.loadSnakeGame(container);
                break;
            case 'tetris':
                await this.loadTetrisGame(container);
                break;
            case 'stickman':
                await this.loadStickmanGame(container);
                break;
            case 'pacman':
                await this.loadPacmanGame(container);
                break;
            case 'pong':
                await this.loadPongGame(container);
                break;
            case 'breakout':
                await this.loadBreakoutGame(container);
                break;
            case 'memory':
                await this.loadMemoryGame(container);
                break;
            case 'space_invaders':
                await this.loadSpaceInvadersGame(container);
                break;
            case 'asteroids':
                await this.loadAsteroidsGame(container);
                break;
            case 'chess':
                await this.loadChessGame(container);
                break;
            default:
                container.innerHTML = `
                    <div class="game-placeholder">
                        <i class="fas fa-cog fa-spin"></i>
                        <h3>Próximamente</h3>
                        <p>${this.currentGame.title} estará disponible pronto.</p>
                    </div>
                `;
        }
    }
    
    getGameLoadingContent() {
        return `
            <div class="game-loading">
                <i class="fas fa-gamepad"></i>
                <p>Cargando juego...</p>
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
    }
    
    // Individual Game Loaders
    async loadSnakeGame(container) {
        // Initialize Snake Game
        this.gameState.snake = new SnakeGame(container);
        await this.gameState.snake.init();
    }
    
    async loadTetrisGame(container) {
        // Initialize Tetris Game
        this.gameState.tetris = new TetrisGame(container);
        await this.gameState.tetris.init();
    }
    
    async loadStickmanGame(container) {
        // Initialize Stickman Fighter Game
        this.gameState.stickman = new StickmanGame(container);
        await this.gameState.stickman.init();
    }
    
    async loadPacmanGame(container) {
        container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-ghost"></i>
                <h3>Pac-Man</h3>
                <p>El clásico juego de Pac-Man estará disponible próximamente.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Laberinto completo</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Fantasmas con IA</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Efectos de sonido</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadPongGame(container) {
        container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-table-tennis"></i>
                <h3>Pong</h3>
                <p>El juego que comenzó todo estará disponible próximamente.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Controles precisos</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>IA desafiante</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Múltiples niveles</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadBreakoutGame(container) {
        container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-brick"></i>
                <h3>Breakout</h3>
                <p>Destruye todos los bloques en este clásico juego de arcade.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Física realista</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Múltiples niveles</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Efectos especiales</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadMemoryGame(container) {
        container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-brain"></i>
                <h3>Memory Match</h3>
                <p>Mejora tu memoria encontrando todas las parejas.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Múltiples dificultad</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Temporizador</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Record personal</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadSpaceInvadersGame(container) {
        container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-rocket"></i>
                <h3>Space Invaders</h3>
                <p>Defiende la Tierra de los invasores alienígenas.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>IA alienígena</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Múltiples oleadas</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Power-ups</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadAsteroidsGame(container) {
        container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-space-shuttle"></i>
                <h3>Asteroids</h3>
                <p>Navega por el espacio destruyendo asteroides peligrosos.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Física espacial</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Navegación 360°</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Combustible limitado</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    async loadChessGame(container) {
        container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-chess"></i>
                <h3>Ajedrez</h3>
                <p>El juego de estrategia más sofisticado del mundo.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>IA avanzada</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Múltiples niveles</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Análisis de jugadas</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    scrollToGames() {
        const gamesSection = document.getElementById('games');
        if (gamesSection) {
            gamesSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    trackEvent(eventName, data = {}) {
        if (Config.ANALYTICS.ENABLED && window.gtag) {
            window.gtag('event', eventName, data);
        }
    }
}

// Individual Game Classes
class SnakeGame {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.gameRunning = false;
        this.gameInterval = null;
        
        // Game state
        this.snake = [];
        this.food = {};
        this.direction = { x: 0, y: 0 };
        this.score = 0;
        this.gridSize = 20;
        this.canvasSize = 400;
        this.gameSpeed = 150;
    }
    
    async init() {
        this.createUI();
        this.setupCanvas();
        this.setupEventListeners();
        this.resetGame();
    }
    
    createUI() {
        this.container.innerHTML = `
            <div class="game-snake">
                <div class="game-canvas-container">
                    <canvas id="snakeCanvas" class="game-canvas" width="400" height="400"></canvas>
                    <div class="game-info-overlay">
                        <div class="score">Puntuación: <span id="score">0</span></div>
                    </div>
                </div>
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="gameState.snake.start()">
                        <i class="fas fa-play"></i>
                        Iniciar
                    </button>
                    <button class="btn btn-secondary" onclick="gameState.snake.pause()" disabled>
                        <i class="fas fa-pause"></i>
                        Pausar
                    </button>
                    <button class="btn btn-secondary" onclick="gameState.snake.reset()">
                        <i class="fas fa-redo"></i>
                        Reiniciar
                    </button>
                </div>
                <div class="game-instructions">
                    <h4>Controles:</h4>
                    <p><strong>PC:</strong> Usa las flechas del teclado para moverte</p>
                    <p><strong>Móvil:</strong> Desliza en la dirección que quieras moverte</p>
                </div>
            </div>
        `;
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch (e.key) {
                case 'ArrowUp':
                    if (this.direction.y !== 1) {
                        this.direction = { x: 0, y: -1 };
                    }
                    break;
                case 'ArrowDown':
                    if (this.direction.y !== -1) {
                        this.direction = { x: 0, y: 1 };
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction.x !== 1) {
                        this.direction = { x: -1, y: 0 };
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction.x !== -1) {
                        this.direction = { x: 1, y: 0 };
                    }
                    break;
            }
        });
        
        // Touch controls
        let touchStart = null;
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!touchStart || !this.gameRunning) return;
            
            const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
            const deltaX = touchEnd.x - touchStart.x;
            const deltaY = touchEnd.y - touchStart.y;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 30 && this.direction.x !== -1) {
                    this.direction = { x: 1, y: 0 };
                } else if (deltaX < -30 && this.direction.x !== 1) {
                    this.direction = { x: -1, y: 0 };
                }
            } else {
                // Vertical swipe
                if (deltaY > 30 && this.direction.y !== -1) {
                    this.direction = { x: 0, y: 1 };
                } else if (deltaY < -30 && this.direction.y !== 1) {
                    this.direction = { x: 0, y: -1 };
                }
            }
            
            touchStart = null;
        });
    }
    
    resetGame() {
        this.snake = [
            { x: 10, y: 10 },
            { x: 10, y: 11 },
            { x: 10, y: 12 }
        ];
        this.direction = { x: 0, y: 0 };
        this.score = 0;
        this.generateFood();
        this.updateScore();
        this.draw();
        
        // Update UI
        const startBtn = this.container.querySelector('.btn-primary');
        const pauseBtn = this.container.querySelector('.btn-secondary');
        
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
        }
        
        if (pauseBtn) {
            pauseBtn.disabled = true;
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        }
    }
    
    start() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.gameInterval = setInterval(() => this.update(), this.gameSpeed);
        
        // Update UI
        const startBtn = this.container.querySelector('.btn-primary');
        const pauseBtn = this.container.querySelector('.btn-secondary');
        
        if (startBtn) {
            startBtn.disabled = true;
        }
        
        if (pauseBtn) {
            pauseBtn.disabled = false;
        }
    }
    
    pause() {
        this.gameRunning = false;
        
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
        // Update UI
        const startBtn = this.container.querySelector('.btn-primary');
        const pauseBtn = this.container.querySelector('.btn-secondary');
        
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
        }
        
        if (pauseBtn) {
            pauseBtn.disabled = true;
        }
    }
    
    stop() {
        this.pause();
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Move snake
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.canvasSize / this.gridSize || 
            head.y < 0 || head.y >= this.canvasSize / this.gridSize) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.generateFood();
            this.updateScore();
            
            // Speed up slightly
            if (this.gameSpeed > 100 && this.score % 50 === 0) {
                this.gameSpeed -= 5;
                clearInterval(this.gameInterval);
                this.gameInterval = setInterval(() => this.update(), this.gameSpeed);
            }
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }
    
    draw() {
        // Clear canvas with gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvasSize, this.canvasSize);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
        
        // Draw grid with glow
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.shadowColor = '#4ecdc4';
        this.ctx.shadowBlur = 2;
        
        for (let i = 0; i <= this.canvasSize; i += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvasSize);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvasSize, i);
            this.ctx.stroke();
        }
        this.ctx.shadowBlur = 0;
        
        // Draw food with glow effect
        this.ctx.shadowColor = '#ff6b6b';
        this.ctx.shadowBlur = 15;
        
        const foodGradient = this.ctx.createRadialGradient(
            this.food.x * this.gridSize + this.gridSize/2,
            this.food.y * this.gridSize + this.gridSize/2,
            0,
            this.food.x * this.gridSize + this.gridSize/2,
            this.food.y * this.gridSize + this.gridSize/2,
            this.gridSize
        );
        foodGradient.addColorStop(0, '#ff6b6b');
        foodGradient.addColorStop(0.7, '#ee5a52');
        foodGradient.addColorStop(1, '#c44569');
        
        this.ctx.fillStyle = foodGradient;
        this.ctx.fillRect(
            this.food.x * this.gridSize + 2,
            this.food.y * this.gridSize + 2,
            this.gridSize - 4,
            this.gridSize - 4
        );
        this.ctx.shadowBlur = 0;
        
        // Draw snake with gradient and glow
        this.snake.forEach((segment, index) => {
            const isHead = index === 0;
            const isTail = index === this.snake.length - 1;
            
            // Snake body gradient
            const snakeGradient = this.ctx.createLinearGradient(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                (segment.x + 1) * this.gridSize,
                (segment.y + 1) * this.gridSize
            );
            
            if (isHead) {
                snakeGradient.addColorStop(0, '#4ecdc4');
                snakeGradient.addColorStop(1, '#44a08d');
                this.ctx.shadowColor = '#4ecdc4';
                this.ctx.shadowBlur = 20;
            } else if (isTail) {
                snakeGradient.addColorStop(0, '#7fcdcd');
                snakeGradient.addColorStop(1, '#79b8b8');
                this.ctx.shadowColor = '#7fcdcd';
                this.ctx.shadowBlur = 10;
            } else {
                snakeGradient.addColorStop(0, '#6bcf8f');
                snakeGradient.addColorStop(1, '#5fb87a');
                this.ctx.shadowColor = '#6bcf8f';
                this.ctx.shadowBlur = 8;
            }
            
            this.ctx.fillStyle = snakeGradient;
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
            
            // Add eyes to head
            if (isHead) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowBlur = 0;
                
                const eyeSize = 3;
                const eyeOffset = 5;
                
                // Left eye
                this.ctx.fillRect(
                    segment.x * this.gridSize + eyeOffset,
                    segment.y * this.gridSize + 4,
                    eyeSize,
                    eyeSize
                );
                
                // Right eye
                this.ctx.fillRect(
                    segment.x * this.gridSize + this.gridSize - eyeOffset - eyeSize,
                    segment.y * this.gridSize + 4,
                    eyeSize,
                    eyeSize
                );
                
                // Pupils
                this.ctx.fillStyle = '#2d3748';
                this.ctx.fillRect(
                    segment.x * this.gridSize + eyeOffset + 1,
                    segment.y * this.gridSize + 5,
                    1,
                    1
                );
                this.ctx.fillRect(
                    segment.x * this.gridSize + this.gridSize - eyeOffset - eyeSize + 1,
                    segment.y * this.gridSize + 5,
                    1,
                    1
                );
            }
        });
        
        this.ctx.shadowBlur = 0;
    }
    
    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * (this.canvasSize / this.gridSize)),
            y: Math.floor(Math.random() * (this.canvasSize / this.gridSize))
        };
        
        // Make sure food doesn't spawn on snake
        for (let segment of this.snake) {
            if (this.food.x === segment.x && this.food.y === segment.y) {
                this.generateFood();
                return;
            }
        }
    }
    
    updateScore() {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    }
    
    gameOver() {
        this.pause();
        
        // Show game over message
        const overlay = document.createElement('div');
        overlay.className = 'game-over-overlay';
        overlay.innerHTML = `
            <div class="game-over-content">
                <h3>¡Juego Terminado!</h3>
                <p>Puntuación Final: <strong>${this.score}</strong></p>
                <button class="btn btn-primary" onclick="gameState.snake.reset(); this.parentElement.parentElement.remove();">
                    <i class="fas fa-redo"></i>
                    Jugar de Nuevo
                </button>
            </div>
        `;
        
        this.container.appendChild(overlay);
        
        // Track achievement
        if (window.authManager && this.score >= 100) {
            window.authManager.unlockAchievement('snake_master');
        }
    }
}

// Placeholder for other games (Tetris, Stickman, etc.)
class TetrisGame {
    constructor(container) {
        this.container = container;
    }
    
    async init() {
        this.container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-puzzle-piece"></i>
                <h3>Tetris</h3>
                <p>El puzzle más emblemático estará disponible próximamente.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Piezas clásicas</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Líneas múltiples</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Velocidad progresiva</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    stop() {
        // Cleanup if needed
    }
}

class StickmanGame {
    constructor(container) {
        this.container = container;
    }
    
    async init() {
        this.container.innerHTML = `
            <div class="game-placeholder">
                <i class="fas fa-fist-raised"></i>
                <h3>Stickman Fighter</h3>
                <p>Combate épico con IA inteligente estará disponible próximamente.</p>
                <div class="game-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Combos avanzados</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>IA inteligente</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Partículas dinámicas</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    stop() {
        // Cleanup if needed
    }
}

// Initialize games manager
window.gamesManager = new GamesManager();