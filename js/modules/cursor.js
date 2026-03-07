class CursorManager {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursorTrailer = document.createElement('div');
        this.cursorTrailer.className = 'custom-cursor-trailer';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorTrailer);

        this.cursorPos = { x: 0, y: 0 };
        this.trailerPos = { x: 0, y: 0 };

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX;
            this.cursorPos.y = e.clientY;

            // Main cursor moves instantly
            this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Trailer follows with lerp
        this.animate();

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .glass-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursorTrailer.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursorTrailer.classList.remove('cursor-hover');
            });
        });
    }

    animate() {
        // Linear interpolation for smooth trailing
        const lerp = (start, end, factor) => start + (end - start) * factor;

        this.trailerPos.x = lerp(this.trailerPos.x, this.cursorPos.x, 0.15);
        this.trailerPos.y = lerp(this.trailerPos.y, this.cursorPos.y, 0.15);

        this.cursorTrailer.style.transform = `translate(${this.trailerPos.x}px, ${this.trailerPos.y}px)`;

        requestAnimationFrame(() => this.animate());
    }
}
