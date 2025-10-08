'use client';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

export default function WorkExperience() {
  const { isDarkMode, colors } = useTheme();
  const containerRef = useRef(null);
  
  const experiences = [
    {
      company: "Perhimpunan Pecinta Alam Putih",
      period: "Mei 2023 - Sep 2023",
      position: "Full Stack Mobile and Web Developer & Digital Operations Support",
      description: "Developed mobile and web applications while supporting digital operations.",
      image: "/assets/hero/profile.jpg"
    },
    {
      company: "PT. Densa Indonesia",
      period: "Mei 2023 - Sep 2023",
      position: "Internship Fullstack Developer",
      description: "Fullstack development internship focusing on digitalization projects.",
      image: "/assets/hero/profile.jpg"
    },
    {
      company: "SG. Charity Indonesia (Payanghi)",
      period: "Jan 2024 - Jun 2024",
      position: "Administrator & Social Assistant",
      description: "Administrative support and social assistance for charity organization.",
      image: "/assets/hero/profile.jpg"
    }
  ];

  useEffect(() => {
    // Initial animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Stagger animation for experience cards
    const experienceCards = containerRef.current?.querySelectorAll('.experience-card');
    if (experienceCards) {
      gsap.fromTo(experienceCards,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);
  
  return (
    <section className="py-20 px-6 md:px-12">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Title */}
          <div>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4 font-hero"
              style={{ color: colors.text }}
            >
              Work Experience
            </h2>
            <div 
              className="h-0.5 w-24"
              style={{ backgroundColor: colors.yellow }}
            ></div>
          </div>

          {/* Right Side - Work Experiences */}
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="experience-card p-6 rounded-lg border"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.02,
                    borderColor: colors.cyan,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold mb-1"
                      style={{ color: colors.text }}
                    >
                      {exp.company}
                    </h3>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: colors.cyan }}
                    >
                      {exp.period}
                    </p>
                    <p 
                      className="text-base font-medium mb-2"
                      style={{ color: colors.text }}
                    >
                      {exp.position}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}