'use client';
import { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

const KonteksLenis = createContext(null);

/**
 * Menghaluskan gulir seluruh halaman, bukan cuma lompatan saat menekan tautan jangkar.
 *
 * Memakai Lenis, bukan GSAP ScrollSmoother. Bukan soal biaya - ScrollSmoother sudah
 * bebas biaya sejak GSAP 3.13 dan berkasnya sudah ada di node_modules. Alasannya
 * teknis: ScrollSmoother membungkus seluruh isi halaman lalu menggesernya dengan
 * `transform`, dan `transform` pada elemen leluhur membuat containing block baru
 * sehingga `position: fixed` ikut tergulir. Navigasi bawah di situs ini `fixed`.
 * Memakainya berarti membongkar susunan dua lapis di page.js yang baru saja dibangun
 * untuk membereskan geser mendatar, demi hasil visual yang sama.
 *
 * Lenis menggulir dokumen yang sebenarnya, jadi `fixed`, `sticky`, cari-di-halaman,
 * dan pemulihan posisi gulir tetap bekerja tanpa satu pun kompromi.
 *
 * Sentuhan sengaja dibiarkan memakai momentum bawaan sistem (`syncTouch` mati):
 * di ponsel, gulir buatan terasa lebih lambat daripada yang asli, bukan lebih halus.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Gulir buatan adalah pemicu vestibular yang umum. Kalau sistemnya minta gerakan
    // dikurangi, jangan dinyalakan sama sekali - dan ikuti kalau setelannya berubah.
    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)');

    let lenis = null;
    let frame = 0;

    const nyalakan = () => {
      if (lenis || kurangiGerak.matches) return;
      lenis = new Lenis({
        lerp: 0.1,
        duration: 1.1,
        syncTouch: false,
        wheelMultiplier: 1
      });
      lenisRef.current = lenis;
      const jalan = (waktu) => {
        lenis.raf(waktu);
        frame = requestAnimationFrame(jalan);
      };
      frame = requestAnimationFrame(jalan);
    };

    const matikan = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
      lenisRef.current = null;
    };

    if (kurangiGerak.matches) matikan();
    else nyalakan();

    const saatBerubah = () => (kurangiGerak.matches ? matikan() : nyalakan());
    kurangiGerak.addEventListener('change', saatBerubah);

    return () => {
      kurangiGerak.removeEventListener('change', saatBerubah);
      matikan();
    };
  }, []);

  return <KonteksLenis.Provider value={lenisRef}>{children}</KonteksLenis.Provider>;
}

/**
 * Menggulir ke sebuah bagian. Dipakai tombol Hero dan navigasi bawah.
 *
 * Kalau Lenis mati (setelan kurangi gerak, atau belum sempat terpasang), jatuh ke
 * `scrollIntoView` biasa - jadi tombolnya tidak pernah berhenti bekerja. Yang harus
 * dihindari justru memanggil keduanya sekaligus: dua mesin animasi yang memperebutkan
 * posisi gulir yang sama terasa patah-patah.
 */
export function useGulirKe() {
  const ref = useContext(KonteksLenis);

  return (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = ref?.current;
    if (lenis) lenis.scrollTo(target, { offset: -24 });
    else target.scrollIntoView({ behavior: 'smooth' });
  };
}
