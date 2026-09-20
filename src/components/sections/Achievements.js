'use client';
import { useTheme } from '@/context/ThemeContext';
import { useRef } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Achievements() {
  const { colors } = useTheme();
  const containerRef = useRef(null);

  const achievements = [
    // Tanggal dan nama mengikuti CV: lombanya April 2024 (bukan Agustus), aplikasinya
    // EduSafe (bukan BicaraKita), dan AWS-nya Januari 2024 (bukan Maret).
    {
      title: 'LKS IT Solution, East Jakarta City Level',
      date: 'April 2024',
      description:
        '3rd place with EduSafe, a Flutter app that lets students discuss their homework with each other, backed by Laravel and an ERD-based database design.',
      location: 'Jakarta, Indonesia'
    },
    {
      title: 'AWS Sagasitas Cloud Computing Club Competition, DKI Jakarta Province Level',
      date: 'January 2024',
      description: 'Grand finalist with Cloubee, a donation site that points people to verified charities.',
      location: 'Jakarta, Indonesia'
    }
  ];

  useRevealOnScroll(containerRef);

  return (
    <section id="achievements" className="py-16 px-6 md:px-12">
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 lg:gap-10 items-start"
      >
        <SectionTitle baris1="Achieve" baris2="ments" label="Achievements" />

        <div className="space-y-8">
          {achievements.map((a) => (
            <div key={a.title} className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-8">
              <div className="min-w-0">
                <h3 className="m-0 text-base font-bold" style={{ color: colors.text }}>{a.title}</h3>
                <p className="m-0 mt-2 text-base leading-relaxed" style={{ color: colors.textSecondary }}>
                  {a.description}
                </p>
              </div>
              <div className="sm:text-right sm:flex-none">
                <p className="m-0 text-base font-bold" style={{ color: colors.text }}>{a.date}</p>
                <p className="m-0 mt-2 text-base" style={{ color: colors.textSecondary }}>{a.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
