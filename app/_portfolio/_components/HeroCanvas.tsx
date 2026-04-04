'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Black Hole Group
    const blackHoleGroup = new THREE.Group();
    scene.add(blackHoleGroup);

    // 1. Singularity (Event Horizon)
    const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const singularity = new THREE.Mesh(sphereGeometry, sphereMaterial);
    blackHoleGroup.add(singularity);

    // 2. Accretion Disk (Differential)
    const diskParts = 15000;
    const particleData: { radius: number; angle: number; speed: number }[] = [];
    const diskGeometry = new THREE.BufferGeometry();
    const diskPositions = new Float32Array(diskParts * 3);
    const diskColors = new Float32Array(diskParts * 3);

    const colorPrimary = new THREE.Color('#ffffff'); // Hot center
    const colorSecondary = new THREE.Color('#009688'); // Teal 500
    const colorTertiary = new THREE.Color('#00bcd4'); // Cyan 500

    for (let i = 0; i < diskParts; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 4.5;
      const thickness = (1 - (radius - 2) / 4.5) * 0.4;
      
      diskPositions[i * 3] = radius * Math.cos(angle);
      diskPositions[i * 3 + 1] = (Math.random() - 0.5) * thickness;
      diskPositions[i * 3 + 2] = radius * Math.sin(angle);

      // Store data for animation
      particleData.push({
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

      diskColors[i * 3] = mixedColor.r;
      diskColors[i * 3 + 1] = mixedColor.g;
      diskColors[i * 3 + 2] = mixedColor.b;
    }

    diskGeometry.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
    diskGeometry.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));

    const diskMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const accretionDisk = new THREE.Points(diskGeometry, diskMaterial);
    blackHoleGroup.add(accretionDisk);

    // 3. Einstein Ring / Light Distortion
    const einsteinRingGeometry = new THREE.TorusGeometry(2.1, 0.05, 16, 100);
    const einsteinRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x009688,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const einsteinRing = new THREE.Mesh(einsteinRingGeometry, einsteinRingMaterial);
    blackHoleGroup.add(einsteinRing);

    // 4. Photon Ring
    const photonRingGeometry = new THREE.TorusGeometry(1.65, 0.02, 16, 100);
    const photonRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const photonRing = new THREE.Mesh(photonRingGeometry, photonRingMaterial);
    photonRing.rotation.x = Math.PI / 2;
    blackHoleGroup.add(photonRing);

    // 5. Background Stars
    const starCount = 3000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1,
      transparent: true,
      opacity: 0.5
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 10;
    camera.position.y = 1;
    camera.lookAt(0, 0, 0);

    blackHoleGroup.rotation.x = Math.PI / 5; // Tilted for 3D feel

    // Movement responsiveness
    const updatePosition = () => {
      blackHoleGroup.position.x = window.innerWidth > 1024 ? -10 : -6;
    };
    updatePosition();

    // Animation Loop
    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = (Date.now() - startTime) * 0.001;

      // Differential Rotation for Accretion Disk
      const posArray = accretionDisk.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleData.length; i++) {
        const p = particleData[i];
        p.angle += p.speed;
        
        posArray[i * 3] = p.radius * Math.cos(p.angle);
        posArray[i * 3 + 2] = p.radius * Math.sin(p.angle);
      }
      accretionDisk.geometry.attributes.position.needsUpdate = true;

      // Animate Rings
      photonRing.rotation.z += 0.01;
      einsteinRing.rotation.y = Math.sin(time) * 0.1;
      einsteinRing.rotation.x = Math.PI / 2 + Math.cos(time * 0.5) * 0.1;

      // Static background drift
      stars.rotation.y += 0.0001;

      // Subtle 3D wobble for the whole group
      blackHoleGroup.rotation.y = Math.sin(time * 0.5) * 0.1;
      blackHoleGroup.rotation.z = Math.cos(time * 0.3) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updatePosition();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Dispose materials/geometries
      singularity.geometry.dispose();
      (singularity.material as THREE.Material).dispose();
      diskGeometry.dispose();
      diskMaterial.dispose();
      einsteinRingGeometry.dispose();
      einsteinRingMaterial.dispose();
      photonRingGeometry.dispose();
      photonRingMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-[-1] opacity-80 pointer-events-auto" 
    />
  );
};

export default HeroCanvas;
