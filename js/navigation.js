// ============================================
// Navigation Module
// 1200 Agency
// ============================================

import { smoothScroll, hasScrolledPast, debounce } from './utils.js';
import { navigation } from './config.js';

/**
 * Navigation class - handles all navigation functionality
 */
class Navigation {
    constructor() {
        this.nav = document.getElementById('main-nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        this.hamburger = document.querySelector('.hamburger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.scrollToTopBtn = this.createScrollToTopButton();

        this.init();
    }

    /**
     * Initialize all navigation functionality
     */
    init() {
        this.setupSmoothScroll();
        this.setupMobileMenu();
        this.setupScrollBehavior();
        this.setupActiveState();
        this.setupScrollToTop();

        console.log('✅ Navigation initialized');
    }

    /**
     * Setup smooth scrolling for all navigation links
     */
    setupSmoothScroll() {
        const allLinks = [...this.navLinks, ...this.mobileMenuLinks];

        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    smoothScroll(targetSection, navigation.scrollOffset);

                    // Close mobile menu if open
                    if (this.mobileMenu.classList.contains('active')) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }

    /**
     * Setup mobile menu toggle functionality
     */
    setupMobileMenu() {
        if (!this.hamburger || !this.mobileMenu) return;

        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        this.mobileMenu.addEventListener('click', (e) => {
            if (e.target === this.mobileMenu) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * Toggle mobile menu open/closed
     */
    toggleMobileMenu() {
        const isExpanded = this.hamburger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        this.mobileMenu.classList.add('active');
        this.hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    }

    /**
     * Setup scroll behavior - change nav background on scroll
     */
    setupScrollBehavior() {
        const handleScroll = debounce(() => {
            if (hasScrolledPast(navigation.scrollThreshold)) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();
    }

    /**
     * Setup active state highlighting for current section
     */
    setupActiveState() {
        const sections = document.querySelectorAll('section[id]');

        const highlightNav = debounce(() => {
            const scrollPosition = window.scrollY + navigation.scrollOffset + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    this.navLinks.forEach(link => link.classList.remove('active'));

                    // Add active class to current section link
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, 10);

        window.addEventListener('scroll', highlightNav);

        // Initial check
        highlightNav();
    }

    /**
     * Create and setup scroll-to-top button
     */
    createScrollToTopButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.setAttribute('aria-label', 'Scroll to top');
        button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4l-8 8h5v8h6v-8h5z"/>
      </svg>
    `;
        document.body.appendChild(button);
        return button;
    }

    /**
     * Setup scroll-to-top button functionality
     */
    setupScrollToTop() {
        const handleScroll = debounce(() => {
            if (hasScrolledPast(window.innerHeight)) {
                this.scrollToTopBtn.classList.add('visible');
            } else {
                this.scrollToTopBtn.classList.remove('visible');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);

        this.scrollToTopBtn.addEventListener('click', () => {
            smoothScroll(document.body, 0);
        });
    }
}

export default Navigation;
