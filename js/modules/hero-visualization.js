/**
 * Hero Black Hole Visualization
 * Handles the Three.js black hole effect in the Hero section
 */

class HeroVisualization {
    constructor() {
        this.container = document.getElementById('blackhole-container');
        if (!this.container) return;
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Black Hole Group
        this.blackHoleGroup = new THREE.Group();
        this.scene.add(this.blackHoleGroup);

        // Black Hole (Event Horizon)
        const holeGeometry = new THREE.SphereGeometry(1.5, 64, 64);
        const holeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.blackHole = new THREE.Mesh(holeGeometry, holeMaterial);
        this.blackHoleGroup.add(this.blackHole);

        // Accretion Disk (Particles)
        const particlesCount = 8000;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const colorPrimary = new THREE.Color('#6366f1');
        const colorSecondary = new THREE.Color('#a855f7');

        for (let i = 0; i < particlesCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 2 + Math.random() * 4;
            const thickness = (1 - (radius - 2) / 4) * 0.5;

            positions[i * 3] = radius * Math.cos(angle);
            positions[i * 3 + 1] = (Math.random() - 0.5) * thickness;
            positions[i * 3 + 2] = radius * Math.sin(angle);

            const mixedColor = colorPrimary.clone().lerp(colorSecondary, (radius - 2) / 4);
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        const diskGeometry = new THREE.BufferGeometry();
        diskGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        diskGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const diskMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.accretionDisk = new THREE.Points(diskGeometry, diskMaterial);
        this.blackHoleGroup.add(this.accretionDisk);

        // Halo / Glow
        const glowGeometry = new THREE.SphereGeometry(1.7, 64, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide
        });
        this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.blackHoleGroup.add(this.glow);

        // --- Starfield ---
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 3000;
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i++) {
            starPositions[i] = (Math.random() - 0.5) * 100;
        }
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.5 });
        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);

        // Initial positioning
        this.updatePosition();
        this.blackHoleGroup.rotation.x = Math.PI / 6;

        this.camera.position.z = 10;
        this.camera.position.y = 1;
        this.camera.lookAt(0, 0, 0);

        this.animate();
        this.setupResize();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = Date.now() * 0.0005;

        this.accretionDisk.rotation.y += 0.002;
        this.stars.rotation.y += 0.0001;

        // Pulsing glow
        this.glow.scale.setScalar(1 + Math.sin(time * 2) * 0.05);

        this.renderer.render(this.scene, this.camera);
    }

    updatePosition() {
        this.blackHoleGroup.position.x = window.innerWidth > 1024 ? -10 : -6;
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.updatePosition();
        });
    }
}
