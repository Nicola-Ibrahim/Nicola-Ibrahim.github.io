/**
 * Main Website Functionality
 * Orchestrates navigation, animations, and interactive features
 */

import { NavigationManager } from './modules/navigation.js';
import { AnimationManager } from './modules/animations.js';
import { utils } from './modules/utils.js';

class PortfolioWebsite {
  constructor() {
    this.init();
  }

  /**
   * Initialize all website functionality
   */
  init() {
    new NavigationManager();
    new AnimationManager();
    this.initFloatingBall();
    this.initKeyboardShortcuts();
    this.initContactForm();
    this.initLazyLoading();

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
            // Navigate to tools section (previously About)
            this.scrollToSection('tools');
            break;
          case '3':
            e.preventDefault();
            // Navigate to projects section (previously experience)
            this.scrollToSection('projects');
            break;
          case '4':
            e.preventDefault();
            // Navigate to experience section
            this.scrollToSection('experience');
            break;
          case '5':
            e.preventDefault();
            // Navigate to education section
            this.scrollToSection('education');
            break;
          case '6':
            e.preventDefault();
            // Navigate to contact section
            this.scrollToSection('contact');
            break;
        }
      }
    });


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
      const emailRegex = /^[\S]+@[\S]+\.[\S]+$/;
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

// Initialize portfolio website when DOM is ready
function initPortfolio() {
  new PortfolioWebsite();
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
