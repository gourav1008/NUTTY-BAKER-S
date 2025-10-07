import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Html,
  useProgress
} from '@react-three/drei';
import { motion } from 'framer-motion';
import CakeModel from './CakeModel';
import FloatingElements from './FloatingElements';
import Loader from '../common/Loader';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { IoSparkles, IoTime, IoPeople, IoHeart } from 'react-icons/io5';
import * as THREE from 'three';

// Custom loading component
const CustomLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-lg font-medium text-purple-600">
          {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
};

// Custom environment for better reflections
const CustomEnvironment = () => (
  <>
    <mesh position={[0, 4, -8]} scale={[20, 20, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#ffeeff" />
    </mesh>
    <mesh position={[0, 4, 8]} scale={[20, 20, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#eeffff" />
    </mesh>
  </>
);

// Adaptive pixel ratio for performance
const AdaptivePixelRatio = () => {
  useEffect(() => {
    const updatePixelRatio = () => {
      const pixelRatio = Math.min(2, window.devicePixelRatio);
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const context = canvas.getContext('webgl2');
        if (context) {
          context.canvas.style.width = '100%';
          context.canvas.style.height = '100%';
        }
      }
    };

    window.addEventListener('resize', updatePixelRatio);
    updatePixelRatio();

    return () => window.removeEventListener('resize', updatePixelRatio);
  }, []);

  return null;
};

const CakeDisplay = ({
  title = "Exquisite Custom Cakes",
  subtitle = "Handcrafted with Love & Precision",
  description = "Each cake is a masterpiece, carefully designed and baked to perfection.",
  features = [
    { icon: IoSparkles, label: "Custom Designs", text: "Tailored to your vision" },
    { icon: IoTime, label: "Fresh Daily", text: "Made to order" },
    { icon: IoPeople, label: "All Occasions", text: "Weddings, birthdays & more" },
    { icon: IoHeart, label: "Premium Quality", text: "Finest ingredients" }
  ],
  showCTA = true
}) => {
  return (
    <section className="relative py-4 sm:py-6 md:py-12 lg:py-16 xl:py-20 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* 3D Cake Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block sticky top-24 z-10"
          >
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[3/4] xl:aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/50 to-purple-100/30 dark:from-gray-800/50 dark:to-purple-900/30 backdrop-blur-sm shadow-2xl border border-white/20">
              <Canvas
                shadows="soft"
                dpr={[1, 2]}
                className="w-full h-full touch-none"
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.2,
                  outputEncoding: THREE.sRGBEncoding,
                  preserveDrawingBuffer: true
                }}
                camera={{
                  position: [0, window.innerWidth < 768 ? 3 : 2.5, window.innerWidth < 768 ? 7 : 6],
                  fov: window.innerWidth < 768 ? 50 : 45,
                  near: 0.1,
                  far: 1000
                }}
              >
                <Suspense fallback={<CustomLoader />}>
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.8}
                    maxPolarAngle={Math.PI / 2.2}
                    minAzimuthAngle={-Math.PI / 3}
                    maxAzimuthAngle={Math.PI / 3}
                    autoRotate
                    autoRotateSpeed={0.3}
                    enableDamping
                    dampingFactor={0.05}
                  />

                  {/* Lighting */}
                  <ambientLight intensity={0.4} />
                  <hemisphereLight
                    skyColor={'#ffeeff'}
                    groundColor={'#332244'}
                    intensity={0.4}
                  />

                  {/* Main light */}
                  <directionalLight
                    castShadow
                    position={[5, 8, 6]}
                    intensity={1.2}
                    shadow-mapSize={[2048, 2048]}
                    shadow-camera-left={-7}
                    shadow-camera-right={7}
                    shadow-camera-top={7}
                    shadow-camera-bottom={-7}
                    shadow-camera-near={1}
                    shadow-camera-far={20}
                    shadow-bias={-0.001}
                  />

                  {/* Accent lights */}
                  <pointLight
                    position={[8, 4, -6]}
                    intensity={0.4}
                    color="#ff69b4"
                    distance={15}
                    decay={2}
                  />
                  <pointLight
                    position={[-8, 4, 6]}
                    intensity={0.35}
                    color="#9370db"
                    distance={15}
                    decay={2}
                  />

                  {/* Main content */}
                  <group position={[0, -1.2, 0]} scale={window.innerWidth < 768 ? 0.8 : 1}>
                    <CakeModel scale={0.85} />
                    <FloatingElements scale={0.9} />
                  </group>

                  {/* Shadows and environment */}
                  <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.65}
                    scale={10}
                    blur={2.5}
                    far={4}
                    resolution={512}
                    color="#000000"
                  />
                  <Environment preset="studio" background={false}>
                    <CustomEnvironment />
                  </Environment>
                  <AdaptivePixelRatio />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400">
              {subtitle}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <feature.icon className="w-6 h-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {feature.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {showCTA && (
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/portfolio">
                  <Button variant="primary">View Portfolio</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary">Contact Us</Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default CakeDisplay;