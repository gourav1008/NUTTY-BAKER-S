import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import CakeModel from '../3D/CakeModel';
import Loader from '../common/Loader';
import { IoCalendar, IoPeople, IoTime, IoPricetag } from 'react-icons/io5';

/**
 * CakeDetailDisplay - A side-by-side display component for showcasing cake details
 * Left side: 3D cake model or image
 * Right side: Cake information and details
 */
const CakeDetailDisplay = ({
  cake,
  use3DModel = false,
  imageUrl,
  title,
  description,
  category,
  price,
  servings,
  preparationTime,
  tags = [],
  onOrderClick,
  additionalImages = []
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      
      {/* Left Side - Visual Display */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-24"
      >
        {use3DModel ? (
          // 3D Model Display
          <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/80 to-purple-100/50 dark:from-gray-800/80 dark:to-purple-900/50 backdrop-blur-sm shadow-xl border border-white/20">
            <Canvas>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 2, 8]} />
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.8}
                  autoRotate
                  autoRotateSpeed={0.8}
                />
                
                <ambientLight intensity={0.6} />
                <spotLight 
                  position={[10, 10, 10]} 
                  angle={0.3} 
                  penumbra={1} 
                  intensity={1.5}
                  castShadow
                />
                <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff69b4" />
                
                <CakeModel position={[0, -1, 0]} scale={1.2} />
                
                <ContactShadows
                  position={[0, -1.5, 0]}
                  opacity={0.4}
                  scale={10}
                  blur={2}
                  far={4}
                />
                
                <Environment preset="sunset" />
              </Suspense>
            </Canvas>
            
            <div className="absolute top-4 right-4 bg-primary-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
              ${price}
            </div>
          </div>
        ) : (
          // Image Display
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={imageUrl || cake?.images?.[0]?.url}
                alt={title || cake?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-primary-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                ${price || cake?.price}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            {/* Additional Images Thumbnail Grid */}
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {additionalImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
                  >
                    <img
                      src={img.url || img}
                      alt={`${title} view ${idx + 2}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Right Side - Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {/* Category Badge */}
        {category && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              {category || cake?.category}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
        >
          {title || cake?.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          {description || cake?.description}
        </motion.p>

        {/* Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <IoPricetag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                ${price || cake?.price}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-br from-secondary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
            <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
              <IoPeople className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Servings</p>
              <p className="text-xl font-bold text-secondary-600 dark:text-secondary-400">
                {servings || cake?.servings}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-br from-accent-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 col-span-2">
            <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
              <IoTime className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Preparation Time</p>
              <p className="text-lg font-bold text-accent-600 dark:text-accent-400">
                {preparationTime || cake?.preparationTime}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Order Button */}
        {onOrderClick && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <button
              onClick={onOrderClick}
              className="w-full bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Order This Cake
            </button>
          </motion.div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-100 dark:border-gray-600"
        >
          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <IoCalendar className="mr-2 text-primary-500" />
            Custom Order Information
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            All cakes are made fresh to order. Please allow the specified preparation time for your custom creation. 
            We can customize flavors, colors, and designs to match your preferences.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CakeDetailDisplay;
