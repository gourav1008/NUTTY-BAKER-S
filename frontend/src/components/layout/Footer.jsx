import { Link } from 'react-router-dom';
import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoWhatsapp, IoMail, IoCall, IoLocation } from 'react-icons/io5';
import { SOCIAL_LINKS, BUSINESS_INFO } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Services', path: '/services' },
      { name: 'Testimonials', path: '/testimonials' },
    ],
    support: [
      { name: 'Contact', path: '/contact' },
      { name: 'FAQ', path: '/about#faq' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-4xl">🍰</span>
              <span className="text-2xl font-bold text-white">
                NUTTY BAKER'S
              </span>
            </div>
            <p className="text-sm mb-4">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="flex space-x-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <IoLogoInstagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <IoLogoFacebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
                aria-label="Pinterest"
              >
                <IoLogoPinterest className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
                aria-label="WhatsApp"
              >
                <IoLogoWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <IoLocation className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <IoCall className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-primary-400">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <IoMail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-primary-400">
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 text-sm">
              <p className="font-semibold text-white mb-1">Hours</p>
              <p>Mon-Fri: {BUSINESS_INFO.hours.weekday}</p>
              <p>Sat-Sun: {BUSINESS_INFO.hours.weekend}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p className="mt-2 text-gray-500">
            Made with ❤️ and lots of 🍰
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
