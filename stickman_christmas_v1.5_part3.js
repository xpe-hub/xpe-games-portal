// ===== FUNCIONES PRINCIPALES DEL JUEGO =====

// VARIABLES GLOBALES DEL JUEGO
let player1, player2;
let particles = [];
let powerupSpawns = [];
let gameStats = {
    totalGames: 0,
    totalPlayTime: 0,
    favoriteCharacter: 'fighter'
};

// ===== SISTEMA DE NIEVE =====
function createSnowflakes() {
    const snowContainer = document.getElementById('snowContainer');
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
        
        snowContainer.appendChild(snowflake);
        
        // Remover después de la animación
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 5000);
    }
    
    // Crear copos de nieve cada 300ms
    setInterval(createSnowflake, 300);
}

// ===== FUNCIONES DEL MENÚ =====
function showCharacterSelect() {
    document.querySelector('.mainMenu').style.display = 'none';
    document.querySelector('.characterSelect').style.display = 'flex';
    config.currentMode = 'characterSelect';
}

function selectCharacter(characterId) {
    config.selectedCharacter = characterId;
    
    // Actualizar UI de selección
    document.querySelectorAll('.characterCard').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-character="${characterId}"]`).classList.add('selected');
}

function backToMenu() {
    document.querySelector('.mainMenu').style.display = 'flex';
    document.querySelector('.characterSelect').style.display = 'none';
    config.currentMode = 'menu';
}

function startGame() {
    document.querySelector('.mainMenu').style.display = 'none';
    document.querySelector('.characterSelect').style.display = 'none';
    document.getElementById('header').style.display = 'flex';
    
    // Configurar nombres de jugadores
    const charData = characters[config.selectedCharacter];
    document.getElementById('p1Name').textContent = charData.name;
    document.getElementById('p2Name').textContent = 'CPU';
    
    // Crear jugadores
    player1 = new Player(120, charData.color, charData.name, false);
    player2 = new Player(canvas.width - 120, '#ff4757', 'CPU', true);
    
    // Configurar IA para player2
    player2.isAI = true;
    player2.aiDifficulty = 'medium';
    
    config.currentMode = 'playing';
    config.gameStartTime = Date.now();
    config.running = true;
    
    // Inicializar power-ups
    powerupSpawns = [];
    setInterval(spawnPowerup, 8000); // Cada 8 segundos
}

function showOptions() {
    // Implementar modal de opciones
    alert('Opciones:\n\n• Volumen: Ajustable\n• Tema: Navidad activo\n• Controles: Táctiles optimizados');
}

function showRanking() {
    const ranking = JSON.parse(localStorage.getItem('xpe-ranking') || '[]');
    let message = 'TOP 5 FIGHTERS:\n\n';
    
    for (let i = 0; i < Math.min(5, ranking.length); i++) {
        const player = ranking[i];
        message += `${i + 1}. ${player.name}: ${player.score} pts\n`;
    }
    
    alert(message);
}

function showCredits() {
    alert(`STICKMAN FIGHTER v1.5 - Christmas Edition

Desarrollado por MiniMax Agent
Marca: xpe.games

Características:
🎮 4 Personajes únicos
❄️ Efectos navideños
⚔️ Sistema de combos
🎁 Power-ups especiales
📱 Optimizado móvil

