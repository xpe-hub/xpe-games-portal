# 🎯 Guía Paso a Paso: Crear xpe.games - Versión Interfaz Básica

## 📝 **Paso 1: Preparar tu Repositorio en GitHub**

### **1.1 Crear Cuenta (si no tienes)**
1. Ve a [github.com](https://github.com)
2. Haz clic en "Sign up"
3. Usa tu email personal
4. Elige un username fácil (ejemplo: `xpe-games-owner`)

### **1.2 Crear Repositorio**
1. Clic en el botón verde **"+"** (arriba derecha)
2. Selecciona **"New repository"**
3. Nombre: `xpe-games-portal`
4. Description: `Portal de Juegos xpe.games - Interfaz Premium`
5. ✅ Marca **"Public"**
6. ✅ Marca **"Add a README file"**
7. Clic **"Create repository"**

---

## 📁 **Paso 2: Estructura Básica de Archivos**

### **2.1 Crear la estructura de carpetas**
En tu repositorio, ve a **"Add file"** → **"Create new file"**:

```
index.html
styles/
  main.css
  navigation.css
  footer.css
js/
  main.js
  config.js
```

### **2.2 Archivo index.html (Versión Básica)**
Crear archivo: `index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>xpe.games - Portal de Juegos Web Premium</title>
    <meta name="description" content="xpe.games - La mejor plataforma de juegos web con corona de calidad">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/navigation.css">
    <link rel="stylesheet" href="styles/footer.css">
</head>
<body>
    <!-- Loading Screen -->
    <div id="loading-screen" class="loading-screen">
        <div class="loading-content">
            <i class="fas fa-crown loading-icon"></i>
            <h2>xpe.games</h2>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <p>Cargando tu portal gaming...</p>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <i class="fas fa-crown"></i>
                <span>xpe.games</span>
            </div>
            
            <div class="nav-menu">
                <a href="#inicio" class="nav-link active">Inicio</a>
                <a href="#juegos" class="nav-link">Juegos</a>
                <a href="#categorias" class="nav-link">Categorías</a>
                <a href="#ranking" class="nav-link">Ranking</a>
                <a href="#comunidad" class="nav-link">Comunidad</a>
            </div>

            <div class="nav-actions">
                <button id="discord-btn" class="discord-btn">
                    <i class="fab fa-discord"></i>
                    Discord
                </button>
                <button id="premium-btn" class="premium-btn">
                    <i class="fas fa-crown"></i>
                    Premium
                </button>
                <div class="user-menu">
                    <button id="login-btn" class="login-btn">Iniciar Sesión</button>
                    <div id="user-info" class="user-info hidden">
                        <span id="username-display"></span>
                        <button id="logout-btn" class="logout-btn">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="inicio">
        <div class="hero-content">
            <div class="hero-text">
                <h1 class="hero-title">
                    <i class="fas fa-crown hero-crown"></i>
                    Bienvenido a <span class="gradient-text">xpe.games</span>
                </h1>
                <p class="hero-description">
                    La plataforma de juegos web premium con corona de calidad. 
                    Disfruta de los mejores juegos gratuitos con experiencia premium.
                </p>
                
                <div class="hero-stats">
                    <div class="stat">
                        <i class="fas fa-gamepad"></i>
                        <span class="stat-number">2+</span>
                        <span class="stat-label">Juegos Premium</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span class="stat-number">1K+</span>
                        <span class="stat-label">Jugadores Activos</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-trophy"></i>
                        <span class="stat-number">24/7</span>
                        <span class="stat-label">Disponibilidad</span>
                    </div>
                </div>

                <div class="hero-actions">
                    <button class="btn-primary" onclick="scrollToSection('juegos')">
                        <i class="fas fa-play"></i>
                        Jugar Ahora
                    </button>
                    <button class="btn-secondary" onclick="openPremiumModal()">
                        <i class="fas fa-crown"></i>
                        Ver Premium
                    </button>
                </div>
            </div>

            <div class="hero-visual">
                <div class="hero-card">
                    <div class="card-header">
                        <i class="fas fa-crown"></i>
                        <span>Juegos Destacados</span>
                    </div>
                    <div class="card-content">
                        <div class="game-preview">
                            <div class="game-icon">
                                <i class="fas fa-gamepad"></i>
                            </div>
                            <div class="game-info">
                                <h4>Snake Game</h4>
                                <p>Clásico juego de la serpiente</p>
                                <span class="badge badge-hot">Hot</span>
                            </div>
                        </div>
                        <div class="game-preview">
                            <div class="game-icon">
                                <i class="fas fa-cube"></i>
                            </div>
                            <div class="game-info">
                                <h4>Tetris</h4>
                                <p>El mejor rompecabezas</p>
                                <span class="badge badge-new">Nuevo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <h2 class="section-title">
                <i class="fas fa-star"></i>
                ¿Por qué elegir xpe.games?
            </h2>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3>Juegos Rápidos</h3>
                    <p>Juega instantáneamente sin descargas ni instalaciones.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Móvil Friendly</h3>
                    <p>Disfruta en cualquier dispositivo, responsive design.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <h3>Ranking Global</h3>
                    <p>Compite con jugadores de todo el mundo.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>100% Seguro</h3>
                    <p>Sin virus, sin malware, experiencia segura.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Games Section (Placeholder) -->
    <section class="games-section" id="juegos">
        <div class="container">
            <h2 class="section-title">
                <i class="fas fa-gamepad"></i>
                Nuestros Juegos
                <span class="section-badge">Próximamente</span>
            </h2>
            
            <div class="games-grid">
                <!-- Snake Game Card -->
                <div class="game-card" onclick="openGameModal('snake')">
                    <div class="game-image">
                        <div class="game-placeholder">
                            <i class="fas fa-gamepad"></i>
                        </div>
                        <div class="game-badges">
                            <span class="badge badge-hot">Hot</span>
                            <span class="badge badge-free">Gratis</span>
                        </div>
                    </div>
                    <div class="game-content">
                        <h3 class="game-title">Snake Game</h3>
                        <p class="game-description">El clásico juego de la serpiente con gráficos premium</p>
                        <div class="game-stats">
                            <span class="game-rating">
                                <i class="fas fa-star"></i>
                                4.8
                            </span>
                            <span class="game-plays">
                                <i class="fas fa-play"></i>
                                500+ partidas
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Tetris Game Card -->
                <div class="game-card" onclick="openGameModal('tetris')">
                    <div class="game-image">
                        <div class="game-placeholder">
                            <i class="fas fa-cube"></i>
                        </div>
                        <div class="game-badges">
                            <span class="badge badge-new">Nuevo</span>
                            <span class="badge badge-free">Gratis</span>
                        </div>
                    </div>
                    <div class="game-content">
                        <h3 class="game-title">Tetris</h3>
                        <p class="game-description">Rompe líneas con los bloques más famosos</p>
                        <div class="game-stats">
                            <span class="game-rating">
                                <i class="fas fa-star"></i>
                                4.9
                            </span>
                            <span class="game-plays">
                                <i class="fas fa-play"></i>
                                300+ partidas
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Coming Soon Cards -->
                <div class="game-card coming-soon">
                    <div class="game-image">
                        <div class="game-placeholder">
                            <i class="fas fa-pacman"></i>
                        </div>
                        <div class="game-badges">
                            <span class="badge badge-soon">Próximamente</span>
                        </div>
                    </div>
                    <div class="game-content">
                        <h3 class="game-title">Pac-Man</h3>
                        <p class="game-description">El clásico laberinto por comer puntos</p>
                        <div class="game-status">
                            <i class="fas fa-clock"></i>
                            En desarrollo
                        </div>
                    </div>
                </div>

                <div class="game-card coming-soon">
                    <div class="game-image">
                        <div class="game-placeholder">
                            <i class="fas fa-baseball-ball"></i>
                        </div>
                        <div class="game-badges">
                            <span class="badge badge-soon">Próximamente</span>
                        </div>
                    </div>
                    <div class="game-content">
                        <h3 class="game-title">Pong</h3>
                        <p class="game-description">El juego que inventó los videojuegos</p>
                        <div class="game-status">
                            <i class="fas fa-clock"></i>
                            En desarrollo
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <i class="fas fa-crown"></i>
                        <span>xpe.games</span>
                    </div>
                    <p class="footer-description">
                        La plataforma de juegos web premium con corona de calidad.
                    </p>
                </div>

                <div class="footer-links">
                    <div class="footer-section">
                        <h4>Juegos</h4>
                        <ul>
                            <li><a href="#juegos">Todos los juegos</a></li>
                            <li><a href="#categorias">Categorías</a></li>
                            <li><a href="#ranking">Ranking</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h4>Comunidad</h4>
                        <ul>
                            <li><a href="#" id="discord-link">Discord</a></li>
                            <li><a href="#" id="twitter-link">Twitter</a></li>
                            <li><a href="#" id="youtube-link">YouTube</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h4>Soporte</h4>
                        <ul>
                            <li><a href="#ayuda">Ayuda</a></li>
                            <li><a href="#contacto">Contacto</a></li>
                            <li><a href="#privacidad">Privacidad</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-creator">
                    <h4>Creador</h4>
                    <p class="creator-name">[Tu Nombre Aquí]</p>
                    <p class="creator-role">Desarrollador & Gaming Enthusiast</p>
                    
                    <div class="social-links">
                        <a href="#" class="social-link" title="Discord">
                            <i class="fab fa-discord"></i>
                        </a>
                        <a href="#" class="social-link" title="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link" title="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 xpe.games. Todos los derechos reservados.</p>
                <p>Creado con ❤️ por [Tu Nombre]</p>
            </div>
        </div>
    </footer>

    <!-- Modales -->
    <!-- Login Modal -->
    <div id="login-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Iniciar Sesión</h3>
                <button class="modal-close" onclick="closeModal('login-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="modal-body" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-sign-in-alt"></i>
                    Iniciar Sesión
                </button>
            </form>
        </div>
    </div>

    <!-- Premium Modal -->
    <div id="premium-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>💎 xpe.games Premium</h3>
                <button class="modal-close" onclick="closeModal('premium-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="premium-features">
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Juegos sin anuncios</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Modo oscuro automático</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Juegos exclusivos</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>Sincronización en la nube</span>
                    </div>
                </div>
                <div class="premium-price">
                    <span class="price">$4.99</span>
                    <span class="period">/mes</span>
                </div>
                <button class="btn-primary btn-premium">
                    <i class="fas fa-crown"></i>
                    Obtener Premium
                </button>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="js/config.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

---

## 🎨 **Paso 3: CSS Principal**

### **3.1 Archivo: styles/main.css**
Crear archivo: `styles/main.css`

```css
/* === VARIABLES GLOBALES === */
:root {
    /* Colores principales */
    --primary-color: #8b5cf6;
    --secondary-color: #f59e0b;
    --accent-color: #ec4899;
    
    /* Colores de fondo */
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    
    /* Colores de texto */
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --text-muted: #94a3b8;
    
    /* Colores de bordes */
    --border-color: #e2e8f0;
    --border-hover: #cbd5e1;
    
    /* Sombras */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    
    /* Transiciones */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}

/* === RESET Y BASE === */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* === LOADING SCREEN === */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity var(--transition-slow);
}

