'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { destinations, type SpaceDestination } from './spaceDestinations';

type Props = {
  focusedIndex: number;
  dragOffset: number;
  travellingTo: string | null;
  reducedMotion: boolean;
  onReady: () => void;
};

const palette: Record<SpaceDestination['kind'], [number[], number[], number[]]> = {
  ocean: [[6, 35, 52], [13, 120, 131], [81, 215, 192]],
  gas: [[13, 31, 74], [47, 93, 174], [147, 195, 247]],
  rock: [[28, 24, 58], [95, 70, 142], [177, 150, 211]],
  desert: [[62, 37, 41], [153, 87, 66], [232, 175, 119]],
};

function noise(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function smoothNoise(x: number, y: number, periodX?: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const left = periodX ? ix % periodX : ix;
  const right = periodX ? (ix + 1) % periodX : ix + 1;
  const top = THREE.MathUtils.lerp(noise(left, iy), noise(right, iy), sx);
  const bottom = THREE.MathUtils.lerp(noise(left, iy + 1), noise(right, iy + 1), sx);
  return THREE.MathUtils.lerp(top, bottom, sy);
}

function planetTexture(kind: SpaceDestination['kind']) {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 384;
  const context = canvas.getContext('2d');
  if (!context) return null;
  const image = context.createImageData(canvas.width, canvas.height);
  const colors = palette[kind];
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      const large = smoothNoise(u * 7, v * 4, 7);
      const medium = smoothNoise(u * 21, v * 11, 21);
      const fine = smoothNoise(u * 61, v * 29, 61);
      const grain = smoothNoise(u * 143, v * 71, 143);
      const warp = (large - 0.5) * 0.075 + (medium - 0.5) * 0.027;
      const bands = Math.sin((v + warp) * (kind === 'gas' ? 47 : 29) + Math.sin(u * Math.PI * 2) * 0.65);
      let value = large * 0.48 + medium * 0.32 + fine * 0.2 + bands * 0.07;
      const index = (y * canvas.width + x) * 4;
      if (kind === 'ocean') {
        const continent = large * 0.46 + medium * 0.33 + fine * 0.16 + grain * 0.05;
        const land = THREE.MathUtils.smoothstep(continent, 0.515, 0.555);
        const coast = medium * 0.3 + fine * 0.4 + grain * 0.3;
        const shore = 4 * land * (1 - land);
        const water = [4 + medium * 12, 34 + medium * 31, 69 + fine * 42];
        const ground = [28 + coast * 69 + shore * 38, 56 + coast * 82 + shore * 27, 41 + coast * 48 + shore * 14];
        const polar = THREE.MathUtils.smoothstep(Math.abs(v - 0.5) * 2, 0.75, 0.95);
        for (let channel = 0; channel < 3; channel++) {
          const surface = THREE.MathUtils.lerp(water[channel], ground[channel], land);
          image.data[index + channel] = surface * (1 - polar * 0.7) + 220 * polar * 0.7;
        }
        image.data[index + 3] = 255;
        continue;
      }
      if (kind === 'gas') value = 0.39 + bands * 0.11 + medium * 0.17 + large * 0.14 + fine * 0.07 + grain * 0.04;
      if (kind === 'rock') value = large * 0.42 + medium * 0.34 + fine * 0.18 + grain * 0.05;
      if (kind === 'desert') value = 0.25 + large * 0.39 + bands * 0.055 + medium * 0.18 + fine * 0.08;
      if (kind === 'gas') {
        const storm = Math.hypot((u - 0.72) * 7, (v - 0.57) * 16);
        if (storm < 1) value += (1 - storm) * 0.22;
      }
      if (kind === 'rock' || kind === 'desert') {
        for (const [cx, cy, radius] of [[0.22, 0.37, 0.055], [0.61, 0.62, 0.038], [0.83, 0.28, 0.026]]) {
          const distance = Math.hypot((u - cx) * 1.5, v - cy) / radius;
          if (distance < 0.75) value -= (1 - distance) * 0.15;
          else if (distance < 1.12) value += (1.12 - distance) * 0.2;
        }
      }
      value = THREE.MathUtils.clamp(value, 0, 1);
      const low = value < 0.5 ? colors[0] : colors[1];
      const high = value < 0.5 ? colors[1] : colors[2];
      const mix = value < 0.5 ? value * 2 : (value - 0.5) * 2;
      for (let channel = 0; channel < 3; channel++) image.data[index + channel] = low[channel] + (high[channel] - low[channel]) * mix;
      image.data[index + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function oceanCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return null;
  const image = context.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      const cloud = smoothNoise(u * 15, v * 8, 15) * 0.56 + smoothNoise(u * 35, v * 19, 35) * 0.31 + smoothNoise(u * 72, v * 31, 72) * 0.13;
      const index = (y * canvas.width + x) * 4;
      image.data[index] = 214;
      image.data[index + 1] = 246;
      image.data[index + 2] = 242;
      image.data[index + 3] = Math.round(THREE.MathUtils.smoothstep(cloud, 0.6, 0.73) * 120);
    }
  }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const atmosphereVertex = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmosphereFragment = `
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    float edge = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 3.0);
    gl_FragColor = vec4(uColor, edge * 0.2);
  }
`;

export default function SpaceSceneCanvas({ focusedIndex, dragOffset, travellingTo, reducedMotion, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef(focusedIndex);
  const dragRef = useRef(dragOffset);
  const travelRef = useRef(travellingTo);
  const motionRef = useRef(reducedMotion);
  focusRef.current = focusedIndex;
  dragRef.current = dragOffset;
  travelRef.current = travellingTo;
  motionRef.current = reducedMotion;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 10.8;
    const system = new THREE.Group();
    scene.add(system);
    scene.add(new THREE.HemisphereLight(0x9ee8e9, 0x090c1d, 0.42));
    const keyLight = new THREE.DirectionalLight(0xe8ffff, 3.1);
    keyLight.position.set(-5, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x4b9bde, 0.75);
    rimLight.position.set(4, -3, -2);
    scene.add(rimLight);

    const disposables: Array<{ dispose: () => void }> = [];
    const planets = destinations.map((destination, index) => {
      const group = new THREE.Group();
      system.add(group);
      const radius = destination.id === 'projects' ? 1.68 : 1.58;
      const geometry = new THREE.SphereGeometry(radius, 96, 72);
      const texture = planetTexture(destination.kind);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        bumpMap: destination.kind === 'rock' || destination.kind === 'desert' || destination.kind === 'ocean' ? texture : null,
        bumpScale: destination.kind === 'ocean' ? 0.035 : 0.065,
        color: 0xffffff,
        roughness: destination.kind === 'ocean' ? 0.46 : 0.94,
        metalness: destination.kind === 'ocean' ? 0.03 : 0,
        emissive: new THREE.Color(destination.color),
        emissiveIntensity: 0.015,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.rotation.y = index * 0.82;
      group.add(sphere);
      disposables.push(geometry, material);
      if (texture) disposables.push(texture);

      let cloud: THREE.Mesh | null = null;
      if (destination.kind === 'ocean') {
        const cloudMap = oceanCloudTexture();
        if (cloudMap) {
          const cloudGeometry = new THREE.SphereGeometry(radius * 1.023, 64, 48);
          const cloudMaterial = new THREE.MeshStandardMaterial({ map: cloudMap, transparent: true, opacity: 0.55, depthWrite: false, roughness: 1 });
          cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
          group.add(cloud);
          disposables.push(cloudMap, cloudGeometry, cloudMaterial);
        }
      }

      const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.055, 64, 48);
      const atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(destination.color) } },
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));
      disposables.push(atmosphereGeometry, atmosphereMaterial);

      if (destination.id === 'projects') {
        for (const [size, thickness, opacity] of [[1.43, 0.022, 0.8], [1.66, 0.01, 0.4]] as const) {
          const ringGeometry = new THREE.TorusGeometry(radius * size, thickness, 8, 128);
          const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xa9d7ee, transparent: true, opacity, depthWrite: false });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.set(1.04, 0.12, -0.32);
          group.add(ring);
          disposables.push(ringGeometry, ringMaterial);
        }
      }
      return { destination, group, sphere, material, cloud };
    });

    const starCount = container.clientWidth < 700 ? 90 : 160;
    const starPositions = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index++) {
      const seed = index * 97.17;
      starPositions[index * 3] = noise(seed, 1) * 50 - 12;
      starPositions[index * 3 + 1] = (noise(seed, 2) - 0.5) * 26;
      starPositions[index * 3 + 2] = -8 - noise(seed, 3) * 8;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xb8ebef, size: 0.045, transparent: true, opacity: 0.72 });
    scene.add(new THREE.Points(starsGeometry, starsMaterial));
    disposables.push(starsGeometry, starsMaterial);

    let width = 1;
    let height = 1;
    let frame = 0;
    let previousTime = 0;
    let baseCameraZ = 12;
    let orbitRadiusX = 4.8;
    let orbitRadiusZ = 2.2;
    let orbitY = 0.75;
    let orbitPosition = focusRef.current;
    const orbitStep = Math.PI * 2 / destinations.length;
    const orbitTilt = THREE.MathUtils.degToRad(32);
    let travelStart: number | null = null;
    const travelOrigin = new THREE.Vector3();
    const travelTarget = new THREE.Vector3();
    const zoomPosition = new THREE.Vector3();
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      baseCameraZ = width < 640 ? 12.8 : 12;
      orbitRadiusX = width < 640 ? 2.65 : 4.8;
      orbitRadiusZ = width < 640 ? 1.8 : 2.2;
      orbitY = width < 640 ? 1.18 : 0.75;
      if (travelStart === null) camera.position.set(0, 0, baseCameraZ);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (document.hidden || time - previousTime < 30) return;
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      if (!travelRef.current) {
        const target = focusRef.current - dragRef.current / 260;
        // Choose the short arc so moving between the first and last worlds is seamless.
        const half = destinations.length / 2;
        const difference = ((target - orbitPosition + half) % destinations.length + destinations.length) % destinations.length - half;
        orbitPosition += difference * (motionRef.current ? 1 : 0.12);
      }
      planets.forEach(({ group, sphere, material, cloud }, index) => {
        const angle = (index - orbitPosition) * orbitStep;
        const depth = (Math.cos(angle) + 1) / 2;
        group.position.set(
          Math.sin(angle) * orbitRadiusX,
          orbitY + (1 - Math.cos(angle)) * orbitRadiusZ * Math.sin(orbitTilt)
            + (!motionRef.current && !reducedMotionQuery.matches ? Math.sin(time * 0.00055 + index * 1.7) * 0.045 : 0),
          Math.cos(angle) * orbitRadiusZ * Math.cos(orbitTilt),
        );
        if (!motionRef.current && !reducedMotionQuery.matches) {
          sphere.rotation.y += delta * (index % 2 ? 0.11 : 0.085);
          if (cloud) cloud.rotation.y += delta * 0.035;
        }
        const targetScale = 0.44 + 0.56 * Math.pow(depth, 1.5);
        group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, targetScale, motionRef.current ? 1 : 0.08));
        material.color.setScalar(0.38 + depth * 0.62);
        material.emissiveIntensity += ((0.004 + depth * 0.021) - material.emissiveIntensity) * 0.08;
      });
      system.updateMatrixWorld(true);
      if (travelRef.current && travelStart === null && !motionRef.current) {
        const selected = planets.find(planet => planet.destination.id === travelRef.current);
        if (selected) {
          selected.group.getWorldPosition(travelTarget);
          travelOrigin.copy(camera.position);
          zoomPosition.set(travelTarget.x, travelTarget.y, travelTarget.z + 3.8);
          travelStart = time;
        }
      }
      if (travelStart !== null) {
        const progress = THREE.MathUtils.clamp((time - travelStart) / 1050, 0, 1);
        const centerProgress = THREE.MathUtils.smoothstep(progress, 0, 0.32);
        const zoomProgress = THREE.MathUtils.smoothstep(progress, 0.08, 1);
        camera.position.set(
          THREE.MathUtils.lerp(travelOrigin.x, zoomPosition.x, centerProgress),
          THREE.MathUtils.lerp(travelOrigin.y, zoomPosition.y, centerProgress),
          THREE.MathUtils.lerp(travelOrigin.z, zoomPosition.z, zoomProgress),
        );
      }
      renderer.render(scene, camera);
    };
    onReady();
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      container.removeChild(renderer.domElement);
      disposables.forEach(item => item.dispose());
      renderer.dispose();
    };
  }, [onReady]);

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" />;
}
