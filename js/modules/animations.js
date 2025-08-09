/**
 * Animation Functionality
 * Handles typing animation and Intersection Observer for fade-in effects
 */

export class AnimationManager {
  constructor() {
    this.initTypingAnimation();
    this.initAnimationObserver();
  }

  /**
   * Initialize typing animation effect
   */
  initTypingAnimation() {
    const typingText = document.querySelector(\".typing-animation\");
    if (!typingText) return;

    const text = typingText.textContent;
    typingText.textContent = \"\";
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Add cursor blink class after typing is complete
        typingText.classList.add(\"cursor-blink\");
      }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
  }

  /**
   * Initialize Intersection Observer for animations
   */
  initAnimationObserver() {
    const animatedElements = document.querySelectorAll(\".card-hover, .timeline-item\");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(\"fade-in-up\");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: \"0px 0px -50px 0px\"
    });

    animatedElements.forEach(element => observer.observe(element));
  }
}

