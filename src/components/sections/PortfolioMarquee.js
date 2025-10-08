'use client';
import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';

export default function PortfolioMarquee() {
  const { isDarkMode, colors } = useTheme();
  const marqueeRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    let ctx;
    if (innerRef.current) {
      const marqueeWidth = innerRef.current.scrollWidth / 2; // width of one set
      gsap.set(innerRef.current, { x: 0 });

      ctx = gsap.context(() => {
        gsap.to(innerRef.current, {
          x: -marqueeWidth,
          duration: 40,
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % -marqueeWidth)
          }
        });
      }, innerRef);

      // Clean up animation on unmount
      return () => {
        if (ctx) ctx.revert();
      };
    }
  }, []);

  return (
    <section
      className="h-[210px] overflow-hidden relative"
      style={{
        // Remove backgroundColor, use SVG instead
        transform: 'skewY(-4deg)',
        WebkitTransform: 'skewY(-4deg)',
        MozTransform: 'skewY(-4deg)',
        msTransform: 'skewY(-4deg)',
        OTransform: 'skewY(-4deg)',
      }}
    >
      {/* SVG Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{
          zIndex: 0,
          top: 0,
          left: 0,
          width: '200%',
          height: '200%',
          overflow: 'hidden',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1280 231"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            width: '80%',
            height: '70%',
            objectFit: 'cover',
            position: 'absolute',
            top: '-60px', // geser SVG ke atas
            left: 0,
          }}
          preserveAspectRatio="none"
        >
          <g filter="url(#filter0_dg_226_42)">
            <rect
              x="-11"
              y="86.7365"
              width="1325.07"
              height="121"
              transform="rotate(-2.71373 -11 86.7365)"
              fill={isDarkMode ? "#C9C9C9" : "#C9C9C9"}
            />
          </g>
          <defs>
            <filter id="filter0_dg_226_42" x="-34.2" y="0.799999" width="1375.71" height="230.001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="6.4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_226_42"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_226_42" result="shape"/>
              <feTurbulence type="fractalNoise" baseFrequency="0.08196721225976944 0.08196721225976944" numOctaves="3" seed="2999" />
              <feDisplacementMap in="shape" scale="46.400001525878906" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
              <feMerge result="effect2_texture_226_42">
                <feMergeNode in="displacedImage"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      <div
        ref={marqueeRef}
        className="relative w-full overflow-hidden sm:h-[210px] top-10"
        style={{
          // counter-skew for children so text stays upright
          transform: 'skewY(-1.5deg)',
          WebkitTransform: 'skewY(-1.5deg)',
          MozTransform: 'skewY(-1.5deg)',
          msTransform: 'skewY(-1.5deg)',
          OTransform: 'skewY(-1.5deg)',
          zIndex: 1,
        }}
      >
        <div
          ref={innerRef}
          className="flex whitespace-nowrap"
          style={{
            willChange: 'transform',
          }}
        >
          {/* Duplicate text for seamless loop */}
          {[...Array(2)].map((_, j) =>
            [...Array(10)].map((_, i) => (
              <h1
                key={`${j}-${i}`}
                className="marquee-text text-6xl md:text-8xl lg:text-9xl font-bold mr-8"
                style={{
                  color: isDarkMode ? '#000000' : '#ffffff',
                  opacity: 0.8,
                  display: 'inline-block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                ● PORTFOLIO
              </h1>
            ))
          )}
        </div>
      </div>
    </section>
  );
}