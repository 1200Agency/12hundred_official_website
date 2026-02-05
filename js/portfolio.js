// ============================================
// Portfolio Page JavaScript
// 1200 Agency
// ============================================

// Portfolio data structure
const portfolioData = {
    toroaccess: [
        { file: 'photo_1_2026-02-04_22-27-12.jpg', title: 'Smart Ticketing + Engagement', client: 'ToroAccess' },
        { file: 'photo_2_2026-02-04_22-27-12.jpg', title: 'Smart Ticketing + Engagement', client: 'ToroAccess' },
        { file: 'photo_3_2026-02-04_22-27-33.jpg', title: 'Ticket Hierarchies', client: 'ToroAccess' },
        { file: 'photo_4_2026-02-04_22-27-33.jpg', title: 'Your Ticket is a Journey', client: 'ToroAccess' },
        { file: 'photo_8_2026-02-04_22-27-12.jpg', title: 'Explore the App', client: 'ToroAccess' },
        { file: 'photo_9_2026-02-04_22-27-12.jpg', title: 'More than Just Tickets', client: 'ToroAccess' },
        { file: 'photo_11_2026-02-04_22-27-12.jpg', title: 'Smart Ticketing + Engagement', client: 'ToroAccess' },
        { file: 'photo_12_2026-02-04_22-27-12.jpg', title: 'Smart Ticketing + Engagement', client: 'ToroAccess' },
        { file: 'photo_13_2026-02-04_22-27-12.jpg', title: 'Smart Ticketing + Engagement', client: 'ToroAccess' }
    ],
    slashsend: [
        { file: 'photo_16_2026-02-04_22-27-12.jpg', title: '/send Believers', client: 'SlashSend' }
    ],
    synapsepower: [
        { file: 'photo_1_2026-02-04_22-27-33.jpg', title: 'Days to Go', client: 'SynapsePower' },
        { file: 'photo_2_2026-02-04_22-26-22.jpg', title: 'Diplomat Mubarak', client: 'SynapsePower' },
        { file: 'photo_3_2026-02-04_22-26-22.jpg', title: 'Meet the Speakers', client: 'SynapsePower' },
        { file: 'photo_9_2026-02-04_22-26-08.jpg', title: 'Meet the Speakers', client: 'SynapsePower' },
        { file: 'photo_18_2026-02-04_22-27-12.jpg', title: 'Event Graphics', client: 'SynapsePower' },
        { file: 'photo_19_2026-02-04_22-27-12.jpg', title: 'Event Graphics', client: 'SynapsePower' },
        { file: 'photo_23_2026-02-04_22-27-12.jpg', title: 'Event Graphics', client: 'SynapsePower' },
        { file: 'photo_24_2026-02-04_22-27-12.jpg', title: 'Event Graphics', client: 'SynapsePower' },
        { file: 'photo_26_2026-02-04_22-27-12.jpg', title: 'Event Graphics', client: 'SynapsePower' },
        { file: 'photo_27_2026-02-04_22-27-12.jpg', title: 'Event Graphics', client: 'SynapsePower' }
    ],
    bet9ja: [
        { file: 'photo_2_2026-02-04_22-27-33.jpg', title: 'Say No to Drugs Zaria', client: 'Bet9ja Foundation' },
        { file: 'photo_3_2026-02-04_22-27-12.jpg', title: 'Rules and Guidelines', client: 'Bet9ja Foundation' },
        { file: 'photo_4_2026-02-04_22-27-12.jpg', title: 'Mandatory Hashtags', client: 'Bet9ja Foundation' },
        { file: 'photo_5_2026-02-04_22-27-12.jpg', title: 'Submit Your Entry', client: 'Bet9ja Foundation' },
        { file: 'photo_6_2026-02-04_22-27-12.jpg', title: 'Social Media Links', client: 'Bet9ja Foundation' },
        { file: 'photo_7_2026-02-04_22-27-12.jpg', title: 'Call for Content Creators', client: 'Bet9ja Foundation' },
        { file: 'photo_14_2026-02-04_22-27-12.jpg', title: 'Say No to Drugs', client: 'Bet9ja Foundation' },
        { file: 'photo_17_2026-02-04_22-27-12.jpg', title: 'Say No to Drugs', client: 'Bet9ja Foundation' }
    ],
    ecoclimate: [
        { file: 'photo_1_2026-02-04_22-26-22.jpg', title: 'Social Media Challenge', client: 'EcoClimate Foundation' },
        { file: 'photo_4_2026-02-04_22-26-08.jpg', title: 'The Challenge', client: 'EcoClimate Foundation' },
        { file: 'photo_6_2026-02-04_22-26-08.jpg', title: 'Social Media Challenge', client: 'EcoClimate Foundation' },
        { file: 'photo_7_2026-02-04_22-26-08.jpg', title: 'The Challenge', client: 'EcoClimate Foundation' },
        { file: 'photo_8_2026-02-04_22-26-08.jpg', title: 'Social Media Challenge', client: 'EcoClimate Foundation' }
    ],
    bravplus: [
        { file: 'photo_28_2026-02-04_22-27-12.jpg', title: 'Welcome to February', client: 'Bravplus' }
    ],
    forg3: [
        { file: 'photo_29_2026-02-04_22-27-12.jpg', title: 'Design Like a Pro', client: 'Forg3 Labs' }
    ],
    'verified-abu': [],
    'real-estate': [
        { file: 'photo_21_2026-02-04_22-27-12.jpg', title: 'House for Rent', client: 'Tendari Villa' }
    ]
};

