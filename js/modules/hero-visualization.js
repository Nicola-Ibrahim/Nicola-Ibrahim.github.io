/**
 * Hero Black Hole Visualization
 * Handles the Three.js black hole effect in the Hero section
 */

import * as THREE from 'three';

export class HeroVisualization {
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

        // Accretion Disk (Particles) - Increased density for better volume
        const particlesCount = 15000;
        this.particleData = []; // Store additional data for differential rotation
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const colorPrimary = new THREE.Color('#ffffff'); // Hot center
        const colorSecondary = new THREE.Color('#6366f1'); // Mid
        const colorTertiary = new THREE.Color('#a855f7'); // Outer

        for (let i = 0; i < particlesCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 2 + Math.random() * 4.5;
            const thickness = (1 - (radius - 2) / 4.5) * 0.4;

            positions[i * 3] = radius * Math.cos(angle);
            positions[i * 3 + 1] = (Math.random() - 0.5) * thickness;
            positions[i * 3 + 2] = radius * Math.sin(angle);

            // Store data for animation
            this.particleData.push({
                radius: radius,
                angle: angle,
                speed: 0.005 + (1 / radius) * 0.02 // Closer particles move faster
            });

            // Color gradient based on radius
            let mixedColor;
            if (radius < 3.2) {
                mixedColor = colorPrimary.clone().lerp(colorSecondary, (radius - 2) / 1.2);
            } else {
                mixedColor = colorSecondary.clone().lerp(colorTertiary, (radius - 3.2) / 1.3);
            }
            
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        const diskGeometry = new THREE.BufferGeometry();
        diskGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        diskGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const diskMaterial = new THREE.PointsMaterial({
            size: 0.015,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        this.accretionDisk = new THREE.Points(diskGeometry, diskMaterial);
        this.blackHoleGroup.add(this.accretionDisk);

        // --- Photon Ring (Innermost bright ring) ---
        const photonGeometry = new THREE.TorusGeometry(1.65, 0.02, 16, 100);
        const photonMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.8,
            blending: THREE.AdditiveBlending 
        });
        this.photonRing = new THREE.Mesh(photonGeometry, photonMaterial);
        this.photonRing.rotation.x = Math.PI / 2;
        this.blackHoleGroup.add(this.photonRing);

        // --- Einstein Ring (Gravitational Lensing Effect) ---
        // A secondary vertical glow ring
        const einsteinGeometry = new THREE.TorusGeometry(2.1, 0.05, 16, 100);
        const einsteinMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x6366f1, 
            transparent: true, 
            opacity: 0.3,
            blending: THREE.AdditiveBlending 
        });
        this.einsteinRing = new THREE.Mesh(einsteinGeometry, einsteinMaterial);
        // This ring stays more "vertical" to the camera
        this.blackHoleGroup.add(this.einsteinRing);

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
        this.blackHoleGroup.rotation.x = Math.PI / 5; // Tilted for 3D feel

        this.camera.position.z = 10;
        this.camera.position.y = 1;
        this.camera.lookAt(0, 0, 0);

        this.animate();
        this.setupResize();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = Date.now() * 0.0005;

        // Differential Rotation for Accretion Disk
        const positions = this.accretionDisk.geometry.attributes.position.array;
        for (let i = 0; i < this.particleData.length; i++) {
            const p = this.particleData[i];
            p.angle += p.speed;
            
            positions[i * 3] = p.radius * Math.cos(p.angle);
            positions[i * 3 + 2] = p.radius * Math.sin(p.angle);
        }
        this.accretionDisk.geometry.attributes.position.needsUpdate = true;

        // Animate Rings
        this.photonRing.rotation.z += 0.01;
        this.einsteinRing.rotation.y = Math.sin(time) * 0.1;
        this.einsteinRing.rotation.x = Math.PI / 2 + Math.cos(time * 0.5) * 0.1;
        
        // Static background drift
        this.stars.rotation.y += 0.0001;

        // Subtle 3D wobble for the whole group
        this.blackHoleGroup.rotation.y = Math.sin(time * 0.5) * 0.1;
        this.blackHoleGroup.rotation.z = Math.cos(time * 0.3) * 0.05;

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
