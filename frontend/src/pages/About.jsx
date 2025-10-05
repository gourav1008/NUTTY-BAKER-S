import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Card from '../components/common/Card';
import { TIMELINE, BUSINESS_INFO } from '../utils/constants';
import { IoCheckmarkCircle } from 'react-icons/io5';

const About = () => {
  const skills = [
    'Custom Cake Design',
    'Wedding Cakes',
    'Sugar Flowers',
    'Fondant Work',
    'Buttercream Decoration',
    'Chocolate Sculpting'
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Sweet Creations Bakery</title>
        <meta name="description" content="Learn about our journey, passion for baking, and commitment to creating beautiful custom cakes." />
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Story</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              {BUSINESS_INFO.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800"
                alt="Baker at work"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Passion Meets <span className="gradient-text">Perfection</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                What started as a passion for baking in a small home kitchen has blossomed into a thriving bakery that serves hundreds of happy customers each year.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Every cake we create is a labor of love, combining traditional baking techniques with modern design aesthetics. We believe that cakes are more than just desserts – they're centerpieces of celebration, carriers of memories, and expressions of love.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our commitment to quality means using only the finest ingredients, staying updated with the latest trends, and most importantly, listening to what our customers envision for their special moments.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <IoCheckmarkCircle className="text-primary-500 text-xl flex-shrink-0" />
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l-2 border-primary-300 dark:border-primary-700 last:pb-0"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full border-4 border-white dark:border-gray-800" />
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <div className="text-primary-500 font-bold text-lg mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💎',
                title: 'Quality First',
                description: 'We never compromise on ingredients or craftsmanship. Every cake meets our highest standards.'
              },
              {
                icon: '🤝',
                title: 'Customer Focus',
                description: 'Your vision is our mission. We work closely with you to bring your dream cake to life.'
              },
              {
                icon: '🌱',
                title: 'Sustainability',
                description: 'We source locally when possible and use eco-friendly packaging for all our deliveries.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full">
                  <div className="text-6xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
