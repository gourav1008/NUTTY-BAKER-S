import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Cone } from '@react-three/drei';
import * as THREE from 'three';

// Candle flame component with glow
const CandleFlame = ({ position }) => {
  const flameRef = useRef();
  
  useFrame((state) => {
    if (flameRef.current) {
      const flicker = Math.sin(state.clock.elapsedTime * 8) * 0.05 + 1;
      flameRef.current.scale.y = flicker;
      flameRef.current.scale.x = flicker * 0.8;
    }
  });

  return (
    <group position={position}>
      <Cone ref={flameRef} args={[0.08, 0.25, 8]} position={[0, 0.15, 0]}>
        <meshStandardMaterial
          color="#FFA500"
          emissive="#FF4500"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </Cone>
      <Cone args={[0.05, 0.18, 8]} position={[0, 0.14, 0]}>
        <meshStandardMaterial
          color="#FFFF00"
          emissive="#FFFF00"
          emissiveIntensity={3}
          transparent
          opacity={0.95}
        />
      </Cone>
      <pointLight position={[0, 0.2, 0]} intensity={1.5} distance={2} color="#FFA500" />
    </group>
  );
};

// Dripping frosting effect
const DripEffect = ({ positions, color, height }) => {
  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          <Cylinder args={[0.08, 0.05, height, 12]} position={[0, -height / 2, 0]}>
            <meshPhysicalMaterial
              color={color}
              roughness={0.2}
              metalness={0.1}
              clearcoat={0.8}
              clearcoatRoughness={0.1}
            />
          </Cylinder>
          <Sphere args={[0.05, 12, 12]} position={[0, -height, 0]}>
            <meshPhysicalMaterial
              color={color}
              roughness={0.2}
              metalness={0.1}
              clearcoat={0.8}
              clearcoatRoughness={0.1}
            />
          </Sphere>
        </group>
      ))}
    </>
  );
};

