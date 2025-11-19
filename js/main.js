// ===== MAIN APPLICATION SCRIPT =====

// Global variables
let currentView = 'grid';
let currentSort = 'popular';
let games = [];
let filteredGames = [];
let isChristmasTheme = false;

// Initialize the main application
function initializeApp() {
    console.log('🎮 Initializing xpe.games...');
    
    // Load theme from localStorage
    loadTheme();
    
    // Initialize components
    initializeEventListeners();
    loadGames();
    updateStats();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    console.log('✅ xpe.games initialized successfully!');
}

// Theme Management
function loadTheme() {
    isChristmasTheme = localStorage.getItem('christmas-theme') === 'true';
    if (isChristmasTheme) {
        document.body.classList.add('christmas-theme');
    }
}

function toggleChristmasTheme() {
    isChristmasTheme = !isChristmasTheme;
    
    if (isChristmasTheme) {
        document.body.classList.add('christmas-theme');
        localStorage.setItem('christmas-theme', 'true');
        showNotification('🎄 ¡Modo Navideño activado!', 'success');
    } else {
        document.body.classList.remove('christmas-theme');
        localStorage.setItem('christmas-theme', 'false');
        showNotification('☀️ ¡Modo normal activado!', 'success');
    }
}

// Event Listeners
function initializeEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('gameSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchGames, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchGames();
            }
        });
    }

    // Category search
    const categorySearch = document.getElementById('categorySearch');
    if (categorySearch) {
        categorySearch.addEventListener('input', debounce(filterCategories, 300));
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Skip intro
    if (e.key === 'Escape') {
        const intro = document.getElementById('intro-container');
        if (intro && intro.style.opacity !== '0') {
            e.preventDefault();
            window.IntroAnimation?.endIntro();
        }
    }
    
    // Toggle sidebar
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleSidebar();
    }
    
    // Search focus
    if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const searchInput = document.getElementById('gameSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }
}

