'use client';
import KantorFixBeli from '@/components/kantor/KantorFixBeli';

// Halaman tersendiri supaya peragaannya bisa dikerjakan dan dilihat utuh tanpa
// menunggu project takeover jadi. Nanti komponennya dipakai ulang di dalam takeover.
export default function HalamanKantor() {
  return (
    <main className="min-h-screen py-10">
      <KantorFixBeli />
    </main>
  );
}
