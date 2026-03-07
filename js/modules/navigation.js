/**
 * Navigation Functionality
 * Handles mobile menu, smooth scrolling, and scroll spy
 */

class NavigationManager {
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
    const mobileMenuButton = document.getElementById('mobile-menu-btn'); // Updated ID
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu logic is already partly in index.html inline script, 
    // but we can enhance it here or leave it there. 
    // The inline script handles the toggle. We can add close-on-click here.

    if (mobileMenu) {
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // Desktop nav: click to set active and persist
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('text-primary')); // Active state style
        this.classList.add('text-primary');
        const href = this.getAttribute('href');
        if (href) {
          const sectionId = href.substring(1);
          localStorage.setItem('activeNav', sectionId);
        }
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
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
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
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
              link.classList.add('text-primary');
              localStorage.setItem('activeNav', currentSection);
            } else {
              link.classList.remove('text-primary');
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
        const href = link.getAttribute('href');
        if (href === `#${savedSection}`) {
          link.classList.add('text-primary');
        } else {
          link.classList.remove('text-primary');
        }
      });
    }
  }
}
