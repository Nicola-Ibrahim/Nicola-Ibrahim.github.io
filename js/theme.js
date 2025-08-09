/**
 * Theme Management System
 * Handles dark/light theme switching with localStorage persistence
 */

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.themeToggle = null;
    this.init();
  }

  /**
   * Initialize theme management
   */
  init() {
    this.loadThemeFromStorage();
    this.createThemeToggle();
    this.applyTheme(this.currentTheme, false);
    this.bindEvents();

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme-preference')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Load theme preference from localStorage or detect system preference
   */
  loadThemeFromStorage() {
    const savedTheme = localStorage.getItem('theme-preference');

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      // Detect system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.currentTheme = 'dark';
      } else {
        this.currentTheme = 'light';
      }
    }
  }

  /**
   * Create theme toggle button and insert into navigation
   */
  createThemeToggle() {
    // Create theme toggle container
    const themeContainer = document.createElement('div');
    themeContainer.className = 'flex items-center ml-4';

    // Create toggle button
    const toggle = document.createElement('button');
    toggle.setAttribute('aria-label', 'Toggle dark/light theme');
    toggle.setAttribute('role', 'switch');
    toggle.setAttribute('aria-checked', this.currentTheme === 'dark');
    toggle.className = 'theme-toggle focus:outline-none';
    toggle.title = 'Toggle theme';

    // Create toggle indicator
    const indicator = document.createElement('div');
    indicator.className = 'theme-toggle-indicator';

    // Add icons
    const sunIcon = document.createElement('i');
    sunIcon.className = 'fas fa-sun';
    sunIcon.style.fontSize = '0.5rem';

    const moonIcon = document.createElement('i');
    moonIcon.className = 'fas fa-moon';
    moonIcon.style.fontSize = '0.5rem';

    // Set initial icon
    if (this.currentTheme === 'dark') {
      indicator.appendChild(moonIcon);
    } else {
      indicator.appendChild(sunIcon);
    }

    toggle.appendChild(indicator);
    themeContainer.appendChild(toggle);

    // Insert into desktop navigation
    const desktopNav = document.querySelector('.hidden.md\\:flex');
    if (desktopNav) {
      desktopNav.appendChild(themeContainer);
    }

    // Create mobile theme toggle
    const mobileThemeContainer = document.createElement('div');
    mobileThemeContainer.className = 'px-3 py-2';

    const mobileToggle = toggle.cloneNode(true);
    mobileToggle.querySelector('.theme-toggle-indicator').innerHTML =
      this.currentTheme === 'dark' ? '<i class="fas fa-moon" style="font-size: 0.5rem;"></i>'
        : '<i class="fas fa-sun" style="font-size: 0.5rem;"></i>';

    mobileThemeContainer.appendChild(mobileToggle);

    // Insert into mobile menu
    const mobileMenu = document.querySelector('#mobile-menu .space-y-1');
    if (mobileMenu) {
      mobileMenu.appendChild(mobileThemeContainer);
    }

    // Store references
    this.themeToggle = toggle;
    this.mobileThemeToggle = mobileToggle;
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    if (this.mobileThemeToggle) {
      this.mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Set theme with animation
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') {
      console.warn('Invalid theme:', theme);
      return;
    }

    this.currentTheme = theme;
    this.applyTheme(theme, true);
    this.saveThemeToStorage(theme);
    this.updateToggleState();

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('themeChange', {
      detail: { theme }
    }));
  }

  /**
   * Apply theme to document
   * @param {string} theme - Theme to apply
   * @param {boolean} animate - Whether to animate the transition
   */
  applyTheme(theme, animate = true) {
    const html = document.documentElement;

    if (animate) {
      // Add transition class
      html.style.transition = 'background-color 0.3s ease, color 0.3s ease';

      // Remove transition after animation
      setTimeout(() => {
        html.style.transition = '';
      }, 300);
    }

    // Set theme attribute
    html.setAttribute('data-theme', theme);

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);

    // Announce theme change to screen readers
    this.announceThemeChange(theme);
  }

  /**
   * Update meta theme-color for mobile browsers
   * @param {string} theme - Current theme
   */
  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }

    const colors = {
      light: '#ffffff',
      dark: '#1e293b'
    };

    metaThemeColor.content = colors[theme];
  }

  /**
   * Update toggle button state
   */
  updateToggleState() {
    const toggles = [this.themeToggle, this.mobileThemeToggle].filter(Boolean);

    toggles.forEach(toggle => {
      const indicator = toggle.querySelector('.theme-toggle-indicator');
      const isDark = this.currentTheme === 'dark';

      // Update ARIA attributes
      toggle.setAttribute('aria-checked', isDark);
      toggle.title = `Switch to ${isDark ? 'light' : 'dark'} theme`;

      // Update icon
      indicator.innerHTML = isDark
        ? '<i class="fas fa-moon" style="font-size: 0.5rem;"></i>'
        : '<i class="fas fa-sun" style="font-size: 0.5rem;"></i>';
    });
  }

  /**
   * Save theme preference to localStorage
   * @param {string} theme - Theme to save
   */
  saveThemeToStorage(theme) {
    try {
      localStorage.setItem('theme-preference', theme);
    } catch (error) {
      console.warn('Could not save theme preference:', error);
    }
  }

  /**
   * Announce theme change to screen readers
   * @param {string} theme - Current theme
   */
  announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${theme} theme`;

    document.body.appendChild(announcement);

    // Remove announcement after screen readers have read it
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Get current theme
   * @returns {string} Current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Check if dark theme is active
   * @returns {boolean} True if dark theme is active
   */
  isDarkTheme() {
    return this.currentTheme === 'dark';
  }
}

// Initialize theme manager when DOM is ready
let themeManager;

function initTheme() {
  themeManager = new ThemeManager();

  // Make theme manager globally available
  window.themeManager = themeManager;

  // Add keyboard shortcut info to console
  console.log('💡 Theme keyboard shortcut: Ctrl+T');
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// Export for use in other modules
window.ThemeManager = ThemeManager;
