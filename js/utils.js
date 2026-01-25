// ============================================
// Utility Functions
// 1200 Agency
// ============================================

/**
 * Debounce function - limits the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function - ensures a function is called at most once in a specified time period
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit = 300) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} threshold - Percentage of element that should be visible (0-1)
 * @returns {boolean} - True if element is in viewport
 */
export const isInViewport = (element, threshold = 0.2) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

    return visibleHeight / elementHeight >= threshold;
};

/**
 * Smooth scroll to a target element
 * @param {string|HTMLElement} target - CSS selector or element to scroll to
 * @param {number} offset - Offset from top in pixels (for fixed headers)
 * @param {number} duration - Animation duration in milliseconds
 */
export const smoothScroll = (target, offset = 0, duration = 800) => {
    const targetElement = typeof target === 'string'
        ? document.querySelector(target)
        : target;

    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function (ease-in-out)
        const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
};

/**
 * Get current scroll position
 * @returns {number} - Current scroll position in pixels
 */
export const getScrollPosition = () => {
    return window.pageYOffset || document.documentElement.scrollTop;
};

/**
 * Check if user has scrolled past a certain point
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} - True if scrolled past threshold
 */
export const hasScrolledPast = (threshold = 100) => {
    return getScrollPosition() > threshold;
};

/**
 * Get viewport dimensions
 * @returns {Object} - Object with width and height properties
 */
export const getViewportDimensions = () => {
    return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };
};

/**
 * Check if viewport is mobile size
 * @param {number} breakpoint - Mobile breakpoint in pixels
 * @returns {boolean} - True if viewport is mobile size
 */
export const isMobile = (breakpoint = 768) => {
    return getViewportDimensions().width < breakpoint;
};

/**
 * Add class to element with optional delay
 * @param {HTMLElement} element - The element to add class to
 * @param {string} className - The class name to add
 * @param {number} delay - Delay in milliseconds
 */
export const addClassWithDelay = (element, className, delay = 0) => {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
};

/**
 * Remove class from element with optional delay
 * @param {HTMLElement} element - The element to remove class from
 * @param {string} className - The class name to remove
 * @param {number} delay - Delay in milliseconds
 */
export const removeClassWithDelay = (element, className, delay = 0) => {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
};

/**
 * Toggle class on element
 * @param {HTMLElement} element - The element to toggle class on
 * @param {string} className - The class name to toggle
 */
export const toggleClass = (element, className) => {
    element.classList.toggle(className);
};

/**
 * Wait for a specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Promise that resolves after the specified time
 */
export const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Format number with commas (e.g., 1000 -> 1,000)
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Animate a number from start to end
 * @param {HTMLElement} element - The element to update
 * @param {number} start - Starting number
 * @param {number} end - Ending number
 * @param {number} duration - Animation duration in milliseconds
 */
export const animateNumber = (element, start, end, duration = 2000) => {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

/**
 * Trap focus within an element (useful for modals)
 * @param {HTMLElement} element - The element to trap focus within
 */
export const trapFocus = (element) => {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
};

/**
 * Generate a unique ID
 * @returns {string} - Unique ID string
 */
export const generateId = () => {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default {
    debounce,
    throttle,
    isInViewport,
    smoothScroll,
    getScrollPosition,
    hasScrolledPast,
    getViewportDimensions,
    isMobile,
    addClassWithDelay,
    removeClassWithDelay,
    toggleClass,
    wait,
    formatNumber,
    animateNumber,
    trapFocus,
    generateId
};
