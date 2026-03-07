/**
 * UI Interaction Module
 * Handles general UI elements like mobile menu, scroll effects, and filtering
 */

class UIManager {
    constructor() {
        this.init();
    }

    init() {
        this.initAOS();
        this.updateYear();
        this.initMobileMenu();
        this.initNavbarScroll();
        this.initSkillFiltering();
        this.initScrollSpy();
    }

    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                once: true,
                offset: 50,
                duration: 800,
                easing: 'ease-out-cubic',
            });
        }
    }

    updateYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }
    }

    initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-dark/90', 'backdrop-blur-md', 'shadow-lg');
                } else {
                    navbar.classList.remove('bg-dark/90', 'backdrop-blur-md', 'shadow-lg');
                }
            });
        }
    }

    initSkillFiltering() {
        const skillTabs = document.querySelectorAll('.skill-tab');
        const skillCards = document.querySelectorAll('.skill-card');

        if (skillTabs.length && skillCards.length) {
            // Initialize: show only the default category (Backend)
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (category !== 'backend') {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });

            skillTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    skillTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    const filter = tab.getAttribute('data-filter');

                    skillCards.forEach(card => {
                        const category = card.getAttribute('data-category');

                        if (filter === category) {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length && navLinks.length) {
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('nav-link-active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('nav-link-active');
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                observer.observe(section);
            });
        }
    }
}
