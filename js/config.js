// ============================================
// Configuration Constants
// 1200 Agency
// ============================================

export const CONFIG = {
  // Animation durations (in milliseconds)
  animationDuration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800
  },

  // Breakpoints (in pixels)
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440
  },

  // Navigation
  navigation: {
    scrollOffset: 80, // Height of fixed navigation
    scrollThreshold: 100, // Scroll distance before nav background changes
    mobileBreakpoint: 768
  },

  // Scroll animations
  scrollAnimation: {
    threshold: 0.2, // Percentage of element visible before animating
    rootMargin: '0px 0px -100px 0px'
  },

  // Form validation
  form: {
    minNameLength: 2,
    minMessageLength: 10,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  // Carousel/Slider
  carousel: {
    autoPlayInterval: 5000, // 5 seconds
    transitionDuration: 500
  },

  // API endpoints (for form submission)
  api: {
    formSubmitUrl: 'https://formsubmit.co/your-email@example.com' // Replace with actual email
  }
};

// Export individual config sections for convenience
export const { animationDuration, breakpoints, navigation, scrollAnimation, form, carousel, api } = CONFIG;

export default CONFIG;
