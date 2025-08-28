import React, { useState, useRef, useEffect } from 'react';
import { User, Briefcase, Github, Linkedin, Mail } from 'lucide-react';
import { LiquidGlass } from '@liquidglass/react';

const LiquidIndicator = ({ 
  className = '', 
  blur = 10, 
  opacity = 1,
  glowIntensity = 0.1,
  ...props 
}) => {
  return (
    <div
      className={`liquid-indicator ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        border: `1px solid rgba(255, 255, 255, ${opacity + 0.05})`,
        boxShadow: `inset 0 0 20px rgba(255, 255, 255, ${glowIntensity})`,
        ...props.style
      }}
      {...props}
    />
  );
};

export default function LiquidGlassReactNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const indicatorRef = useRef(null);
  const navRef = useRef(null);

  const navItems = [
    { icon: User, label: 'About' },
    { icon: Briefcase, label: 'Projects' },
    { icon: Github, label: 'GitHub', link: 'https://github.com/abhisn15' },
    { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/abhisuryanugroho' },
    { icon: Mail, label: 'Gmail', link: 'mailto:abhisuryanu9roho@gmail.com' }
  ];

  useEffect(() => {
    if (indicatorRef.current && navRef.current) {
      const navItemsElements = navRef.current.querySelectorAll('.nav-item');
      const activeItem = navItemsElements[activeIndex];
      
      if (activeItem) {
        const itemRect = activeItem.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        const leftPosition = itemRect.left - navRect.left;
        
        indicatorRef.current.style.transform = `translateX(${leftPosition}px)`;
        indicatorRef.current.style.width = `${itemRect.width}px`;
      }
    }
  }, [activeIndex]);

  const handleItemClick = (index, item) => {
    if (item.link) {
      // Open external link in new tab for social items
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else {
      // Set active for internal nav items (About, Projects)
      setActiveIndex(index);
    }
  };

  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50'>
      <LiquidGlass 
        className='border-[0.1px] border-white/40'
        saturation={0.2}
        shadowIntensity={0.2}
        borderRadius={150}
        displacementScale={10}
      >
        <nav 
          ref={navRef}
          className="flex items-center w-full justify-between px-6 py-3 space-x-1 relative"
        >
          {/* Liquid moving indicator di bagian bawah */}
          <LiquidIndicator
            ref={indicatorRef}
            className="absolute bottom-2 h-1.5 rounded-t-xl transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            style={{ 
              left: '24px',
              width: '60px'
            }}
            blur={8}
            opacity={0.2}
            glowIntensity={0.25}
          />
          
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;
            
            return (
              <React.Fragment key={index}>
                {/* Divider between About and Projects */}
                {index === 1 && (
                  <div className="h-12 w-[1px] bg-white/20 mx-1" />
                )}
                
                <button
                  onClick={() => handleItemClick(index, item)}
                  className={`nav-item relative flex flex-col items-center justify-center w-14 h-12 rounded-2xl 
                    transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] 
                    ${isActive ? 'text-white scale-110' : 'text-white/60 hover:text-white'}`}
                >
                  <div className="relative group">
                    <Icon 
                      size={20} 
                      className={`transition-transform duration-300 
                        ${isActive ? 'scale-110' : 'group-hover:scale-125'}`}
                    />
                    {/* Tooltip yang muncul di atas saat hover, di luar bottom bar */}
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out pointer-events-none whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      </LiquidGlass>
    </div>
  );
}