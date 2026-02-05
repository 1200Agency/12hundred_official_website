// ============================================
// Lightbox JavaScript
// 1200 Agency
// ============================================

const Lightbox = (() => {
    let currentIndex = 0;
    let images = [];
    let lightboxElement = null;
    let imageElement = null;
    let titleElement = null;
    let clientElement = null;

    // Initialize lightbox
    function init() {
        lightboxElement = document.getElementById('lightbox');
        if (!lightboxElement) return;

        imageElement = lightboxElement.querySelector('.lightbox-image');
        titleElement = lightboxElement.querySelector('.lightbox-title');
        clientElement = lightboxElement.querySelector('.lightbox-client');

        // Collect all images
        collectImages();

        // Setup event listeners
        setupEventListeners();
    }

    // Collect all portfolio images
    function collectImages() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        // Only collect visible items
        const visibleItems = Array.from(portfolioItems).filter(item => item.style.display !== 'none');

        images = visibleItems.map(item => {
            const img = item.querySelector('.item-image');
            const title = item.querySelector('.item-title');
            const client = item.querySelector('.item-client');

            return {
                src: img ? img.src : '',
                alt: img ? img.alt : '',
                title: title ? title.textContent : '',
                client: client ? client.textContent : ''
            };
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Close button
        const closeBtn = lightboxElement.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', close);

        // Navigation buttons
        const prevBtn = lightboxElement.querySelector('.lightbox-prev');
        const nextBtn = lightboxElement.querySelector('.lightbox-next');

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigate(-1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigate(1);
        });

        // Backdrop click
        const backdrop = lightboxElement.querySelector('.lightbox-backdrop');
        backdrop.addEventListener('click', close);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyPress);

        // Prevent body scroll when lightbox is open
        lightboxElement.addEventListener('transitionend', () => {
            if (lightboxElement.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Open lightbox
    function open(index) {
        if (images.length === 0) collectImages();

        currentIndex = index;
        updateImage();
        lightboxElement.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function close() {
        lightboxElement.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigate between images
    function navigate(direction) {
        currentIndex += direction;

        // Loop around
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        } else if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        // Add transition effect
        imageElement.classList.add('transitioning');

        setTimeout(() => {
            updateImage();
            imageElement.classList.remove('transitioning');
        }, 200);
    }

    // Update displayed image
    function updateImage() {
        const image = images[currentIndex];
        if (!image) return;

        imageElement.src = image.src;
        imageElement.alt = image.alt;
        titleElement.textContent = image.title;
        clientElement.textContent = image.client;
    }

    // Handle keyboard press
    function handleKeyPress(e) {
        if (!lightboxElement.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                close();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
        }
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    return {
        open,
        close,
        navigate
    };
})();

// Make Lightbox available globally
window.Lightbox = Lightbox;