.loading-content {
    text-align: center;
    color: white;
}

.loading-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: pulse 2s infinite;
}

.loading-content h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.loading-bar {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    margin: 1rem auto;
    overflow: hidden;
}

.loading-progress {
    height: 100%;
    background: white;
    border-radius: 2px;
    animation: loading 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes loading {
    0% { width: 0%; }
    50% { width: 70%; }
    100% { width: 100%; }
}

/* === HERO SECTION === */
.hero {
    padding: 120px 0 80px;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    min-height: 90vh;
    display: flex;
    align-items: center;
}

.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
}

.hero-crown {
    color: var(--secondary-color);
    margin-right: 1rem;
    animation: sparkle 3s ease-in-out infinite;
}

.gradient-text {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-description {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.7;
}

.hero-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.stat {
    text-align: center;
}

.stat i {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.hero-actions {
    display: flex;
    gap: 1rem;
}

.btn-primary, .btn-secondary {
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
    background: var(--primary-color);
    color: white;
}

.hero-visual {
    display: flex;
    justify-content: center;
}

.hero-card {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-xl);
    max-width: 400px;
    border: 1px solid var(--border-color);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
    font-weight: 600;
}

.game-preview {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
}

.game-preview:last-child {
    border-bottom: none;
}

.game-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

.game-info h4 {
    margin-bottom: 0.25rem;
    color: var(--text-primary);
}

.game-info p {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.badge {
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
}

.badge-hot {
    background: #ef4444;
    color: white;
}

.badge-new {
    background: var(--secondary-color);
    color: white;
}

/* === FEATURES SECTION === */
.features {
    padding: 80px 0;
    background: var(--bg-secondary);
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: var(--text-primary);
}

.section-title i {
    color: var(--secondary-color);
    margin-right: 0.5rem;
}

.section-badge {
    background: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    margin-left: 1rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-normal);
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.feature-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    font-size: 2rem;
}

.feature-card h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.feature-card p {
    color: var(--text-secondary);
    line-height: 1.6;
}

/* === GAMES SECTION === */
.games-section {
    padding: 80px 0;
    background: var(--bg-primary);
}

.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.game-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-normal);
    cursor: pointer;
    border: 1px solid var(--border-color);
}

