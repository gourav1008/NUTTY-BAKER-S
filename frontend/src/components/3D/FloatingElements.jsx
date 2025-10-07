import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

const FloatingElement = ({ position, geometry, color, speed = 1, scale = 1, emissive = false }) => {
  const meshRef = useRef();
  const { viewport } = useThree();

  // Calculate responsive scale based on viewport size
  const responsiveScale = useMemo(() => {
    const baseScale = Math.min(1, Math.max(0.6, viewport.width / 12)); // Better scaling for different screen sizes
    return scale * baseScale;
  }, [viewport.width, scale]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth floating motion with multiple frequencies
    const floatAmplitude = 0.15 * responsiveScale;
    const yOffset =
      Math.sin(t * speed) * floatAmplitude * 0.6 +
      Math.sin(t * speed * 0.5) * floatAmplitude * 0.3 +
      Math.sin(t * speed * 0.25) * floatAmplitude * 0.1;

    // Apply position with smooth damping
    meshRef.current.position.y = position[1] + yOffset;

    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(t * 0.4 * speed) * 0.2;
    meshRef.current.rotation.y = Math.cos(t * 0.5 * speed) * 0.3;
    meshRef.current.rotation.z = Math.sin(t * 0.3 * speed) * 0.1;
  });

  const materialProps = useMemo(() => {
    if (emissive) {
      return {
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.9,
        roughness: 0.25,
        metalness: 0.1,
      };
    }
    return {
      color,
      roughness: 0.35,
      metalness: 0.2,
    };
  }, [color, emissive]);

  const Geometry = geometry;

  return (
    <mesh ref={meshRef} position={position} scale={responsiveScale}>
      <Geometry />
      <meshStandardMaterial {...materialProps} transparent={emissive} opacity={emissive ? 0.95 : 1} />
    </mesh>
  );
};

const FloatingElements = () => {
  const { viewport } = useThree();

  // Calculate boundary limits based on viewport
  const bounds = useMemo(() => ({
    x: 2.5,
    y: 2.0,
    z: 2.0
  }), []);

  const elements = [
    // Sprinkles (thin boxes) - evenly distributed around the cake
    { position: [-1.8, 0.5, -1.2], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#FF6B9D', speed: 0.7, scale: 0.9, emissive: true },
    { position: [1.8, 0.2, -1.0], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#FFD700', speed: 1.1, scale: 0.9, emissive: false },
    { position: [-1.5, 1.2, 1.5], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#FF9BB3', speed: 0.9, scale: 0.9, emissive: true },
    { position: [1.5, 0.8, 1.2], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#FFC6D3', speed: 1.05, scale: 0.9, emissive: false },
    { position: [0, 1.5, -1.5], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#87CEEB', speed: 0.8, scale: 0.9, emissive: true },
    { position: [-0.8, 1.0, 0], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#DDA0DD', speed: 1.2, scale: 0.9, emissive: false },

    // Sugar balls (emissive soft spheres) - creating a balanced composition
    { position: [-2.0, 0.3, 0.5], geometry: () => <Sphere args={[0.14, 24, 24]} />, color: '#FFB6C1', speed: 0.6, scale: 0.95, emissive: true },
    { position: [2.0, 0.6, 0.5], geometry: () => <Sphere args={[0.12, 24, 24]} />, color: '#FFE4E1', speed: 1.3, scale: 0.85, emissive: true },
    { position: [0, 1.8, -1.8], geometry: () => <Sphere args={[0.13, 24, 24]} />, color: '#FFF0F5', speed: 0.85, scale: 1.0, emissive: true },
    { position: [-1.2, 1.4, -1.2], geometry: () => <Sphere args={[0.11, 24, 24]} />, color: '#E6E6FA', speed: 1.1, scale: 0.9, emissive: true },
    { position: [1.2, 1.0, -1.5], geometry: () => <Sphere args={[0.12, 24, 24]} />, color: '#F0F8FF', speed: 0.95, scale: 0.92, emissive: true },

    // Donuts (torus) - strategically placed for visual balance
    { position: [-1.8, 1.0, 1.0], geometry: () => <Torus args={[0.22, 0.09, 32, 32]} />, color: '#FFB347', speed: 0.5, scale: 1.0, emissive: true },
    { position: [1.8, 0.4, -1.2], geometry: () => <Torus args={[0.22, 0.09, 32, 32]} />, color: '#FF6B9D', speed: 1.25, scale: 1.0, emissive: true },
    { position: [0, 1.6, -1.0], geometry: () => <Torus args={[0.22, 0.09, 32, 32]} />, color: '#DDA0DD', speed: 0.8, scale: 1.0, emissive: true },
  ];

  return (
    <group>
      {elements.map((el, i) => (
        <FloatingElement key={i} {...el} />
      ))}
    </group>
  );
};

export default FloatingElements;
