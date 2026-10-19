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
    if (radius < 1.72 || radius > 6.35) discard;

    float angle = atan(vPosition.y, vPosition.x);
    // A shared angular speed keeps the disk's texture from shearing and bunching up over time.
    float orbit = angle - uTime * 0.42;
    float turbulence = sin(orbit * 5.0 + radius * 3.2) * 0.48;
    float stream = sin(orbit * 32.0 - radius * 15.0 + turbulence);
    float fineStream = sin(orbit * 79.0 - radius * 35.0 - turbulence * 1.8);
    float band = sin(radius * 9.5 + orbit * 3.0);
    float density = clamp(0.52 + stream * 0.23 + fineStream * 0.11 + band * 0.14, 0.08, 1.0);

    float innerHeat = 1.0 - smoothstep(1.85, 3.65, radius);
    float edge = smoothstep(1.72, 2.02, radius) * (1.0 - smoothstep(5.2, 6.35, radius));
    float brightSide = 0.58 + 0.42 * smoothstep(-0.35, 0.9, sin(angle + 0.65));
    float innerBand = exp(-pow((radius - 2.12) / 0.32, 2.0));

    vec3 outerColor = vec3(0.015, 0.25, 0.33);
    vec3 middleColor = vec3(0.21, 0.51, 0.52);
    vec3 hotColor = vec3(1.0, 0.55, 0.23);
    vec3 color = mix(outerColor, middleColor, 1.0 - smoothstep(2.6, 5.9, radius));
    color = mix(color, hotColor, pow(innerHeat, 1.7) * 0.88);
    color += hotColor * innerBand * 0.18;

    float opacity = edge * density * brightSide * (0.26 + innerHeat * 0.58 + innerBand * 0.15);
    gl_FragColor = vec4(color, opacity);
  }
