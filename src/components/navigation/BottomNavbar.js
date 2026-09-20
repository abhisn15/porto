'use client';
import React, { useState, useRef, useEffect } from 'react';
import { User, Briefcase, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { LiquidGlass } from '@liquidglass/react';
import { gsap } from 'gsap';
import { useTheme } from '@/context/ThemeContext';
import { useGulirKe } from '@/components/providers/SmoothScroll';

export default function BottomNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const indicatorRef = useRef(null);
  const navRef = useRef(null);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const gulirKe = useGulirKe();

  const navItems = [
    { icon: User, label: 'About', target: 'aboutme', color: '#99F4FF' },
    { icon: Briefcase, label: 'Projects', target: 'projects', color: '#FFC107' },
    { icon: Github, label: 'GitHub', link: 'https://github.com/abhisn15', color: '#FF69B4' },
    { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/abhisuryanugroho', color: '#26C6DA' },
    { icon: Mail, label: 'Gmail', link: 'mailto:abhisuryanu9roho@gmail.com', color: '#4F91C9' }
  ];

  useEffect(() => {
    const updateIndicatorPosition = () => {
      if (indicatorRef.current && navRef.current) {
        const navItemsElements = navRef.current.querySelectorAll('.nav-item');
        const activeItem = navItemsElements[activeIndex];
        
        if (activeItem) {
          const itemRect = activeItem.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();
          const leftPosition = itemRect.left - navRect.left;
          
          gsap.to(indicatorRef.current, {
            x: leftPosition,
            width: itemRect.width,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }
    };

    // Update position immediately
    updateIndicatorPosition();

    // Update on window resize
    window.addEventListener('resize', updateIndicatorPosition);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [activeIndex]);

  const handleItemClick = (index, item) => {
    if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
      return;
    }
    setActiveIndex(index);
    // Dulu hanya baris di atas yang dijalankan: indikatornya bergeser tapi halaman
    // diam di tempat. Butir About dan Projects sekarang punya tujuan sungguhan.
    if (item.target) gulirKe(item.target);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    const navItem = navRef.current?.querySelectorAll('.nav-item')[index];
    if (navItem) {
      gsap.to(navItem, {
        scale: 1.15,
        y: -4,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    const navItem = navRef.current?.querySelectorAll('.nav-item')[index];
    if (navItem) {
      gsap.to(navItem, {
        scale: activeIndex === index ? 1.1 : 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleThemeToggleHover = () => {
    setHoveredIndex(999);
    const themeButton = navRef.current?.querySelector('.theme-toggle');
    if (themeButton) {
      gsap.to(themeButton, {
        scale: 1.15,
        rotation: 180,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleThemeToggleLeave = () => {
    setHoveredIndex(null);
    const themeButton = navRef.current?.querySelector('.theme-toggle');
    if (themeButton) {
      gsap.to(themeButton, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className='fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg sm:max-w-2xl z-50'>
      {/* Efek kaca yang membelokkan apa pun yang lewat di belakangnya saat halaman
          digulir - itu memang yang diinginkan, bukan cacat. Yang dulu jadi masalah
          cuma keterbacaan ikonnya, dan itu diselesaikan dari sisi ikon (bayangan di
          bawah tiap ikon) plus peredam tipis, bukan dengan mematikan efeknya. */}
      <LiquidGlass
        className={`border-[0.1px] ${isDarkMode ? 'border-white/40' : 'border-black/20'}`}
        saturation={0.2}
        shadowIntensity={0.3}
        borderRadius={150}
        displacementScale={10}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: isDarkMode ? 'rgba(20,22,28,0.55)' : 'rgba(255,255,255,0.6)' }}
        />
        <nav 
          ref={navRef}
          className="flex items-center w-full justify-between px-2 sm:px-4 py-2.5 sm:py-3 gap-0.5 sm:gap-1 relative"
        >
          {/* Animated indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-1.5 h-1 rounded-full"
            style={{ 
              left: '16px',
              width: '56px',
              background: `linear-gradient(90deg, ${navItems[activeIndex]?.color || '#99F4FF'}, ${navItems[activeIndex]?.color || '#99F4FF'}80)`
            }}
          />
          
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;
            const isHovered = index === hoveredIndex;
            
            return (
              <React.Fragment key={index}>
                <button
                  onClick={() => handleItemClick(index, item)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  className={`nav-item relative flex flex-col items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-2xl transition-all duration-300 shrink-0`}
                >
                  {/* Glow effect on hover */}
                  {(isActive || isHovered) && (
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle, ${item.color}30 0%, transparent 70%)`,
                      }}
                    />
                  )}

                  <div className="relative group z-10">
                    <div className="icon-container">
                      <Icon 
                        size={22} 
                        className="transition-colors duration-300"
                        style={{
                          color: isActive ? item.color : isDarkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)',
                          // Bayangan ini yang menjaga ikon tetap terbaca ketika konten
                          // halaman lewat di belakang kaca dan ikut terbelokkan.
                          filter: isActive
                            ? `drop-shadow(0 0 8px ${item.color}80) drop-shadow(0 1px 3px ${isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'})`
                            : `drop-shadow(0 1px 3px ${isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'})`
                        }}
                      />
                    </div>
                    
                    {/* Enhanced tooltip */}
                    {isHovered && (
                      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 pointer-events-none z-50">
                        <div 
                          className="px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap"
                          style={{
                            background: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
                            color: isDarkMode ? '#fff' : '#000',
                            boxShadow: `0 4px 12px ${item.color}40`,
                            border: `1px solid ${item.color}50`
                          }}
                        >
                          {item.label}
                          <div 
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2"
                            style={{
                              background: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
                              borderRight: `1px solid ${item.color}50`,
                              borderBottom: `1px solid ${item.color}50`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </React.Fragment>
            );
          })}

          {/* Divider */}
          <div 
            className={`h-8 sm:h-10 w-[1px] mx-0.5 sm:mx-1 shrink-0 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}
          />

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            onMouseEnter={handleThemeToggleHover}
            onMouseLeave={handleThemeToggleLeave}
            className="theme-toggle relative flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-2xl shrink-0"
          >
            {/* Glow effect */}
            {hoveredIndex === 999 && (
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: isDarkMode 
                    ? 'radial-gradient(circle, #FFC10730 0%, transparent 70%)'
                    : 'radial-gradient(circle, #4F46E530 0%, transparent 70%)',
                }}
              />
            )}

            <div className="relative">
              {isDarkMode ? (
                <Sun 
                  size={22} 
                  className="text-yellow-400"
                  style={{
                    filter: 'drop-shadow(0 0 8px #FFC10780)'
                  }}
                />
              ) : (
                <Moon 
                  size={22} 
                  className="text-indigo-600"
                  style={{
                    filter: 'drop-shadow(0 0 8px #4F46E580)'
                  }}
                />
              )}
            </div>

            {/* Tooltip for theme toggle */}
            {hoveredIndex === 999 && (
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 pointer-events-none z-50">
                <div 
                  className="px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap"
                  style={{
                    background: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
                    color: isDarkMode ? '#fff' : '#000',
                    boxShadow: isDarkMode ? '0 4px 12px #FFC10740' : '0 4px 12px #4F46E540',
                    border: isDarkMode ? '1px solid #FFC10750' : '1px solid #4F46E550'
                  }}
                >
                  Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2"
                    style={{
                      background: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
                      borderRight: isDarkMode ? '1px solid #FFC10750' : '1px solid #4F46E550',
                      borderBottom: isDarkMode ? '1px solid #FFC10750' : '1px solid #4F46E550',
                    }}
                  />
                </div>
              </div>
            )}
          </button>
        </nav>
      </LiquidGlass>
    </div>
  );
}