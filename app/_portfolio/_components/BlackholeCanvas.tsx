'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const diskVertexShader = `
  varying vec2 vPosition;
  void main() {
    vPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const diskFragmentShader = `
  uniform float uTime;
  varying vec2 vPosition;

  void main() {
    float radius = length(vPosition);
    if (radius < 1.8 || radius > 6.25) discard;

    float angle = atan(vPosition.y, vPosition.x);
    float spiral = sin(angle * 22.0 - radius * 11.0 + uTime * 0.9);
    float detail = sin(angle * 61.0 + radius * 21.0 - uTime * 0.4);
    float texture = 0.80 + spiral * 0.12 + detail * 0.04;
    float innerHeat = 1.0 - smoothstep(1.8, 4.4, radius);
    float edge = smoothstep(1.8, 2.05, radius) * (1.0 - smoothstep(5.15, 6.25, radius));
    float brightSide = 0.78 + 0.22 * sin(angle + 0.8);

    vec3 outerColor = vec3(0.0, 0.36, 0.49);
    vec3 middleColor = vec3(0.0, 0.72, 0.71);
    vec3 hotColor = vec3(0.26, 0.82, 0.83);
    vec3 color = mix(outerColor, middleColor, 1.0 - smoothstep(3.0, 6.0, radius));
    color = mix(color, hotColor, pow(innerHeat, 2.2));

    float opacity = edge * texture * brightSide * (0.28 + innerHeat * 0.48);
    gl_FragColor = vec4(color, opacity);
  }
`;

export default function BlackholeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
    camera.position.set(0, 1, 12);
    camera.lookAt(0, 0, 0);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const blackHole = new THREE.Group();
    scene.add(blackHole);

    // The tilted disk passes behind the opaque horizon, so its far side stays visible.
    const diskGeometry = new THREE.PlaneGeometry(13, 13);
    const diskMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: diskVertexShader,
      fragmentShader: diskFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const disk = new THREE.Mesh(diskGeometry, diskMaterial);
    disk.rotation.x = -1.12;
    disk.rotation.z = -0.16;
    blackHole.add(disk);

    const horizonGeometry = new THREE.SphereGeometry(1.55, 48, 32);
    const horizonMaterial = new THREE.MeshBasicMaterial({ color: 0x010304 });
    blackHole.add(new THREE.Mesh(horizonGeometry, horizonMaterial));

    const starCount = window.innerWidth < 768 ? 500 : 1100;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index++) {
      starPositions[index * 3] = (Math.random() - 0.5) * 80;
      starPositions[index * 3 + 1] = (Math.random() - 0.5) * 50;
      starPositions[index * 3 + 2] = -10 - Math.random() * 20;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xb6d8db, size: 0.075, transparent: true, opacity: 0.55 });
    scene.add(new THREE.Points(starGeometry, starMaterial));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = new THREE.Vector2();
    const timer = new THREE.Timer();
    timer.connect(document);
    let frameId = 0;
    let lastFrame = 0;

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      blackHole.position.x = width > 1024 ? -7.3 : -3.1;
      blackHole.scale.setScalar(width > 1024 ? 0.86 : 0.53);
      renderer.render(scene, camera);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = (timestamp: number) => {
      frameId = requestAnimationFrame(animate);
      if (timestamp - lastFrame < 30 || document.hidden) return;
      lastFrame = timestamp;
      timer.update(timestamp);
      diskMaterial.uniforms.uTime.value = timer.getElapsed();
      blackHole.rotation.y += (pointer.x * 0.10 - blackHole.rotation.y) * 0.035;
      blackHole.rotation.x += (-pointer.y * 0.06 - blackHole.rotation.x) * 0.035;
      renderer.render(scene, camera);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    if (!reducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(frameId);
      timer.dispose();
      container.removeChild(renderer.domElement);
      diskGeometry.dispose();
      diskMaterial.dispose();
      horizonGeometry.dispose();
      horizonMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none opacity-50 md:opacity-80" />;
}
