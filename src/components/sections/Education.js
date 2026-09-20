'use client';
import { useTheme } from '@/context/ThemeContext';
import { useRef } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Education() {
  const { colors } = useTheme();
  const containerRef = useRef(null);

  const education = [
    {
      school: 'SMKN 40 JAKARTA',
      period: '2022 - 2025',
      department: 'Department of Information Technology - Software Engineering',
      location: 'Jakarta, Indonesia'
    }
  ];

  useRevealOnScroll(containerRef);

  return (
    <section id="education" className="py-16 px-6 md:px-12">
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 lg:gap-10 items-start"
      >
        <SectionTitle baris1="Educa" baris2="tion" label="Education" />

        <div className="space-y-6">
          {education.map((e) => (
            <div key={e.school} className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-8">
              <div className="min-w-0">
                <h3 className="m-0 text-base font-bold" style={{ color: colors.text }}>{e.school}</h3>
                <p className="m-0 mt-2 text-base leading-relaxed" style={{ color: colors.textSecondary }}>
                  {e.department}
                </p>
              </div>
              {/* Tanggal dan lokasi rata kanan, seperti di rancangan */}
              <div className="sm:text-right sm:flex-none">
                <p className="m-0 text-base font-bold" style={{ color: colors.text }}>{e.period}</p>
                <p className="m-0 mt-2 text-base" style={{ color: colors.textSecondary }}>{e.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
