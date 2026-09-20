'use client';
import { useTheme } from '@/context/ThemeContext';

/**
 * Pola judul dari rancangan Figma: bilah cyan 17x58 di kiri, lalu judulnya dipecah
 * dua baris yang BERTINGKAT - baris kedua digeser ~18px ke kanan, bukan rata kiri.
 * Dipakai lima kali di halaman ini, jadi disatukan supaya tidak melenceng satu sama lain.
 *
 * `label` dipakai saat pemenggalannya membelah satu kata ("Educa"/"tion"): yang terbaca
 * pembaca layar kata utuhnya, bukan potongannya.
 */
export default function SectionTitle({ baris1, baris2, label }) {
  const { colors } = useTheme();
  return (
    <div className="flex items-start gap-4">
      <div className="flex-none w-[17px] h-[58px]" style={{ backgroundColor: '#6bbec8' }}></div>
      <h2
        className="m-0 text-3xl md:text-4xl font-bold leading-[1.15] font-hero"
        style={{ color: colors.text, letterSpacing: '1.44px' }}
        aria-label={label || `${baris1} ${baris2}`}
      >
        <span className="block" aria-hidden="true">{baris1}</span>
        <span className="block ml-[18px]" aria-hidden="true">{baris2}</span>
      </h2>
    </div>
  );
}