.game-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.game-card.coming-soon {
    opacity: 0.7;
    cursor: not-allowed;
}

.game-image {
    position: relative;
    height: 200px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    display: flex;
    align-items: center;
    justify-content: center;
}

.game-placeholder {
    color: white;
    font-size: 4rem;
}

.game-badges {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
}

.badge-soon {
    background: var(--text-muted);
    color: white;
}

.badge-free {
    background: #10b981;
    color: white;
}

.game-content {
    padding: 1.5rem;
}

.game-title {
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.game-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.game-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.game-rating, .game-plays {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.game-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    font-size: 0.9rem;
}

/* === MODALES === */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
    color: var(--text-primary);
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all var(--transition-fast);
}

.modal-close:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.modal-body {
    padding: 1.5rem;
}

/* === FORMULARIOS === */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    transition: all var(--transition-fast);
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* === PREMIUM === */
.premium-features {
    margin-bottom: 2rem;
}

.feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
}

.feature i {
    color: var(--primary-color);
}

.premium-price {
    text-align: center;
    margin-bottom: 2rem;
}

.price {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
}

.period {
    color: var(--text-secondary);
}

.btn-premium {
    width: 100%;
    background: linear-gradient(135deg, var(--secondary-color), #f97316);
}

/* === UTILIDADES === */
.hidden {
    display: none !important;
}

.text-center {
    text-align: center;
}

.mt-2 { margin-top: 1rem; }
.mt-4 { margin-top: 2rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 2rem; }

/* === RESPONSIVE === */
@media (max-width: 768px) {
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-stats {
        justify-content: center;
    }
    
    .hero-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .btn-primary, .btn-secondary {
        width: 100%;
        max-width: 300px;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .games-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .modal-content {
        width: 95%;
    }
}
```

---

## ⚙️ **Paso 4: JavaScript Principal**

### **4.1 Archivo: js/config.js**
Crear archivo: `js/config.js`

```javascript
// === CONFIGURACIÓN PRINCIPAL DE XPE.GAMES ===
const APP_CONFIG = {
    // Información de la aplicación
    APP_NAME: 'xpe.games',
    APP_VERSION: '1.0.0',
    APP_DESCRIPTION: 'Portal de Juegos Web Premium',
    
    // Creador
    CREATOR_NAME: '[Tu Nombre Aquí]', // CAMBIAR ESTO
    CREATOR_EMAIL: 'tu-email@example.com',
    CREATOR_ROLE: 'Desarrollador & Gaming Enthusiast',
    
    // Redes sociales (actualizar con tus enlaces reales)
    SOCIAL_LINKS: {
        DISCORD: 'https://discord.gg/tu-servidor',
        TWITTER: 'https://twitter.com/tu-usuario',
        YOUTUBE: 'https://youtube.com/@tu-canal',
        GITHUB: 'https://github.com/tu-usuario'
    },
    
    // Monetización (configurar después)
    MONETIZATION: {
        PAYPAL_DONATE_URL: 'https://paypal.me/xpegames',
        CRYPTO_BTC: 'bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        CRYPTO_ETH: '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        CRYPTO_USDT: 'TRxXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        PREMIUM_PRICE: 4.99,
        VIP_PRICE: 9.99
    },
    
    // URLs de API (para futuro desarrollo)
    API_URLS: {
        GAMES: 'https://api.xpe.games/games',
        USERS: 'https://api.xpe.games/users',
        LEADERBOARD: 'https://api.xpe.games/leaderboard'
    },
    
    // Configuración de localStorage
    STORAGE_KEYS: {
        USER_DATA: 'xpe_games_user_data',
        GAME_SCORES: 'xpe_games_scores',
        SETTINGS: 'xpe_games_settings',
        PREMIUM_STATUS: 'xpe_games_premium'
    },
    
    // Configuración de juegos
    GAMES_CONFIG: {
        SNAKE: {
            name: 'Snake Game',
            category: 'Arcade',
            difficulty: 'Fácil',
            minScore: 0,
            maxScore: 999999
        },
        TETRIS: {
            name: 'Tetris',
            category: 'Puzzle',
            difficulty: 'Medio',
            minScore: 0,
            maxScore: 999999
        }
    }
};

// === CONFIGURACIÓN DE TEMA ===
const THEME_CONFIG = {
    primary: '#8b5cf6',
    secondary: '#f59e0b',
    accent: '#ec4899',
    background: '#ffffff',
    text: '#1e293b'
};

// === CONFIGURACIÓN DE ANIMACIONES ===
const ANIMATION_CONFIG = {
    loadingDuration: 2000,
    modalSlideDuration: 300,
    cardHoverDuration: 300
};

// === INFORMACIÓN DE ESTADO DE LA APP ===
const APP_STATE = {
    isLoading: true,
    isLoggedIn: false,
    user: null,
    isPremium: false,
    currentPage: 'inicio',
    gamesLoaded: false
};

// === MENSAJES Y TEXTOS ===
const MESSAGES = {
    welcome: `Bienvenido a ${APP_CONFIG.APP_NAME}`,
    loading: 'Cargando tu portal gaming...',
    loginSuccess: '¡Bienvenido de vuelta!',
    loginError: 'Error al iniciar sesión',
    premiumFeatures: 'Funciones premium activadas',
    comingSoon: 'Próximamente disponible'
};

// === UTILIDADES GLOBALES ===
window.APP_CONFIG = APP_CONFIG;
window.THEME_CONFIG = THEME_CONFIG;
window.APP_STATE = APP_STATE;
window.MESSAGES = MESSAGES;
```

### **4.2 Archivo: js/main.js**
Crear archivo: `js/main.js`

```javascript
// === SISTEMA PRINCIPAL DE XPE.GAMES ===
class XPEGamesPortal {
    constructor() {
        this.init();
    }

    async init() {
        // Cargar configuración
        this.loadConfig();
        
        // Inicializar la aplicación
        await this.initializeApp();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Ocultar pantalla de carga
        this.hideLoadingScreen();
    }

    loadConfig() {
        // Configurar enlaces de redes sociales
        const discordLink = document.getElementById('discord-link');
        const twitterLink = document.getElementById('twitter-link');
        const youtubeLink = document.getElementById('youtube-link');

        if (discordLink) discordLink.href = APP_CONFIG.SOCIAL_LINKS.DISCORD;
        if (twitterLink) twitterLink.href = APP_CONFIG.SOCIAL_LINKS.TWITTER;
        if (youtubeLink) youtubeLink.href = APP_CONFIG.SOCIAL_LINKS.YOUTUBE;

        // Configurar información del creador
        const creatorNameElements = document.querySelectorAll('.creator-name');
        creatorNameElements.forEach(el => {
            el.textContent = APP_CONFIG.CREATOR_NAME;
        });

        const creatorRoleElements = document.querySelectorAll('.creator-role');
        creatorRoleElements.forEach(el => {
            el.textContent = APP_CONFIG.CREATOR_ROLE;
        });
    }

    async initializeApp() {
        // Verificar estado del usuario
        this.checkUserStatus();
        
        // Inicializar navegación
        this.initNavigation();
        
        // Configurar funcionalidades premium
        this.initPremiumFeatures();
        
        // Simular carga de juegos
        await this.loadGamesPlaceholder();
        
        APP_STATE.isLoading = false;
    }

    checkUserStatus() {
        const userData = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
        if (userData) {
            const user = JSON.parse(userData);
            APP_STATE.user = user;
            APP_STATE.isLoggedIn = true;
            this.updateUIForLoggedUser(user);
        }
    }

    updateUIForLoggedUser(user) {
        const loginBtn = document.getElementById('login-btn');
        const userInfo = document.getElementById('user-info');
        const usernameDisplay = document.getElementById('username-display');

        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.classList.remove('hidden');
        if (usernameDisplay) usernameDisplay.textContent = user.username;
    }

    setupEventListeners() {
        // Botones de navegación
        document.getElementById('login-btn')?.addEventListener('click', () => this.openLoginModal());
        document.getElementById('logout-btn')?.addEventListener('click', () => this.handleLogout());
        document.getElementById('premium-btn')?.addEventListener('click', () => this.openPremiumModal());
        document.getElementById('discord-btn')?.addEventListener('click', () => this.openDiscord());

        // Modales
        this.setupModalListeners();

        // Navegación suave
        this.setupSmoothScrolling();

        // Efectos de scroll
        this.setupScrollEffects();

        // Cerrar modales con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeAllModals();
        });
    }

    setupModalListeners() {
        // Cerrar modal al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // Event listeners para botones de cerrar
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.closeModal(modal.id);
            });
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        // Efecto de navegación al hacer scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    initNavigation() {
        // Marcar enlaces activos
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remover clase activa
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Agregar clase activa
                link.classList.add('active');
                
                // Scroll suave a la sección
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    initPremiumFeatures() {
        // Verificar estado premium
        const premiumStatus = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.PREMIUM_STATUS);
        if (premiumStatus === 'true') {
            APP_STATE.isPremium = true;
            this.enablePremiumFeatures();
        }
    }

    enablePremiumFeatures() {
        // Agregar clase premium al body
        document.body.classList.add('premium-active');
        
        // Activar funciones premium
        console.log('✅ Funciones premium activadas');
    }

    async loadGamesPlaceholder() {
        // Simular carga de juegos
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Actualizar estadísticas
        const playCounts = document.querySelectorAll('.game-plays');
        playCounts.forEach(el => {
            const count = Math.floor(Math.random() * 1000) + 100;
            el.innerHTML = `<i class="fas fa-play"></i> ${count}+ partidas`;
        });
        
        APP_STATE.gamesLoaded = true;
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, ANIMATION_CONFIG.loadingDuration);
    }

    // === MÉTODOS DE MODALES ===
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }

    openLoginModal() {
        this.openModal('login-modal');
    }

    openPremiumModal() {
        this.openModal('premium-modal');
    }

    openGameModal(gameId) {
        if (gameId === 'snake' || gameId === 'tetris') {
            alert(`${APP_CONFIG.GAMES_CONFIG[gameId.toUpperCase()].name} estará disponible próximamente.\n¡Mantente atento a las actualizaciones!`);
        } else {
            alert('Juego en desarrollo. ¡Próximamente disponible!');
        }
    }

    // === MÉTODOS DE AUTENTICACIÓN ===
    handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            // Simular login exitoso
            const userData = {
                username: username,
                email: `${username}@example.com`,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem(APP_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
            APP_STATE.user = userData;
            APP_STATE.isLoggedIn = true;
            
            this.updateUIForLoggedUser(userData);
            this.closeModal('login-modal');
            
            // Mostrar mensaje de bienvenida
            this.showNotification(MESSAGES.loginSuccess, 'success');
        } else {
            this.showNotification(MESSAGES.loginError, 'error');
        }
    }

    handleLogout() {
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
        APP_STATE.user = null;
        APP_STATE.isLoggedIn = false;
        
        // Restaurar UI
        const loginBtn = document.getElementById('login-btn');
        const userInfo = document.getElementById('user-info');
        
        if (loginBtn) loginBtn.style.display = 'block';
        if (userInfo) userInfo.classList.add('hidden');
        
        this.showNotification('Sesión cerrada correctamente', 'info');
    }

    // === OTROS MÉTODOS ===
    openDiscord() {
        window.open(APP_CONFIG.SOCIAL_LINKS.DISCORD, '_blank');
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Agregar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// === FUNCIONES GLOBALES ===
function closeModal(modalId) {
    if (window.portal) {
        window.portal.closeModal(modalId);
    }
}

function scrollToSection(sectionId) {
    if (window.portal) {
        window.portal.scrollToSection(sectionId);
    }
}

function openPremiumModal() {
    if (window.portal) {
        window.portal.openPremiumModal();
    }
}

function openGameModal(gameId) {
    if (window.portal) {
        window.portal.openGameModal(gameId);
    }
}

function handleLogin(event) {
    if (window.portal) {
        window.portal.handleLogin(event);
    }
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    window.portal = new XPEGamesPortal();
});

