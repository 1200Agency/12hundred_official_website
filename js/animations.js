// ============================================
// Animation Controller Module
// 1200 Agency
// ============================================

import { isInViewport, addClassWithDelay } from './utils.js';
import { scrollAnimation } from './config.js';

/**
 * AnimationController class - handles scroll-triggered and page load animations
 */
class AnimationController {
    constructor() {
        this.animatedElements = [];
        this.init();
    }

    /**
     * Initialize all animations
     */
    init() {
        this.setupPageLoadAnimations();
        this.setupScrollAnimations();
        this.setupScrollIndicator();

        console.log('✅ Animations initialized');
    }

    /**
     * Setup page load animations for hero section
     */
    setupPageLoadAnimations() {
        // Add loaded class to body to trigger CSS animations
        addClassWithDelay(document.body, 'page-loaded', 100);

        // Animate hero elements (CSS animations handle the actual animation)
        // This method is here for any additional JS-driven animations if needed
    }

    /**
     * Setup scroll-triggered animations using Intersection Observer
     */
    setupScrollAnimations() {
        // Find all elements with animate-on-scroll class
        const elements = document.querySelectorAll('.animate-on-scroll');

        if (elements.length === 0) return;

        // Create Intersection Observer
        const observerOptions = {
            threshold: scrollAnimation.threshold,
            rootMargin: scrollAnimation.rootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate-in class to trigger CSS animation
                    entry.target.classList.add('animate-in');

                    // Track animated elements
                    this.animatedElements.push(entry.target);

                    // Stop observing this element (animate only once)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements
        elements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Setup scroll indicator click handler
     */
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (!scrollIndicator) return;

        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /**
     * Manually trigger animation for an element
     * @param {HTMLElement} element - Element to animate
     */
    animateElement(element) {
        if (!element.classList.contains('animate-in')) {
            element.classList.add('animate-in');
            this.animatedElements.push(element);
        }
    }

    /**
     * Reset all animations (useful for testing)
     */
    resetAnimations() {
        this.animatedElements.forEach(element => {
            element.classList.remove('animate-in');
        });
        this.animatedElements = [];

        // Re-setup scroll animations
        this.setupScrollAnimations();
    }
}

export default AnimationController;
