import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5, shadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      className={`card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
