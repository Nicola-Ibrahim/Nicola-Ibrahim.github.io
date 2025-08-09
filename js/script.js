/**
 * Main Website Functionality
 * Handles navigation, animations, and interactive features
 */

class PortfolioWebsite {
  constructor() {
    this.init();
  }

  /**
   * Initialize all website functionality
   */
  init() {
    this.bindNavigationEvents();
    this.initSmoothScrolling();
    this.initScrollSpy();
    this.initTypingAnimation();
    this.initAnimationObserver();
    this.initFloatingBall();
    this.initKeyboardShortcuts();

    console.log('🚀 Portfolio website initialized successfully!');
  }

  /**
   * Bind navigation related events
   */
  bindNavigationEvents() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      // Toggle mobile menu
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        // Update ARIA attributes
        const isExpanded = !mobileMenu.classList.contains('hidden');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);

        // Change icon
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
          icon.className = isExpanded ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
        }
      });

      // Close mobile menu when clicking on a link
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');

          // Reset icon
          const icon = mobileMenuButton.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-bars text-xl';
          }
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');

          // Reset icon
          const icon = mobileMenuButton.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-bars text-xl';
          }
        }
      });

      // Close mobile menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
          mobileMenuButton.focus();

          // Reset icon
          const icon = mobileMenuButton.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-bars text-xl';
          }
        }
      });
    }
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));

        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Focus management for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.removeAttribute('tabindex');
        }
      });
    });
  }

  /**
   * Initialize scroll spy for navigation highlighting
   */
  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute('id');

          // Update navigation links
          navLinks.forEach(link => {
            link.classList.remove('text-accent', 'font-semibold');
            link.classList.add('text-secondary');

            if (link.getAttribute('href') === `#${currentSection}`) {
              link.classList.remove('text-secondary');
              link.classList.add('text-accent', 'font-semibold');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -20% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Initialize typing animation effect
   */
  initTypingAnimation() {
    const typingText = document.querySelector('.typing-animation');
    if (!typingText) return;

    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Add cursor blink class after typing is complete
        typingText.classList.add('cursor-blink');
      }
    };

    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
  }

  /**
   * Initialize Intersection Observer for animations
   */
  initAnimationObserver() {
    const animatedElements = document.querySelectorAll('.card-hover, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => observer.observe(element));
  }

  /**
   * Initialize floating ball functionality
   */
  initFloatingBall() {
    const ball = document.getElementById('minimax-floating-ball');
    if (!ball) return;

    // Initial animation
    ball.style.opacity = '0';
    ball.style.transform = 'translateY(20px)';

    setTimeout(() => {
      ball.style.opacity = '1';
      ball.style.transform = 'translateY(0)';
    }, 500);

    // Handle logo click
    const ballContent = ball.querySelector('.minimax-ball-content');
    if (ballContent) {
      ballContent.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open('https://agent.minimax.io/agent', '_blank');

        // Click animation
        ball.style.transform = 'scale(0.95)';
        setTimeout(() => {
          ball.style.transform = 'scale(1)';
        }, 100);
      });
    }

    // Handle close button click
    const closeIcon = ball.querySelector('.minimax-close-icon');
    if (closeIcon) {
      closeIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        ball.style.opacity = '0';
        ball.style.transform = 'translateY(20px)';

        setTimeout(() => {
          ball.style.display = 'none';
        }, 300);
      });
    }

    // Add keyboard support
    ball.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ballContent.click();
      }
    });

    // Make focusable
    ball.setAttribute('tabindex', '0');
    ball.setAttribute('role', 'button');
    ball.setAttribute('aria-label', 'Created by MiniMax Agent - Click to visit website');
  }

  /**
   * Initialize keyboard shortcuts
   */
  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Skip if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Navigation shortcuts
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            this.scrollToSection('home');
            break;
          case '2':
            e.preventDefault();
            this.scrollToSection('about');
            break;
          case '3':
            e.preventDefault();
            this.scrollToSection('experience');
            break;
          case '4':
            e.preventDefault();
            this.scrollToSection('education');
            break;
          case '5':
            e.preventDefault();
            this.scrollToSection('skills');
            break;
          case '6':
            e.preventDefault();
            this.scrollToSection('projects');
            break;
          case '7':
            e.preventDefault();
            this.scrollToSection('contact');
            break;
        }
      }
    });

    // Add keyboard shortcut info to console
    console.log('⌨️ Keyboard shortcuts:');
    console.log('Alt+1-7: Navigate to sections');
    console.log('Ctrl+T: Toggle theme');
  }

  /**
   * Scroll to a specific section
   * @param {string} sectionId - ID of the section to scroll to
   */
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Initialize contact form functionality (if present)
   */
  initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        this.showNotification('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        this.showNotification('Please enter a valid email address.', 'error');
        return;
      }

      // Show success message (in real implementation, this would send the email)
      this.showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  /**
   * Show notification message
   * @param {string} message - Message to display
   * @param {string} type - Type of notification ('success', 'error', 'info')
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300 transform translate-x-full`;

    const colors = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white'
    };

    notification.className += ` ${colors[type]}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  /**
   * Initialize lazy loading for images
   */
  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('fade-in');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// Utility functions
const utils = {
  /**
   * Debounce function to limit the rate of function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @returns {boolean} True if element is in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Format date for display
   * @param {string|Date} date - Date to format
   * @returns {string} Formatted date string
   */
  formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

// Initialize portfolio website when DOM is ready
let portfolioWebsite;

function initPortfolio() {
  portfolioWebsite = new PortfolioWebsite();

  // Make available globally for debugging
  window.portfolioWebsite = portfolioWebsite;
  window.utils = utils;
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    console.log('👋 Welcome back!');
  }
});

// Export for module use
window.PortfolioWebsite = PortfolioWebsite;
window.portfolioUtils = utils;
