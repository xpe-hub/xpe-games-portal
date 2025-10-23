// ===== JUEGO STICKMAN CHRISTMAS v1.5 =====
// Desarrollado por MiniMax Agent para xpe.games

// VARIABLES GLOBALES
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const p1HealthBar = document.getElementById('p1Health');
const p2HealthBar = document.getElementById('p2Health');
const gameOverDiv = document.getElementById('gameOver');
const winnerText = document.getElementById('winnerText');
const gameStats = document.getElementById('gameStats');
const restartBtn = document.getElementById('restartBtn');
const powerupIndicator = document.getElementById('powerupIndicator');
const comboText = document.getElementById('comboText');

// CONFIGURACIÓN DE JUEGO
const config = {
    gravity: 0.8,
    groundY: 0,
    running: false,
    currentMode: 'menu', // 'menu', 'characterSelect', 'playing'
    selectedCharacter: 'fighter',
    gameMode: 'local', // 'local', 'cpu'
    roundCount: 1,
    maxRounds: 3,
    currentRound: 1,
    gameStartTime: 0,
    p1Wins: 0,
    p2Wins: 0,
    comboCount: 0,
    lastHitTime: 0
};

// PERSONAJES Y SUS PROPIEDADES
const characters = {
    fighter: {
        name: 'Fighter',
        color: '#00ff88',
        speed: 6,
        health: 100,
        jumpPower: 15,
        attackDamage: 10,
        special: 'Velocidad +20%'
    },
    tank: {
        name: 'Tank',
        color: '#ff4757',
        speed: 4,
        health: 150,
        jumpPower: 12,
        attackDamage: 12,
        special: 'Vida +50%'
    },
    ninja: {
        name: 'Ninja',
        color: '#3742fa',
        speed: 7,
        health: 100,
        jumpPower: 22,
        attackDamage: 8,
        special: 'Salto +50%'
    },
    santa: {
        name: 'Santa',
        color: '#ff3838',
        speed: 5,
        health: 120,
        jumpPower: 15,
        attackDamage: 10,
        special: 'Power-ups extra'
    }
};

// POWER-UPS
const powerups = [
    { icon: '🛡️', name: 'Escudo', duration: 5000, effect: 'shield' },
    { icon: '⚡', name: 'Velocidad', duration: 7000, effect: 'speed' },
    { icon: '💥', name: 'Crítico', duration: 3000, effect: 'critical' },
    { icon: '❤️', name: 'Vida', duration: 1000, effect: 'heal' },
    { icon: '🎁', name: 'Santa Gift', duration: 8000, effect: 'all' }
];