// Initialize portfolio
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    initializeFilters();
    initializeCounters();
    initializeScrollReveal();
});

// Initialize portfolio grid
function initializePortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    let allItems = [];
    let itemIndex = 0;

    // Build portfolio items from data
    Object.keys(portfolioData).forEach(category => {
        portfolioData[category].forEach(item => {
            const portfolioItem = createPortfolioItem(item, category, itemIndex);
            allItems.push(portfolioItem);
            itemIndex++;
        });
    });

    // Shuffle for visual variety
    allItems = shuffleArray(allItems);

    // Add stagger animation delay
    allItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
        grid.appendChild(item);
    });
}

// Create portfolio item element
function createPortfolioItem(item, category, index) {
    const article = document.createElement('article');
    article.className = 'portfolio-item';
    article.dataset.category = category;
    article.dataset.index = index;

    const folderMap = {
        'toroaccess': 'ToroAccess',
        'slashsend': 'SlashSend',
        'synapsepower': 'SynapsePower',
        'bet9ja': 'Bet9ja_Foundation',
        'ecoclimate': 'EcoClimateFoundation',
        'bravplus': 'Bravplus',
        'forg3': 'Forg3_Labs',
        'verified-abu': 'Verified_ABU_Community',
        'real-estate': 'Real_Estate'
    };

    const imagePath = `Graphics/${folderMap[category]}/${item.file}`;

    article.innerHTML = `
        <div class="item-wrapper">
            <div class="item-image-container">
                <img 
                    src="${imagePath}" 
                    alt="${item.title} - ${item.client}"
                    loading="lazy"
                    class="item-image"
                />
                <div class="item-overlay">
                    <div class="overlay-content">
                        <h3 class="item-title">${item.title}</h3>
                        <p class="item-client">${item.client}</p>
                        <button class="view-fullscreen-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            View Full Size
                        </button>
                    </div>
                </div>
            </div>
            <div class="item-meta">
                <span class="item-category">${item.client}</span>
                <span class="item-date">2026</span>
            </div>
        </div>
    `;

    // Add click handler
    article.addEventListener('click', () => {
        openLightbox(index);
    });

    return article;
}

// Initialize filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('filter-out');
                    setTimeout(() => item.classList.add('filter-in'), 10);
                } else {
                    item.classList.add('filter-out');
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.classList.remove('filter-out');
                    }, 300);
                }
            });
        });
    });
}

// Initialize counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Initialize scroll reveal
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Utility: Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Open lightbox (handled in lightbox.js)
function openLightbox(index) {
    if (window.Lightbox) {
        window.Lightbox.open(index);
    }
}
