"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useGulirKe } from "@/components/providers/SmoothScroll";

// Awan dan matahari dulu GIF berukuran 5,6 MB dan 2,4 MB - keduanya dirender jauh
// lebih besar dari ukuran tampilnya (962px untuk tampil 200px). Sekarang WebP
// beranimasi seukuran tampil: 7,89 MB jadi 885 KB. VP9 sebenarnya sembilan kali
// lebih kecil lagi, tapi Safari tidak mendukung alfa di VP9 - awannya akan muncul
// di atas kotak hitam di semua Mac dan iPhone. `unoptimized` supaya Next tidak
// mencoba mengolah ulang berkas beranimasi.

// Sementara menunjuk LinkedIn karena belum ada berkas CV di public/. Begitu
// public/cv.pdf ada, cukup ganti baris ini jadi "/cv.pdf" - tidak ada tempat lain
// yang perlu disentuh. Jangan menunjuk berkas yang belum ada: tombol utama yang
// membuka 404 lebih buruk daripada tombol yang membuka profil LinkedIn.
const ALAMAT_CV = "https://linkedin.com/in/abhisuryanugroho";
import { gsap } from "gsap";

export default function Hero() {
  const { isDarkMode, colors } = useTheme();
  const gulirKe = useGulirKe();
  const heroRef = useRef(null);
  const aboutMeTextRef = useRef(null);

  // Animasi untuk hero section dan about me text.
  // Hero sengaja tetap beranimasi saat muat, bukan saat digulir - ia memang sudah
  // terlihat sejak halaman dibuka. Yang ditambahkan cuma penghormatan pada setelan
  // sistem: kalau pembaca minta gerakan dikurangi, semuanya langsung tampil utuh.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const isi = heroRef.current?.querySelectorAll('.hero-text, .hero-button, .hero-image');
      if (isi) gsap.set(isi, { opacity: 1, y: 0, scale: 1, rotation: 0 });
      gsap.set(heroRef.current, { opacity: 1, y: 0 });
      return;
    }
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

  const handleGoToAboutMe = () => gulirKe("aboutme");

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
            <a
              href={ALAMAT_CV}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button font-sans tracking-widest bg-[#6BBEC8] text-[#14161c] rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md px-6 sm:px-8 py-2 border-b-2 border-r-2 border-[#DDDDDD] text-sm sm:text-base transition-all duration-300 ease-out hover:bg-[#5AAEB9] hover:border-[#CCCCCC]"
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
            </a>
            <button
              type="button"
              onClick={() => gulirKe("projects")}
              className="hero-button font-sans tracking-widest bg-[#4F91C9] text-[#14161c] rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md px-6 sm:px-8 py-2 border-b-2 border-r-2 border-[#DDDDDD] text-sm sm:text-base transition-all duration-300 ease-out hover:bg-[#3E80B5] hover:border-[#CCCCCC]"
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

        {/* Bagian Gambar. Awan dan matahari ditempelkan ke FOTONYA, bukan ke kolomnya:
            sebelumnya matahari dipasang `left-90` (360px) dari tepi kolom, jadi letaknya
            ikut berubah setiap kali kolomnya melebar - di layar lebar ia mendarat tepat di
            wajah, dan di 1024px ia menyembul 38px keluar layar. */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative sm:-translate-y-16">
            <Image
              src="/assets/hero/profile.jpg"
              alt="Profile Hero Image"
              width={350}
              height={350}
              className="hero-image rounded-b-[60px] sm:rounded-b-[80px] object-cover relative z-10"
            />
            <Image
              src="/assets/hero/awan.webp"
              unoptimized
              alt=""
              aria-hidden="true"
              width={200}
              height={200}
              className="absolute z-20 -left-6 sm:-left-20 -bottom-8 sm:-bottom-10 w-[110px] sm:w-[200px] h-auto"
            />
            {/* Matahari sengaja tidak menjulur ke atas foto: kalau menjulur, bagian atas
                halaman harus diberi ruang kosong hanya demi dia, atau dia kena potong. */}
            <Image
              src="/assets/hero/matahari.webp"
              unoptimized
              alt=""
              aria-hidden="true"
              width={150}
              height={150}
              className="absolute z-20 -right-6 top-2 w-[80px] sm:w-[130px] h-auto"
            />
          </div>
        </div>
      </div>
      <div className="font-sans flex justify-center items-center pb-4">
        {/* Panah ⬐ dan ⬎ memang bagian dari tampilannya. Dibungkus <button>, bukan
            <span>, supaya bisa dicapai dan ditekan lewat papan ketik tanpa perlu
            menangani tombol Enter dan spasi sendiri. */}
        <button
          ref={aboutMeTextRef}
          onClick={handleGoToAboutMe}
          type="button"
          className="rounded-full px-4 py-2 font-semibold select-none transition-colors duration-200 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            color: isDarkMode ? "#6BBEC8" : "#4F91C9",
            outlineColor: isDarkMode ? "#6BBEC8" : "#4F91C9",
            letterSpacing: "1.5px"
          }}
        >
          ⬐ Go to aboutme ⬎
        </button>
      </div>
    </div>
  );
}
