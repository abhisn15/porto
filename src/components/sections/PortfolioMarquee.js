'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Pita bergulir, disalin dari Figma (node 226:41 "Marque Porto").
 *
 * Angka aslinya pada kanvas 1280: frame setinggi 347, pita 1325x121 diputar -2.71deg
 * sehingga kotak pembatasnya 1329x183.6 dan mulai 138.7 dari atas frame. Teks
 * "PORTOFOLIO" 64px Baloo Regular diputar -2.62deg dengan jarak antarhuruf 3.2px, dan
 * pemisahnya BUKAN bullet yang menempel di teks melainkan titik tersendiri.
 *
 * Dua hal yang dulu meleset dan sekarang dipatok dari angka rancangan:
 *
 * 1. Tebal pita. SVG-nya punya viewBox setinggi 231, tapi dulu dipasang setinggi
 *    section (347) dengan preserveAspectRatio none -- vertikalnya melar 1.5x, jadi
 *    pitanya tampak jauh lebih tebal dari hurufnya. Sekarang tingginya dipatok
 *    sk(230) supaya satu satuan viewBox = satu piksel rancangan.
 *
 * 2. Jarak antar kata. Diukur dari gambar rancangannya: kata selebar 397px berulang
 *    tiap 451px, jadi celahnya 54px -- titik 28px plus dua sela 14px yang TERLIHAT.
 *    Selanya ditulis 7px karena huruf punya sisi kosong bawaan dan letter-spacing masih
 *    menambah satu sela sesudah huruf terakhir. Dulu selanya 40px, celahnya 102px.
 *
 * 3. Fontnya. Rancangan memakai "Baloo" yang asli, bukan "Baloo 2" yang dimuat situs
 *    ini -- Baloo lama jauh lebih gemuk, jadi versi lama tampak kurus dan kekecilan.
 *    Yang paling mendekati: Baloo 2 Bold 63px, yang menghasilkan tinggi huruf 40px dan
 *    kata selebar 397.5px -- rancangannya 40px dan 397px.
 *
 * Satu lagi yang perlu diingat saat membaca angka Figma: untuk node yang diputar,
 * metadata memberi titik SEBELUM rotasi sementara ukurannya sesudah rotasi. Posisi
 * pita di bawah ini karena itu diambil dari gambar rancangannya, bukan dari metadata.
 */
const SUDUT_PITA = -2.71373;
const SUDUT_TEKS = -2.62;
const FRAME_W = 1280;   // lebar kanvas rancangan
const MAKS = 1920;      // batas lebar halaman - di atas ini ukuran berhenti tumbuh

// Pitanya membentang selebar layar, tapi ukurannya berhenti tumbuh di 1920 - sama dengan
// batas pembungkus halaman. Angka ini harus sama dengan max-w di page.js: kalau pita
// berhenti lebih awal (dulu 1440), di layar lebar ia mengecil sendiri sementara bagian
// About Me terus membesar, dan keduanya jadi tidak sebanding.
const sk = (v) => {
  const persen = (v / FRAME_W) * 100;
  const maks = (v / FRAME_W) * MAKS;
  const min = (v / FRAME_W) * 380;
  return `clamp(${min.toFixed(2)}px, ${persen.toFixed(3)}vw, ${maks.toFixed(2)}px)`;
};

export default function PortfolioMarquee() {
  const innerRef = useRef(null);

  useEffect(() => {
    let ctx;
    if (innerRef.current) {
      const lebarSatuSet = innerRef.current.scrollWidth / 2;
      gsap.set(innerRef.current, { x: 0 });
      ctx = gsap.context(() => {
        gsap.to(innerRef.current, {
          x: -lebarSatuSet,
          duration: 40,
          ease: 'linear',
          repeat: -1,
          modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % -lebarSatuSet) }
        });
      }, innerRef);
      return () => {
        if (ctx) ctx.revert();
      };
    }
  }, []);

  const satuUnit = (kunci) => (
    <span key={kunci} className="flex items-center flex-none" style={{ gap: sk(7) }}>
      {/* titik pemisah - di rancangan ini elemen sendiri, bukan bagian dari teks */}
      <span
        className="flex-none rounded-full bg-black"
        style={{ width: sk(28), height: sk(28) }}
      ></span>
      <span
        className="text-black whitespace-nowrap"
        style={{
          fontFamily: '"Baloo 2", sans-serif', fontWeight: 700,
          fontSize: sk(63), letterSpacing: sk(3.2), lineHeight: 1
        }}
      >
        PORTOFOLIO
      </span>
    </span>
  );

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden"
      style={{
        // Menembus batas lebar halaman supaya pita menyentuh kedua tepi layar. Lebihnya
        // dipotong oleh pembungkus ber-overflow-x clip di page.js, jadi tidak bisa digeser.
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        // Di rancangan, frame pita (y 1233) mulai SEBELUM bagian About Me habis (y 1433) -
        // keduanya tumpang tindih 200px. Section di web ditumpuk berurutan, jadi tanpa ini
        // pitanya turun 200px dan menyisakan ruang kosong yang tidak ada di rancangan.
        marginTop: `calc(0px - ${sk(200)})`,
        height: sk(347)
      }}
    >
      {/* viewBox dipasang persis sebesar kotak filternya, dan tingginya ikut skala
          rancangan - bukan tinggi section - supaya tebal pita tidak ikut melar. Lebarnya
          sengaja 106% agar ujung yang terangkat karena rotasi tetap lewat dari tepi. */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: sk(52.81), left: '-3%', width: '106%', height: sk(230.001), zIndex: 0 }}
      >
        <svg
          viewBox="-34.2 0.8 1375.71 230.001"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          <g filter="url(#filter0_dg_226_42)">
            <rect
              x="-11"
              y="86.7365"
              width="1325.07"
              height="121"
              transform={`rotate(${SUDUT_PITA} -11 86.7365)`}
              fill="#C9C9C9"
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
              <feTurbulence type="fractalNoise" baseFrequency="0.08196721225976944 0.08196721225976944" numOctaves="3" seed="2999"/>
              <feDisplacementMap in="shape" scale="46.400001525878906" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%"/>
              <feMerge result="effect2_texture_226_42">
                <feMergeNode in="displacedImage"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Teks memakai sudutnya sendiri (-2.62), sedikit berbeda dari pita - memang begitu
          di rancangan, dan perbedaan tipis itu yang membuatnya terasa ditempel tangan.
          Duduk di garis tengah pita, yaitu 230.5 dari atas frame. */}
      <div
        className="absolute inset-x-0 overflow-hidden"
        style={{ top: sk(163.8), transform: `translateY(-50%) rotate(${SUDUT_TEKS}deg)`, zIndex: 1 }}
      >
        <div ref={innerRef} className="flex items-center whitespace-nowrap" style={{ willChange: 'transform', gap: sk(7) }}>
          {[...Array(2)].map((_, set) => [...Array(6)].map((_, i) => satuUnit(`${set}-${i}`)))}
        </div>
      </div>
    </section>
  );
}