`;

const lensVertexShader = `
  varying vec2 vPosition;
  void main() {
    vPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lensFragmentShader = `
  uniform float uTime;
  varying vec2 vPosition;

  void main() {
    float x = vPosition.x;
    float y = vPosition.y;
    float reach = abs(x) / 2.85;
    if (reach > 1.0 || y < 1.0) discard;

    // A soft image of the far side of the disk bends over the shadow.
    float arch = 1.30 + 0.59 * (1.0 - reach * reach);
    float offset = y - arch;
    float glow = exp(-pow(offset / 0.24, 2.0));
    float filament = exp(-pow(offset / 0.068, 2.0));
    float taper = 1.0 - smoothstep(0.69, 1.0, reach);
    float ripple = 0.82 + 0.18 * sin(x * 12.0 - uTime * 0.7);
    float alpha = (glow * 0.12 + filament * 0.27) * taper * ripple;
    vec3 color = mix(vec3(0.16, 0.49, 0.53), vec3(0.91, 0.57, 0.32), 1.0 - reach);
    gl_FragColor = vec4(color, alpha);
  }
`;

const trailVertexShader = `
  attribute float aProgress;
  attribute float aPhase;
  attribute float aWarmth;
  varying float vProgress;
  varying float vPhase;
  varying float vWarmth;

  void main() {
    vProgress = aProgress;
    vPhase = aPhase;
    vWarmth = aWarmth;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const trailFragmentShader = `
  uniform float uTime;
  varying float vProgress;
  varying float vPhase;
  varying float vWarmth;

  void main() {
    float taper = smoothstep(0.0, 0.15, vProgress) * (1.0 - smoothstep(0.76, 1.0, vProgress));
    float current = pow(max(0.0, sin(vProgress * 19.0 - uTime * 1.45 + vPhase)), 7.0);
    float shimmer = 0.75 + 0.25 * sin(vProgress * 46.0 + uTime * 0.5 + vPhase);
    vec3 color = mix(vec3(0.03, 0.52, 0.62), vec3(1.0, 0.56, 0.27), vWarmth);
    float alpha = taper * shimmer * (0.12 + current * 0.42);
    gl_FragColor = vec4(color, alpha);
  }
`;

const sparkVertexShader = `
  attribute float aProgress;
  attribute float aPhase;
  attribute float aWarmth;
  uniform float uTime;
  varying float vAlpha;
  varying float vWarmth;

  void main() {
    float pulse = pow(max(0.0, sin(aProgress * 19.0 - uTime * 1.45 + aPhase)), 16.0);
    vAlpha = pulse * smoothstep(0.0, 0.15, aProgress) * (1.0 - smoothstep(0.76, 1.0, aProgress));
    vWarmth = aWarmth;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(13.0, (3.0 + pulse * 10.0) * (12.0 / -viewPosition.z));
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const sparkFragmentShader = `
  varying float vAlpha;
  varying float vWarmth;

  void main() {
    float radius = length(gl_PointCoord - 0.5) * 2.0;
    float glow = exp(-radius * radius * 5.0);
    vec3 color = mix(vec3(0.09, 0.74, 0.84), vec3(1.0, 0.66, 0.35), vWarmth);
    gl_FragColor = vec4(color, glow * vAlpha * 0.55);
  }
`;

function makeFlowGeometry(streamCount: number, steps: number) {
  const positions: number[] = [];
  const progress: number[] = [];
  const phases: number[] = [];
  const warmth: number[] = [];
  const sparkPositions: number[] = [];
  const sparkProgress: number[] = [];
  const sparkPhases: number[] = [];
  const sparkWarmth: number[] = [];

  for (let stream = 0; stream < streamCount; stream++) {
    const phase = (stream / streamCount) * Math.PI * 2;
    const lane = (stream % 5 - 2) * 0.11;
    let previous: [number, number, number] | undefined;

    for (let step = 0; step <= steps; step++) {
      const t = step / steps;
      // Each strand follows the same inward spiral, with a small lane offset.
      // The increasing angular speed tightens the flow around the horizon.
      const angle = phase + t * 4.0 + t * t * 5.5;
      const radius = 8.45 - t * 6.15 + lane * (1.0 - t * 0.5);
      const height = lane * 0.55 + Math.sin(angle * 1.5 + phase) * 0.07;
      const warm = THREE.MathUtils.smoothstep(t, 0.48, 0.9) * 0.86;
      const point: [number, number, number] = [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        height,
      ];

      if (previous) {
        positions.push(...previous, ...point);
        progress.push((step - 1) / steps, t);
        phases.push(phase, phase);
        warmth.push(warm, warm);
      }
      if (step % 3 === 0) {
        sparkPositions.push(...point);
        sparkProgress.push(t);
        sparkPhases.push(phase);
        sparkWarmth.push(warm);
      }
      previous = point;
    }
  }

  const lines = new THREE.BufferGeometry();
  lines.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  lines.setAttribute('aProgress', new THREE.Float32BufferAttribute(progress, 1));
  lines.setAttribute('aPhase', new THREE.Float32BufferAttribute(phases, 1));
  lines.setAttribute('aWarmth', new THREE.Float32BufferAttribute(warmth, 1));

  const sparks = new THREE.BufferGeometry();
  sparks.setAttribute('position', new THREE.Float32BufferAttribute(sparkPositions, 3));
  sparks.setAttribute('aProgress', new THREE.Float32BufferAttribute(sparkProgress, 1));
  sparks.setAttribute('aPhase', new THREE.Float32BufferAttribute(sparkPhases, 1));
  sparks.setAttribute('aWarmth', new THREE.Float32BufferAttribute(sparkWarmth, 1));
  return { lines, sparks };
}

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

    // Spiral paths are fixed in 3D; moving highlights make gas appear to flow inward.
    const flowGeometry = makeFlowGeometry(window.innerWidth < 768 ? 18 : 32, 140);
    const flowGroup = new THREE.Group();
    flowGroup.rotation.copy(disk.rotation);
    const trailMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: trailVertexShader,
      fragmentShader: trailFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sparkMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: sparkVertexShader,
      fragmentShader: sparkFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    flowGroup.add(new THREE.LineSegments(flowGeometry.lines, trailMaterial));
    flowGroup.add(new THREE.Points(flowGeometry.sparks, sparkMaterial));
    blackHole.add(flowGroup);

    const horizonGeometry = new THREE.SphereGeometry(1.55, 48, 32);
    const horizonMaterial = new THREE.MeshBasicMaterial({ color: 0x010304 });
    blackHole.add(new THREE.Mesh(horizonGeometry, horizonMaterial));

    const lensGeometry = new THREE.PlaneGeometry(6.2, 5.2);
    const lensMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: lensVertexShader,
      fragmentShader: lensFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.z = 1.55;
    blackHole.add(lens);

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
      blackHole.position.set(
        width > 1024 ? -7.3 : width < 640 ? -1.45 : -3.1,
        width < 640 ? -4.45 : 0,
        0
      );
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
      lensMaterial.uniforms.uTime.value = timer.getElapsed();
      trailMaterial.uniforms.uTime.value = timer.getElapsed();
      sparkMaterial.uniforms.uTime.value = timer.getElapsed();
      flowGroup.rotation.z = disk.rotation.z + timer.getElapsed() * 0.42;
      camera.position.x = pointer.x * 0.18;
      camera.position.y = 1 - pointer.y * 0.12;
      camera.lookAt(0, 0, 0);
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
      flowGeometry.lines.dispose();
      flowGeometry.sparks.dispose();
      trailMaterial.dispose();
      sparkMaterial.dispose();
      horizonGeometry.dispose();
      horizonMaterial.dispose();
      lensGeometry.dispose();
      lensMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none opacity-50 md:opacity-80" />;
}
