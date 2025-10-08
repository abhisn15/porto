'use client';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

export default function Skills() {
  const { isDarkMode, colors } = useTheme();
  const containerRef = useRef(null);
  
  const skillCategories = [
    {
      title: "Full-Stack Development",
      skills: [
        "React", "Nextjs", "React Native", "Flutter", 
        "Laravel", "Python", "Expressjs", "MySQL", 
        "SQL Server", "RESTful APIs", "Git/GitHub"
      ]
    },
    {
      title: "UI/UX & Interactions",
      skills: [
        "UI/UX", "Threejs", "accessibility first design", 
        "prototyping", "micro-interactions", "UI directing"
      ]
    }
  ];

  useEffect(() => {
    // Initial animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Stagger animation for skill tags
    const skillTags = containerRef.current?.querySelectorAll('.skill-tag');
    if (skillTags) {
      gsap.fromTo(skillTags,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
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
              Skill Sets
            </h2>
            <div 
              className="h-0.5 w-24"
              style={{ backgroundColor: colors.yellow }}
            ></div>
          </div>

          {/* Right Side - Skills */}
          <div className="space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 
                  className="text-xl font-bold mb-4"
                  style={{ color: colors.cyan }}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="skill-tag px-3 py-1 rounded-full text-sm font-medium border cursor-pointer"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                        color: colors.textSecondary
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          scale: 1.05,
                          backgroundColor: isDarkMode ? 'rgba(153, 244, 255, 0.1)' : 'rgba(153, 244, 255, 0.2)',
                          borderColor: colors.cyan,
                          color: colors.text,
                          duration: 0.2,
                          ease: "power2.out"
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          scale: 1,
                          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                          borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                          color: colors.textSecondary,
                          duration: 0.2,
                          ease: "power2.out"
                        });
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}