// SISTEMA DE PARTÍCULAS
class Particle {
    constructor(x, y, vx, vy, color, life, size) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = life;
        this.maxLife = life;
        this.size = size;
        this.gravity = 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life--;
    }

    draw() {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

// CLASE JUGADOR MEJORADA
class Player {
    constructor(x, color, name, isPlayer2 = false) {
        this.x = x;
        this.y = config.groundY;
        this.width = 25;
        this.height = 70;
        this.color = color;
        this.name = name;
        this.isPlayer2 = isPlayer2;
        
        // Propiedades del personaje
        this.characterData = characters[config.selectedCharacter];
        this.speed = this.characterData.speed;
        this.health = this.characterData.health;
        this.maxHealth = this.characterData.health;
        this.jumpPower = this.characterData.jumpPower;
        this.attackDamage = this.characterData.attackDamage;
        
        // Variables de movimiento
        this.velocityY = 0;
        this.velocityX = 0;
        this.isJumping = false;
        this.isAttacking = false;
        this.isDefending = false;
        
        // Sistema de combos
        this.hitCount = 0;
        this.lastHitTime = 0;
        this.comboMultiplier = 1;
        
        // Efectos especiales
        this.powerups = {
            shield: false,
            speed: false,
            critical: false,
            heal: false
        };
        this.powerupEffects = {
            shield: { active: false, endTime: 0 },
            speed: { active: false, endTime: 0 },
            critical: { active: false, endTime: 0 }
        };
        
        // Estados especiales
        this.isInvulnerable = false;
        this.invulnerabilityEnd = 0;
        
        // Atributos adicionales
        this.attackCooldown = 0;
        this.facing = this.isPlayer2 ? -1 : 1;
        this.jumpCount = 0;
        this.maxJumps = this.characterData.name === 'Ninja' ? 2 : 1;
        
        // Estadísticas de combate
        this.hitsLanded = 0;
        this.damageDealt = 0;
        this.damageReceived = 0;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y - this.height);
        
        // Efecto de escudo
        if (this.powerupEffects.shield.active) {
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, this.height / 2, this.width + 10, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Cabeza
        ctx.beginPath();
        ctx.arc(0, 15, 12, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Sombrero de Santa (solo si es Santa)
        if (this.characterData.name === 'Santa') {
            ctx.fillStyle = '#ff3838';
            ctx.beginPath();
            ctx.arc(0, 10, 15, Math.PI, 0);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(0, -8, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Cuerpo
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 6;
        
        // Torso
        ctx.beginPath();
        ctx.moveTo(0, 27);
        ctx.lineTo(0, 45);
        ctx.stroke();
        
        // Brazos con efectos de ataque
        const armAngle = this.isAttacking ? Math.PI / 2.5 : Math.PI / 3;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 35);
        ctx.lineTo(this.facing * 18 * Math.cos(armAngle), 35 + 18 * Math.sin(armAngle));
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, 35);
        ctx.lineTo(-this.facing * 15, 40);
        ctx.stroke();
        
        // Piernas dinámicas
        const legSpread = Math.abs(this.velocityX) > 2 ? 12 : 8;
        ctx.beginPath();
        ctx.moveTo(0, 45);
        ctx.lineTo(-legSpread, this.height - 10);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, 45);
        ctx.lineTo(legSpread, this.height - 10);
        ctx.stroke();
        
        // Efectos de ataque crítico
        if (this.isAttacking && this.powerupEffects.critical.active) {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.facing * 35, 35, 15, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Trail de movimiento rápido
        if (this.powerupEffects.speed.active) {
            ctx.fillStyle = this.color + '40';
            for (let i = 1; i <= 3; i++) {
                ctx.fillRect(-this.width * i / 3, 0, this.width / 3, this.height);
            }
        }
        
        ctx.restore();
    }

    update() {
        const currentTime = Date.now();
        
        // Aplicar gravedad
        if (this.y < config.groundY) {
            this.velocityY += config.gravity;
            this.isJumping = true;
        } else {
            this.y = config.groundY;
            this.velocityY = 0;
            this.isJumping = false;
            this.jumpCount = 0;
        }
        
        // Actualizar posición
        this.y += this.velocityY;
        this.x += this.velocityX;
        
        // Límites del campo
        if (this.x < 60) this.x = 60;
        if (this.x > canvas.width - 60) this.x = canvas.width - 60;
        
        // Fricción
        this.velocityX *= 0.9;
        
        // Actualizar efectos temporales
        Object.keys(this.powerupEffects).forEach(effect => {
            if (this.powerupEffects[effect].active && currentTime > this.powerupEffects[effect].endTime) {
                this.powerupEffects[effect].active = false;
                this.powerups[effect] = false;
            }
        });
        
        // Invulnerabilidad temporal
        if (this.isInvulnerable && currentTime > this.invulnerabilityEnd) {
            this.isInvulnerable = false;
        }
        
        // Cooldown de ataque
        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }
        
        if (this.attackCooldown === 0) {
            this.isAttacking = false;
        }
        
        this.draw();
    }

    moveLeft() {
        const speed = this.powerupEffects.speed.active ? this.speed * 2 : this.speed;
        this.velocityX = -speed;
        this.facing = -1;
    }

    moveRight() {
        const speed = this.powerupEffects.speed.active ? this.speed * 2 : this.speed;
        this.velocityX = speed;
        this.facing = 1;
    }

    jump() {
        if (!this.isJumping || this.jumpCount < this.maxJumps - 1) {
            const power = this.powerupEffects.speed.active ? this.jumpPower * 1.5 : this.jumpPower;
            this.velocityY = -power;
            this.isJumping = true;
            this.jumpCount++;
        }
    }

    attack() {
        if (this.attackCooldown === 0) {
            this.isAttacking = true;
            this.attackCooldown = 40;
            
            // Efectos críticos
            if (this.powerupEffects.critical.active) {
                this.comboMultiplier = Math.min(this.comboMultiplier + 1, 5);
                showCombo(this.comboMultiplier);
            }
            
            // Sanity check para Santa
            if (this.characterData.name === 'Santa' && Math.random() < 0.3) {
                spawnRandomPowerup(this);
            }
        }
    }

    takeDamage(amount) {
        if (this.powerupEffects.shield.active || this.isInvulnerable) {
            return; // No tomar daño
        }
        
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        
        this.damageReceived += amount;
        this.isInvulnerable = true;
        this.invulnerabilityEnd = Date.now() + 1000; // 1 segundo de invulnerabilidad
        
        // Efectos visuales al recibir daño
        createHitParticles(this.x, this.y - this.height / 2);
    }

    dealDamage(target) {
        const damage = this.powerupEffects.critical.active ? 
            this.attackDamage * this.comboMultiplier : 
            this.attackDamage;
            
        target.takeDamage(damage);
        this.hitsLanded++;
        this.damageDealt += damage;
        
        // Crear partículas de impacto
        createHitParticles(target.x, target.y - target.height / 2);
    }

    activatePowerup(powerupType) {
        const currentTime = Date.now();
        
        switch (powerupType) {
            case 'shield':
                this.powerupEffects.shield.active = true;
                this.powerupEffects.shield.endTime = currentTime + 5000;
                this.powerups.shield = true;
                break;
                
            case 'speed':
                this.powerupEffects.speed.active = true;
                this.powerupEffects.speed.endTime = currentTime + 7000;
                this.powerups.speed = true;
                break;
                
            case 'critical':
                this.powerupEffects.critical.active = true;
                this.powerupEffects.critical.endTime = currentTime + 3000;
                this.powerups.critical = true;
                break;
                
            case 'heal':
                this.health = Math.min(this.health + 30, this.maxHealth);
                this.powerups.heal = true;
                break;
        }
    }

    resetStats() {
        this.hitsLanded = 0;
        this.damageDealt = 0;
        this.damageReceived = 0;
        this.comboMultiplier = 1;
        this.hitCount = 0;
    }
}