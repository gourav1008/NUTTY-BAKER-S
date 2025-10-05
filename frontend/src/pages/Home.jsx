import { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import CakeModel from '../components/3D/CakeModel';
import FloatingElements from '../components/3D/FloatingElements';
import CakeDisplay from '../components/3D/CakeDisplay';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { portfolioAPI, testimonialAPI } from '../utils/api';
import { IoStar, IoArrowForward } from 'react-icons/io5';

// Demo data for featured cakes
const DEMO_CAKES = [
  {
    _id: 'demo-1',
    title: 'Elegant Wedding Cake',
    description: 'A stunning three-tier wedding cake adorned with delicate sugar flowers and pearl accents. Perfect for your special day with customizable flavors and designs.',
    category: 'Wedding',
    price: 299,
    images: [{ url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop' }],
    servings: '50-60 people',
    preparationTime: '3-4 days'
  },
  {
    _id: 'demo-2',
    title: 'Birthday Celebration Cake',
    description: 'Colorful and fun birthday cake with custom decorations, sprinkles, and your choice of flavors. Make your celebration unforgettable!',
    category: 'Birthday',
    price: 89,
    images: [{ url: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop' }],
    servings: '15-20 people',
    preparationTime: '1-2 days'
  },
  {
    _id: 'demo-3',
    title: 'Chocolate Indulgence',
    description: 'Rich, decadent chocolate cake with layers of ganache and chocolate shavings. A chocolate lover\'s dream come true!',
    category: 'Custom',
    price: 125,
    images: [{ url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop' }],
    servings: '20-25 people',
    preparationTime: '2-3 days'
  }
];

// Demo data for testimonials
const DEMO_TESTIMONIALS = [
  {
    _id: 'testimonial-1',
    name: 'Sarah Johnson',
    occasion: 'Wedding',
    rating: 5,
    message: 'The wedding cake was absolutely stunning! Not only did it look beautiful, but it tasted amazing. All our guests were asking where we got it from. Highly recommend!'
  },
  {
    _id: 'testimonial-2',
    name: 'Michael Chen',
    occasion: 'Birthday Party',
    rating: 5,
    message: 'Ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible and she was thrilled with the design!'
  },
  {
    _id: 'testimonial-3',
    name: 'Emily Rodriguez',
    occasion: 'Anniversary',
    rating: 5,
    message: 'Perfect anniversary cake! The flavors were divine and the presentation was elegant. Will definitely be ordering again for future celebrations.'
  }
];

const Home = () => {
  const [featuredCakes, setFeaturedCakes] = useState(DEMO_CAKES);
  const [testimonials, setTestimonials] = useState(DEMO_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cakesRes, testimonialsRes] = await Promise.all([
          portfolioAPI.getAll({ featured: true, limit: 3 }),
          testimonialAPI.getAll({ featured: true, limit: 3 })
        ]);
        
        // Use API data if available, otherwise keep demo data
        if (cakesRes.data.data && cakesRes.data.data.length > 0) {
          setFeaturedCakes(cakesRes.data.data);
        }
        if (testimonialsRes.data.data && testimonialsRes.data.data.length > 0) {
          setTestimonials(testimonialsRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Keep demo data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | NUTTY BAKER'S</title>
        <meta name="description" content="Professional cake baker creating custom cakes for weddings, birthdays, and special occasions." />
      </Helmet>

      {/* Hero Section with Side-by-Side Cake Display */}
      <CakeDisplay
        title="Crafting Sweet Memories"
        subtitle="Custom Cakes Designed with Love"
        description="Every cake we create is a unique masterpiece, carefully crafted to bring your vision to life. From elegant wedding cakes to whimsical birthday creations, we combine artistry with the finest ingredients to deliver not just a cake, but an unforgettable experience for your special moments."
        showCTA={true}
      />

      {/* Featured Cakes Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Creations</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover our most popular and stunning cake designs
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" />
            </div>
          ) : featuredCakes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No featured cakes available at the moment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCakes.map((cake, index) => (
                <motion.div
                  key={cake._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/portfolio/${cake._id}`}>
                    <Card className="overflow-hidden group">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={cake.images[0]?.url}
                          alt={cake.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ${cake.price}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-primary-500 font-semibold mb-2">
                          {cake.category}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{cake.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {cake.description}
                        </p>
                        <div className="mt-4 flex items-center text-primary-500 font-semibold group-hover:gap-2 transition-all">
                          View Details <IoArrowForward className="ml-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/portfolio">
              <Button size="lg" variant="outline">
                View All Cakes
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">Us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🎨', title: 'Custom Designs', desc: 'Every cake is uniquely crafted to match your vision' },
              { icon: '🌟', title: 'Premium Quality', desc: 'Only the finest ingredients for exceptional taste' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Timely delivery with careful handling' },
              { icon: '💝', title: 'Made with Love', desc: 'Passion and care in every creation' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-8">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </motion.div>

          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No testimonials available at the moment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <IoStar key={i} className="text-yellow-400 w-5 h-5" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                      "{testimonial.message}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.occasion}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/testimonials">
              <Button size="lg" variant="outline">
                Read More Reviews
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 text-white">
        <div className="container-custom text-center mr-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Order Your Dream Cake?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create something amazing together!
            </p>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-white text-primary-500 border-white hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
