import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { contactAPI } from '../utils/api';
import { OCCASION_TYPES, BUSINESS_INFO } from '../utils/constants';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import toast from 'react-hot-toast';
import { IoCall, IoMail, IoLocation, IoTime } from 'react-icons/io5';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occasionType: 'General Inquiry',
    eventDate: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.submit(formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        occasionType: 'General Inquiry',
        eventDate: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Sweet Creations Bakery</title>
        <meta name="description" content="Get in touch with us to order your custom cake or ask any questions." />
      </Helmet>

      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Let's create something amazing together
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Occasion Type</label>
                      <select
                        name="occasionType"
                        value={formData.occasionType}
                        onChange={handleChange}
                        className="input"
                      >
                        {OCCASION_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Event Date (Optional)</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="textarea"
                      placeholder="Tell us about your dream cake..."
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full" size="lg">
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <IoLocation className="text-primary-500 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">{BUSINESS_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <IoCall className="text-primary-500 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="text-primary-500 hover:underline">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <IoMail className="text-primary-500 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary-500 hover:underline">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <IoTime className="text-primary-500 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Mon-Fri: {BUSINESS_INFO.hours.weekday}<br />
                      Sat-Sun: {BUSINESS_INFO.hours.weekend}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Order 2-3 weeks in advance</li>
                  <li>• Include event date in your message</li>
                  <li>• Mention any dietary restrictions</li>
                  <li>• Share inspiration photos if available</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
