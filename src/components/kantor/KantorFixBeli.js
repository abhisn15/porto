'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * Kantor FixBeli — ruangan tempat para agen pipeline bekerja.
 *
 * Ruangan dan perabotnya satu gambar hasil render Blender; semua yang hidup di
 * atasnya elemen HTML. Isinya didominasi teks, dan teks di dalam render harus
 * dijadikan tekstur — buram di layar rapat, tidak bisa disalin, tidak terbaca
 * pembaca layar. Dengan cara ini cahayanya tetap dari Blender, tulisannya tetap tajam.
 *
 * Koordinatnya sama persis dengan docs/kantor-blender.md di repo video-affiliate.
 * Kalau salah satu berubah, yang lain harus ikut.
 */

const KANVAS = { w: 1024, h: 640 };

// Posisi tempat karakter berdiri/duduk, persen dari kanvas.
const STASIUN = {
  bos:     { label: 'Abhi (Bos)', modul: 'server.py',              x: 50, y: 23, warna: '#99F4FF' },
  penulis: { label: 'Penulis',    modul: 'naskah_ai.py',           x: 18, y: 54, warna: '#6BBEC8' },
  klip:    { label: 'Cari Klip',  modul: 'broll.py + Ollama',      x: 40, y: 71, warna: '#4F91C9' },
  analis:  { label: 'Analis',     modul: 'analitik.py',            x: 50, y: 80, warna: '#C792EA' },
  render:  { label: 'Render',     modul: 'buat_video.py / ffmpeg', x: 77, y: 71, warna: '#FFC107' },
  upload:  { label: 'Upload',     modul: 'YouTube + Facebook',     x: 84, y: 80, warna: '#2ecc8f' }
};

// Tempat karakter yang menganggur jalan-jalan. Ada di denah Blender juga.
const SINGGAH = [
  { nama: 'galon', x: 8, y: 88 },
  { nama: 'papan tulis', x: 92, y: 40 }
];

// Urutan kerja sebenarnya, mengikuti _set_tahap() di server.py.
const ALUR = ['penulis', 'klip', 'render', 'upload'];

const jam = (iso) => {
  if (!iso) return null;
  return new Date(iso).toLocaleString('id-ID', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
  });
};

/**
 * Percakapan disusun dari apa yang benar-benar tercatat pipeline. Rincian seperti
 * "Groq 403, lempar ke Mistral" memang perilaku nyata sistemnya, tapi BELUM dicatat
 * ke snapshot — jadi belum ditampilkan. Menuliskannya sekarang berarti mengarang.
 */
function naskahAdegan(item) {
  if (!item) return [];
  const nama = item.nama || 'produk baru';
  const adegan = [
    { di: 'bos',     ke: 'penulis', teks: `"${nama}" — garap ya`, kerja: 'penulis' },
    { di: 'penulis', ke: null,      teks: 'nulis hook sama 3 masalah…', kerja: 'penulis' },
    { di: 'penulis', ke: 'klip',    teks: 'naskah beres, cari footage-nya', kerja: 'klip' },
    { di: 'klip',    ke: null,      teks: 'tanya Ollama di 192.168.1.6…', kerja: 'klip' },
    { di: 'klip',    ke: 'render',  teks: 'klip dapet, render gih', kerja: 'render' }
  ];

  if (item.peran === 'gagal') {
    adegan.push({ di: 'render', ke: 'bos', teks: 'ffmpeg mati, gagal render', kerja: 'render', gagal: true });
    return adegan;
  }

  adegan.push({ di: 'render', ke: null,     teks: '1080×1920, sabar ya…', kerja: 'render' });
  adegan.push({ di: 'render', ke: 'upload', teks: 'video jadi, tinggal unggah', kerja: 'upload' });

  const yt = item.jadwal?.youtube;
  const fb = item.jadwal?.facebook;
  const bagian = [yt && `YouTube ${jam(yt)}`, fb && `Facebook ${jam(fb)}`].filter(Boolean);
  adegan.push({
    di: 'upload',
    ke: 'bos',
    teks: bagian.length ? `terjadwal — ${bagian.join(', ')}` : 'terjadwal, hindari blasting',
    kerja: 'upload'
  });
  return adegan;
}



