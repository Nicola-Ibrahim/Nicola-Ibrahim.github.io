/**
 * Navigation Functionality
 * Handles mobile menu, smooth scrolling, and scroll spy
 */

export class NavigationManager {
  constructor() {
    this.bindNavigationEvents();
    this.initSmoothScrolling();
    this.initScrollSpy();
    this.restoreActiveNav();
  }

  /**
   * Bind navigation related events
   */
  bindNavigationEvents() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
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
    }
    // Desktop nav: click to set active and persist
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        localStorage.setItem('activeNav', this.dataset.section);
      });
    });
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
    const navLinks = document.querySelectorAll('.nav-link');
    if (sections.length === 0 || navLinks.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.dataset.section === currentSection) {
              link.classList.add('active');
              localStorage.setItem('activeNav', currentSection);
            } else {
              link.classList.remove('active');
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

  restoreActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const savedSection = localStorage.getItem('activeNav');
    if (savedSection) {
      navLinks.forEach(link => {
        if (link.dataset.section === savedSection) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }
}

