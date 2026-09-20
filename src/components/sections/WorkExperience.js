'use client';
import { useTheme } from '@/context/ThemeContext';
import { useRef } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import SectionTitle from '@/components/ui/SectionTitle';

export default function WorkExperience() {
  const { colors } = useTheme();
  const containerRef = useRef(null);

  // Urutan dan tanggal mengikuti LinkedIn - itu sumber paling mutakhir, dan beberapa
  // tanggal di rancangan Figma sudah tidak cocok lagi dengan kenyataannya.
  // `foto` dibiarkan kosong sampai berkasnya ada; entri tanpa foto tetap rapi.
  const experiences = [
    {
      company: 'TPM Group',
      period: 'Sep 2025 - Present',
      position: 'IT Staff, Fullstack Developer',
      location: 'Jakarta Selatan, Indonesia',
      description:
        'Joined as an intern (Sep-Dec 2025) and stayed on as junior IT staff from January 2026. Builds and maintains internal web and mobile tools alongside day-to-day IT service support.',
      foto: []
    },
    {
      company: 'Poyangbi',
      period: 'Jun 2024 - May 2026',
      position: 'Administrative Assistant & Documentation (Freelance)',
      location: 'Bekasi, Indonesia',
      description:
        'Supported Qurban, Aqiqah, and Nazar operations for Sohibul Qurban beneficiaries in Singapore, focused on automation and data management. Designed and implemented Google Apps Script tooling for the workflow.',
      foto: []
    },
    {
      company: 'Perhimpunan Pecinta Hitam Putih (P2HP)',
      period: 'May 2025 - Sep 2025',
      position: 'Full Stack Developer & Digital Operations Support (Freelance)',
      location: 'Jakarta, Indonesia',
      description:
        'Led full-cycle mobile app development for a grassroots community initiative - UI/UX, build, and deployment - while running digital operations: product copywriting, marketplace listings on Tokopedia and Shopee, and live-stream setup.',
      foto: []
    },
    {
      company: 'PT Denso Indonesia',
      period: 'Oct 2024 - Mar 2025',
      position: 'Fullstack Developer Internship - PE Dev (Digitalization)',
      location: 'Bekasi, Indonesia',
      description:
        'Worked in the Production Engineering team on web and mobile applications supporting logistics and the digitalization of work processes, including Arduino-based barcode monitoring.',
      foto: []
    }
  ];

  useRevealOnScroll(containerRef);

  return (
    <section id="work" className="py-16 px-6 md:px-12">
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 lg:gap-10 items-start"
      >
        <SectionTitle baris1="Work" baris2="Experience" />

        <div className="space-y-10">
          {experiences.map((e) => (
            <div key={e.company}>
              {/* Di rancangan, foto kegiatan berdiri di ATAS tiap entri. Belum ada
                  berkasnya, jadi barisnya hanya muncul kalau fotonya memang ada. */}
              {e.foto.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {e.foto.map((src) => (
                    <div key={src} className="relative w-[150px] h-[100px] overflow-hidden rounded">
                      <img
                        src={src}
                        alt={`${e.company} workplace`}
                        className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-8">
                <div className="min-w-0">
                  <h3 className="m-0 text-base font-bold" style={{ color: colors.text }}>{e.company}</h3>
                  <p className="m-0 mt-2 text-base leading-relaxed" style={{ color: colors.textSecondary }}>
                    {e.position}
                  </p>
                </div>
                <div className="sm:text-right sm:flex-none">
                  <p className="m-0 text-base font-bold" style={{ color: colors.text }}>{e.period}</p>
                  <p className="m-0 mt-2 text-base" style={{ color: colors.textSecondary }}>{e.location}</p>
                </div>
              </div>

              <p className="m-0 mt-3 text-base leading-relaxed" style={{ color: colors.textSecondary }}>
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