// Games Data
const gamesData = [
    // Featured Games
    {
        id: 1,
        title: "Stickman Fighter Classic",
        description: "El juego clásico de lucha que marcó tu infancia. Revive la épica batalla entre stickmans.",
        category: "accion",
        icon: "⚔️",
        rating: 4.8,
        plays: "1.2M",
        isFeatured: true,
        difficulty: 3,
        tags: ["clásico", "acción", "lucha"]
    },
    {
        id: 2,
        title: "Super Mario Bros Epic",
        description: "Acompaña a Mario en su aventura más épica. Salta, corre y enfréntate a Bowser.",
        category: "mario-bros",
        icon: "🍄",
        rating: 4.9,
        plays: "2.5M",
        isFeatured: true,
        difficulty: 2,
        tags: ["plataforma", "clásico", "aventura"]
    },
    {
        id: 3,
        title: "Tetris Mastermind",
        description: "El puzzle más icónico de todos los tiempos. ¡Acomoda las piezas y alcanza la puntuación máxima!",
        category: "puzzle",
        icon: "🧩",
        rating: 4.7,
        plays: "3.1M",
        isFeatured: true,
        difficulty: 4,
        tags: ["puzzle", "clásico", "estrategia"]
    },

    // Action Games
    {
        id: 4,
        title: "Battle Royale Stickman",
        description: "El battle royale más épico con stickmans. ¡Supera a todos tus oponentes!",
        category: "accion",
        icon: "💥",
        rating: 4.5,
        plays: "850K",
        tags: ["batalla", "multijugador", "acción"]
    },
    {
        id: 5,
        title: "Street Fighter Legends",
        description: "Revive las mejores luchas callejeras con gráficos épicos y combos increíbles.",
        category: "accion",
        icon: "👊",
        rating: 4.6,
        plays: "920K",
        tags: ["lucha", "clásico", "combos"]
    },

    // Adventure Games
    {
        id: 6,
        title: "Lost Treasure Adventure",
        description: "Busca tesoros perdidos en una aventura épica llena de peligros y secretos.",
        category: "aventuras",
        icon: "🗺️",
        rating: 4.4,
        plays: "680K",
        tags: ["aventura", "exploración", "tesoros"]
    },
    {
        id: 7,
        title: "Forest Explorer",
        description: "Explora bosques mágicos y descubre criaturas increíbles en esta aventura única.",
        category: "aventuras",
        icon: "🌲",
        rating: 4.3,
        plays: "520K",
        tags: ["naturaleza", "magia", "exploración"]
    },

    // Racing Games
    {
        id: 8,
        title: "Turbo Speed Racer",
        description: "Compite en carreras épicas a alta velocidad. ¡Demuestra quién es el mejor piloto!",
        category: "carreras",
        icon: "🏎️",
        rating: 4.5,
        plays: "750K",
        tags: ["carreras", "velocidad", "competición"]
    },
    {
        id: 9,
        title: "Mountain Bike Challenge",
        description: "Domina las montañas con tu bicicleta. ¡Precisión y velocidad son la clave!",
        category: "carreras",
        icon: "🚵",
        rating: 4.2,
        plays: "420K",
        tags: ["deporte", "montaña", "habilidad"]
    },

    // Classic Games
    {
        id: 10,
        title: "Pac-Man Classic",
        description: "El comecocos original. Come todos los puntos y evita a los fantasmas.",
        category: "clasicos",
        icon: "👻",
        rating: 4.8,
        plays: "1.8M",
        tags: ["arcade", "clásico", "retro"]
    },
    {
        id: 11,
        title: "Space Invaders",
        description: "Defiende la Tierra de la invasión alienígena. ¡Un clásico atemporal!",
        category: "clasicos",
        icon: "👽",
        rating: 4.7,
        plays: "1.5M",
        tags: ["espacial", "disparos", "clásico"]
    },

    // Sports Games
    {
        id: 12,
        title: "Soccer Star",
        description: "El fútbol más épico. Marca goles increíbles y conviértete en una estrella.",
        category: "futbol",
        icon: "⚽",
        rating: 4.6,
        plays: "1.1M",
        tags: ["fútbol", "deporte", "multijugador"]
    },
    {
        id: 13,
        title: "Basketball Hero",
        description: "Conviértete en el héroe del baloncesto. Clutches épicos te esperan.",
        category: "baloncesto",
        icon: "🏀",
        rating: 4.4,
        plays: "780K",
        tags: ["baloncesto", "deporte", "clutch"]
    },

    // Puzzle Games
    {
        id: 14,
        title: "Sudoku Master",
        description: "Pon a prueba tu mente con el puzzle de números más desafiante.",
        category: "puzzle",
        icon: "🔢",
        rating: 4.3,
        plays: "650K",
        tags: ["lógica", "números", "mente"]
    },
    {
        id: 15,
        title: "Candy Crush Match",
        description: "Conecta dulces y crea explosiones épicas en este juego de colores.",
        category: "puzzle",
        icon: "🍭",
        rating: 4.5,
        plays: "890K",
        tags: ["dulces", "colores", "explosiones"]
    },

    // Children's Games
    {
        id: 16,
        title: "Coloring Book Magic",
        description: "Libera tu creatividad con nuestro libro de colorear mágico.",
        category: "infantiles",
        icon: "🎨",
        rating: 4.2,
        plays: "420K",
        tags: ["arte", "creatividad", "niños"]
    },
    {
        id: 17,
        title: "Animal Kingdom",
        description: "Aprende sobre los animales en este juego educativo y divertido.",
        category: "infantiles",
        icon: "🦁",
        rating: 4.4,
        plays: "530K",
        tags: ["animales", "educativo", "familia"]
    },

    // New Functional Games
    {
        id: 18,
        title: "Tateti Clásico",
        description: "El juego de tres en raya más divertido. ¡Desafía a tus amigos o juega contra la computadora!",
        category: "clasicos",
        icon: "🎯",
        rating: 4.8,
        plays: "650K",
        isFeatured: true,
        difficulty: 2,
        tags: ["tres en raya", "mesa", "estrategia"],
        gameUrl: "tateti_standalone.html"
    },
    {
        id: 19,
        title: "Snake Legend",
        description: "Revive el clásico Snake. ¡Haz crecer tu serpiente y come las manzanas sin chocar!",
        category: "clasicos",
        icon: "🐍",
        rating: 4.6,
        plays: "890K",
        tags: ["serpiente", "clásico", "arcade"],
        gameUrl: "games/snake.html"
    },
    {
        id: 20,
        title: "Super Mario Flash",
        description: "La aventura definitiva de Mario en HTML5. Salta, corre y recoge las monedas en niveles épicos.",
        category: "mario-bros",
        icon: "🍄",
        rating: 4.9,
        plays: "1.8M",
        isFeatured: true,
        difficulty: 3,
        tags: ["mario", "plataforma", "aventura"],
        gameUrl: "games/mario.html"
    }
];

// Load Games
function loadGames() {
    games = gamesData;
    filteredGames = [...games];
    renderGames();
}

function renderGames() {
    const featuredContainer = document.getElementById('featuredGames');
    const allGamesContainer = document.getElementById('allGames');
    
    if (!featuredContainer || !allGamesContainer) return;

    // Render featured games
    const featuredGames = games.filter(game => game.isFeatured);
    featuredContainer.innerHTML = featuredGames.map(game => createGameCard(game, true)).join('');

    // Render all games with current filters
    renderFilteredGames();
}

