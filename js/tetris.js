/**
 * Tetris Game Implementation
 * Complete Tetris game with rotation, scoring, and levels
 */

class TetrisGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.setup();
    }
    
    setup() {
        this.canvasSize = 400;
        this.blockSize = 20;
        this.cols = 10;
        this.rows = 20;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameRunning = false;
        this.gameInterval = null;
        
        this.createCanvas();
        this.setupEventListeners();
        this.createGameUI();
        this.init();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasSize;
        this.canvas.height = this.canvasSize;
        this.canvas.style.border = '2px solid var(--primary-color)';
        this.canvas.style.borderRadius = '10px';
        this.canvas.style.background = '#000';
        this.ctx = this.canvas.getContext('2d');
        
        this.container.innerHTML = '';
        this.container.appendChild(this.canvas);
    }
    
    createGameUI() {
        const ui = document.createElement('div');
        ui.innerHTML = `
            <div class="game-stats">
                <div class="stat">
                    <span class="label">Puntuación:</span>
                    <span class="value" id="tetris-score">0</span>
                </div>
                <div class="stat">
                    <span class="label">Nivel:</span>
                    <span class="value" id="tetris-level">1</span>
                </div>
                <div class="stat">
                    <span class="label">Líneas:</span>
                    <span class="value" id="tetris-lines">0</span>
                </div>
            </div>
            <div class="game-controls">
                <button class="btn btn-primary" onclick="tetrisGame.start()">
                    <i class="fas fa-play"></i> Iniciar
                </button>
                <button class="btn btn-secondary" onclick="tetrisGame.pause()" disabled>
                    <i class="fas fa-pause"></i> Pausar
                </button>
                <button class="btn btn-secondary" onclick="tetrisGame.reset()">
                    <i class="fas fa-refresh"></i> Reiniciar
                </button>
            </div>
            <div class="controls-info">
                <p><strong>Controles:</strong> ← → para mover | ↑ para rotar | ↓ para bajar | Espacio para bajar rápido</p>
            </div>
        `;
        this.container.appendChild(ui);
    }
    
    init() {
        this.reset();
        this.draw();
    }
    
    reset() {
        this.board = this.createBoard();
        this.currentPiece = null;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameRunning = false;
        
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
        this.updateUI();
        this.draw();
    }
    
    createBoard() {
        const board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = new Array(this.cols).fill(0);
        }
        return board;
    }
    
    createPiece() {
        const pieces = [
            // I piece
            {
                shape: [[1, 1, 1, 1]],
                color: '#00f0f0'
            },
            // O piece
            {
                shape: [
                    [1, 1],
                    [1, 1]
                ],
                color: '#f0f000'
            },
            // T piece
            {
                shape: [
                    [0, 1, 0],
                    [1, 1, 1]
                ],
                color: '#a000f0'
            },
            // S piece
            {
                shape: [
                    [0, 1, 1],
                    [1, 1, 0]
                ],
                color: '#00f000'
            },
            // Z piece
            {
                shape: [
                    [1, 1, 0],
                    [0, 1, 1]
                ],
                color: '#f00000'
            },
            // J piece
            {
                shape: [
                    [1, 0, 0],
                    [1, 1, 1]
                ],
                color: '#0000f0'
            },
            // L piece
            {
                shape: [
                    [0, 0, 1],
                    [1, 1, 1]
                ],
                color: '#f0a000'
            }
        ];
        
        const piece = pieces[Math.floor(Math.random() * pieces.length)];
        return {
            shape: piece.shape,
            color: piece.color,
            x: Math.floor(this.cols / 2) - Math.floor(piece.shape[0].length / 2),
            y: 0
        };
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning || !this.currentPiece) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    this.movePiece(-1, 0);
                    break;
                case 'ArrowRight':
                    this.movePiece(1, 0);
                    break;
                case 'ArrowDown':
                    this.movePiece(0, 1);
                    break;
                case 'ArrowUp':
                    this.rotatePiece();
                    break;
                case ' ':
                    e.preventDefault();
                    this.dropPiece();
                    break;
            }
        });
    }
    
    start() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.currentPiece = this.createPiece();
        
        const startBtn = this.container.querySelector('.btn-primary');
        const pauseBtn = this.container.querySelector('.btn-secondary');
        
        if (startBtn) {
            startBtn.disabled = true;
        }
        
        if (pauseBtn) {
            pauseBtn.disabled = false;
        }
        
        this.gameInterval = setInterval(() => {
            this.update();
        }, this.getSpeed());
    }
    
    pause() {
        this.gameRunning = false;
        
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
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
    
    update() {
        if (!this.currentPiece) {
            this.currentPiece = this.createPiece();
        }
        
        if (!this.movePiece(0, 1)) {
            this.placePiece();
            this.clearLines();
            this.currentPiece = this.createPiece();
            
            if (this.checkGameOver()) {
                this.gameOver();
                return;
            }
        }
        
        this.draw();
    }
    
    movePiece(dx, dy) {
        const newX = this.currentPiece.x + dx;
        const newY = this.currentPiece.y + dy;
        
        if (this.isValidPosition(this.currentPiece, newX, newY)) {
            this.currentPiece.x = newX;
            this.currentPiece.y = newY;
            return true;
        }
        return false;
    }
    
    rotatePiece() {
        const rotated = this.rotateMatrix(this.currentPiece.shape);
        
        if (this.isValidPosition({ shape: rotated, x: this.currentPiece.x, y: this.currentPiece.y })) {
            this.currentPiece.shape = rotated;
            return true;
        }
        return false;
    }
    
    rotateMatrix(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotated = [];
        
        for (let i = 0; i < cols; i++) {
            rotated[i] = [];
            for (let j = 0; j < rows; j++) {
                rotated[i][j] = matrix[rows - 1 - j][i];
            }
        }
        
        return rotated;
    }
    
    dropPiece() {
        while (this.movePiece(0, 1)) {
            this.score += 1;
        }
        this.updateUI();
    }
    
    isValidPosition(piece, newX = piece.x, newY = piece.y) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const boardX = newX + x;
                    const boardY = newY + y;
                    
                    if (boardX < 0 || boardX >= this.cols || 
                        boardY >= this.rows || 
                        (boardY >= 0 && this.board[boardY][boardX])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    placePiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const boardY = this.currentPiece.y + y;
                    if (boardY >= 0) {
                        this.board[boardY][this.currentPiece.x + x] = this.currentPiece.color;
                    }
                }
            }
        }
    }
    
    clearLines() {
        let linesCleared = 0;
        
        for (let y = this.rows - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(new Array(this.cols).fill(0));
                linesCleared++;
                y++;
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += this.calculateScore(linesCleared);
            this.level = Math.floor(this.lines / 10) + 1;
            
            if (this.gameInterval) {
                clearInterval(this.gameInterval);
                this.gameInterval = setInterval(() => {
                    this.update();
                }, this.getSpeed());
            }
            
            this.updateUI();
        }
    }
    
    calculateScore(linesCleared) {
        const scores = [0, 100, 300, 500, 800];
        return (scores[linesCleared] || 0) * this.level;
    }
    
    getSpeed() {
        return Math.max(50, 1000 - (this.level - 1) * 50);
    }
    
    checkGameOver() {
        return !this.isValidPosition(this.currentPiece, this.currentPiece.x, this.currentPiece.y);
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
        
        // Draw board
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    this.drawBlock(x, y, this.board[y][x]);
                }
            }
        }
        
        // Draw current piece
        if (this.currentPiece) {
            for (let y = 0; y < this.currentPiece.shape.length; y++) {
                for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                    if (this.currentPiece.shape[y][x]) {
                        const drawX = this.currentPiece.x + x;
                        const drawY = this.currentPiece.y + y;
                        if (drawY >= 0) {
                            this.drawBlock(drawX, drawY, this.currentPiece.color);
                        }
                    }
                }
            }
        }
        
        // Draw grid
        this.drawGrid();
    }
    
    drawBlock(x, y, color) {
        const pixelX = x * this.blockSize;
        const pixelY = y * this.blockSize;
        
        // Main block
        this.ctx.fillStyle = color;
        this.ctx.fillRect(pixelX, pixelY, this.blockSize, this.blockSize);
        
        // Border
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(pixelX, pixelY, this.blockSize, this.blockSize);
        
        // Highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(pixelX, pixelY, this.blockSize, 3);
        this.ctx.fillRect(pixelX, pixelY, 3, this.blockSize);
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.cols; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.blockSize, 0);
            this.ctx.lineTo(x * this.blockSize, this.canvasSize);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.rows; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.blockSize);
            this.ctx.lineTo(this.canvasSize, y * this.blockSize);
            this.ctx.stroke();
        }
    }
    
    updateUI() {
        const scoreEl = document.getElementById('tetris-score');
        const levelEl = document.getElementById('tetris-level');
        const linesEl = document.getElementById('tetris-lines');
        
        if (scoreEl) scoreEl.textContent = this.score;
        if (levelEl) levelEl.textContent = this.level;
        if (linesEl) linesEl.textContent = this.lines;
    }
    
    gameOver() {
        this.gameRunning = false;
        
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
        // Show game over screen
        const gameOverDiv = document.createElement('div');
        gameOverDiv.className = 'game-over-overlay';
        gameOverDiv.innerHTML = `
            <div class="game-over-content">
                <h2>¡Juego Terminado!</h2>
                <p>Puntuación Final: ${this.score}</p>
                <p>Líneas Completadas: ${this.lines}</p>
                <p>Nivel Alcanzado: ${this.level}</p>
                <button class="btn btn-primary" onclick="tetrisGame.start()">
                    Jugar de Nuevo
                </button>
            </div>
        `;
        this.container.appendChild(gameOverDiv);
        
        // Track score
        GameAnalytics.trackGameEnd('tetris', this.score, 0);
        AchievementSystem.checkAchievement('game_end', { gameId: 'tetris', score: this.score });
    }
}

// Export for global access
window.TetrisGame = TetrisGame;