/**
 * Ngerumpi: dua agen saling menyahut.
 *
 * Topiknya sengaja seputar kerjaan sendiri dan hal receh kantor, BUKAN berita nyata.
 * Berita sungguhan isinya tidak bisa dikontrol, sementara halaman ini dibuka orang
 * yang sedang menilai Abhi — kantor kartun yang tiba-tiba membahas bencana atau
 * politik itu canggung di tempat yang salah.
 *
 * Yang bikin terasa hidup bukan topiknya, tapi ada yang menyahut.
 */
const NGERUMPI = [
  { a: 'render',  ta: 'kipas gue bunyi mulu nih',        b: 'klip',    tb: 'sabar, bentar lagi juga adem' },
  { a: 'klip',    ta: 'footage senyum udah kebanyakan',  b: 'penulis', tb: 'ya udah pake yang nunduk aja' },
  { a: 'analis',  ta: 'detik ketiga drop terus',         b: 'penulis', tb: 'hook gue salah dong berarti' },
  { a: 'upload',  ta: 'jangan numpuk sehari ya',         b: 'bos',     tb: 'iya, digeser empat puluh menit' },
  { a: 'penulis', ta: 'ini produk ke berapa sih',        b: 'bos',     tb: 'sepuluh, santai' },
  { a: 'bos',     ta: 'ada yang mau kopi?',              b: 'render',  tb: 'gue aja, sekalian ngadem' },
  { a: 'klip',    ta: 'PC sebelah nyala nggak ya',       b: 'analis',  tb: 'kalau mati ya udah, dua detik nyerah' },
  { a: 'analis',  ta: 'yang kemarin lumayan loh',        b: 'upload',  tb: 'tuh kan, jam tujuh emang enak' }
];

/**
 * Celetukan buat yang lagi nganggur.
 *
 * Ini SENGAJA tidak diambil dari event, dan itu boleh — karena tidak satu pun
 * mengklaim sesuatu sedang dikerjakan. "Scroll Pexels sampai pegel" tidak berbohong
 * soal keadaan pipeline; "ffmpeg lagi retry" akan berbohong, dan yang begitu hanya
 * boleh muncul kalau eventnya memang ada.
 *
 * Isinya tetap nyambung ke modul masing-masing, jadi sambil ngelantur ia tetap
 * menjelaskan siapa mengerjakan apa.
 */
const CELETUK = {
  bos: [
    'sepi... belum ada orderan masuk',
    'ngecek antrean dulu ah',
    'ngopi dulu, mumpung senggang',
    'kapan ya ada produk bagus lagi'
  ],
  penulis: [
    'baca-baca hook lama buat contoh',
    'ngetik... hapus... ngetik lagi',
    'nyari kata yang nggak lebay',
    'tiga masalah, satu solusi. gitu terus'
  ],
  klip: [
    'scroll Pexels sampai pegel',
    'klip "kopi pagi" lagi, lagi, dan lagi',
    'footage orang senyum udah kebanyakan',
    'nyari yang nggak kelihatan stok'
  ],
  analis: [
    'liatin grafik retensi doang',
    'yang detik ketiga selalu drop ya',
    'nunggu data kemarin masuk',
    'nggak ada yang nonton sampai habis sih'
  ],
  render: [
    'kipasnya masih bunyi',
    'mesinnya lagi dingin-dinginin',
    'sembilan banding enam belas, selalu',
    'lumayan, istirahat bentar'
  ],
  upload: [
    'slot jam tujuh masih kosong',
    'jangan numpuk sehari, nanti kena blasting',
    'ngecek jadwal minggu ini',
    'nunggu giliran aja'
  ]
};

