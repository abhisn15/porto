'use client';
import React, { useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

/**
 * Salinan tata letak Figma (node 234:17). Semua angka satuan piksel PERSIS seperti di
 * rancangan, diubah jadi persen terhadap kanvas 1280x861 supaya proporsinya tetap sama
 * di lebar layar mana pun.
 *
 * Struktur tiap foto mengikuti Figma: sebuah KOTAK berukuran tetap (yang membawa bayangan
 * cyan) berisi gambar yang dipotong mengisi kotak itu. Versi sebelumnya cuma menyetel lebar
 * dan membiarkan tingginya mengikuti gambar asli — itu sebabnya semua foto melar.
 */
const FRAME_W = 1280;   // lebar kanvas node Aboutme di Figma
const SECTION_Y = 572;
const SECTION_H = 861;  // tinggi node Aboutme di Figma

const px = (v) => `${(v / FRAME_W) * 100}%`;            // jarak/lebar mendatar
const py = (v) => `${((v - SECTION_Y) / SECTION_H) * 100}%`; // jarak dari atas bagian ini
const ph = (v) => `${(v / SECTION_H) * 100}%`;          // tinggi
const cq = (v) => `${(v / FRAME_W) * 100}cqw`;          // ukuran teks ikut menyusut

// Foto tegak: kotaknya langsung diposisikan dari sudut kiri-atas.
const TEGAK = [
  { id: 'jaket', src: '/assets/about/jaket.png', alt: 'Abhi in a black jacket, looking down', x: 78, y: 581, w: 593, h: 835, z: 4 },
  { id: 'duduk', src: '/assets/about/duduk.png', alt: 'Abhi sitting with a tote bag', x: -4, y: 716, w: 450, h: 240, z: 9 },
  { id: 'kucing', src: '/assets/about/kucing.png', alt: 'Abhi cat', x: 1066.98, y: 903, w: 197.746, h: 322.007, z: 10 },
  // Berkas foto ini SUDAH diputar dan glow cyan-nya sudah menyatu di dalamnya, jadi ia
  // tidak boleh diputar lagi lewat kode. Dulu ia dipasang sebagai foto berotasi: gambarnya
  // dikecilkan dulu ke 228x147 lalu diputar 71.65deg di atas rotasi yang sudah ada -
  // hasilnya mengerut jadi sepertiga ukuran sambil miring ke arah yang salah.
  //
  // Kotaknya sendiri sudah benar sejak awal: 211x263 adalah kotak pembatas SESUDAH rotasi,
  // dan karena rotasinya sudah ada di dalam berkas, kotak itulah ukuran yang tepat.
  // Bagian tembok abu di atasnya memang ada di rancangan, cuma tertutup foto kucing.
  { id: 'rebah', src: '/assets/about/rebah.png', alt: 'Candid photo of Abhi', x: 1064.74, y: 1000, w: 211.405, h: 263.315, z: 7, rot: 4 },
  // Foto ini diputar di rancangan, dan metadata Figma memberi titik SEBELUM rotasi: x-nya
  // ditulis 427.6 padahal aslinya 338 - meleset 89px ke kanan, yang bikin fotonya duduk di
  // atas kolom teks. Gambarnya juga tidak mengisi penuh kotak pembatas 229x292 itu, jadi
  // dipasang apa adanya ia membesar sekitar satu setengah kali. Yang dipakai sekarang
  // render nodenya (sudah memuat rotasi dan glow cyan-nya, latar kanvas Figma dilepas lewat
  // un-composite), dan letaknya dicari dengan mencocokkan render itu ke gambar rancangan -
  // ketemu di 332,572 dengan selisih 6 dari 255, sementara geser satu piksel saja melonjak
  // ke 16. Angka inilah yang dipercaya, bukan metadatanya.
  //
  // Namanya -render, bukan kaos.png, karena isi berkas itu sempat diganti dua kali sementara
  // namanya tetap - peramban terus menyajikan yang lama dan fotonya terlihat gepeng tanpa glow.
  {
    id: 'kaos', src: '/assets/about/kaos-render.png', alt: 'Abhi in a black graphic tee',
    x: 332, y: 572, w: 242, h: 301, z: 8
  }
];

// Foto yang diputar: Figma membungkusnya dua lapis — kotak penempatan, lalu kotak
// bergambar yang diputar di tengahnya. Ditiru apa adanya, karena kalau rotasi ditempel
// langsung ke kotak penempatan, posisinya melenceng.
const DIPUTAR = [
  { id: 'sertifikat', src: '/assets/about/sertifikat.png', alt: 'Abhi holding a competition certificate', x: 23, y: 604, bw: 141.96, bh: 339.138, w: 132.723, h: 335.594, rot: 1.59, z: 1 },
  { id: 'piala', src: '/assets/about/piala.png', alt: 'Abhi holding a third-place trophy', x: 1042, y: 573, bw: 199.838, bh: 383.839, w: 159.896, h: 368.353, rot: -6.38, z: 5 },
  { id: 'potret', src: '/assets/about/potret.png', alt: 'Close-up portrait of Abhi', x: 1075, y: 684, bw: 267.544, bh: 286.495, w: 258.88, h: 278.459, rot: -1.81, z: 6 }
];

const AboutMe = () => {
  const { colors } = useTheme();
  const containerRef = useRef(null);

  useRevealOnScroll(containerRef);

  const teks = [
    <>
      I am a passionate Full-Stack Developer dedicated to crafting accessible, pixel-perfect interfaces while
      blending thoughtful design with robust engineering. I thrive at the intersection of design and
      development&mdash;building products that are not only visually appealing but also reliable, fast, and
      user-friendly.
    </>,
    <>
      I work across web and mobile development with technologies such as React, React Native, Next.js, Flutter,
      PHP, Laravel, Python, Express.js, MySQL, and SQL Server&mdash;always focusing on performance, usability,
      and clean, maintainable code.
    </>,
    <>
      I support digital operations and have built applications for the{' '}
      <strong className="font-bold">Perhimpunan Pecinta Hitam Putih (P2HP)</strong>, alongside an internship as a
      PE-Developer (Digitalization) at <strong className="font-bold">PT. Denso Indonesia</strong>, where I
      developed logistics tools, optimized backend workflows, and integrated Arduino barcode monitoring.
      I&rsquo;ve also launched projects such as Cloubee (donation platform), EduSafe (a homework discussion app for students), and
      contributed backend improvements for StockoutApp.
    </>,
    <>
      Recently, I&rsquo;ve been exploring interactive 3D experiences and polished transitions using GSAP and
      Three.js. Outside of work, I enjoy sketching UI ideas, testing micro-interactions, and refining animations
      in VS Code&mdash;because the little details matter.
    </>
  ];

  // object-contain, bukan cover: foto ini cutout dengan latar tembus pandang, jadi
  // bentuknya harus utuh, tidak boleh dipotong mengikuti kotak.
  const gambar = 'absolute inset-0 w-full h-full object-contain object-bottom select-none pointer-events-none';

  return (
    <section id="aboutme" className="relative overflow-hidden">
      {/* ===== Layar lebar: salinan tata letak Figma ===== */}
      <div
        ref={containerRef}
        className="hidden lg:block relative w-full"
        style={{ aspectRatio: `${FRAME_W} / ${SECTION_H}`, containerType: 'inline-size' }}
      >
        {TEGAK.map((f) => (
          <div
            key={f.id}
            className="absolute"
            style={{
              left: px(f.x), top: py(f.y), width: px(f.w), height: ph(f.h), zIndex: f.z,
              ...(f.rot ? { transform: `rotate(${f.rot}deg)` } : {})
            }}
          >
            <img src={f.src} alt={f.alt} className={gambar} draggable="false" />
          </div>
        ))}

        {/* Wajah nunduk, di kiri bawah */}
        <div
          className="absolute"
          style={{ left: px(-63), top: py(919), width: px(325), height: ph(475), zIndex: 2 }}
        >
          <img src="/assets/about/closeup.png" alt="Abhi looking down" className={gambar} draggable="false" />
        </div>

        {DIPUTAR.map((f) => (
          <div
            key={f.id}
            className="absolute flex items-center justify-center"
            style={{ left: px(f.x), top: py(f.y), width: px(f.bw), height: ph(f.bh), zIndex: f.z }}
          >
            <div
              className="relative flex-none"
              style={{ width: `${(f.w / f.bw) * 100}%`, height: `${(f.h / f.bh) * 100}%`, transform: `rotate(${f.rot}deg)` }}
            >
              <img src={f.src} alt={f.alt} className={gambar} draggable="false" />
            </div>
          </div>
        ))}

        {/* Judul: "About" dan "Me" memang bertingkat di rancangan, bukan rata kiri */}
        <div
          className="absolute"
          style={{ left: px(126), top: py(659), width: px(17), height: ph(57), backgroundColor: '#6bbec8', zIndex: 11 }}
        ></div>
        <h2
          className="absolute font-bold m-0 whitespace-nowrap"
          style={{ color: colors.text, left: px(168), top: py(677), fontSize: cq(36), letterSpacing: cq(1.44), transform: 'translateY(-50%)', zIndex: 11 }}
        >
          About
        </h2>
        <span
          className="absolute font-bold whitespace-nowrap"
          style={{ color: colors.text, left: px(236), top: py(706.5), fontSize: cq(36), letterSpacing: cq(1.44), transform: 'translateY(-50%)', zIndex: 11 }}
        >
          Me
        </span>

        {/* Label miring "# Fullstack Developer" (node 260:28), dipasang sebagai satu
            gambar. Bentuknya bukan kotak berisi teks melainkan hamburan butiran putih
            dan cyan - efek tekstur Figma yang tidak punya padanan di CSS. Dicoba dulu
            dengan dua persegi CSS (teksnya jadi keluar kotak), lalu dengan SVG-nya
            (feTurbulence jauh lebih ganas di Chrome sampai bentuknya habis). Yang
            dipakai render PNG-nya dengan latar kanvas Figma dilepas lewat un-composite.
            Kemiringan 15.06deg sudah ada di dalam gambar. Kotaknya 202x100 karena
            efeknya melebar ~5.8px mendatar dan ~7.7px tegak dari kotak nodenya. */}
        <div
          className="absolute"
          style={{ left: px(334.92), top: py(777.07), width: cq(202), height: cq(100), zIndex: 9 }}
        >
          <img
            src="/assets/about/label.png"
            alt="# Fullstack Developer"
            draggable="false"
            className="w-full h-full select-none pointer-events-none"
          />
        </div>

        {/* Paragraf di kanan */}
        <div
          className="absolute flex flex-col"
          style={{
            color: colors.text,
            left: px(523),
            top: py(984),
            width: px(533),
            transform: 'translateY(-50%)',
            fontSize: cq(16),
            letterSpacing: cq(1.76),
            gap: cq(16),
            zIndex: 11
          }}
        >
          {teks.map((isi, i) => (
            <p key={i} className="m-0 leading-normal">{isi}</p>
          ))}
        </div>
      </div>

      {/* ===== Layar kecil: kolase absolut tidak muat, jadi ditumpuk rapi ===== */}
      <div className="lg:hidden px-6 py-16 max-w-2xl mx-auto">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-1.5 h-12 mt-1" style={{ backgroundColor: '#6bbec8' }}></div>
          <h2 className="text-4xl font-bold m-0" style={{ color: colors.text }}>
            About
            <br />
            Me
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {['f-sertifikat', 'f-me1', 'f-desain1'].map((nama) => (
            <div key={nama} className="relative w-full" style={{ aspectRatio: '3 / 4' }}>
              <img src={`/assets/about/${nama}.png`} alt="" className={gambar} draggable="false" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {teks.map((isi, i) => (
            <p key={i} className="text-base leading-relaxed m-0" style={{ color: colors.textSecondary }}>
              {isi}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
