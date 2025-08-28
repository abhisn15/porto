// components/ui/Button.js
'use client';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function Button({ children, variant, style, ...props }) {
  const theme = useTheme();
  
  const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-300 transform";
  
  return (
    <motion.button
      whileHover={{ 
        y: -3,
        scale: 1.05
      }}
      whileTap={{ scale: 0.95 }}
      style={style}
      className={`${baseStyles} ${
        variant === 'primary' 
          ? 'text-black' 
          : 'bg-white text-black border-2 border-black'
      }`}
      {...props}
    >
      {children}
    </motion.button>
  );
}