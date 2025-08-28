// components/sections/WhatIDo.js
'use client';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function WhatIDo() {
  const theme = useTheme();
  
  const services = [
    {
      title: "UI/UX DESIGN",
      description: "Merancang UI/UX yang intuitif dan visual memukau untuk pengalaman pengguna yang mulus.",
      iconColor: theme.pink,
      icon: "🎨"
    },
    {
      title: "WEB DESIGN",
      description: "Mengubah desain kreatif jadi website responsif yang ciamik.",
      iconColor: theme.teal,
      icon: "💻"
    },
    {
      title: "FRONTEND DEVELOPMENT",
      description: "Membangun website cepat dan responsif pakai HTML, CSS, dan JavaScript.",
      iconColor: "#4CAF50",
      icon: "⚙️"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="py-20 px-6 md:px-12">
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">WHAT I CAN DO FOR YOU</h2>
          <div 
            className="h-0.5 w-24 mx-auto"
            style={{ backgroundColor: theme.yellow }}
          ></div>
          <p className="mt-4 text-gray-600">🤔 Discover my expertise</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ServiceCard 
                title={service.title} 
                description={service.description} 
                iconColor={service.iconColor}
                icon={service.icon}
                theme={theme}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ServiceCard({ title, description, iconColor, icon, theme }) {
  return (
    <div 
      className="bg-white border-2 border-black rounded-xl p-8 h-full transition-all duration-300"
      style={{ 
        borderColor: 'black',
        boxShadow: '8px 8px 0px rgba(0,0,0,0.1)'
      }}
    >
      <motion.div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: `${iconColor}20`, color: iconColor }}
        whileHover={{ 
          backgroundColor: iconColor,
          color: 'white',
          scale: 1.1
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-2xl">{icon}</span>
      </motion.div>
      
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="mt-4 text-sm">💻 Learn more</p>
    </div>
  );
}