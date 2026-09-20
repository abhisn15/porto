'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Membuat sebuah kartu miring mengikuti kursor, lengkap dengan kilau yang pusatnya
 * ikut bergerak. CSS 3D biasa - tidak ada WebGL, tidak ada pustaka tambahan.
 *
 * Tiga hal yang membuatnya tidak terasa murahan:
 *
 * 1. `gsap.quickTo`, bukan `gsap.to` per gerakan tetikus. `quickTo` mendaur ulang satu
 *    tween yang sama; `gsap.to` membuat tween baru tiap kejadian, dan pada tetikus
 *    120 Hz itu berarti ratusan tween per detik yang saling menimpa.
 * 2. Sudutnya kecil (8 derajat). Kemiringan besar terbaca sebagai efek demo.
 * 3. Kilaunya ikut arah miring, jadi cahayanya terasa datang dari satu tempat.
 *
 * Di layar sentuh tidak ada satu baris pun yang dijalankan: tanpa kursor, efek ini
 * tidak punya arti, dan pendengar kejadian yang menganggur tetap memakan baterai.
 */
export function useTilt({ sudut = 8, skala = 1.02 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const adaKursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!adaKursor || kurangiGerak) return;

    const kilau = el.querySelector('[data-kilau]');

    const keX = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const keY = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const keSkala = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power3.out' });

    const bergerak = (e) => {
      const r = el.getBoundingClientRect();
      // -0.5 .. 0.5 dari titik tengah kartu
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      keX(px * sudut * 2);
      keY(-py * sudut * 2);
      if (kilau) {
        gsap.set(kilau, {
          opacity: 1,
          background: `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.10), transparent 55%)`
        });
      }
    };

    const masuk = () => keSkala(skala);
    const keluar = () => {
      keX(0);
      keY(0);
      keSkala(1);
      if (kilau) gsap.to(kilau, { opacity: 0, duration: 0.4 });
    };

    gsap.set(el, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
    el.addEventListener('pointerenter', masuk);
    el.addEventListener('pointermove', bergerak);
    el.addEventListener('pointerleave', keluar);

    return () => {
      el.removeEventListener('pointerenter', masuk);
      el.removeEventListener('pointermove', bergerak);
      el.removeEventListener('pointerleave', keluar);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [sudut, skala]);

  return ref;
}
