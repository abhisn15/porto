// components/sections/Skills.js
'use client';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function Skills() {
  const theme = useTheme();
  
  const skills = [
    { name: "REACT", icon: "⚛️" },
    { name: "TAILWIND CSS", icon: "🎨" },
    { name: "JAVASCRIPT", icon: "📜" },
    { name: "FIGMA", icon: "🖌️" },
    { name: "NEXT.JS", icon: "▲" },
    { name: "TYPESCRIPT", icon: "TS" }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <section 
      className="py-20 px-6 md:px-12"
      style={{ backgroundColor: theme.background }}
    >
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">SKILLS</h2>
          <div 
            className="h-0.5 w-24 mx-auto"
            style={{ backgroundColor: theme.yellow }}
          ></div>
          <p className="mt-4 text-gray-600">🛠️ My technical toolkit</p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.1
              }}
              transition={{ duration: 0.3 }}
            >
              <SkillIcon 
                name={skill.name} 
                icon={skill.icon} 
                theme={theme} 
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function SkillIcon({ name, icon, theme }) {
  return (
    <div className="text-center">
      <div 
        className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center text-2xl mb-3 transition-all duration-300"
        style={{ 
          backgroundColor: 'white',
          boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
        }}
      >
        {icon}
      </div>
      <p className="font-medium">{name}</p>
    </div>
  );
}