// === CSS ANIMATIONS ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .premium-active .premium-btn {
        background: linear-gradient(135deg, var(--secondary-color), #f97316);
        color: white;
    }
    
    .premium-active .premium-btn::before {
        content: "✓ ";
    }
`;
document.head.appendChild(style);
```

---

## 📱 **Paso 5: CSS Adicionales (Navegación y Footer)**

### **5.1 Archivo: styles/navigation.css**
Crear archivo: `styles/navigation.css`

```css
/* === NAVEGACIÓN === */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: transparent;
    transition: all var(--transition-normal);
    padding: 1rem 0;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
}

.nav-logo i {
    color: var(--secondary-color);
    font-size: 2rem;
}

.nav-logo span {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-fast);
    position: relative;
    padding: 0.5rem 0;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width var(--transition-normal);
}

.nav-link:hover,
.nav-link.active {
    color: var(--text-primary);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.discord-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #5865f2, #7289da);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
    text-decoration: none;
}

.discord-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.4);
}

.premium-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: transparent;
    color: var(--secondary-color);
    border: 2px solid var(--secondary-color);
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.premium-btn:hover {
    background: var(--secondary-color);
    color: white;
    transform: translateY(-2px);
}

.user-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.login-btn {
    padding: 0.75rem 1.5rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.login-btn:hover {
    background: #7c3aed;
    transform: translateY(-2px);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

#username-display {
    font-weight: 600;
    color: var(--text-primary);
}

.logout-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all var(--transition-fast);
}

.logout-btn:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

/* === RESPONSIVE NAVEGACIÓN === */
@media (max-width: 768px) {
    .nav-container {
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .nav-menu {
        order: 3;
        width: 100%;
        justify-content: center;
        gap: 1rem;
    }
    
    .nav-actions {
        gap: 0.5rem;
    }
    
    .discord-btn,
    .premium-btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
    
    .login-btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .nav-logo {
        font-size: 1.25rem;
    }
    
    .nav-logo i {
        font-size: 1.5rem;
    }
    
    .nav-menu {
        gap: 0.75rem;
    }
    
    .nav-link {
        font-size: 0.9rem;
    }
}
```

