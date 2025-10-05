import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon = null,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:scale-105 active:scale-95',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:shadow-lg hover:scale-105 active:scale-95',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white active:scale-95',
    ghost: 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg active:scale-95',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? disabledClasses : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
