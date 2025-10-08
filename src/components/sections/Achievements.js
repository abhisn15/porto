'use client';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

export default function Achievements() {
  const { isDarkMode, colors } = useTheme();
  const containerRef = useRef(null);
  
  const achievements = [
    {
      title: "LKS IT Solution BAST JAKARTA",
      date: "Agustus 2024",
      description: "Juara 3 untuk pengembangan aplikasi \"BicaraKita\" menggunakan Flutter, Laravel, dan SQL.",
      award: "🥉"
    },
    {
      title: "AWS Indonesian Cloud Computing Club Competition",
      date: "Maret 2024",
      description: "Finalis dalam pembuatan website donasi.",
      award: "🏆"
    }
  ];

  useEffect(() => {
    // Initial animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Stagger animation for achievement cards
    const achievementCards = containerRef.current?.querySelectorAll('.achievement-card');
    if (achievementCards) {
      gsap.fromTo(achievementCards,
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
              Achievements
            </h2>
            <div 
              className="h-0.5 w-24"
              style={{ backgroundColor: colors.yellow }}
            ></div>
          </div>

          {/* Right Side - Achievements */}
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="achievement-card p-6 rounded-lg border relative"
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
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{achievement.award}</div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      {achievement.title}
                    </h3>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: colors.cyan }}
                    >
                      {achievement.date}
                    </p>
                    <p 
                      className="text-base"
                      style={{ color: colors.textSecondary }}
                    >
                      {achievement.description}
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