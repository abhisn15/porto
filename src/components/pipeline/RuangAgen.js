'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Ruang kerja para agen FixBeli, digambar dari keadaan pipeline yang sebenarnya.
 *
 * Datanya dari `public/data/pipeline.json`, hasil ekspor `ekspor_snapshot.py` di repo
 * video-affiliate. Tidak ada sambungan langsung ke pipeline-nya: ia jalan di laptop dan
 * memang sengaja hanya dinyalakan saat mau bikin video, jadi yang ditampilkan keadaan
 * terakhir beserta kapan itu terjadi. Agen yang sedang diam adalah keadaan yang benar.
 *
 * Semua yang hidup di sini elemen DOM biasa, bukan kanvas: isinya didominasi teks, dan
 * teks di dalam WebGL harus dijadikan tekstur dulu - buram di layar rapat, tidak bisa
 * disalin, tidak terbaca pembaca layar, tidak terindeks. Latar ruangannya nanti diganti
 * render isometrik dari Blender; yang di bawah ini kerangkanya, dan mengganti latar
 * tidak mengubah satu baris pun dari logika ini.
 */

// Lima peran, memetakan tahap yang sudah dicatat `_set_tahap()` di server.py ke berkas
// yang mengerjakannya. Posisinya dalam persen supaya ikut melar bersama wadahnya.
const STASIUN = {
  boss:   { label: 'Boss',   kerja: 'server.py',        x: 50, y: 16, warna: '#99F4FF' },
  naskah: { label: 'Naskah', kerja: 'naskah_ai.py',     x: 16, y: 44, warna: '#6BBEC8' },
  broll:  { label: 'B-roll', kerja: 'broll.py + Ollama', x: 30, y: 76, warna: '#4F91C9' },
  render: { label: 'Render', kerja: 'ffmpeg',           x: 70, y: 76, warna: '#FFC107' },
  upload: { label: 'Upload', kerja: 'YouTube + Facebook', x: 84, y: 44, warna: '#2ecc8f' }
};

const URUTAN = ['boss', 'naskah', 'broll', 'render', 'upload'];

