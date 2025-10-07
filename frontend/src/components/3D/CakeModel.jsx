import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Cylinder, Sphere, Cone } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Candle Flame with realistic glow and light emission
const CandleFlame = ({ position }) => {
  const flameRef = useRef();
  const glowRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    if (flameRef.current && lightRef.current) {
      const t = state.clock.elapsedTime;
      const flicker = Math.sin(t * 8) * 0.05 + Math.cos(t * 12) * 0.03 + 1;
      
      flameRef.current.scale.y = flicker;
      flameRef.current.scale.x = flicker * 0.8;
      glowRef.current.scale.setScalar(flicker * 1.2);
      
      // Dynamic light intensity for realistic flickering
      lightRef.current.intensity = 0.8 + Math.sin(t * 6) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Point light for realistic candle illumination */}
      <pointLight
        ref={lightRef}
        color="#FF8C00"
        intensity={0.8}
        distance={2}
        decay={2}
        position={[0, 0.15, 0]}
      />
      
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[0.08, 16, 16]} position={[0, 0.12, 0]}>
        <meshBasicMaterial
          color="#FF6500"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* Inner flame */}
      <Cone ref={flameRef} args={[0.045, 0.15, 8]} position={[0, 0.15, 0]}>
        <meshStandardMaterial
          color="#FFA500"
          emissive="#FF4500"
          emissiveIntensity={2.5}
          transparent
          opacity={0.9}
        />
      </Cone>
      
      {/* Flame tip */}
      <Sphere args={[0.025, 8, 8]} position={[0, 0.22, 0]}>
        <meshStandardMaterial
          color="#FFFF00"
          emissive="#FFFF00"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </group>
  );
};

// Enhanced frosting drips with better geometry
const DripEffect = ({ positions, color, height }) => {
  return (
    <>
      {positions.map((pos, i) => (
        <group key={`drip-${i}`} position={pos}>
          <Cylinder args={[0.08, 0.05, height, 8]} position={[0, -height / 2, 0]}>
            <meshPhysicalMaterial
              color={color}
              roughness={0.25}
              metalness={0.05}
              clearcoat={0.6}
              clearcoatRoughness={0.2}
              transparent
              opacity={0.95}
            />
          </Cylinder>
          <Sphere args={[0.05, 16, 16]} position={[0, -height, 0]}>
            <meshPhysicalMaterial
              color={color}
              roughness={0.2}
              metalness={0.05}
              clearcoat={0.7}
              clearcoatRoughness={0.15}
            />
          </Sphere>
        </group>
      ))}
    </>
  );
};

