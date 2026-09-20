'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Memunculkan sebuah bagian saat ia benar-benar masuk layar.
 *
 * Sebelumnya tiap bagian memanggil `gsap.fromTo(...)` langsung di dalam
 * `useEffect(..., [])` - artinya saat komponen dipasang, yaitu saat halaman pertama
 * dimuat, semuanya berbarengan. Animasi untuk Skills, Education, Achievements, Work
 * Experience, Latest Projects, dan Footer sudah selesai berjalan sebelum pembaca
 * menggulir satu piksel pun; yang mereka lihat saat tiba di sana cuma konten diam.
 * Halaman ini punya enam animasi dan nol di antaranya pernah dilihat orang.
 *
 * `once: true` disengaja: animasi yang mengulang setiap kali bagiannya dilewati terasa
 * seperti halaman yang gelisah, bukan halaman yang rapi.
 *
 * @param {object}  ref        ref ke elemen pembungkus bagian itu
 * @param {string}  [anak]     pemilih untuk menganimasikan anak-anaknya satu per satu
 * @param {number}  [y]        jarak naik, dalam piksel
 * @param {number}  [stagger]  jeda antar anak
 * @param {string}  [mulai]    ambang ScrollTrigger
 */
export function useRevealOnScroll(ref, { anak, y = 40, durasi = 0.9, stagger = 0.08, mulai = 'top 85%' } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = anak ? el.querySelectorAll(anak) : el;
    if (!target || (target.length === 0 && anak)) return;

    // Gerakan besar yang dipicu gulir adalah pemicu vestibular yang paling umum.
    // Kalau sistemnya minta gerakan dikurangi, langsung tampilkan keadaan akhirnya.
    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (kurangiGerak.matches) {
      gsap.set(target, { opacity: 1, y: 0, scale: 1, clearProps: 'transform' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: durasi,
          stagger: anak ? stagger : 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: mulai, once: true }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, anak, y, durasi, stagger, mulai]);
}

/**
 * Foto-foto kolase dan gambar proyek dimuat belakangan dan mengubah tinggi halaman,
 * sementara ScrollTrigger menghitung ambangnya dari tinggi saat itu. Tanpa perhitungan
 * ulang, bagian bawah halaman bisa terlewat ambangnya dan tidak pernah muncul.
 */
export function useRefreshTriggersAfterLoad() {
  useEffect(() => {
    const segarkan = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') segarkan();
    else window.addEventListener('load', segarkan);

    const gambar = [...document.images].filter((i) => !i.complete);
    gambar.forEach((i) => {
      i.addEventListener('load', segarkan);
      i.addEventListener('error', segarkan);
    });

    return () => {
      window.removeEventListener('load', segarkan);
      gambar.forEach((i) => {
        i.removeEventListener('load', segarkan);
        i.removeEventListener('error', segarkan);
      });
    };
  }, []);
}
