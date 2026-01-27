// ===================================
// LAZY LOADING MODULE
// ===================================

/**
 * LazyLoader class handles lazy loading of images
 * for improved performance
 */
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    /**
     * Initialize lazy loading with Intersection Observer
     */
    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for browsers that don't support Intersection Observer
            this.loadAllImages();
            return;
        }

        const imageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            },
            {
                // Start loading when image is 200px from viewport
                rootMargin: '200px 0px',
                threshold: 0.01
            }
        );

        this.images.forEach(img => imageObserver.observe(img));

        console.log(`✅ Lazy loading initialized for ${this.images.length} images`);
    }

    /**
     * Load a single image
     * @param {HTMLImageElement} img - The image element to load
     */
    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (!src) return;

        // Create a new image to preload
        const tempImage = new Image();

        tempImage.onload = () => {
            // Set the actual src
            img.src = src;

            // Set srcset if available
            if (srcset) {
                img.srcset = srcset;
            }

            // Add loaded class for CSS transitions
            img.classList.add('loaded');

            // Remove data attributes
            delete img.dataset.src;
            delete img.dataset.srcset;
        };

        tempImage.onerror = () => {
            console.error(`Failed to load image: ${src}`);
        };

        // Start loading
        tempImage.src = src;
    }

    /**
     * Fallback: Load all images immediately
     * Used when Intersection Observer is not supported
     */
    loadAllImages() {
        this.images.forEach(img => this.loadImage(img));
        console.log('⚠️ Intersection Observer not supported, loading all images immediately');
    }
}

export default LazyLoader;
