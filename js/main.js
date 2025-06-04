/* Main JavaScript file for Nicola Ibrahim's portfolio */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initScrollSpy();
    setCurrentYear();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Set initial icon based on current theme
    if (document.documentElement.classList.contains('dark')) {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    } else {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');

        // Update icons
        darkIcon.classList.toggle('hidden');
        lightIcon.classList.toggle('hidden');

        // Save preference to localStorage
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        menuIconOpen.classList.toggle('hidden');
        menuIconClose.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            // Get header height for offset
            const headerHeight = document.querySelector('header').offsetHeight;

            // Calculate position to scroll to
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            // Smooth scroll to target
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // In a real implementation, you would send this data to a server
            console.log('Form submitted:', { name, email, message });

            // Show success message
            formStatus.textContent = 'Thank you for your message! This is a demo form.';
            formStatus.classList.add('text-green-600', 'dark:text-green-400');

            // Reset form
            contactForm.reset();

            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }
}

// Scroll Spy for Navigation Highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // Offset for earlier highlighting
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'dark:text-primary-light');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary', 'dark:text-primary-light');
            }
        });
    });
}

// Set current year in footer copyright
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');

    if (window.scrollY > 10) {
        header.classList.add('bg-white/90', 'dark:bg-gray-900/90', 'backdrop-blur-md', 'shadow-md');
    } else {
        header.classList.remove('bg-white/90', 'dark:bg-gray-900/90', 'backdrop-blur-md', 'shadow-md');
    }
});