/** Satu karakter. Sprite Blender dipasang lewat `sprite`; tanpa itu tampil bentuk sementara. */
function Karakter({ id, data, aktif, bicara, sprite, onKlik }) {
  const s = STASIUN[id];
  return (
    <button
      type="button"
      onClick={() => onKlik(id)}
      className="absolute z-20 -translate-x-1/2 -translate-y-full transition-[left,top] duration-[1200ms] ease-in-out focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ left: `${data.x}%`, top: `${data.y}%`, outlineColor: s.warna }}
      aria-label={`${s.label} — ${s.modul}`}
    >
      {/* Awan teks. Muncul hanya saat karakter ini sedang bicara, supaya ruangan
          tidak penuh gelembung sekaligus — itu yang bikin ramai, bukan hidup. */}
      {bicara && (
        <span
          className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border px-2.5 py-1 text-[11px] leading-tight backdrop-blur-sm"
          style={{
            borderColor: bicara.gagal
              ? 'rgba(255,107,107,0.45)'
              : bicara.santai
                ? 'rgba(255,255,255,0.14)'
                : `${s.warna}55`,
            background: 'rgba(20,22,28,0.92)',
            color: bicara.gagal
              ? '#FF9B9B'
              : bicara.santai
                ? 'rgba(255,255,255,0.55)'
                : 'rgba(255,255,255,0.9)',
            fontStyle: bicara.santai ? 'italic' : 'normal'
          }}
        >
          {bicara.teks}
          <span
            className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r"
            style={{
              borderColor: bicara.gagal ? 'rgba(255,107,107,0.45)' : `${s.warna}55`,
              background: 'rgba(20,22,28,0.92)'
            }}
          />
        </span>
      )}

      {sprite ? (
        <img src={sprite} alt="" className="h-14 w-auto select-none" draggable="false" />
      ) : (
        // Bentuk sementara sampai sprite Blender-nya ada.
        <span
          className="block h-10 w-7 rounded-t-full border transition-all duration-300"
          style={{
            borderColor: aktif ? s.warna : 'rgba(255,255,255,0.28)',
            background: aktif ? `${s.warna}33` : 'rgba(255,255,255,0.08)',
            boxShadow: aktif ? `0 0 16px ${s.warna}66` : 'none'
          }}
        />
      )}

      <span
        className="mt-1 block text-center text-[9px] font-semibold uppercase tracking-wide transition-colors"
        style={{ color: aktif ? s.warna : 'rgba(255,255,255,0.5)' }}
      >
        {s.label}
      </span>
    </button>
  );
}