const CakeModel = ({ position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef();

  // Materials
  const materials = useMemo(
    () => ({
      bottomTier: new THREE.MeshPhysicalMaterial({
        color: '#FFD580',
        roughness: 0.3,
        metalness: 0.05,
        clearcoat: 0.3,
      }),
      middleTier: new THREE.MeshPhysicalMaterial({
        color: '#87CEEB',
        roughness: 0.3,
        metalness: 0.05,
        clearcoat: 0.3,
      }),
      topTier: new THREE.MeshPhysicalMaterial({
        color: '#FFB6C1',
        roughness: 0.3,
        metalness: 0.05,
        clearcoat: 0.3,
      }),
      stand: new THREE.MeshPhysicalMaterial({
        color: '#4B0082',
        roughness: 0.2,
        metalness: 0.3,
        clearcoat: 0.6,
      }),
      standTop: new THREE.MeshPhysicalMaterial({
        color: '#E6E6FA',
        roughness: 0.15,
        metalness: 0.2,
        clearcoat: 0.7,
      }),
    }),
    []
  );

  // Rotation and floating
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
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

  const bottomSprinkles = createSprinkles(20, 1.45, 0.65);
  const middleSprinkles = createSprinkles(16, 1.1, 1.75);
  const topSprinkles = createSprinkles(12, 0.85, 2.65);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Cake Stand */}
      <group position={[0, -0.7, 0]}>
        <Cylinder args={[0.15, 0.2, 0.5, 32]} position={[0, -0.35, 0]}>
          <primitive attach="material" object={materials.stand} />
        </Cylinder>
        <Cylinder args={[1.7, 1.7, 0.08, 64]} position={[0, 0, 0]}>
          <primitive attach="material" object={materials.standTop} />
        </Cylinder>
        <Cylinder args={[1.75, 1.75, 0.05, 64]} position={[0, 0.06, 0]}>
          <primitive attach="material" object={materials.stand} />
        </Cylinder>
      </group>

      {/* Bottom Tier - Orange/Yellow */}
      <group position={[0, 0, 0]}>
        <Cylinder args={[1.4, 1.4, 0.8, 64]} position={[0, 0.4, 0]}>
          <primitive attach="material" object={materials.bottomTier} />
        </Cylinder>
        
        <DripEffect
          positions={dripPositions(12, 1.38, 0.8)}
          color="#FF8C00"
          height={0.35}
        />
        
        {bottomSprinkles.map((sprinkle, i) => (
          <Sphere key={`bs-${i}`} args={[sprinkle.size, 8, 8]} position={sprinkle.position}>
            <meshStandardMaterial color={sprinkle.color} roughness={0.3} metalness={0.6} />
          </Sphere>
        ))}
      </group>

      {/* Middle Tier - Blue */}
      <group position={[0, 1.1, 0]}>
        <Cylinder args={[1.05, 1.05, 0.7, 64]} position={[0, 0.35, 0]}>
          <primitive attach="material" object={materials.middleTier} />
        </Cylinder>
        
        <DripEffect
          positions={dripPositions(10, 1.03, 0.7)}
          color="#4682B4"
          height={0.3}
        />
        
        {middleSprinkles.map((sprinkle, i) => (
          <Sphere key={`ms-${i}`} args={[sprinkle.size, 8, 8]} position={sprinkle.position}>
            <meshStandardMaterial color={sprinkle.color} roughness={0.3} metalness={0.6} />
          </Sphere>
        ))}
      </group>

      {/* Top Tier - Pink */}
      <group position={[0, 2.05, 0]}>
        <Cylinder args={[0.8, 0.8, 0.6, 64]} position={[0, 0.3, 0]}>
          <primitive attach="material" object={materials.topTier} />
        </Cylinder>
        
        <DripEffect
          positions={dripPositions(8, 0.78, 0.6)}
          color="#FF1493"
          height={0.25}
        />
        
        {topSprinkles.map((sprinkle, i) => (
          <Sphere key={`ts-${i}`} args={[sprinkle.size, 8, 8]} position={sprinkle.position}>
            <meshStandardMaterial color={sprinkle.color} roughness={0.3} metalness={0.6} />
          </Sphere>
        ))}
      </group>

      {/* Candles on top - 7 candles */}
      <group position={[0, 2.65, 0]}>
        {/* Center tall candle */}
        <group position={[0, 0, 0]}>
          <Cylinder args={[0.04, 0.04, 0.5, 16]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#FFFACD" />
          </Cylinder>
          <CandleFlame position={[0, 0.5, 0]} />
        </group>

        {/* 4 surrounding candles */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const radius = 0.35;
          const isStriped = i % 2 === 0;
          
          return (
            <group
              key={`candle-${i}`}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
            >
              <Cylinder args={[0.04, 0.04, 0.45, 16]} position={[0, 0.225, 0]}>
                <meshStandardMaterial color={isStriped ? "#FF69B4" : "#FFFACD"} />
              </Cylinder>
              {isStriped && (
                <>
                  <Cylinder args={[0.041, 0.041, 0.08, 16]} position={[0, 0.15, 0]}>
                    <meshStandardMaterial color="#FFFFFF" />
                  </Cylinder>
                  <Cylinder args={[0.041, 0.041, 0.08, 16]} position={[0, 0.3, 0]}>
                    <meshStandardMaterial color="#FFFFFF" />
                  </Cylinder>
                </>
              )}
              <CandleFlame position={[0, 0.45, 0]} />
            </group>
          );
        })}

        {/* 2 more candles for 7 total */}
        {[0, 1].map((i) => {
          const angle = (i / 2) * Math.PI * 2 + Math.PI / 4;
          const radius = 0.25;
          
          return (
            <group
              key={`candle-extra-${i}`}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
            >
              <Cylinder args={[0.04, 0.04, 0.4, 16]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#FFFACD" />
              </Cylinder>
              <CandleFlame position={[0, 0.4, 0]} />
            </group>
          );
        })}
      </group>
    </group>
  );
};

export default CakeModel;
