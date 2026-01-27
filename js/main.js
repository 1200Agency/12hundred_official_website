// ===================================
// MAIN JAVASCRIPT ENTRY POINT
// ===================================

import Navigation from './navigation.js';
import AnimationController from './animations.js';
import ContactForm from './form-validation.js';

/**
 * Initialize all modules when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    new Navigation();

    // Initialize animations
    new AnimationController();

    // Initialize contact form
    new ContactForm();

    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');

    console.log('🚀 1200 Agency website initialized');
});