### **5.2 Archivo: styles/footer.css**
Crear archivo: `styles/footer.css`

```css
/* === FOOTER === */
.footer {
    background: var(--bg-tertiary);
    padding: 60px 0 20px;
    border-top: 1px solid var(--border-color);
    margin-top: 80px;
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
}

.footer-brand {
    max-width: 300px;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.footer-logo i {
    color: var(--secondary-color);
    font-size: 2rem;
}

.footer-description {
    color: var(--text-secondary);
    line-height: 1.6;
}

.footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.footer-section h4 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-weight: 600;
}

.footer-section ul {
    list-style: none;
}

.footer-section li {
    margin-bottom: 0.5rem;
}

.footer-section a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
}

.footer-section a:hover {
    color: var(--primary-color);
}

.footer-creator {
    text-align: center;
}

.footer-creator h4 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-weight: 600;
}

.creator-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.creator-role {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    color: var(--text-secondary);
    border-radius: 50%;
    text-decoration: none;
    transition: all var(--transition-normal);
    border: 1px solid var(--border-color);
}

.social-link:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-muted);
    font-size: 0.9rem;
}

.footer-bottom p {
    margin-bottom: 0.5rem;
}

.footer-bottom p:last-child {
    margin-bottom: 0;
}

/* === RESPONSIVE FOOTER === */
@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }
    
    .footer-links {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .social-links {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .footer {
        padding: 40px 0 20px;
    }
    
    .footer-content {
        gap: 1.5rem;
    }
    
    .footer-brand {
        max-width: none;
    }
}
```

