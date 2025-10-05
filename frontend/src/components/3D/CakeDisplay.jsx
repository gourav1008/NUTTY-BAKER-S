import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import CakeModel from './CakeModel';
import FloatingElements from './FloatingElements';
import Loader from '../common/Loader';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { IoSparkles, IoTime, IoPeople, IoHeart } from 'react-icons/io5';
import * as THREE from 'three';

const CakeDisplay = ({
  title = "Exquisite Custom Cakes",
  subtitle = "Handcrafted with Love & Precision",
  description = "Each cake is a masterpiece, carefully designed and baked to perfection. We use only premium ingredients to create unforgettable flavors that complement stunning designs.",
  features = [
    { icon: IoSparkles, label: "Custom Designs", text: "Tailored to your vision" },
    { icon: IoTime, label: "Fresh Daily", text: "Made to order" },
    { icon: IoPeople, label: "All Occasions", text: "Weddings, birthdays & more" },
    { icon: IoHeart, label: "Premium Quality", text: "Finest ingredients" }
  ],
  showCTA = true,
  cakePosition = [0, 0, 0],
  cakeScale = 0.85
}) => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* 3D Cake Display - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full"
          >
            <div className="relative h-[550px] lg:h-[650px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/50 to-purple-100/30 dark:from-gray-800/50 dark:to-purple-900/30 backdrop-blur-sm shadow-2xl border border-white/20">
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-pink-300/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-300/30 rounded-full blur-3xl"></div>

              {/* 3D Canvas */}
              <Canvas
                shadows
                className="w-full h-full"
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                camera={{ position: [0, 1.5, 8], fov: 40 }}
              >
                <Suspense fallback={null}>
                  <PerspectiveCamera makeDefault position={[0, 1.5, 8]} fov={40} />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3.5}
                    maxPolarAngle={Math.PI / 2}
                    autoRotate
                    autoRotateSpeed={0.8}
                  />

                  {/* Environment + Lights */}
                  <ambientLight intensity={0.45} />
                  <hemisphereLight skyColor={'#ffffff'} groundColor={'#444444'} intensity={0.4} />
                  
                  {/* Main key light */}
                  <directionalLight
                    castShadow
                    position={[6, 8, 5]}
                    intensity={1.1}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-left={-6}
                    shadow-camera-right={6}
                    shadow-camera-top={6}
                    shadow-camera-bottom={-6}
                  />
                  {/* colored rim lights */}
                  <pointLight position={[8, 3, -6]} intensity={0.35} color="#ff69b4" />
                  <pointLight position={[-8, 3, 6]} intensity={0.32} color="#9370db" />

                  {/* Cake Model - Positioned much lower toward the bottom */}
                  <CakeModel position={[0, -1.5, 0]} scale={cakeScale} />

                  {/* Floating elements: decorative + sparkles */}
                  <FloatingElements />

                  {/* Soft contact shadow under the cake (improved) */}
                  <ContactShadows
                    position={[0, -0.95, 0]}
                    opacity={0.45}
                    scale={8}
                    blur={3}
                    far={3}
                  />

                  {/* HDR / studio environment for subtle reflections */}
                  <Environment preset="studio" background={false} />

                </Suspense>
              </Canvas>

              {/* Loading Overlay (keeps previous Loader for fallback) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Suspense fallback={<Loader size="lg" />}>
                  <div></div>
                </Suspense>
              </div>
            </div>

            {/* Removed 3D Preview floating badge */}
          </motion.div>
          {/* Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 h-[550px] lg:h-[650px] flex flex-col justify-center"
          >
            {/* Title Section */}
            <div className="flex flex-col justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  {title}
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-6"></div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-4"
              >
                {subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {description}
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        {feature.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link to="/portfolio">
                  <Button size="lg" className="shadow-xl hover:shadow-2xl transition-shadow">
                    Explore Our Cakes
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-shadow">
                    Order Custom Cake
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div>
                <div className="text-3xl font-bold text-primary-500">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-500">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cakes Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-500">5★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default CakeDisplay;