function renderFilteredGames() {
    const allGamesContainer = document.getElementById('allGames');
    if (!allGamesContainer) return;

    let gamesToShow = [...filteredGames];

    // Apply sorting
    switch (currentSort) {
        case 'popular':
            gamesToShow.sort((a, b) => b.plays.replace(/[^\d.]/g, '') - a.plays.replace(/[^\d.]/g, ''));
            break;
        case 'rating':
            gamesToShow.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            gamesToShow.sort((a, b) => b.id - a.id);
            break;
        case 'name':
            gamesToShow.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    allGamesContainer.innerHTML = gamesToShow.map(game => createGameCard(game)).join('');
    
    // Add fade-in animation
    requestAnimationFrame(() => {
        const gameCards = allGamesContainer.querySelectorAll('.game-card');
        gameCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 50);
        });
    });
}

// Create Game Card HTML
function createGameCard(game, isFeatured = false) {
    const difficultyStars = '⭐'.repeat(game.difficulty || 3);
    const featuredBadge = isFeatured ? '<span class="game-badge featured">Destacado</span>' : '';
    const categoryBadge = `<span class="game-badge ${getCategoryColor(game.category)}">${getCategoryName(game.category)}</span>`;
    
    return `
        <div class="game-card ${game.category} ${isFeatured ? 'featured-game' : ''}" 
             onclick="playGame('${game.category}', ${game.id})">
            <div class="game-thumbnail">
                <div class="game-image">${game.icon}</div>
                <div class="game-thumbnail-overlay">
                    <button class="play-btn">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                ${featuredBadge}
                ${categoryBadge}
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <div class="game-category ${game.category}">
                        <i class="fas ${getCategoryIcon(game.category)}"></i>
                        ${getCategoryName(game.category)}
                    </div>
                    <div class="game-stats">
                        <div class="stat plays">
                            <i class="fas fa-play"></i>
                            <span>${game.plays}</span>
                        </div>
                        <div class="stat rating">
                            <i class="fas fa-star"></i>
                            <span>${game.rating}</span>
                        </div>
                    </div>
                </div>
                <div class="game-footer">
                    <div class="difficulty">
                        <span>Dificultad:</span>
                        <div class="difficulty-stars">
                            ${difficultyStars.split('').map(() => '<i class="fas fa-star"></i>').join('')}
                        </div>
                    </div>
                    <div class="play-time">
                        <i class="fas fa-clock"></i>
                        ${getPlayTime(game.category)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions
function getCategoryIcon(category) {
    const icons = {
        'accion': 'fa-bolt',
        'aventuras': 'fa-compass',
        'carreras': 'fa-car',
        'clasicos': 'fa-gamepad',
        'mario-bros': 'fa-mushroom',
        'minecraft': 'fa-cube',
        'puzzle': 'fa-puzzle-piece',
        'estrategia': 'fa-chess',
        'futbol': 'fa-futbol',
        'baloncesto': 'fa-basketball-ball',
        'coches': 'fa-car',
        'motos': 'fa-motorcycle',
        'infantiles': 'fa-child',
        'divertidos': 'fa-laugh',
        'vestir': 'fa-tshirt',
        'cocinar': 'fa-utensils',
        'pintar': 'fa-palette',
        'moda': 'fa-female',
        'pokemon': 'fa-bolt',
        'sonic': 'fa-bolt',
        'friday-night-funkin': 'fa-music',
        'dinosaurios': 'fa-dragon',
        'mesa': 'fa-chess-board',
        'cartas': 'fa-cards',
        'terror': 'fa-ghost',
        'escape': 'fa-door-open',
        'guerra': 'fa-crosshairs',
        'armas': 'fa-gun',
        'bolas': 'fa-circle',
        'matematicas': 'fa-calculator'
    };
    return icons[category] || 'fa-gamepad';
}

function getCategoryName(category) {
    const names = {
        'accion': 'Acción',
        'aventuras': 'Aventuras',
        'carreras': 'Carreras',
        'clasicos': 'Clásicos',
        'mario-bros': 'Mario Bros',
        'minecraft': 'Minecraft',
        'puzzle': 'Puzzle',
        'estrategia': 'Estrategia',
        'futbol': 'Fútbol',
        'baloncesto': 'Baloncesto',
        'coches': 'Coches',
        'motos': 'Motos',
        'infantiles': 'Infantiles',
        'divertidos': 'Divertidos',
        'vestir': 'Vestir',
        'cocinar': 'Cocinar',
        'pintar': 'Pintar',
        'moda': 'Moda',
        'pokemon': 'Pokémon',
        'sonic': 'Sonic',
        'friday-night-funkin': 'FNF',
        'dinosaurios': 'Dinosaurios',
        'mesa': 'Mesa',
        'cartas': 'Cartas',
        'terror': 'Terror',
        'escape': 'Escape',
        'guerra': 'Guerra',
        'armas': 'Armas',
        'bolas': 'Bolas',
        'matematicas': 'Matemáticas'
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function getCategoryColor(category) {
    const colors = {
        'accion': 'hot',
        'aventuras': 'new',
        'carreras': 'popular',
        'clasicos': 'classic',
        'mario-bros': 'new',
        'minecraft': 'popular',
        'puzzle': 'classic',
        'estrategia': 'new',
        'futbol': 'popular',
        'baloncesto': 'new',
        'infantiles': 'new',
        'terror': 'hot'
    };
    return colors[category] || 'new';
}

function getPlayTime(category) {
    const times = {
        'accion': '5-15 min',
        'aventuras': '20-60 min',
        'carreras': '3-10 min',
        'clasicos': '5-30 min',
        'puzzle': '10-45 min',
        'estrategia': '15-90 min',
        'infantiles': '5-20 min'
    };
    return times[category] || '10-30 min';
}

// Navigation Functions
function navigateToSection(section) {
    // Update active states
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    event.target.classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
    
    // Show section
    console.log(`Navigating to section: ${section}`);
    showNotification(`Navegando a: ${getSectionName(section)}`, 'info');
}

function getSectionName(section) {
    const names = {
        'home': 'Inicio',
        'new': 'Juegos Nuevos',
        'popular': 'Más Populares',
        'trending': 'Trending',
        'updated': 'Actualizados',
        'recent': 'Recientes',
        'random': 'Random',
        'achievements': 'Logros',
        'multiplayer': 'Multijugador',
        'two-players': '2 Jugadores',
        'io-games': 'Juegos .io',
        'leaderboard': 'Top Jugadores'
    };
    return names[section] || section;
}

// Category Filtering
function filterCategory(category) {
    filteredGames = games.filter(game => game.category === category);
    
    // Update active states in sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    event.target.classList.add('active');
    
    // Show filtered games
    renderFilteredGames();
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
    
    showNotification(`Mostrando: ${getCategoryName(category)}`, 'info');
}

// Search Functionality
function searchGames() {
    const searchTerm = document.getElementById('gameSearch').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredGames = [...games];
    } else {
        filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.category.toLowerCase().includes(searchTerm) ||
            game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Remove active states from categories
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    renderFilteredGames();
    
    // Show results count
    if (searchTerm) {
        showNotification(`${filteredGames.length} juegos encontrados para "${searchTerm}"`, 'info');
    }
}

function filterCategories() {
    const searchTerm = document.getElementById('categorySearch').value.toLowerCase().trim();
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (searchTerm === '' || text.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Game Controls
function setView(view) {
    currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update grid
    const gamesGrid = document.getElementById('allGames');
    if (gamesGrid) {
        gamesGrid.className = `games-grid ${view}-view`;
    }
    
    showNotification(`Vista cambiada a ${view}`, 'success');
}

function toggleSortMenu() {
    // Implement sort menu dropdown
    console.log('Sort menu toggled');
}

function playGame(category, gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    // Special handling for functional games
    if (gameId === 18) { // Tateti
        window.location.href = 'games/tateti.html';
        return;
    }
    
    showNotification(`¡Iniciando ${game.title}!`, 'success');
    
    // Simulate game loading
    setTimeout(() => {
        showNotification(`¡Disfruta jugando ${game.title}!`, 'info');
    }, 1000);
    
    console.log(`Playing game: ${game.title} (${category})`);
}

// Stats and Analytics
function updateStats() {
    // Simulate real-time stats
    const onlinePlayers = Math.floor(Math.random() * 500) + 1000;
    const totalGames = games.length;
    
    // Update header stats
    const headerPlayers = document.getElementById('onlinePlayers');
    const headerGames = document.getElementById('totalGames');
    const sidebarPlayers = document.getElementById('onlinePlayersSidebar');
    
    if (headerPlayers) headerPlayers.textContent = onlinePlayers.toLocaleString();
    if (headerGames) headerGames.textContent = `${totalGames}+`;
    if (sidebarPlayers) sidebarPlayers.textContent = onlinePlayers.toLocaleString();
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    });
    
    // Set background color based on type
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    notification.style.background = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleResize() {
    // Close sidebar on mobile when resizing
    if (window.innerWidth > 768) {
        closeSidebar();
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for global access
window.initializeApp = initializeApp;