export default function KantorFixBeli() {
  const [data, setData] = useState(null);
  const [adegan, setAdegan] = useState(-1);
  const [dipilih, setDipilih] = useState(null);
  const [keadaan, setKeadaan] = useState('auto');
  const [celetuk, setCeletuk] = useState(null);
  const ruangRef = useRef(null);
  const berkasRef = useRef(null);

  useEffect(() => {
    let batal = false;
    fetch('/data/pipeline.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => !batal && setData(d))
      .catch(() => {});
    return () => { batal = true; };
  }, []);

  const sorotan = data?.antrian?.[0];
  const naskah = naskahAdegan(sorotan);
  const kini = adegan >= 0 ? naskah[adegan] : null;
  const kiniRef = useRef(null);
  kiniRef.current = kini;

  // Karakter yang tidak sedang dipakai jalan-jalan; yang dipakai duduk di mejanya.
  const posisiKarakter = useCallback(
    (id) => {
      const s = STASIUN[id];
      if (keadaan === 'mati') return s;
      const bekerja = kini?.kerja === id || kini?.di === id || kini?.ke === id;
      if (bekerja || id === 'bos') return s;
      if (keadaan === 'sibuk') return s;
      // Menganggur: beranjak SEDIKIT ke arah tempat singgah, bukan sampai ke sana.
      // Versi pertama memakai titik tengah, dan akibatnya semua yang nganggur
      // meninggalkan mejanya lalu menumpuk di tengah ruangan.
      const tujuan = SINGGAH[id.charCodeAt(0) % SINGGAH.length];
      const langkah = 0.18;
      return {
        x: s.x + (tujuan.x - s.x) * langkah,
        y: s.y + (tujuan.y - s.y) * langkah
      };
    },
    [kini, keadaan]
  );

  useEffect(() => {
    if (!data || naskah.length === 0 || keadaan === 'mati') {
      setAdegan(keadaan === 'mati' ? -1 : adegan);
      return;
    }

    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (kurangiGerak) {
      setAdegan(naskah.length - 1);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5, paused: true });
      naskah.forEach((a, i) => {
        tl.call(() => setAdegan(i));
        // Yang berpindah itu BERKASNYA, bukan agennya — di pipeline aslinya tiap
        // tahap dikerjakan modul yang berbeda, mereka tidak pindah meja.
        if (a.ke && berkasRef.current) {
          const dari = STASIUN[a.di];
          const ke = STASIUN[a.ke];
          tl.set(berkasRef.current, { left: `${dari.x}%`, top: `${dari.y - 6}%`, opacity: 0 })
            .to(berkasRef.current, { opacity: 1, duration: 0.2 })
            .to(berkasRef.current, {
              left: `${ke.x}%`, top: `${ke.y - 6}%`,
              duration: 0.9, ease: 'power2.inOut'
            })
            .to(berkasRef.current, { opacity: 0, duration: 0.2 });
        }
        tl.to({}, { duration: a.ke ? 0.8 : 1.6 });
      });

      const io = new IntersectionObserver(
        ([e]) => (e.isIntersecting ? tl.play() : tl.pause()),
        { threshold: 0.2 }
      );
      if (ruangRef.current) io.observe(ruangRef.current);
      return () => io.disconnect();
    }, ruangRef);

    return () => ctx.revert();
  }, [data, naskah.length, keadaan]);

  // Satu celetukan pada satu waktu. Kalau semuanya nyeletuk bareng, yang terjadi
  // bukan ruangan yang hidup tapi ruangan yang berisik.
  useEffect(() => {
    if (keadaan === 'mati' || keadaan === 'sibuk') {
      setCeletuk(null);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let waktuHapus;
    const jadwalkan = () => {
      const jeda = 5000 + Math.random() * 7000;
      return setTimeout(() => {
        const k = kiniRef.current;
        const sibuk = (id) => k?.kerja === id || k?.di === id || k?.ke === id;
        const nganggur = Object.keys(STASIUN).filter((id) => !sibuk(id));
        if (!nganggur.length) {
          waktuJadwal = jadwalkan();
          return;
        }

        // Sepertiga waktu jadi obrolan berdua, sisanya gumam sendiri.
        const obrolan = NGERUMPI.filter((o) => !sibuk(o.a) && !sibuk(o.b));
        if (obrolan.length && Math.random() < 0.35) {
          const o = obrolan[Math.floor(Math.random() * obrolan.length)];
          setCeletuk({ id: o.a, teks: o.ta });
          waktuHapus = setTimeout(() => {
            setCeletuk({ id: o.b, teks: o.tb });
            waktuHapus = setTimeout(() => setCeletuk(null), 3200);
          }, 2300);
        } else {
          const id = nganggur[Math.floor(Math.random() * nganggur.length)];
          const baris = CELETUK[id];
          setCeletuk({ id, teks: baris[Math.floor(Math.random() * baris.length)] });
          waktuHapus = setTimeout(() => setCeletuk(null), 3800);
        }
        waktuJadwal = jadwalkan();
      }, jeda);
    };
    let waktuJadwal = jadwalkan();

    return () => {
      clearTimeout(waktuJadwal);
      clearTimeout(waktuHapus);
    };
  }, [keadaan]);

  const hitung = data?.antrian ?? [];
  const papan = [
    { angka: hitung.filter((a) => a.peran !== 'gagal' && a.persen !== 100).length, label: 'lagi kerja' },
    { angka: hitung.filter((a) => a.persen === 100).length, label: 'terjadwal' },
    { angka: hitung.filter((a) => a.peran === 'gagal').length, label: 'gagal', merah: true },
    { angka: data?.ringkasan?.produk ?? 0, label: 'total produk' }
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <h1 className="font-hero text-3xl">Kantor FixBeli ID</h1>
      <p className="mt-2 text-sm opacity-70">
        Lima agen yang ngurus tiap video — dan satu bos yang ngawasin.
      </p>

      {data ? (
        <p className="mt-3 inline-block rounded border px-2.5 py-1 text-[11px]"
           style={{ borderColor: 'rgba(107,190,200,0.4)', background: 'rgba(107,190,200,0.08)' }}>
          Keadaan asli pipeline · terakhir jalan {jam(data.terakhir_jalan)}
        </p>
      ) : (
        <p className="mt-3 text-[11px] opacity-50">memuat keadaan pipeline…</p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {papan.map((p) => (
          <div key={p.label} className="rounded-lg border px-3 py-2"
               style={{ borderColor: 'rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.03)' }}>
            <div className="text-xl font-bold" style={{ color: p.merah && p.angka > 0 ? '#FF6B6B' : '#99F4FF' }}>
              {p.angka}
            </div>
            <div className="text-[10px] uppercase tracking-wide opacity-55">{p.label}</div>
          </div>
        ))}
      </div>

      {/* Ruangannya. `aspect-ratio` dikunci ke kanvas render supaya posisi karakter
          tetap benar di lebar layar mana pun. */}
      <div
        ref={ruangRef}
        className="relative mt-5 w-full overflow-hidden rounded-xl border"
        style={{
          aspectRatio: `${KANVAS.w} / ${KANVAS.h}`,
          borderColor: 'rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.02)'
        }}
      >
        {/* Latar sementara: kisi isometrik. Diganti render Blender
            (public/assets/kantor/kantor.webp) tanpa mengubah satu posisi pun. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(30deg, #6BBEC8 1px, transparent 1px), linear-gradient(-30deg, #6BBEC8 1px, transparent 1px)',
            backgroundSize: '44px 26px'
          }}
        />

        {/* Berkas naskah yang berpindah dari meja ke meja. */}
        <div
          ref={berkasRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-10 h-3 w-2.5 -translate-x-1/2 rounded-[2px] opacity-0"
          style={{ background: '#99F4FF', boxShadow: '0 0 10px rgba(153,244,255,0.8)' }}
        />

        {Object.keys(STASIUN).map((id) => (
          <Karakter
            key={id}
            id={id}
            data={posisiKarakter(id)}
            aktif={kini?.kerja === id || kini?.di === id}
            bicara={
              kini && kini.di === id
                ? kini
                : celetuk?.id === id
                  ? { teks: celetuk.teks, santai: true }
                  : null
            }
            onKlik={(k) => setDipilih(k === dipilih ? null : k)}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="opacity-55">Keadaan:</span>
        {[
          ['auto', 'Ikut pipeline'],
          ['santai', 'Pagi santai'],
          ['sibuk', 'Lagi sibuk'],
          ['mati', 'Server mati']
        ].map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setKeadaan(k)}
            className="rounded border px-2.5 py-1 transition-colors"
            style={{
              borderColor: keadaan === k ? '#6BBEC8' : 'rgba(255,255,255,0.16)',
              background: keadaan === k ? 'rgba(107,190,200,0.12)' : 'transparent',
              color: keadaan === k ? '#99F4FF' : 'rgba(255,255,255,0.7)'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {dipilih && (
        <div className="mt-4 rounded-lg border p-3 text-sm"
             style={{ borderColor: `${STASIUN[dipilih].warna}44`, background: 'rgba(255,255,255,0.03)' }}>
          <div className="font-semibold" style={{ color: STASIUN[dipilih].warna }}>
            {STASIUN[dipilih].label}
          </div>
          <div className="mt-1 font-mono text-[11px] opacity-65">{STASIUN[dipilih].modul}</div>
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed opacity-45">
        Klik salah satu karakter buat lihat dia ngerjain apa. Yang lagi nganggur jalan-jalan
        sendiri; yang kerja duduk di mejanya.
      </p>
    </div>
  );
}
