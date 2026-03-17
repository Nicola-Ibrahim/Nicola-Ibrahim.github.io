import { NavigationManager } from './modules/navigation.js';
import { AnimationManager } from './modules/animations.js';
import { UIManager } from './modules/ui.js';
import { HeroVisualization } from './modules/hero-visualization.js';
import { AboutVisualization } from './modules/about-visualization.js';

/**
 * Main Website Functionality
 * Orchestrates navigation, animations, and interactive features
 */


export class Portfolio {
  constructor() {
    this.init();
  }

  /**
   * Initialize all website functionality
   */
  init() {
    // Initialize Managers
    this.navigationManager = new NavigationManager();
    this.animationManager = new AnimationManager();
    this.uiManager = new UIManager();

    // Initialize Visualizations
    this.heroVis = new HeroVisualization();
    this.aboutVis = new AboutVisualization();

    // Initialize 3D Tilt
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll(".glass-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
      });
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add any global event listeners here
  }
}

// Initialize portfolio website when DOM is ready
function initPortfolio() {
  window.portfolio = new Portfolio();
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
