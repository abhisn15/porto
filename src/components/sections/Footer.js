// src/components/sections/Footer.js
'use client';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function Footer() {
  const theme = useTheme();
  
  const socialMedia = [
    { name: "LinkedIn", icon: "🔗", url: "#" },
    { name: "GitHub", icon: "🐙", url: "#" },
    { name: "Instagram", icon: "📸", url: "#" },
    { name: "Dribbble", icon: "🎨", url: "#" }
  ];
  
  return (
    <footer className="py-12 px-6 md:px-12" style={{ backgroundColor: theme.background }}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Let&#39;s Connect</h3>
            <p className="text-gray-600">Have a project in mind? Let&#39;s talk!</p>
          </div>
          
          <div className="flex space-x-6">
            {socialMedia.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className="text-2xl"
                whileHover={{ 
                  y: -5,
                  color: theme.yellow 
                }}
                transition={{ duration: 0.2 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-300 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>© {new Date().getFullYear()} Nama Anda. All rights reserved. ✨</p>
        </motion.div>
      </div>
    </footer>
  );
}