"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { gsap } from "gsap";

export default function Hero() {
  const { isDarkMode, colors } = useTheme();
  const heroRef = useRef(null);
  const aboutMeTextRef = useRef(null);

  // Animasi untuk hero section dan about me text
  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline();

      // Initial animation
      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // Stagger animation for text elements
      const textElements = heroRef.current.querySelectorAll(".hero-text");
      tl.fromTo(
        textElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Button animations
      const buttons = heroRef.current.querySelectorAll(".hero-button");
      tl.fromTo(
        buttons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // Image animation
      const image = heroRef.current.querySelector(".hero-image");
      if (image) {
        tl.fromTo(
          image,
          { scale: 0, rotation: 180 },
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
      }

      // About Me text animation (looping)
      if (aboutMeTextRef.current) {
        gsap.fromTo(
          aboutMeTextRef.current,
          { y: 0 },
          {
            y: -10,
            duration: 0.7,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          }
        );
      }
    }
  }, []);

  // Fungsi scroll ke section aboutme
  const handleGoToAboutMe = () => {
    const aboutMeSection = document.getElementById("aboutme");
    if (aboutMeSection) {
      aboutMeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div
        ref={heroRef}
        className="flex flex-col-reverse lg:flex-row justify-between items-center px-6 sm:px-10 lg:px-20 xl:px-32 py-16 gap-12 lg:gap-20"
        style={{ color: colors.text }}
      >
        {/* Bagian Teks */}
        <div className="flex-1 text-center lg:text-left">
          <h4 className="hero-text font-baloo-2-medium text-lg sm:text-xl">
            Hi There 👋🏻
          </h4>

          <div className="hero-text font-hero flex flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4 mt-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl">I&apos;m</h1>
            <div className="flex flex-col items-center">
              <h1 className="text-[#99F4FF] text-2xl sm:text-3xl md:text-4xl relative z-10">
                Abhi Surya Nugroho
              </h1>
              <div className="w-full relative z-0 bottom-2 h-[1px] bg-white origin-left"></div>
            </div>
          </div>

          <div className="hero-text flex flex-row justify-center lg:justify-start items-center gap-2 mt-3">
            <div className="h-[1px] bg-white w-12 sm:w-20"></div>
            <h6 className="font-baloo-2-medium text-sm sm:text-base">
              Fullstack Developer
            </h6>
          </div>

          <h6 className="hero-text font-baloo-2-medium text-sm sm:text-base mt-2">
            Code With intention. Design with compassion
          </h6>

          <h6
            className="hero-text font-baloo-2-medium text-xs sm:text-sm mt-4"
            style={{ color: colors.textSecondary }}
          >
            React JS · React Native · MySQL · SQL Server
          </h6>

          {/* Tombol */}
          <div className="hero-text flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mt-6">
            <button
              className="hero-button font-sans tracking-widest bg-[#6BBEC8] rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md px-6 sm:px-8 py-2 border-b-2 border-r-2 border-[#DDDDDD] text-sm sm:text-base transition-all duration-300 ease-out hover:bg-[#5AAEB9] hover:border-[#CCCCCC]"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(107, 190, 200, 0.3)",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  boxShadow: "none",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              CV Review
            </button>
            <button
              className="hero-button font-sans tracking-widest bg-[#4F91C9] rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md px-6 sm:px-8 py-2 border-b-2 border-r-2 border-[#DDDDDD] text-sm sm:text-base transition-all duration-300 ease-out hover:bg-[#3E80B5] hover:border-[#CCCCCC]"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(79, 145, 201, 0.3)",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  boxShadow: "none",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              Explore My Projects
            </button>
          </div>
        </div>

        {/* Bagian Gambar */}
        <div className="flex-1 flex justify-center items-center relative">
          <Image
            src="/assets/hero/profile.jpg"
            alt="Profile Hero Image"
            width={350}
            height={350}
            className="hero-image rounded-b-[60px] sm:rounded-b-[80px] object-cover relative sm:bottom-20 z-10"
          />
          <Image
            src="/assets/hero/awan.gif"
            alt="Awan"
            width={200}
            height={200}
            className="absolute -bottom-6 sm:bottom-4 -left-10 sm:left-10 z-10"
          />
          <Image
            src="/assets/hero/matahari.gif"
            alt="Matahari"
            width={150}
            height={150}
            className="absolute -bottom-6 sm:-top-10 -left-10 sm:left-90 z-10"
          />
        </div>
      </div>
      <div className="font-sans flex justify-center items-center ">
        <span
          ref={aboutMeTextRef}
          onClick={handleGoToAboutMe}
          style={{
            cursor: "pointer",
            fontWeight: 600,
            color: isDarkMode ? "#6BBEC8" : "#4F91C9",
            userSelect: "none",
            transition: "color 0.2s",
          }}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") handleGoToAboutMe();
          }}
          aria-label="Go to about me section"
        >
          ⬐ Go to aboutme ⬎
        </span>
      </div>
    </div>
  );
}