const jam = (iso) => {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

/**
 * Menyusun percakapan dari apa yang BENAR-BENAR tercatat di snapshot. Tidak ada kalimat
 * karangan di sini: kalau sebuah rincian tidak dicatat pipeline, ia tidak muncul. Rincian
 * seperti "Groq 403, lempar ke Mistral" baru bisa ditampilkan setelah naskah_ai.py
 * mencatat provider mana yang akhirnya dipakai.
 */
function percakapanUntuk(item) {
  if (!item) return [];
  const gagal = item.peran === 'gagal';
  const baris = [
    { dari: 'boss', ke: 'naskah', teks: `"${item.nama}" masuk antrean` },
    { dari: 'naskah', ke: 'broll', teks: 'naskah siap, cari footage' },
    { dari: 'broll', ke: 'render', teks: 'klip terpilih, mulai render' }
  ];

  if (gagal) {
    baris.push({ dari: 'render', ke: 'boss', teks: 'gagal render, produk dilewati', gagal: true });
    return baris;
  }

  baris.push({ dari: 'render', ke: 'upload', teks: 'video selesai, siap unggah' });

  const yt = item.jadwal?.youtube;
  const fb = item.jadwal?.facebook;
  if (yt || fb) {
    const bagian = [yt && `YouTube ${jam(yt)}`, fb && `Facebook ${jam(fb)}`].filter(Boolean);
    baris.push({ dari: 'upload', ke: 'boss', teks: `terjadwal — ${bagian.join(', ')}` });
  } else {
    baris.push({ dari: 'upload', ke: 'boss', teks: 'terjadwal, hindari blasting' });
  }
  return baris;
}

export default function RuangAgen({ penuh = false }) {
  const [data, setData] = useState(null);
  const [langkah, setLangkah] = useState(-1);
  const wadahRef = useRef(null);
  const agenRef = useRef(null);

  useEffect(() => {
    let batal = false;
    fetch('/data/pipeline.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => !batal && setData(d))
      .catch(() => {});
    return () => { batal = true; };
  }, []);

  // Produk terbaru yang punya riwayat terpanjang dipakai sebagai yang diperagakan.
  const sorotan = data?.antrian?.[0];
  const percakapan = percakapanUntuk(sorotan);

  useEffect(() => {
    if (!data || !agenRef.current || percakapan.length === 0) return;

    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (kurangiGerak) {
      setLangkah(percakapan.length - 1);
      const akhir = STASIUN[percakapan[percakapan.length - 1].ke];
      gsap.set(agenRef.current, { left: `${akhir.x}%`, top: `${akhir.y}%` });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5, paused: true });
      // Agen berangkat dari Boss, lalu singgah di tiap stasiun seperti sedang
      // mengerjakannya - bukan berkeliling ruangan tanpa tujuan.
      gsap.set(agenRef.current, { left: `${STASIUN.boss.x}%`, top: `${STASIUN.boss.y}%` });
      percakapan.forEach((p, i) => {
        const tujuan = STASIUN[p.ke];
        tl.to(agenRef.current, {
          left: `${tujuan.x}%`,
          top: `${tujuan.y}%`,
          duration: 0.85,
          ease: 'power2.inOut',
          onStart: () => setLangkah(i)
        }).to({}, { duration: 0.9 }); // jeda: agen sedang mengerjakan stasiun itu
      });

      // Baterai tidak dibakar untuk sesuatu yang tidak sedang dilihat.
      const io = new IntersectionObserver(
        ([e]) => (e.isIntersecting ? tl.play() : tl.pause()),
        { threshold: 0.25 }
      );
      if (wadahRef.current) io.observe(wadahRef.current);
      return () => io.disconnect();
    }, wadahRef);

    return () => ctx.revert();
  }, [data, percakapan.length]);

  if (!data) {
    return (
      <div className="h-full w-full flex items-center justify-center text-xs opacity-50">
        memuat keadaan pipeline…
      </div>
    );
  }

  const aktif = percakapan[langkah];
  const stasiunAktif = aktif ? aktif.ke : null;

  return (
    <div ref={wadahRef} className="relative h-full w-full overflow-hidden">
      {/* Latar sementara: kisi isometrik. Nanti diganti render Blender, dan tidak ada
          satu pun posisi di bawah yang perlu ikut berubah. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(30deg, #6BBEC8 1px, transparent 1px), linear-gradient(-30deg, #6BBEC8 1px, transparent 1px)',
          backgroundSize: '34px 20px'
        }}
      />

      {URUTAN.map((kunci) => {
        const s = STASIUN[kunci];
        const nyala = stasiunAktif === kunci;
        return (
          <div
            key={kunci}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <div
              className="rounded-md border px-2 py-1 text-center whitespace-nowrap"
              style={{
                borderColor: nyala ? s.warna : 'rgba(255,255,255,0.18)',
                background: nyala ? `${s.warna}1f` : 'rgba(255,255,255,0.04)',
                boxShadow: nyala ? `0 0 18px ${s.warna}55` : 'none'
              }}
            >
              <div
                className="text-[11px] font-semibold leading-tight"
                style={{ color: nyala ? s.warna : 'rgba(255,255,255,0.72)' }}
              >
                {s.label}
              </div>
              {penuh && (
                <div className="text-[9px] leading-tight opacity-55">{s.kerja}</div>
              )}
            </div>
          </div>
        );
      })}

      {/* Agennya bukan sosok manusia. Yang dibangun Abhi memang proses yang jalan
          sendiri, bukan orang di kantor - dan glif kecil tidak berpura-pura sebaliknya. */}
      <div
        ref={agenRef}
        aria-hidden="true"
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: '50%', top: '16%' }}
      >
        <div
          className="h-3.5 w-3.5 rounded-[4px] border"
          style={{
            borderColor: '#99F4FF',
            background: 'rgba(153,244,255,0.22)',
            boxShadow: '0 0 12px rgba(153,244,255,0.6)'
          }}
        >
          <div className="mx-auto mt-1 h-1 w-1 rounded-full" style={{ background: '#99F4FF' }} />
        </div>
      </div>

      {/* Percakapannya dibaca dari perpindahan tahap, jadi tidak ada kalimat karangan. */}
      {aktif && (
        <div
          className="absolute left-1/2 z-30 -translate-x-1/2 px-3 text-center"
          style={{ bottom: penuh ? '8%' : '4%' }}
        >
          <div
            className="inline-block rounded-full border px-3 py-1 text-[11px] leading-tight backdrop-blur-sm"
            style={{
              borderColor: aktif.gagal ? '#FF6B6B55' : 'rgba(255,255,255,0.16)',
              background: 'rgba(20,22,28,0.8)',
              color: aktif.gagal ? '#FF9B9B' : 'rgba(255,255,255,0.88)'
            }}
          >
            <span className="opacity-55">{STASIUN[aktif.dari].label} → {STASIUN[aktif.ke].label}</span>
            {'  '}
            {aktif.teks}
          </div>
        </div>
      )}
    </div>
  );
}

/** Rak antrian: daftar produk beserta tahap terakhirnya, apa adanya. */
export function AntrianVideo({ batas = 4 }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let batalkan = false;
    fetch('/data/pipeline.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => !batalkan && setData(d))
      .catch(() => {});
    return () => { batalkan = true; };
  }, []);

  if (!data?.antrian?.length) return null;

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-baseline justify-between gap-2 text-[11px] opacity-60">
        <span>
          {data.ringkasan.produk} produk · {data.ringkasan.video} video · {data.ringkasan.upload} unggahan
        </span>
        <span>terakhir jalan {jam(data.terakhir_jalan)}</span>
      </div>
      <ul className="space-y-1">
        {data.antrian.slice(0, batas).map((a) => {
          const gagal = a.peran === 'gagal';
          return (
            <li
              key={a.slug}
              className="flex items-center gap-2 rounded border px-2 py-1 text-[11px]"
              style={{
                borderColor: gagal ? 'rgba(255,107,107,0.35)' : 'rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.03)'
              }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: gagal ? '#FF6B6B' : STASIUN[a.peran]?.warna || '#6BBEC8' }}
              />
              <span className="min-w-0 flex-1 truncate opacity-85">{a.nama}</span>
              <span className="shrink-0 opacity-55">{a.tahap}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
