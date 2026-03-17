/**
 * Animation Functionality
 * Handles typing animation and Intersection Observer for fade-in effects
 */

export class AnimationManager {
  constructor() {
    this.initTypingAnimation();
    // AOS handles most scroll animations now, but we can keep this for custom stuff if needed.
    // For now, we'll rely on AOS for scroll animations to avoid conflicts.
  }

  /**
   * Initialize typing animation effect
   */
  initTypingAnimation() {
    const typingText = document.querySelector(".typing-animation");
    if (!typingText) return;

    const text = typingText.getAttribute('data-text') || typingText.textContent;
    typingText.textContent = ""; // Clear the text to prepare for typing animation
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Faster typing
      } else {
        // Add cursor blink class after typing is complete
        typingText.classList.add("cursor-blink");
      }
    };

    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
  }
}