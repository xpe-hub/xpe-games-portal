/**
 * GameZone - Leaderboard System
 * Handles game rankings, statistics, and competitive features
 */

class LeaderboardManager {
    constructor() {
        this.leaderboards = {};
        this.currentTab = 'snake';
        this.updateInterval = null;
        this.isUpdating = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadLeaderboards();
        this.startAutoUpdate();
        this.renderCurrentTab();
    }
    
    setupEventListeners() {
        window.filterByCategory = (category) => this.filterByCategory(category);
        
        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }
    
    async loadLeaderboards() {
        // Initialize mock leaderboard data
        this.leaderboards = {
            snake: this.generateMockLeaderboard('snake', 50),
            tetris: this.generateMockLeaderboard('tetris', 50),
            stickman: this.generateMockLeaderboard('stickman', 50),
            pacman: this.generateMockLeaderboard('pacman', 50),
            pong: this.generateMockLeaderboard('pong', 50),
            overall: this.generateOverallLeaderboard()
        };
        
        // Load user's personal stats if authenticated
        if (window.authManager && window.authManager.currentUser) {
            await this.loadUserStats();
        }
    }
    
    generateMockLeaderboard(gameId, count) {
        const playerNames = [
            'SnakeMaster', 'TetrisKing', 'StickmanWarrior', 'PacManPro', 'PongLegend',
            'GamerPro123', 'SnakeEater', 'BlockDestroyer', 'FighterElite', 'DotEater',
            'RetroGamer', 'ArcadeMaster', 'GameZonePro', 'SpeedRunner', 'ScoreHunter',
            'PixelPerfect', 'ClassicGamer', 'OldSchool', 'RetroKing', 'VintagePlayer',
            'SkillMaster', 'HighScorer', 'ComboKing', 'ChainMaster', 'PrecisionShot',
            'QuickReflex', 'SharpMind', 'SteadyHand', 'PatientGamer', 'PersistentPlayer',
            'DedicatedGamer', 'FocusedPlayer', 'CalmWarrior', 'StrategicMind', 'TacticalGenius'
        ];
        
        const leaderboard = [];
        
        for (let i = 0; i < count; i++) {
            const player = playerNames[Math.floor(Math.random() * playerNames.length)];
            const position = i + 1;
            const score = this.generateScoreForGame(gameId, position);
            const gamesPlayed = Math.floor(Math.random() * 500) + 50;
            const achievements = this.generateAchievements();
            const joinedDate = this.getRandomDate();
            const lastPlayed = this.getRandomDate(new Date(joinedDate));
            
            leaderboard.push({
                position: position,
                player: {
                    id: `player_${i + 1}`,
                    name: player + (i < 10 ? '' : ` ${i + 1}`),
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(player)}&background=7c3aed&color=fff&size=80`,
                    level: Math.floor(gamesPlayed / 50) + 1,
                    badge: this.getPlayerBadge(position)
                },
                score: score,
                gamesPlayed: gamesPlayed,
                achievements: achievements,
                joinedDate: joinedDate,
                lastPlayed: lastPlayed,
                winRate: this.calculateWinRate(gamesPlayed, score),
                averageScore: Math.floor(score / gamesPlayed),
                streak: Math.floor(Math.random() * 20) + 1
            });
        }
        
        // Add authenticated user if exists
        if (window.authManager && window.authManager.currentUser) {
            const userEntry = this.generateUserEntry(gameId);
            if (userEntry) {
                leaderboard.push(userEntry);
                leaderboard.sort((a, b) => b.score - a.score);
                // Update positions after adding user
                leaderboard.forEach((entry, index) => {
                    entry.position = index + 1;
                });
            }
        }
        
        return leaderboard;
    }
    
    generateScoreForGame(gameId, position) {
        const baseScores = {
            snake: { min: 100, max: 5000 },
            tetris: { min: 500, max: 100000 },
            stickman: { min: 50, max: 5000 },
            pacman: { min: 1000, max: 50000 },
            pong: { min: 5, max: 50 }
        };
        
        const gameConfig = baseScores[gameId] || baseScores.snake;
        const difficulty = Math.max(1, Math.floor(51 - position)); // Higher position = easier score
        const randomFactor = 0.5 + Math.random() * 0.5;
        
        return Math.floor(
            (gameConfig.min + (gameConfig.max - gameConfig.min) * (difficulty / 50)) * randomFactor
        );
    }
    
    generateAchievements() {
        const achievements = ['bronze', 'silver', 'gold', 'platinum'];
        const count = Math.floor(Math.random() * 4);
        return achievements.slice(0, count);
    }
    
    getRandomDate(startDate = new Date(2024, 0, 1)) {
        const endDate = new Date();
        return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    }
    
    getPlayerBadge(position) {
        if (position === 1) return { type: 'crown', color: '#FFD700', name: 'Rey/Reina' };
        if (position === 2) return { type: 'medal', color: '#C0C0C0', name: 'Plata' };
        if (position === 3) return { type: 'medal', color: '#CD7F32', name: 'Bronce' };
        if (position <= 10) return { type: 'star', color: '#4169E1', name: 'Top 10' };
        if (position <= 25) return { type: 'award', color: '#32CD32', name: 'Top 25' };
        return { type: 'user', color: '#808080', name: 'Jugador' };
    }
    
    calculateWinRate(gamesPlayed, score) {
        // Mock calculation based on score ratio
        const baseRate = 0.1 + (score / 100000) * 0.8;
        return Math.min(0.95, Math.max(0.05, baseRate + (Math.random() - 0.5) * 0.1));
    }
    
    generateUserEntry(gameId) {
        if (!window.authManager || !window.authManager.currentUser) return null;
        
        const user = window.authManager.currentUser;
        const position = Math.floor(Math.random * 50) + 1;
        const score = this.generateScoreForGame(gameId, position);
        const gamesPlayed = Math.floor(Math.random * 100) + 10;
        
        return {
            position: position,
            player: {
                id: user.id,
                name: user.username,
                avatar: user.avatar,
                level: Math.floor(gamesPlayed / 50) + 1,
                badge: this.getPlayerBadge(position),
                isCurrentUser: true
            },
            score: score,
            gamesPlayed: gamesPlayed,
            achievements: user.achievements || [],
            joinedDate: user.joinedAt || new Date().toISOString(),
            lastPlayed: new Date().toISOString(),
            winRate: this.calculateWinRate(gamesPlayed, score),
            averageScore: Math.floor(score / gamesPlayed),
            streak: Math.floor(Math.random * 10) + 1
        };
    }
    
    generateOverallLeaderboard() {
        const overall = [];
        const gameIds = ['snake', 'tetris', 'stickman', 'pacman', 'pong'];
        
        // Get top players from each game
        gameIds.forEach(gameId => {
            const gameLeaderboard = this.leaderboards[gameId];
            if (gameLeaderboard) {
                // Get top 10 from each game
                gameLeaderboard.slice(0, 10).forEach(entry => {
                    const existing = overall.find(p => p.player.id === entry.player.id);
                    if (existing) {
                        existing.totalScore += entry.score;
                        existing.gamesPlayed += entry.gamesPlayed;
                        existing.games.push({ game: gameId, score: entry.score });
                    } else {
                        overall.push({
                            position: 0,
                            player: entry.player,
                            totalScore: entry.score,
                            gamesPlayed: entry.gamesPlayed,
                            achievements: entry.achievements,
                            games: [{ game: gameId, score: entry.score }],
                            winRate: entry.winRate,
                            averageScore: entry.averageScore
                        });
                    }
                });
            }
        });
        
        // Calculate overall scores and sort
        overall.forEach(player => {
            player.averageScore = Math.floor(player.totalScore / player.gamesPlayed);
        });
        
        overall.sort((a, b) => b.totalScore - a.totalScore);
        overall.forEach((entry, index) => {
            entry.position = index + 1;
        });
        
        return overall.slice(0, 50);
    }
    
    async loadUserStats() {
        // Mock user statistics loading
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('User stats loaded');
                resolve();
            }, 500);
        });
    }
    
    switchTab(tabId) {
        this.currentTab = tabId;
        
        // Update active tab button
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => btn.classList.remove('active'));
        
        const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        this.renderCurrentTab();
    }
    
    renderCurrentTab() {
        const leaderboardTable = document.getElementById('leaderboardTable');
        if (!leaderboardTable) return;
        
        const data = this.leaderboards[this.currentTab] || [];
        
        if (data.length === 0) {
            leaderboardTable.innerHTML = this.getEmptyStateHTML();
            return;
        }
        
        const tableHTML = `
            <div class="table-header">
                <div>Posición</div>
                <div>Jugador</div>
                <div>Puntuación</div>
                <div>Partidas</div>
                <div>Logros</div>
            </div>
            ${data.map(entry => this.createLeaderboardRow(entry)).join('')}
        `;
        
        leaderboardTable.innerHTML = tableHTML;
        
        // Add fade-in animation
        leaderboardTable.classList.add('fade-in');
        setTimeout(() => leaderboardTable.classList.remove('fade-in'), 300);
    }
    
    createLeaderboardRow(entry) {
        const { position, player, score, gamesPlayed, achievements } = entry;
        const positionClass = this.getPositionClass(position);
        
        return `
            <div class="leaderboard-row ${player.isCurrentUser ? 'current-user' : ''}" 
                 data-player-id="${player.id}">
                <div class="position ${positionClass}">
                    ${this.getPositionDisplay(position, player.badge)}
                </div>
                <div class="player-info">
                    <img src="${player.avatar}" alt="${player.name}" class="player-avatar" 
                         onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=7c3aed&color=fff&size=40'">
                    <div class="player-details">
                        <div class="player-name">${player.name}</div>
                        <div class="player-badge">
                            <i class="fas fa-${player.badge.type}" style="color: ${player.badge.color}"></i>
                            ${player.badge.name}
                        </div>
                    </div>
                </div>
                <div class="score">${this.formatScore(score)}</div>
                <div class="games-played">
                    <div>${gamesPlayed}</div>
                    <div class="win-rate">${Math.round(entry.winRate * 100)}% WR</div>
                </div>
                <div class="achievements">
                    ${this.createAchievementsBadges(achievements)}
                </div>
            </div>
        `;
    }
    
    getPositionClass(position) {
        if (position === 1) return 'first';
        if (position === 2) return 'second';
        if (position === 3) return 'third';
        return '';
    }
    
    getPositionDisplay(position, badge) {
        if (position <= 3) {
            return `<i class="fas fa-medal" style="color: ${badge.color}"></i>`;
        }
        return position;
    }
    
    createAchievementsBadges(achievements) {
        if (!achievements || achievements.length === 0) {
            return '<span class="no-achievements">-</span>';
        }
        
        return achievements.map(type => {
            const icons = {
                bronze: { icon: 'medal', color: '#CD7F32' },
                silver: { icon: 'medal', color: '#C0C0C0' },
                gold: { icon: 'medal', color: '#FFD700' },
                platinum: { icon: 'crown', color: '#E5E4E2' }
            };
            
            const achievement = icons[type] || icons.bronze;
            return `<div class="achievement-badge ${type}" 
                           title="${type.charAt(0).toUpperCase() + type.slice(1)}">
                        <i class="fas fa-${achievement.icon}" style="color: ${achievement.color}"></i>
                    </div>`;
        }).join('');
    }
    
    getEmptyStateHTML() {
        return `
            <div class="empty-state">
                <i class="fas fa-trophy"></i>
                <h3>No hay datos disponibles</h3>
                <p>No se encontraron jugadores para este juego. ¡Sé el primero en jugar!</p>
                <button class="btn btn-primary" onclick="scrollToGames()">
                    <i class="fas fa-play"></i>
                    Jugar Ahora
                </button>
            </div>
        `;
    }
    
    formatScore(score) {
        if (score >= 1000000) {
            return (score / 1000000).toFixed(1) + 'M';
        } else if (score >= 1000) {
            return (score / 1000).toFixed(1) + 'K';
        }
        return score.toLocaleString();
    }
    
    startAutoUpdate() {
        // Update leaderboards every 30 seconds
        this.updateInterval = setInterval(() => {
            this.updateLeaderboards();
        }, Config.LEADERBOARD.UPDATE_INTERVAL);
    }
    
    async updateLeaderboards() {
        if (this.isUpdating) return;
        
        this.isUpdating = true;
        
        try {
            // In a real implementation, fetch from API
            await this.simulateUpdate();
            
            // Re-render current tab
            this.renderCurrentTab();
            
        } catch (error) {
            console.error('Error updating leaderboards:', error);
        } finally {
            this.isUpdating = false;
        }
    }
    
    simulateUpdate() {
        return new Promise(resolve => {
            // Simulate network delay
            setTimeout(() => {
                // Randomly update some scores
                ['snake', 'tetris', 'stickman'].forEach(gameId => {
                    const leaderboard = this.leaderboards[gameId];
                    if (leaderboard && leaderboard.length > 0) {
                        // Update random top 5 players
                        for (let i = 0; i < Math.min(5, leaderboard.length); i++) {
                            const entry = leaderboard[i];
                            entry.score += Math.floor(Math.random() * 100);
                            entry.lastPlayed = new Date().toISOString();
                        }
                        
                        // Re-sort
                        leaderboard.sort((a, b) => b.score - a.score);
                        leaderboard.forEach((entry, index) => {
                            entry.position = index + 1;
                        });
                    }
                });
                
                resolve();
            }, 1000);
        });
    }
    
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
    
    filterByCategory(category) {
        // This method is also used by the games filter
        if (window.gamesManager) {
            window.gamesManager.filterByCategory(category);
        }
    }
    
    // Public Methods
    getPlayerRank(playerId, gameId = 'overall') {
        const leaderboard = this.leaderboards[gameId] || [];
        const player = leaderboard.find(entry => entry.player.id === playerId);
        return player ? player.position : null;
    }
    
    getPlayerScore(playerId, gameId = 'overall') {
        const leaderboard = this.leaderboards[gameId] || [];
        const player = leaderboard.find(entry => entry.player.id === playerId);
        return player ? player.score : 0;
    }
    
    submitScore(gameId, score) {
        if (!window.authManager || !window.authManager.currentUser) {
            return false;
        }
        
        const user = window.authManager.currentUser;
        const leaderboard = this.leaderboards[gameId];
        
        if (!leaderboard) return false;
        
        // Find user's entry
        let userEntry = leaderboard.find(entry => entry.player.id === user.id);
        
        if (!userEntry) {
            // Create new entry
            userEntry = this.generateUserEntry(gameId);
            if (userEntry) {
                leaderboard.push(userEntry);
            }
        }
        
        if (userEntry && score > userEntry.score) {
            userEntry.score = score;
            userEntry.lastPlayed = new Date().toISOString();
            userEntry.gamesPlayed += 1;
            
            // Re-sort leaderboard
            leaderboard.sort((a, b) => b.score - a.score);
            leaderboard.forEach((entry, index) => {
                entry.position = index + 1;
            });
            
            // Update overall leaderboard
            this.generateOverallLeaderboard();
            
            // Re-render if current user is viewing this game
            if (this.currentTab === gameId) {
                this.renderCurrentTab();
            }
            
            // Check for achievements
            this.checkScoreAchievements(gameId, score);
            
            return true;
        }
        
        return false;
    }
    
    checkScoreAchievements(gameId, score) {
        if (!window.authManager) return;
        
        // Snake achievements
        if (gameId === 'snake' && score >= 500) {
            window.authManager.unlockAchievement('snake_master');
        }
        
        // Tetris achievements  
        if (gameId === 'tetris' && score >= 10000) {
            window.authManager.unlockAchievement('tetris_legend');
        }
        
        // Stickman achievements
        if (gameId === 'stickman' && score >= 100) {
            window.authManager.unlockAchievement('stickman_warrior');
        }
    }
    
    getGameStats() {
        const stats = {};
        
        Object.keys(this.leaderboards).forEach(gameId => {
            const leaderboard = this.leaderboards[gameId];
            if (leaderboard && leaderboard.length > 0) {
                stats[gameId] = {
                    totalPlayers: leaderboard.length,
                    topScore: leaderboard[0].score,
                    averageScore: Math.floor(
                        leaderboard.reduce((sum, entry) => sum + entry.score, 0) / leaderboard.length
                    ),
                    totalGames: leaderboard.reduce((sum, entry) => sum + entry.gamesPlayed, 0)
                };
            }
        });
        
        return stats;
    }
}

// Initialize leaderboard manager
window.leaderboardManager = new LeaderboardManager();

// Add leaderboard-specific styles
const leaderboardStyles = `
    .leaderboard-row.current-user {
        background: rgba(124, 58, 237, 0.1);
        border: 1px solid rgba(124, 58, 237, 0.3);
    }
    
    .leaderboard-row.current-user .player-name {
        color: var(--primary-color);
        font-weight: 700;
    }
    
    .player-details {
        flex: 1;
    }
    
    .win-rate {
        font-size: 0.75rem;
        color: var(--text-muted);
    }
    
    .no-achievements {
        color: var(--text-muted);
        font-style: italic;
    }
    
    .achievement-badge {
        cursor: help;
    }
    
    .empty-state {
        text-align: center;
        padding: 60px 20px;
    }
    
    .empty-state i {
        font-size: 4rem;
        color: var(--text-muted);
        margin-bottom: 20px;
    }
    
    .empty-state h3 {
        font-size: 1.5rem;
        margin-bottom: 15px;
        color: var(--text-primary);
    }
    
    .empty-state p {
        margin-bottom: 25px;
        color: var(--text-secondary);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const leaderboardStyleSheet = document.createElement('style');
leaderboardStyleSheet.textContent = leaderboardStyles;
document.head.appendChild(leaderboardStyleSheet);