© 2024 xpe.games - Todos los derechos reservados`);
}

// ===== SISTEMA DE PARTÍCULAS =====
function createHitParticles(x, y) {
    const colors = ['#ff4757', '#ffd700', '#00ff88'];
    
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const speed = Math.random() * 3 + 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const life = 30 + Math.random() * 20;
        const size = Math.random() * 3 + 2;
        
        particles.push(new Particle(x, y, vx, vy, color, life, size));
    }
}

function createPowerupParticles(x, y, powerupType) {
    const colorMap = {
        shield: '#00ff88',
        speed: '#feca57',
        critical: '#ffd700',
        heal: '#ff6b6b',
        all: '#ff9ff3'
    };
    
    const color = colorMap[powerupType] || '#ffffff';
    
    for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const life = 40 + Math.random() * 20;
        const size = Math.random() * 4 + 3;
        
        particles.push(new Particle(x, y, vx, vy, color, life, size));
    }
}

// ===== SISTEMA DE POWER-UPS =====
function spawnPowerup() {
    if (config.currentMode !== 'playing') return;
    
    // Solo spawn si no hay muchos power-ups activos
    if (powerupSpawns.length >= 3) return;
    
    const x = Math.random() * (canvas.width - 200) + 100;
    const y = canvas.height * 0.6;
    const powerup = powerups[Math.floor(Math.random() * powerups.length)];
    
    powerupSpawns.push({
        x: x,
        y: y,
        type: powerup.effect,
        icon: powerup.icon,
        collected: false,
        spawnTime: Date.now()
    });
}

function spawnRandomPowerup(player) {
    const powerup = powerups[Math.floor(Math.random() * powerups.length)];
    player.activatePowerup(powerup.effect);
    showPowerupNotification(player.name + ' got ' + powerup.name + '!');
    
    // Efectos especiales de Santa
    if (powerup.effect === 'all') {
        Object.keys(player.powerupEffects).forEach(effect => {
            if (effect !== 'heal') {
                player.powerupEffects[effect].active = true;
                player.powerupEffects[effect].endTime = Date.now() + 5000;
            }
        });
    }
}

function checkPowerupCollection() {
    powerupSpawns.forEach((powerup, index) => {
        [player1, player2].forEach(player => {
            if (!powerup.collected) {
                const distance = Math.sqrt(
                    Math.pow(player.x - powerup.x, 2) + 
                    Math.pow(player.y - powerup.y, 2)
                );
                
                if (distance < 50) {
                    powerup.collected = true;
                    player.activatePowerup(powerup.type);
                    createPowerupParticles(powerup.x, powerup.y, powerup.type);
                    
                    // Mostrar notificación
                    showPowerupNotification(`${player.name} collected ${powerup.icon} ${powerup.type.toUpperCase()}!`);
                    
                    // Remover después de la animación
                    setTimeout(() => {
                        powerupSpawns.splice(index, 1);
                    }, 100);
                }
            }
        });
    });
}

function showPowerupNotification(text) {
    powerupIndicator.textContent = text;
    powerupIndicator.classList.add('active');
    
    setTimeout(() => {
        powerupIndicator.classList.remove('active');
    }, 2000);
}

function showCombo(combo) {
    comboText.textContent = `COMBO x${combo}!`;
    comboText.classList.add('show');
    
    setTimeout(() => {
        comboText.classList.remove('show');
    }, 1000);
}

// ===== IA PARA CPU =====
function updateAI(player) {
    if (!player.isAI || config.currentMode !== 'playing') return;
    
    const distanceToPlayer1 = Math.abs(player.x - player1.x);
    
    // Lógica básica de IA
    if (distanceToPlayer1 > 80) {
        // Acercarse al jugador
        if (player.x < player1.x) {
            player.moveRight();
        } else {
            player.moveLeft();
        }
    } else {
        // Atacar o saltar
        if (Math.random() < 0.3) {
            player.attack();
        } else if (Math.random() < 0.2 && !player.isJumping) {
            player.jump();
        }
        
        // Moverse aleatoriamente
        if (Math.random() < 0.1) {
            if (Math.random() < 0.5) {
                player.moveLeft();
            } else {
                player.moveRight();
            }
        }
    }
}

// ===== DETECCIÓN DE COLISIONES MEJORADA =====
function checkCollisions() {
    if (config.currentMode !== 'playing') return;
    
    const distance = Math.abs(player1.x - player2.x);
    const verticalDistance = Math.abs(player1.y - player2.y);
    
    // Colisión de ataque
    if (distance < 60 && verticalDistance < 40) {
        // Player 1 ataca
        if (player1.isAttacking && player1.attackCooldown > 30 && 
            !player1.comboActive) {
            player1.dealDamage(player2);
            player1.hitCount++;
            config.comboCount = player1.hitCount;
        }
        
        // Player 2 ataca
        if (player2.isAttacking && player2.attackCooldown > 30 && 
            !player2.comboActive) {
            player2.dealDamage(player1);
            player2.hitCount++;
        }
    }
    
    // Separación de jugadores para evitar overlapping
    if (distance < 30) {
        if (player1.x < player2.x) {
            player1.x -= 1;
            player2.x += 1;
        } else {
            player1.x += 1;
            player2.x -= 1;
        }
    }
}

// ===== SISTEMA DE ROUNDS =====
function checkGameRound() {
    if (player1.health <= 0 || player2.health <= 0) {
        config.currentRound++;
        
        let winner = player1.health > 0 ? 'Player 1' : 'Player 2';
        
        if (winner === 'Player 1') {
            config.p1Wins++;
        } else {
            config.p2Wins++;
        }
        
        // Verificar si alguien ganó el match
        if (config.p1Wins >= 2 || config.p2Wins >= 2 || config.currentRound > config.maxRounds) {
            showGameOver(winner);
        } else {
            // Siguiente round
            setTimeout(startNewRound, 2000);
        }
    }
}

function startNewRound() {
    const charData = characters[config.selectedCharacter];
    
    player1.resetStats();
    player1.health = charData.health;
    player1.x = 120;
    player1.y = config.groundY;
    player1.velocityY = 0;
    player1.powerupEffects = { shield: {active: false, endTime: 0}, speed: {active: false, endTime: 0}, critical: {active: false, endTime: 0} };
    
    player2.health = 120;
    player2.x = canvas.width - 120;
    player2.y = config.groundY;
    player2.velocityY = 0;
    player2.powerupEffects = { shield: {active: false, endTime: 0}, speed: {active: false, endTime: 0}, critical: {active: false, endTime: 0} };
    
    updateHealthBars();
}

// ===== GAME OVER =====
function showGameOver(winner) {
    config.running = false;
    gameOverDiv.style.display = 'block';
    
    winnerText.textContent = `¡${winner} Gana! 🏆`;
    
    // Estadísticas del juego
    const gameTime = Math.floor((Date.now() - config.gameStartTime) / 1000);
    const stats = `
        ⚔️ Round: ${config.currentRound}/${config.maxRounds}
        ⏱️ Tiempo: ${gameTime}s
        👊 Golpes P1: ${player1.hitsLanded}
        👊 Golpes P2: ${player2.hitsLanded}
        💥 Combo máximo: x${Math.max(config.comboCount, 1)}
    `;
    
    gameStats.textContent = stats;
    
    // Guardar estadísticas
    saveGameStats(winner, gameTime);
}

// ===== PERSISTENCIA LOCAL =====
function saveGameStats(winner, gameTime) {
    const currentStats = JSON.parse(localStorage.getItem('xpe-game-stats') || '{"totalGames":0,"totalPlayTime":0}');
    currentStats.totalGames++;
    currentStats.totalPlayTime += gameTime;
    
    localStorage.setItem('xpe-game-stats', JSON.stringify(currentStats));
    
    // Guardar ranking
    const ranking = JSON.parse(localStorage.getItem('xpe-ranking') || '[]');
    const newEntry = {
        name: characters[config.selectedCharacter].name,
        score: player1.hitsLanded + (player1.health * 10),
        date: new Date().toISOString(),
        gameTime: gameTime
    };
    
    ranking.push(newEntry);
    ranking.sort((a, b) => b.score - a.score);
    
    // Mantener solo top 10
    if (ranking.length > 10) {
        ranking.splice(10);
    }
    
    localStorage.setItem('xpe-ranking', JSON.stringify(ranking));
}

// ===== COMPARTIR JUEGO =====
function shareGame() {
    const text = `¡Acabo de jugar Stickman Fighter en xpe.games! 🎮\n\nMi personaje favorito: ${characters[config.selectedCharacter].name}\nGolpes conectados: ${player1.hitsLanded}\n\n¡Prueba tú también! 🎄`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Stickman Fighter - xpe.games',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores sin Web Share API
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    }
}

function rateGame() {
    // Simular rating (en una app real usarías Google Play rating)
    alert('¡Gracias por tu feedback! ⭐\n\nTu opinión nos ayuda a mejorar el juego.');
}

// ===== ACTUALIZAR HEALTH BARS =====
function updateHealthBars() {
    if (player1) {
        p1HealthBar.style.width = (player1.health / player1.maxHealth * 100) + '%';
    }
    if (player2) {
        p2HealthBar.style.width = (player2.health / player2.maxHealth * 100) + '%';
    }
}

// ===== CONTROLES TÁCTILES MEJORADOS =====
function setupControls() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        // Touch events
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleButtonPress(btn, true);
        });
        
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleButtonPress(btn, false);
        });
        
        // Mouse events para desktop
        btn.addEventListener('mousedown', (e) => {
            handleButtonPress(btn, true);
        });
        
        btn.addEventListener('mouseup', (e) => {
            handleButtonPress(btn, false);
        });
        
        btn.addEventListener('mouseleave', (e) => {
            handleButtonPress(btn, false);
        });
    });
}

function handleButtonPress(btn, isPressed) {
    if (config.currentMode !== 'playing') return;
    
    const player = btn.dataset.player === '1' ? player1 : player2;
    const action = btn.dataset.action;
    
    if (isPressed) {
        switch (action) {
            case 'left':
                player.moveLeft();
                break;
            case 'right':
                player.moveRight();
                break;
            case 'jump':
                player.jump();
                break;
            case 'attack':
                player.attack();
                break;
        }
    }
}

// ===== MAIN GAME LOOP =====
function gameLoop() {
    // Limpiar canvas
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
    
    // Cielo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6);
    gradient.addColorStop(0, '#87ceeb');
    gradient.addColorStop(1, '#f0e68c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
    
    // Suelo
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, config.groundY + 70, canvas.width, canvas.height - config.groundY - 70);
    
    // Línea del suelo
    ctx.fillStyle = '#654321';
    ctx.fillRect(0, config.groundY + 70, canvas.width, 5);
    
    // Decoraciones navideñas
    drawChristmasDecorations();
    
    if (config.running && config.currentMode === 'playing') {
        // Actualizar jugadores
        player1.update();
        player2.update();
        
        // Actualizar IA
        updateAI(player2);
        
        // Actualizar partículas
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.isDead()) {
                particles.splice(index, 1);
            }
        });
        
        // Actualizar power-ups
        powerupSpawns.forEach(powerup => {
            drawPowerup(powerup);
        });
        
        // Verificar colisiones
        checkCollisions();
        
        // Verificar colección de power-ups
        checkPowerupCollection();
        
        // Verificar fin de round
        checkGameRound();
        
        // Actualizar UI
        updateHealthBars();
    }
    
    requestAnimationFrame(gameLoop);
}

// ===== DECORACIONES NAVIDEÑAS =====
function drawChristmasDecorations() {
    // Árboles de Navidad
    for (let i = 0; i < 3; i++) {
        const x = (canvas.width / 4) * (i + 1);
        const y = config.groundY + 20;
        
        // Triángulo verde
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.moveTo(x, y - 60);
        ctx.lineTo(x - 25, y);
        ctx.lineTo(x + 25, y);
        ctx.closePath();
        ctx.fill();
        
        // Estrellas decorativas
        ctx.fillStyle = '#FFD700';
        for (let j = 0; j < 5; j++) {
            const starX = x + Math.cos(j * 2 * Math.PI / 5) * 15;
            const starY = y - 30 + Math.sin(j * 2 * Math.PI / 5) * 15;
            ctx.beginPath();
            ctx.arc(starX, starY, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Luz decorativa
        if (Math.random() < 0.1) {
            ctx.fillStyle = '#ff6b6b';
            ctx.beginPath();
            ctx.arc(x, y - 50, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// ===== DIBUJAR POWER-UPS =====
function drawPowerup(powerup) {
    if (powerup.collected) return;
    
    const timeSinceSpawn = Date.now() - powerup.spawnTime;
    const bobOffset = Math.sin(timeSinceSpawn * 0.005) * 10;
    
    ctx.save();
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(powerup.icon, powerup.x, powerup.y + bobOffset);
    ctx.restore();
}

// ===== INICIALIZACIÓN =====
function initGame() {
    // Configurar canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 120;
        config.groundY = canvas.height - 80;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Inicializar sistema de nieve
    createSnowflakes();
    
    // Configurar controles
    setupControls();
    
    // Event listener para restart
    restartBtn.addEventListener('click', () => {
        location.reload();
    });
    
    // Iniciar loop del juego
    gameLoop();
    
    // Cargar estadísticas guardadas
    loadSavedStats();
}

// ===== CARGAR ESTADÍSTICAS GUARDADAS =====
function loadSavedStats() {
    const stats = JSON.parse(localStorage.getItem('xpe-game-stats') || '{"totalGames":0,"totalPlayTime":0}');
    gameStats.totalGames = stats.totalGames;
    gameStats.totalPlayTime = stats.totalPlayTime;
}

// ===== INICIAR JUEGO CUANDO SE CARGA LA PÁGINA =====
document.addEventListener('DOMContentLoaded', initGame);