'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleSphereCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles configuration
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorPrimary = new THREE.Color('#009688'); // Teal 500
    const colorSecondary = new THREE.Color('#00bcd4'); // Cyan 500
    const colorAccent = new THREE.Color('#00ccb8'); // Accent Teal

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

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Geometric lines
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
      color: 0x009688,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 4.5;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let draggingPointer: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const render = () => {
      lines.rotation.copy(points.rotation);
      renderer.render(scene, camera);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (draggingPointer !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
      draggingPointer = event.pointerId;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      container.setPointerCapture(event.pointerId);
      container.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== draggingPointer) return;
      points.rotation.y += (event.clientX - lastPointerX) * 0.006;
      points.rotation.x += (event.clientY - lastPointerY) * 0.006;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      render();
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== draggingPointer) return;
      draggingPointer = null;
      container.style.cursor = 'grab';
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerEnd);
    container.addEventListener('pointercancel', handlePointerEnd);
    container.addEventListener('lostpointercapture', handlePointerEnd);

    // Animation loop
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (draggingPointer === null) points.rotation.y += 0.002;
      render();
    };

    if (reducedMotion) render();
    else animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reducedMotion) render();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerEnd);
      container.removeEventListener('pointercancel', handlePointerEnd);
      container.removeEventListener('lostpointercapture', handlePointerEnd);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full cursor-grab touch-pan-y z-10"
    />
  );
};

export default ParticleSphereCanvas;