---

## ✅ **Paso 6: Verificar y Subir a GitHub**

### **6.1 Estructura final que debes subir:**
```
xpe-games-portal/
├── index.html
├── styles/
│   ├── main.css
│   ├── navigation.css
│   └── footer.css
├── js/
│   ├── config.js
│   └── main.js
└── README.md (opcional)
```

### **6.2 Subir a GitHub:**
1. En tu repositorio, ve a **"Add file"** → **"Create new file"**
2. Crea primero `index.html` con el contenido del Paso 2.2
3. Para cada archivo CSS: **"Add file"** → **"Create new file"** con la ruta completa (ej: `styles/main.css`)
4. Para cada archivo JS: **"Add file"** → **"Create new file"** con la ruta completa (ej: `js/config.js`)
5. En cada archivo, pega el contenido correspondiente
6. **IMPORTANTE:** Después de subir todos los archivos, actualiza `js/config.js` con tu nombre real

### **6.3 Activar GitHub Pages:**
1. Ve a **Settings** → **Pages**
2. Source: **"Deploy from a branch"**
3. Branch: **"main"**
4. Tu sitio estará en: `https://tu-usuario.github.io/xpe-games-portal`

---

## 🎯 **Resultado Final**

Al terminar tendrás:
- ✅ Sitio web profesional con diseño premium
- ✅ Navegación suave y responsive
- ✅ Sistema de login simulado
- ✅ Integración con Discord
- ✅ Sección de juegos (placeholder)
- ✅ Footer con información del creador
- ✅ Base perfecta para agregar juegos después

**¿Listo para empezar? ¿Cuál es tu nombre para personalizar todo correctamente?**