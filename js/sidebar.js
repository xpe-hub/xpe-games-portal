// ===== SIDEBAR FUNCTIONALITY =====

// Global sidebar state
let sidebarOpen = false;

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebar || !overlay) return;
    
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        mainContent?.classList.add('sidebar-open');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        mainContent?.classList.remove('sidebar-open');
        document.body.style.overflow = '';
    }
}

// Close sidebar
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebar || !overlay) return;
    
    sidebarOpen = false;
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    mainContent?.classList.remove('sidebar-open');
    document.body.style.overflow = '';
}

// Open sidebar
function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebar || !overlay) return;
    
    sidebarOpen = true;
    sidebar.classList.add('open');
    overlay.classList.add('active');
    mainContent?.classList.add('sidebar-open');
    document.body.style.overflow = 'hidden';
}

// Handle sidebar overlay click
function handleOverlayClick() {
    closeSidebar();
}

// Handle escape key
function handleEscapeKey(e) {
    if (e.key === 'Escape' && sidebarOpen) {
        closeSidebar();
    }
}

// Initialize sidebar functionality
function initializeSidebar() {
    // Add event listeners
    document.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebarOpen) {
            closeSidebar();
        }
    });
    
    // Touch gestures for mobile
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!sidebarOpen) {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Swipe right from left edge to open sidebar
            if (startX < 30 && deltaX > 50 && Math.abs(deltaY) < 100) {
                openSidebar();
            }
        }
    });
    
    // Handle swipe left from sidebar to close
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        let sidebarStartX = 0;
        
        sidebar.addEventListener('touchstart', function(e) {
            sidebarStartX = e.touches[0].clientX;
        });
        
        sidebar.addEventListener('touchmove', function(e) {
            if (sidebarOpen && sidebarStartX > 200) {
                e.preventDefault();
            }
        });
        
        sidebar.addEventListener('touchend', function(e) {
            if (sidebarOpen && sidebarStartX > 200) {
                const endX = e.changedTouches[0].clientX;
                const deltaX = sidebarStartX - endX;
                
                if (deltaX > 50) {
                    closeSidebar();
                }
            }
        });
    }
}

// Sidebar search functionality
function initializeSidebarSearch() {
    const searchInput = document.getElementById('categorySearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function() {
        filterCategories();
    }, 300));
    
    // Clear search with Escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterCategories();
            this.blur();
        }
    });
}

// Filter categories based on search
function filterCategories() {
    const searchInput = document.getElementById('categorySearch');
    const searchTerm = searchInput?.value.toLowerCase().trim() || '';
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const shouldShow = searchTerm === '' || text.includes(searchTerm);
        
        item.style.display = shouldShow ? 'flex' : 'none';
        
        // Hide entire sections if all items are hidden
        const section = item.closest('.sidebar-section');
        if (section) {
            const visibleItems = section.querySelectorAll('.sidebar-item[style*="flex"]');
            section.style.display = visibleItems.length > 0 ? 'block' : 'none';
        }
    });
    
    // Show "no results" message if no matches
    const hasVisibleItems = Array.from(sidebarItems).some(item => 
        item.style.display !== 'none'
    );
    
    let noResultsMsg = document.querySelector('.sidebar-no-results');
    if (!hasVisibleItems) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'sidebar-no-results';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: #64748b;">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 15px; display: block;"></i>
                    <p>No se encontraron categorías</p>
                    <p style="font-size: 14px; margin-top: 10px;">Intenta con otros términos</p>
                </div>
            `;
            document.querySelector('.sidebar-menu').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Sidebar scroll functionality
function initializeSidebarScroll() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    const scrollToTopBtn = document.querySelector('.scroll-top-btn');
    
    if (scrollToTopBtn) {
        sidebar.addEventListener('scroll', throttle(function() {
            const scrollTop = sidebar.scrollTop;
            
            if (scrollTop > 200) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        }, 100));
    }
}

// Scroll to top of sidebar
function scrollToTop() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Sidebar navigation
function navigateToSection(section) {
    // Remove active class from all items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
    
    // Show notification
    const sectionName = getSectionDisplayName(section);
    showNotification(`Navegando a: ${sectionName}`, 'info');
    
    console.log(`Navigating to section: ${section}`);
}

// Get display name for section
function getSectionDisplayName(section) {
    const names = {
        'home': 'Inicio',
        'new': 'Juegos Nuevos',
        'popular': 'Más Populares',
        'trending': 'Trending',
        'updated': 'Actualizados',
        'recent': 'Recientes',
        'random': 'Aleatorio',
        'achievements': 'Logros',
        'multiplayer': 'Multijugador',
        'two-players': '2 Jugadores',
        'io-games': 'Juegos .io',
        'leaderboard': 'Top Jugadores',
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
        'friday-night-funkin': 'Friday Night Funkin',
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
    
    return names[section] || section.charAt(0).toUpperCase() + section.slice(1);
}

// Utility functions
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

function throttle(func, limit) {
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
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeSidebar();
        initializeSidebarSearch();
        initializeSidebarScroll();
    });
} else {
    initializeSidebar();
    initializeSidebarSearch();
    initializeSidebarScroll();
}

// Global functions for HTML onclick events
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.scrollToTop = scrollToTop;
window.navigateToSection = navigateToSection;