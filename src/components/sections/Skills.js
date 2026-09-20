'use client';
import { useTheme } from '@/context/ThemeContext';
import { useRef } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Skills() {
  const { colors } = useTheme();
  const containerRef = useRef(null);

  // Di rancangan ini daftar berpoin, bukan deretan chip: label tebal lalu teknologinya
  // dipisah koma. Chip membuatnya terbaca seperti tag cloud dan memakan tiga kali ruang.
  const skillCategories = [
    {
      title: 'Full-Stack Development',
      skills: [
        'React', 'Next.js', 'React Native', 'Flutter', 'PHP',
        'Laravel', 'Python', 'Express.js', 'MySQL',
        'SQL Server', 'RESTful APIs', 'Git/GitHub'
      ]
    },
    {
      title: 'UI/UX & Interactions',
      skills: [
        'GSAP', 'Three.js', 'accessibility-first design',
        'prototyping', 'micro-interactions', 'UI sketching'
      ]
    }
  ];

  useRevealOnScroll(containerRef);

  return (
    <section id="skills" className="py-16 px-6 md:px-12">
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 lg:gap-10 items-start"
      >
        <SectionTitle baris1="Skill" baris2="Sets" />

        <ul className="list-disc ps-6 space-y-5 m-0" style={{ color: colors.textSecondary }}>
          {skillCategories.map((kategori) => (
            <li key={kategori.title} className="text-base leading-relaxed">
              <strong className="font-bold" style={{ color: colors.text }}>
                {kategori.title}
              </strong>
              : {kategori.skills.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
