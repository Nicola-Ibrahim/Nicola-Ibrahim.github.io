import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('blackhole-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Black hole sphere
const blackHoleGeometry = new THREE.SphereGeometry(1, 64, 64);
const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
scene.add(blackHole);

// Accretion disk (flat torus with glow)
const diskGeometry = new THREE.RingGeometry(1.2, 2.0, 64);
const diskMaterial = new THREE.MeshBasicMaterial({
    // Cosmic accent colour matching the custom palette (#6c63ff)
    color: 0x6c63ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
});
const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
accretionDisk.rotation.x = Math.PI / 2;
scene.add(accretionDisk);

// Starfield background
const starGeometry = new THREE.BufferGeometry();
const starCount = 2000;
const starPositions = [];
for (let i = 0; i < starCount; i++) {
    starPositions.push((Math.random() - 0.5) * 100);
    starPositions.push((Math.random() - 0.5) * 100);
    starPositions.push((Math.random() - 0.5) * 100);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const starMaterial = new THREE.PointsMaterial({
    // Soften starfield colour to a gentle violet (#8e8ffa)
    color: 0x8e8ffa,
    size: 0.1
});
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    accretionDisk.rotation.z += 0.002; // Disk rotation
    stars.rotation.y += 0.0005; // Subtle starfield movement
    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});