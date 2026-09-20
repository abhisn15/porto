'use client';
import { useTheme } from '@/context/ThemeContext';
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useTilt } from '@/hooks/useTilt';
import SectionTitle from '@/components/ui/SectionTitle';
import RuangAgen, { AntrianVideo } from '@/components/pipeline/RuangAgen';

// Kartu tanpa `link` sengaja tidak menampilkan tombol — lebih baik tidak ada tombol
// daripada tombol yang diklik tapi tidak ke mana-mana.
const projects = [
  {
    title: "FixBeli ID — Automated Content Pipeline",
    date: "2026",
    description: "Turns a product link into a finished vertical video on its own: AI writes the script through a five-provider fallback chain, a local LLM picks matching stock footage, FFmpeg renders it, and uploads are scheduled to YouTube and Facebook — all driven from a custom Android app.",
    technologies: ["Python", "FFmpeg", "Ollama", "YouTube Data API", "Android"],
    accent: "#2ecc8f",
    link: "https://abhisn15.github.io/katalog/",
    type: "Live catalog",
    // Kartu ini tidak memakai sampul biasa: ia menampilkan keadaan pipeline yang
    // sebenarnya, dibaca dari public/data/pipeline.json.
    scene: "pipeline"
  },
  {
    title: "Community Profile",
    date: "May 2025",
    description: "Community website for Perhimpunan Pecinta Hitam Putih (P2HP) covering agenda, news, and gallery.",
    technologies: ["HTML", "Tailwind CSS", "PHP", "Javascript", "MySQL"],
    accent: "#4F91C9",
    link: "https://www.p2hpkacermania.com/",
    type: "Website"
  },
  {
    title: "P2HP Mobile App",
    date: "May – Sep 2025",
    description: "Community mobile app for P2HP with agenda, news, and gallery, built alongside the web platform. Shipped to Google Play; the listing is no longer active.",
    technologies: ["React Native", "Firebase", "Node.js"],
    accent: "#FF69B4",
    link: "",
    type: "Play Store"
  }
];

/**
 * Satu kartu proyek. Dipisah jadi komponen sendiri karena `useTilt` sebuah hook, dan
 * hook tidak boleh dipanggil di dalam perulangan.
 */
function KartuProyek({ project }) {
  const { isDarkMode, colors } = useTheme();
  const [disorot, setDisorot] = useState(false);
  // Kemiringan menggantikan pembesaran yang dulu dipasang lewat gsap di `onMouseEnter`.
  // Dua-duanya menulis ke properti `transform` yang sama, jadi kalau dibiarkan hidup
  // berdampingan mereka akan saling menimpa.
  const tiltRef = useTilt({ sudut: 6, skala: 1.02 });

  return (
    <div
      ref={tiltRef}
      className="project-card relative rounded-lg border overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setDisorot(true)}
      onMouseLeave={() => setDisorot(false)}
      style={{
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
        borderColor: disorot
          ? colors.cyan
          : isDarkMode
            ? 'rgba(255,255,255,0.2)'
            : 'rgba(0,0,0,0.1)'
      }}
    >
      {/* Kilau yang pusatnya mengikuti kursor. Dibiarkan kosong sampai `useTilt`
          mengisinya, supaya di layar sentuh ia benar-benar tidak melakukan apa pun. */}
      <div
        data-kilau
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0"
      />

      {/* Sampul. Kartu berscene menampilkan peragaannya sendiri; sisanya pakai gambar
          kalau ada, kalau tidak kanvas warna supaya tiap kartu tetap punya identitas. */}
      <div
        className={`${project.scene ? 'h-64' : 'h-48'} relative overflow-hidden flex items-end p-5`}
        style={{
          background: project.image
            ? undefined
            : `linear-gradient(135deg, ${project.accent}22, ${project.accent}05), ${isDarkMode ? '#141822' : '#eef2f7'}`
        }}
      >
        {project.scene === 'pipeline' ? (
          <div className="absolute inset-0 p-2">
            <RuangAgen />
          </div>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${project.accent}55 0 2px, transparent 2px 12px)`
              }}
            ></div>
            <span
              className="relative text-2xl font-bold leading-tight"
              style={{ color: project.accent }}
            >
              {project.title.split(' — ')[0]}
            </span>
          </>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>
            {project.title}
          </h3>
          <span
            className="text-sm px-2 py-1 rounded whitespace-nowrap"
            style={{
              // Cyan di atas cyan pudar hanya 1,22 : 1 di mode terang — praktis hilang.
              // Latarnya tetap, tintanya yang menyesuaikan tema.
              backgroundColor: colors.cyan + '20',
              color: isDarkMode ? colors.cyan : '#0F6B78'
            }}
          >
            {project.date}
          </span>
        </div>

        <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
          {project.description}
        </p>

        {project.scene === 'pipeline' ? <AntrianVideo /> : null}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
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

        {/* Tautan — hanya muncul kalau alamatnya memang ada */}
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 inline-block px-4 py-2 rounded text-sm font-medium transition-all duration-300"
            style={{
              // Dulu tertulis `isDarkMode ? '#000' : '#fff'`, padahal latarnya cyan terang
              // di KEDUA mode. Mode gelap kebagian 16,7 : 1 dan mode terang 1,25 : 1 —
              // tulisannya praktis tidak terlihat. Latar terang selalu minta tinta gelap.
              backgroundColor: colors.cyan,
              color: '#14161c'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' });
            }}
          >
            {project.type}
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function LatestProjects() {
  const containerRef = useRef(null);

  // Kartunya dulu masuk dari `scale: 0` dengan `back.out(1.7)` - gerakan demo bawaan GSAP,
  // dan di halaman yang justru dinilai kemampuannya itu sinyal yang salah. Untuk bagian
  // yang isinya bukti kerja, nada yang benar adalah tenang: naik sedikit, satu per satu.
  useRevealOnScroll(containerRef, { anak: '.project-card', y: 24, durasi: 0.6, stagger: 0.08 });

  return (
    <section id="projects" className="py-20 px-6 md:px-12">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Judul memakai pola yang sama dengan bagian lain: bilah cyan + dua baris bertingkat */}
          <div>
            <SectionTitle baris1="Latest" baris2="Projects" />
          </div>

          <div className="space-y-6">
            {projects.map((project) => (
              <KartuProyek key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
