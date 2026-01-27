/**
 * Theme Toggle Functionality
 * 1200 Agency
 * Handles switching between dark and light modes
 */

class ThemeToggle {
    constructor() {
        this.theme = this.getStoredTheme() || 'dark';
        this.toggleButton = null;
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme, false);

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createToggleButton());
        } else {
            this.createToggleButton();
        }
    }

    createToggleButton() {
        // Create toggle button
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'theme-toggle';
        this.toggleButton.setAttribute('aria-label', 'Toggle theme');
        this.toggleButton.innerHTML = `
            <div class="theme-toggle-icon">
                <svg class="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 1V3M12 21V23M23 12H21M3 12H1M20.49 3.51L19.07 4.93M4.93 19.07L3.51 20.49M20.49 20.49L19.07 19.07M4.93 4.93L3.51 3.51" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <svg class="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor"/>
                </svg>
            </div>
        `;

        // Add click event
        this.toggleButton.addEventListener('click', () => this.toggle());

        // Add to body
        document.body.appendChild(this.toggleButton);

        // Update aria-label based on current theme
        this.updateAriaLabel();
    }

    toggle() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true);
    }

    setTheme(theme, save = true) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);

        if (save) {
            this.storeTheme(theme);
        }

        this.updateAriaLabel();

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    updateAriaLabel() {
        if (this.toggleButton) {
            const label = this.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
            this.toggleButton.setAttribute('aria-label', label);
        }
    }

    storeTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn('Unable to save theme preference:', e);
        }
    }

    getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            console.warn('Unable to retrieve theme preference:', e);
            return null;
        }
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.theme;
    }
}

// Initialize theme toggle
const themeToggle = new ThemeToggle();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeToggle;
}