const CakeModel = ({ position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef();

  // Enhanced Materials with PBR properties for realism
  const materials = useMemo(
    () => ({
      bottomTier: new THREE.MeshPhysicalMaterial({
        color: '#FFD580',
        roughness: 0.35,
        metalness: 0.02,
        clearcoat: 0.5,
        clearcoatRoughness: 0.25,
        sheen: 0.3,
        sheenColor: new THREE.Color('#FFF5E6'),
        envMapIntensity: 0.6,
      }),
      middleTier: new THREE.MeshPhysicalMaterial({
        color: '#87CEEB',
        roughness: 0.3,
        metalness: 0.03,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        sheen: 0.4,
        sheenColor: new THREE.Color('#E0F4FF'),
        envMapIntensity: 0.7,
      }),
      topTier: new THREE.MeshPhysicalMaterial({
        color: '#FFB6C1',
        roughness: 0.28,
        metalness: 0.02,
        clearcoat: 0.65,
        clearcoatRoughness: 0.18,
        sheen: 0.5,
        sheenColor: new THREE.Color('#FFE4E9'),
        envMapIntensity: 0.8,
      }),
      stand: new THREE.MeshPhysicalMaterial({
        color: '#4B0082',
        roughness: 0.15,
        metalness: 0.5,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.2,
      }),
      standTop: new THREE.MeshPhysicalMaterial({
        color: '#E6E6FA',
        roughness: 0.12,
        metalness: 0.4,
        clearcoat: 0.85,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.3,
      }),
      candle: new THREE.MeshPhysicalMaterial({
        color: '#FFE4B5',
        roughness: 0.6,
        metalness: 0.0,
        clearcoat: 0.2,
        sheen: 0.2,
      }),
      candleStripe: new THREE.MeshStandardMaterial({
        color: '#FF69B4',
        roughness: 0.5,
        metalness: 0.0,
      }),
    }),
    []
  );

  // Smooth rotation and floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  // Helper functions
  const createSprinkles = (count, radius, y, minSize = 0.04, maxSize = 0.08) => {
    return new Array(count).fill().map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const r = radius + (Math.random() - 0.5) * 0.15;
      const colors = ['#FF1493', '#00FF00', '#FFD700', '#FF4500', '#00CED1', '#FF69B4'];
      return {
        position: [Math.cos(angle) * r, y, Math.sin(angle) * r],
        size: minSize + Math.random() * (maxSize - minSize),
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  };

  const dripPositions = (count, radius, baseY) => {
    return new Array(count).fill().map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return [Math.cos(angle) * radius, baseY, Math.sin(angle) * radius];
    });
  };

  const bottomSprinkles = createSprinkles(24, 1.45, 0.65);
  const middleSprinkles = createSprinkles(18, 1.1, 1.75);
  const topSprinkles = createSprinkles(14, 0.85, 2.65);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Enhanced Cake Stand with better proportions */}
      <Cylinder args={[1.8, 2.0, 0.25, 32]} position={[0, -0.5, 0]} castShadow receiveShadow>
        <primitive object={materials.stand} attach="material" />
      </Cylinder>
      <Cylinder args={[2.0, 2.0, 0.1, 32]} position={[0, -0.35, 0]} castShadow receiveShadow>
        <primitive object={materials.standTop} attach="material" />
      </Cylinder>

      {/* Bottom Tier - Enhanced with drips */}
      <Cylinder args={[1.5, 1.5, 0.8, 32]} position={[0, 0.15, 0]} castShadow receiveShadow>
        <primitive object={materials.bottomTier} attach="material" />
      </Cylinder>
      <DripEffect positions={dripPositions(12, 1.5, 0.55)} color="#FFD580" height={0.25} />
      
      {bottomSprinkles.map((sprinkle, i) => (
        <Sphere key={`bottom-sprinkle-${i}`} args={[sprinkle.size, 8, 8]} position={sprinkle.position} castShadow>
          <meshStandardMaterial
            color={sprinkle.color}
            emissive={sprinkle.color}
            emissiveIntensity={0.6}
            roughness={0.4}
            metalness={0.8}
          />
        </Sphere>
      ))}

      {/* Middle Tier - Enhanced with drips */}
      <Cylinder args={[1.15, 1.15, 0.8, 32]} position={[0, 1.25, 0]} castShadow receiveShadow>
        <primitive object={materials.middleTier} attach="material" />
      </Cylinder>
      <DripEffect positions={dripPositions(10, 1.15, 1.65)} color="#87CEEB" height={0.22} />
      
      {middleSprinkles.map((sprinkle, i) => (
        <Sphere key={`middle-sprinkle-${i}`} args={[sprinkle.size, 8, 8]} position={sprinkle.position} castShadow>
          <meshStandardMaterial
            color={sprinkle.color}
            emissive={sprinkle.color}
            emissiveIntensity={0.6}
            roughness={0.4}
            metalness={0.8}
          />
        </Sphere>
      ))}

      {/* Top Tier - Enhanced with drips */}
      <Cylinder args={[0.9, 0.9, 0.7, 32]} position={[0, 2.25, 0]} castShadow receiveShadow>
        <primitive object={materials.topTier} attach="material" />
      </Cylinder>
      <DripEffect positions={dripPositions(8, 0.9, 2.6)} color="#FFB6C1" height={0.2} />
      
      {topSprinkles.map((sprinkle, i) => (
        <Sphere key={`top-sprinkle-${i}`} args={[sprinkle.size, 8, 8]} position={sprinkle.position} castShadow>
          <meshStandardMaterial
            color={sprinkle.color}
            emissive={sprinkle.color}
            emissiveIntensity={0.6}
            roughness={0.4}
            metalness={0.8}
          />
        </Sphere>
      ))}

      {/* Enhanced Candles - Center tall candle */}
      <Cylinder args={[0.05, 0.05, 0.5, 16]} position={[0, 2.85, 0]} castShadow>
        <primitive object={materials.candle} attach="material" />
      </Cylinder>
      <CandleFlame position={[0, 3.1, 0]} />

      {/* 4 surrounding candles with stripes */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 0.35;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isStriped = i % 2 === 0;

        return (
          <group key={`candle-${i}`}>
            <Cylinder args={[0.045, 0.045, 0.4, 16]} position={[x, 2.8, z]} castShadow>
              <primitive object={materials.candle} attach="material" />
            </Cylinder>
            {isStriped && (
              <>
                <Cylinder args={[0.046, 0.046, 0.08, 16]} position={[x, 2.68, z]}>
                  <primitive object={materials.candleStripe} attach="material" />
                </Cylinder>
                <Cylinder args={[0.046, 0.046, 0.08, 16]} position={[x, 2.84, z]}>
                  <primitive object={materials.candleStripe} attach="material" />
                </Cylinder>
              </>
            )}
            <CandleFlame position={[x, 3.0, z]} />
          </group>
        );
      })}

      {/* 2 additional candles for visual balance */}
      {[0, 1].map((i) => {
        const angle = (i / 2) * Math.PI * 2 + Math.PI / 4;
        const radius = 0.25;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={`extra-candle-${i}`}>
            <Cylinder args={[0.04, 0.04, 0.35, 16]} position={[x, 2.775, z]} castShadow>
              <primitive object={materials.candle} attach="material" />
            </Cylinder>
            <CandleFlame position={[x, 2.95, z]} />
          </group>
        );
      })}
    </group>
  );
};

export default CakeModel;
