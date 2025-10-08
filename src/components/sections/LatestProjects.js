'use client';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

export default function LatestProjects() {
  const { isDarkMode, colors } = useTheme();
  const containerRef = useRef(null);
  
  const projects = [
    {
      title: "Community Profile",
      date: "May 2023",
      description: "A comprehensive community management platform with user profiles and social features.",
      technologies: ["HTML", "Tailwind CSS", "PHP", "Javascript", "MySQL"],
      image: "/assets/hero/profile.jpg",
      link: "#",
      type: "Website"
    },
    {
      title: "P2HP Mobile App",
      date: "June 2023",
      description: "Mobile application for P2HP organization with real-time communication features.",
      technologies: ["React Native", "Firebase", "Node.js"],
      image: "/assets/hero/profile.jpg",
      link: "#",
      type: "Demo"
    },
    {
      title: "BicaraKita App",
      date: "August 2024",
      description: "Communication platform developed for LKS competition using Flutter and Laravel.",
      technologies: ["Flutter", "Laravel", "SQL"],
      image: "/assets/hero/profile.jpg",
      link: "#",
      type: "Website"
    }
  ];

  useEffect(() => {
    // Initial animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Stagger animation for project cards
    const projectCards = containerRef.current?.querySelectorAll('.project-card');
    if (projectCards) {
      gsap.fromTo(projectCards,
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
              Latest Projects
            </h2>
            <div 
              className="h-0.5 w-24"
              style={{ backgroundColor: colors.yellow }}
            ></div>
          </div>

          {/* Right Side - Projects */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="project-card rounded-lg border overflow-hidden"
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
                {/* Project Image */}
                <div className="h-48 bg-gray-300 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: colors.text }}
                    >
                      {project.title}
                    </h3>
                    <span 
                      className="text-sm px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: colors.cyan + '20',
                        color: colors.cyan 
                      }}
                    >
                      {project.date}
                    </span>
                  </div>
                  
                  <p 
                    className="text-sm mb-4"
                    style={{ color: colors.textSecondary }}
                  >
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                          color: colors.textSecondary
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <button
                    className="px-4 py-2 rounded text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: colors.cyan,
                      color: isDarkMode ? '#000' : '#fff'
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: "power2.out"
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out"
                      });
                    }}
                  >
                    {project.type === "Website" ? "Website" : "Play (Demo)"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}