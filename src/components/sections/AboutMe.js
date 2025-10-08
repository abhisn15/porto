'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';

const AboutMe = () => {
  const { isDarkMode, colors } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  
  // Mouse tracking untuk cursor following effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        
        // Animate images to follow cursor (opposite direction)
        imagesRef.current.forEach((imgRef, index) => {
          if (imgRef) {
            const moveX = (x - 0.5) * (30 + index * 10); // Opposite direction
            const moveY = (y - 0.5) * (30 + index * 10);
            
            gsap.to(imgRef, {
              x: moveX,
              y: moveY,
              duration: 0.8,
              ease: "power2.out"
            });
          }
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Initial animation on mount
  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Stagger animation for images
    gsap.fromTo(imagesRef.current,
      { scale: 0, rotation: 180 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "back.out(1.7)"
      }
    );
  }, []);

  // Placeholder images - nanti bisa diganti dengan gambar asli
  const images = [
    { id: 1, src: '/assets/hero/profile.jpg', alt: 'Profile 1', x: 0.2, y: 0.3 },
    { id: 2, src: '/assets/hero/profile.jpg', alt: 'Profile 2', x: 0.6, y: 0.1 },
    { id: 3, src: '/assets/hero/profile.jpg', alt: 'Profile 3', x: 0.8, y: 0.4 },
    { id: 4, src: '/assets/hero/profile.jpg', alt: 'Profile 4', x: 0.1, y: 0.7 },
  ];

  return (
    <section id='aboutme' className="py-20 px-6 md:px-12">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <div>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-4 font-hero"
                style={{ color: colors.text }}
              >
                About Me
              </h2>
              <div 
                className="h-0.5 w-24"
                style={{ backgroundColor: colors.yellow }}
              ></div>
            </div>
            
            <p 
              className="text-lg leading-relaxed font-baloo-2-regular"
              style={{ color: colors.textSecondary }}
            >
              I&apos;m a passionate <span className="font-bold" style={{ color: colors.cyan }}>Fullstack Developer</span> who is 
              dedicated to creating perfect interfaces and robust engineering. With expertise in 
              <span className="font-semibold" style={{ color: colors.text }}> React JS</span>, 
              <span className="font-semibold" style={{ color: colors.text }}> React Native</span>, 
              <span className="font-semibold" style={{ color: colors.text }}> MySQL</span>, and 
              <span className="font-semibold" style={{ color: colors.text }}> SQL Server</span>.
            </p>
            
            <p 
              className="text-lg leading-relaxed font-baloo-2-regular"
              style={{ color: colors.textSecondary }}
            >
              I have experience in digital operations and exploring interactive 3D experiences. 
              My goal is to deliver exceptional user experiences through clean code and innovative design.
            </p>
          </div>

          {/* Right Side - Interactive Images */}
          <div className="relative h-96 lg:h-[500px]">
            {images.map((image, index) => (
              <div
                key={image.id}
                ref={el => imagesRef.current[index] = el}
                className="absolute rounded-lg overflow-hidden border-2 cursor-pointer"
                style={{
                  left: `${image.x * 100}%`,
                  top: `${image.y * 100}%`,
                  width: `${120 - index * 20}px`,
                  height: `${120 - index * 20}px`,
                  borderColor: colors.cyan,
                  zIndex: images.length - index,
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.target, {
                    scale: 1.1,
                    rotation: [0, -5, 5, 0],
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;