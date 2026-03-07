/**
 * About Me Particle Visualization
 * Handles the Three.js particle effect in the About section
 */

class AboutVisualization {
    constructor() {
        this.container = document.getElementById('about-canvas-container');
        if (!this.container) return;
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Particles configuration
        const particlesCount = 1500;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const colorPrimary = new THREE.Color('#6366f1');
        const colorSecondary = new THREE.Color('#a855f7');
        const colorAccent = new THREE.Color('#ec4899');

        for (let i = 0; i < particlesCount; i++) {
            // Sphere distribution
            const r = 2.5 * Math.pow(Math.random(), 0.5);
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            // Mix colors
            const mixColor = Math.random();
            let chosenColor;
            if (mixColor < 0.4) chosenColor = colorPrimary;
            else if (mixColor < 0.8) chosenColor = colorSecondary;
            else chosenColor = colorAccent;

            colors[i * 3] = chosenColor.r;
            colors[i * 3 + 1] = chosenColor.g;
            colors[i * 3 + 2] = chosenColor.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.015,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);

        // Geometric lines (Connect nodes)
        const lineCount = 40;
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(lineCount * 2 * 3);

        for (let i = 0; i < lineCount; i++) {
            const idx1 = Math.floor(Math.random() * particlesCount);
            const idx2 = Math.floor(Math.random() * particlesCount);

            linePositions[i * 6] = positions[idx1 * 3];
            linePositions[i * 6 + 1] = positions[idx1 * 3 + 1];
            linePositions[i * 6 + 2] = positions[idx1 * 3 + 2];
            linePositions[i * 6 + 3] = positions[idx2 * 3];
            linePositions[i * 6 + 4] = positions[idx2 * 3 + 1];
            linePositions[i * 6 + 5] = positions[idx2 * 3 + 2];
        }

        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        this.lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.lines);

        this.camera.position.z = 4.5;

        this.animate();
        this.setupResize();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = Date.now() * 0.001;

        this.points.rotation.y += 0.002;
        this.points.rotation.x += 0.001;

        // Add a gentle "drift" or "wobble"
        this.points.rotation.y += Math.sin(time * 0.2) * 0.001;
        this.points.rotation.x += Math.cos(time * 0.3) * 0.001;

        this.lines.rotation.copy(this.points.rotation);

        this.renderer.render(this.scene, this.camera);
    }

    setupResize() {
        window.addEventListener('resize', () => {
            const w = this.container.clientWidth;
            const h = this.container.clientHeight;
            this.renderer.setSize(w, h);
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        });
    }
}
