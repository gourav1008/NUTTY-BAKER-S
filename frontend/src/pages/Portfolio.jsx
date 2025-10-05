import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { portfolioAPI } from '../utils/api';
import { CAKE_CATEGORIES } from '../utils/constants';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';

const Portfolio = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCake, setSelectedCake] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCakes();
  }, [selectedCategory]);

  const fetchCakes = async () => {
    try {
      setLoading(true);
      const params = selectedCategory !== 'All' ? { category: selectedCategory } : {};
      const response = await portfolioAPI.getAll(params);
      setCakes(response.data.data);
    } catch (error) {
      toast.error('Failed to load cakes');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (cake) => {
    setSelectedCake(cake);
    setModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Portfolio | Sweet Creations Bakery</title>
        <meta name="description" content="Browse our stunning collection of custom cakes, wedding cakes, and desserts." />
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our collection of beautifully crafted cakes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 sticky top-20 z-30 shadow-md">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {CAKE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" />
            </div>
          ) : cakes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No cakes found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cakes.map((cake, index) => (
                <motion.div
                  key={cake._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="overflow-hidden cursor-pointer group"
                    onClick={() => openModal(cake)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={cake.images[0]?.url}
                        alt={cake.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="text-sm font-semibold">{cake.category}</p>
                          <p className="text-2xl font-bold">${cake.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{cake.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {cake.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="lg">
        {selectedCake && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={selectedCake.images[0]?.url}
                alt={selectedCake.title}
                className="w-full rounded-lg"
              />
              {selectedCake.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {selectedCake.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={`${selectedCake.title} ${idx + 2}`}
                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <div className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                {selectedCake.category}
              </div>
              <h2 className="text-3xl font-bold mb-4">{selectedCake.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedCake.description}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold">Price:</span>
                  <span className="text-primary-500 font-bold text-xl">${selectedCake.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Servings:</span>
                  <span>{selectedCake.servings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Preparation Time:</span>
                  <span>{selectedCake.preparationTime}</span>
                </div>
              </div>
              {selectedCake.tags && selectedCake.tags.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCake.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  setModalOpen(false);
                  window.location.href = '/contact';
                }}
                className="w-full btn-primary"
              >
                Order This Cake
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Portfolio;
