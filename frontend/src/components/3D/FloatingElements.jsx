import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingElement = ({ position, geometry, color, speed = 1, scale = 1, emissive = false }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = position[1] + Math.sin(t) * (0.25 * scale);
    meshRef.current.rotation.x = Math.sin(t * 0.7) * 0.3;
    meshRef.current.rotation.y = Math.cos(t * 0.9) * 0.4;
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
    <mesh ref={meshRef} position={position} scale={scale}>
      <Geometry />
      <meshStandardMaterial {...materialProps} transparent={emissive} opacity={emissive ? 0.95 : 1} />
    </mesh>
  );
};

const FloatingElements = () => {
  const elements = [
    // sprinkles (thin boxes) - adjusted to match lowered cake model
    { position: [-2.2, 0.3, -1.5], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#FF6B9D', speed: 0.7, scale: 1, emissive: true },
    { position: [2.2, -0.5, -0.8], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#FFD700', speed: 1.1, scale: 1, emissive: false },
    { position: [-1.6, 1.1, 1.2], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#FF9BB3', speed: 0.9, scale: 1, emissive: true },
    { position: [1.8, 0.7, 1.8], geometry: () => <Box args={[0.08, 0.28, 0.08]} />, color: '#FFC6D3', speed: 1.05, scale: 1, emissive: false },

    // sugar balls (emissive soft spheres) - adjusted to match lowered cake model
    { position: [-2.8, -0.4, 0], geometry: () => <Sphere args={[0.14, 16, 16]} />, color: '#FFB6C1', speed: 0.6, scale: 1.05, emissive: true },
    { position: [2.8, 0.5, 0], geometry: () => <Sphere args={[0.12, 16, 16]} />, color: '#FFE4E1', speed: 1.3, scale: 0.95, emissive: true },
    { position: [0, 1.5, -2.5], geometry: () => <Sphere args={[0.13, 16, 16]} />, color: '#FFF0F5', speed: 0.85, scale: 1.1, emissive: false },

    // donuts (torus) - adjusted to match lowered cake model
    { position: [-2.5, 0.9, 0.9], geometry: () => <Torus args={[0.22, 0.09, 16, 32]} />, color: '#FFB347', speed: 0.5, scale: 1.1, emissive: true },
    { position: [2.5, -0.2, -1.5], geometry: () => <Torus args={[0.22, 0.09, 16, 32]} />, color: '#FF6B9D', speed: 1.25, scale: 1.05, emissive: false },
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
