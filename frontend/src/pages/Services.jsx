import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { SERVICES, PRICING_TIERS } from '../utils/constants';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | Sweet Creations Bakery</title>
        <meta name="description" content="Explore our cake baking services including custom cakes, wedding cakes, and more." />
      </Helmet>

      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              From custom designs to wedding masterpieces
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="text-primary-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-primary-500 font-bold text-lg">{service.priceRange}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pricing <span className="gradient-text">Tiers</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_TIERS.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-8 h-full ${tier.popular ? 'ring-4 ring-primary-500 scale-105' : ''}`}>
                  {tier.popular && (
                    <div className="bg-primary-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-3xl font-bold text-primary-500 mb-2">{tier.price}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary-500 mr-2 mt-1">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className="w-full" variant={tier.popular ? 'primary' : 'outline'}>
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
