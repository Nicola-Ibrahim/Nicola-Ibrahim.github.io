import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js';

const canvas = document.getElementById('blackhole-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Colors from Tailwind config
const colors = {
    primary: new THREE.Color('#6366f1'),   // Indigo
    secondary: new THREE.Color('#a855f7'), // Purple
    accent: new THREE.Color('#ec4899')     // Pink
};

// --- Starfield ---
const starGeometry = new THREE.BufferGeometry();
const starCount = 4000;
const posArray = new Float32Array(starCount * 3);
const colorArray = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i += 3) {
    // Spread stars widely
    posArray[i] = (Math.random() - 0.5) * 150;
    posArray[i + 1] = (Math.random() - 0.5) * 150;
    posArray[i + 2] = (Math.random() - 0.5) * 100;

    // Randomly assign one of the theme colors or white
    const colorChoice = Math.random();
    let color;
    if (colorChoice < 0.2) color = colors.primary;
    else if (colorChoice < 0.4) color = colors.secondary;
    else if (colorChoice < 0.6) color = colors.accent;
    else color = new THREE.Color('#ffffff'); // Some white stars for contrast

    colorArray[i] = color.r;
    colorArray[i + 1] = color.g;
    colorArray[i + 2] = color.b;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const starMesh = new THREE.Points(starGeometry, starMaterial);
scene.add(starMesh);

// --- Black Hole Group ---
const blackHoleGroup = new THREE.Group();
blackHoleGroup.position.x = -30; // Move to the left to avoid text overlap
// Tilt the whole group slightly for better viewing angle
blackHoleGroup.rotation.x = Math.PI / 1.7;
blackHoleGroup.rotation.z = Math.PI / 4;
scene.add(blackHoleGroup);

// 1. Event Horizon (The Void)
const horizonGeometry = new THREE.SphereGeometry(4, 64, 64);
const horizonMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
blackHoleGroup.add(horizon);

// 2. Accretion Disk (Inner Glow)
const diskGeometry = new THREE.RingGeometry(4.1, 7, 64);
const diskMaterial = new THREE.MeshBasicMaterial({
    color: colors.primary,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
});
const disk = new THREE.Mesh(diskGeometry, diskMaterial);
blackHoleGroup.add(disk);

// 3. Outer Accretion Ring (Secondary Color)
const outerDiskGeometry = new THREE.RingGeometry(7.2, 10, 64);
const outerDiskMaterial = new THREE.MeshBasicMaterial({
    color: colors.secondary,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
});
const outerDisk = new THREE.Mesh(outerDiskGeometry, outerDiskMaterial);
blackHoleGroup.add(outerDisk);

// 4. Particle Ring (Swirling Debris)
const debrisGeometry = new THREE.BufferGeometry();
const debrisCount = 500;
const debrisPos = new Float32Array(debrisCount * 3);

for (let i = 0; i < debrisCount * 3; i += 3) {
    const angle = Math.random() * Math.PI * 2;
    // Radius between 5 and 12
    const radius = 5 + Math.random() * 7;
    debrisPos[i] = Math.cos(angle) * radius;
    debrisPos[i + 1] = Math.sin(angle) * radius;
    debrisPos[i + 2] = (Math.random() - 0.5) * 0.5; // Slight thickness
}

debrisGeometry.setAttribute('position', new THREE.BufferAttribute(debrisPos, 3));
const debrisMaterial = new THREE.PointsMaterial({
    color: colors.accent,
    size: 0.08,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});
const debrisMesh = new THREE.Points(debrisGeometry, debrisMaterial);
blackHoleGroup.add(debrisMesh);


// --- Mouse Interaction ---
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate Black Hole Components
    disk.rotation.z -= 0.002;
    outerDisk.rotation.z -= 0.001;
    debrisMesh.rotation.z -= 0.003;

    // Pulse effect for disk opacity
    diskMaterial.opacity = 0.5 + Math.sin(elapsedTime * 1.5) * 0.1;
    outerDiskMaterial.opacity = 0.25 + Math.sin(elapsedTime) * 0.05;

    // Rotate Stars
    starMesh.rotation.y += 0.0003;

    // Mouse Parallax (Subtle movement of the black hole group)
    targetX = mouseX * 0.0005;
    targetY = mouseY * 0.0005;

    blackHoleGroup.rotation.y += 0.05 * (targetX - (blackHoleGroup.rotation.y - Math.PI / 8)); // Maintain base rotation
    blackHoleGroup.rotation.x += 0.05 * (targetY - (blackHoleGroup.rotation.x - Math.PI / 1.7));

    renderer.render(scene, camera);
}

animate();

// --- Resize Handler ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});