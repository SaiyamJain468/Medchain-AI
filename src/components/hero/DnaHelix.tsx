"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const DnaHelix = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesCount = window.innerWidth < 768 ? 500 : 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    const colorGreen = new THREE.Color("#39FF14");
    const colorMagenta = new THREE.Color("#FF006E");

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // DNA Helix math
      const t = (i / particlesCount) * Math.PI * 8;
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const radius = 2;
      
      positions[i3] = Math.cos(t + strand) * radius;
      positions[i3 + 1] = (t - Math.PI * 4) * 2;
      positions[i3 + 2] = Math.sin(t + strand) * radius;

      const mixedColor = i % 2 === 0 ? colorGreen : colorMagenta;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
      
      sizes[i] = Math.random() * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 8;

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      points.rotation.y = elapsedTime * 0.2;
      points.rotation.x = elapsedTime * 0.1;
      
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />;
};
