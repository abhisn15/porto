'use client';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

export default function Footer() {
  const { isDarkMode, colors } = useTheme();
  const containerRef = useRef(null);
  
  const socialMedia = [
    { name: "LinkedIn", icon: "🔗", url: "https://linkedin.com/in/abhisuryanugroho" },
    { name: "GitHub", icon: "🐙", url: "https://github.com/abhisn15" },
    { name: "Gmail", icon: "✉️", url: "mailto:abhisuryanu9roho@gmail.com" }
  ];

  useEffect(() => {
    // Initial animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);
  
  return (
    <footer className="py-12 px-6 md:px-12">
      <div 
        ref={containerRef}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 
              className="text-xl font-bold mb-2"
              style={{ color: colors.text }}
            >
              Let&#39;s Connect
            </h3>
            <p style={{ color: colors.textSecondary }}>
              Have a project in mind? Let&#39;s talk!
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="text-2xl"
                style={{ color: colors.textSecondary }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -5,
                    color: colors.yellow,
                    scale: 1.2,
                    duration: 0.2,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    color: colors.textSecondary,
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                  });
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div 
          className="mt-8 pt-8 text-center border-t"
          style={{ 
            borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
          }}
        >
          <p style={{ color: colors.textSecondary }}>
            © {new Date().getFullYear()} Abhi Surya Nugroho. All rights reserved. ✨
          </p>
        </div>
      </div>
    </footer>
  );
}