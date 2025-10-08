'use client';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

export default function Education() {
  const { isDarkMode, colors } = useTheme();
  const containerRef = useRef(null);
  
  const education = [
    {
      school: "SMKN 40 JAKARTA",
      period: "2022 - 2025",
      department: "Department of Information Technology - Software Engineering"
    }
  ];

  useEffect(() => {
    // Initial animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
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
              Education
            </h2>
            <div 
              className="h-0.5 w-24"
              style={{ backgroundColor: colors.yellow }}
            ></div>
          </div>

          {/* Right Side - Education Details */}
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border"
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
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  {edu.school}
                </h3>
                <p 
                  className="text-sm mb-2"
                  style={{ color: colors.cyan }}
                >
                  {edu.period}
                </p>
                <p 
                  className="text-base"
                  style={{ color: colors.textSecondary }}
                >
                  {edu.department}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}