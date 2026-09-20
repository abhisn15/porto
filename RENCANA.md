# Rencana kerja portfolio

Disusun dari tiga penelusuran terpisah: arsitektur interaksi, audit isi, dan kritik desain.
Setiap angka di bawah sudah diperiksa ulang langsung di repo atau lewat permintaan HTTP —
bukan dikira-kira.

---

## Tingkat 0 — halaman ini belum bisa menjalankan tugasnya

Empat hal berikut bukan soal keindahan. Selama masih ada, portfolio-nya gagal pada pekerjaan
yang justru jadi alasan ia dibuat.

**Dua tombol utama di Hero mati.** "CV Review" dan "Explore My Projects" hanya punya penangan
hover — tidak ada `onClick`, tidak ada `href`. Seluruh `Hero.js` cuma punya satu `onClick`,
dan itu milik "Go to aboutme". Diklik, tidak terjadi apa-apa.

**Tidak ada CV di mana pun.** Tidak ada satu pun PDF di `public/`. Tombolnya bernama
"CV Review" tapi tidak ada yang bisa direview.

**Tombol navigasi bawah tidak menggulir.** Butir "About" dan "Projects" hanya memindahkan
indikator. Dan satu-satunya jangkar di seluruh halaman adalah `#aboutme` — tidak ada
`#projects` untuk dituju.

**(SUDAH DIBERESKAN) Tujuh koma sembilan megabita GIF di atas lipatan.** `awan.gif` 5,58 MB dan `matahari.gif`
2,30 MB. Next.js tidak mengoptimasi GIF beranimasi; keduanya dikirim apa adanya. Di 4G sekitar
1,5 Mbps itu **44 detik**, di 3G **165 detik**. Konversi ke WebM atau WebP beranimasi memberi
perbaikan lebih besar daripada seluruh sisa dokumen ini digabung.

---

## Tingkat 1 — teks yang tidak terbaca

Dihitung dengan rumus WCAG 2.x, termasuk komposit warna beralfa.

| Tempat | Warna | Rasio | Ambang |
|---|---|---|---|
| Tombol "CV Review" (Hero) | `#ededed` di atas `#6BBEC8` | **1,83 : 1** | 4,5 |
| Tombol "Explore My Projects" | `#ededed` di atas `#4F91C9` | **2,88 : 1** | 4,5 |
| Tombol kartu proyek, mode terang | putih di atas `#99F4FF` | **1,25 : 1** | 4,5 |
| Badge tahun, mode terang | `#99F4FF` di atas `#99F4FF20` | **1,22 : 1** | 4,5 |
| Bilah judul cyan, mode terang | `#6BBEC8` di atas putih | **2,14 : 1** | 3,0 |

Dua baris pertama terjadi di **mode gelap** — mode yang jadi andalan. Jadi ini bukan perkara
mode terang: dua tombol terpenting di halaman tidak terbaca pada tampilan utamanya.

Biang kerok tombol kartu proyek satu baris yang terbalik di `LatestProjects.js`:

    color: isDarkMode ? '#000' : '#fff'

Latarnya `#99F4FF` di **kedua** mode. Hitam di atas cyan = 16,74 : 1; putih di atas cyan =
1,25 : 1. Mode gelap kebagian yang bagus, mode terang kebagian yang mustahil dibaca.

Catatan: butir 7 lama di `MAPPING.md` (`textSecondary` terlalu tipis) ternyata **salah** —
`rgba(0,0,0,0.6)` di atas putih adalah 5,74 : 1 dan lolos AA. Memperbaikinya tidak
menyelesaikan apa pun.

---

## Tingkat 2 — enam animasi yang tidak pernah dilihat siapa pun

`ScrollTrigger` **tidak diimpor di satu berkas pun**. Keenam section menjalankan
`gsap.fromTo(...)` di dalam `useEffect(..., [])` — artinya saat mount, semuanya berbarengan,
saat halaman pertama dimuat. Animasi untuk Skills, Education, Achievements, Work Experience,
Latest Projects, dan Footer sudah selesai berjalan sebelum pengguna menggulir satu piksel.
Yang mereka lihat saat tiba di sana cuma konten diam.

Halaman ini punya enam animasi. Nol di antaranya pernah dilihat orang.

Inilah sebab halaman terasa datar — bukan kurang animasi.

---

## Tingkat 3 — isi yang tidak bisa dibuktikan

Diperiksa lewat permintaan HTTP langsung.

Hidup, tapi tidak ada di portfolio:

| | status | judul halaman |
|---|---|---|
| Atenim Workforce Hub | 200 | Atenim Workforce Hub (+ app Play Store, publisher TPM Group) |
| Cloubee | 200 | repo publik juga 200 |
| LaporIn | 200 | Platform Laporan Warga RT/RW |
| POLTEKIMIPAS | 200 | Politeknik Imigrasi dan Pemasyarakatan |

~~Dipajang, tapi tidak bisa diperiksa siapa pun: **EduSafe** dan **BicaraKita**.~~
**Sudah dibereskan.** CV Abhi memastikan namanya **EduSafe** — aplikasi Flutter tempat siswa
berdiskusi mengerjakan PR, juara 3 LKS IT Solution tingkat Kota Jakarta Timur **April 2024**.
Kartu "BicaraKita" dibuang dari Projects karena tidak bisa dibuka maupun diperiksa; capaiannya
tetap tercatat di Achievements. Tanggalnya juga dikoreksi di dua tempat.

Atenim adalah satu-satunya sistem yang benar-benar dipakai orang setiap hari di sebuah
perusahaan. Untuk pelamar kerja junior itu bobot terbesar yang ada, dan sekarang nol persen
tampil.

Catatan: `bishop.rplsmk40.my.id` (repo `cashier-web`) domainnya sudah mati — jangan dipakai.

---

## Urutan halaman

Sekarang: Hero, About Me, marquee, Skills, Education, Achievements, Work Experience,
**Latest Projects**, Footer.

Untuk pelamar junior, proyek bukan pelengkap — proyek adalah satu-satunya bukti. Semua yang di
atasnya masih berupa klaim. Urutan sekarang menyuruh pembaca melewati lima section berisi klaim
sebelum sampai ke bukti, dan kolase About Me sendiri memakan hampir satu layar penuh.

Usulan: **Hero, Latest Projects, marquee, About Me, Work Experience, Achievements + Education
(digabung), Skills, Footer.**

Versi hemat kalau tidak mau rombak besar: pindahkan `<LatestProjects />` ke atas `<Skills />`
di `page.js`. Satu baris, mengambil sebagian besar manfaatnya.

**Jebakan:** marquee punya `margin-top` negatif 200 px yang terikat ke About Me (di rancangan
keduanya tumpang tindih). Kalau pitanya dipindah, ia akan menggigit 200 px dari section yang
kebetulan ada di atasnya. Pita harus tetap menempel persis sesudah About Me, atau margin
negatifnya dihapus berbarengan.

Satu hal lagi soal isi: empat section berturut-turut (Skills, Education, Achievements, Work
Experience) memakai cetakan yang sama persis — `max-w-6xl`, grid dua kolom, `SectionTitle`,
`py-16`. Setelah yang ketiga, mata membaca halaman ini sebagai formulir. Dan `Education`
memakan satu section penuh untuk satu baris; gabung saja dengan Achievements.

---

## Keputusan teknis

### Smooth scroll: Lenis, bukan ScrollSmoother

ScrollSmoother sekarang **gratis** (sejak GSAP 3.13, April 2025 — sudah ada di `node_modules`
dengan lisensi "no charge"), jadi bukan soal biaya. Alasannya teknis: ScrollSmoother memakai
`transform` pada pembungkus, dan `transform` pada leluhur merusak `position: fixed`. Bottom
navbar kita `fixed`. Memakainya berarti membongkar struktur dua lapis di `page.js` yang baru
dibangun untuk membereskan geser mendatar.

Lenis menggulir dokumen sungguhan, jadi `fixed`, `sticky`, dan cari-di-halaman tetap bekerja.
Sekitar 6 KB gzip berbanding 20 KB.

Sekalian: tidak ada satu pun penanganan `prefers-reduced-motion` di repo saat ini. Semua
animasi jalan tanpa syarat.

### Project takeover: GSAP Flip, dan soal URL

Framer Motion `layoutId` paling ringkas ditulis, tapi memasukkan mesin animasi **kedua**
seharga sekitar 32 KB ke proyek yang sudah memakai GSAP di lima komponen. View Transitions API
gratis tapi tidak bisa diinterupsi — dan fitur ini punya tiga jalur tutup (tombol, Escape,
Back) yang bisa dipicu beruntun.

**"URL tetap sama" berkonflik langsung dengan tombol Back dan berbagi tautan.** Secara teknis
bisa dipaksa dengan `history.pushState(state, '', location.href)`, tapi harganya: proyek tidak
bisa dikirim sebagai tautan langsung di lamaran kerja, muat ulang menghapus keadaan, dan tidak
ada yang bisa dipratinjau.

Jalan tengah: **hash**, misalnya `#project-atenim`. Hash tidak pernah dikirim ke server dan
tidak memicu navigasi — jadi tetap tanpa pindah halaman, tapi Back berfungsi dan tautannya bisa
dibagikan. Alamat dasarnya tetap `biporto.vercel.app`.

**Prasyarat:** kartu proyek saat ini **tidak punya gambar sama sekali** — yang tampil selalu
placeholder gradien. Tanpa screenshot, "gambarnya menzoom" berarti menzoom kotak gradien.

Overlay-nya wajib di-portal ke `<body>`: tiga leluhur di repo akan mengurungnya —
`overflow-x-clip` dan `max-w-[1920px]` di `page.js`, serta `container-type: inline-size` di
`AboutMe.js` yang menjadikan elemen itu containing block untuk keturunan `fixed`.

### Semi-3D: mulai dari yang tanpa pustaka

| | paket | tambahan gzip | di ponsel |
|---|---|---|---|
| Kartu miring ikut kursor | — (hook sendiri) | ~0,3 KB | mati total |
| Parallax berlapis di Hero | — (event Lenis) | ~0,5 KB | murah |
| Shader halus — OGL | `ogl` | ~10 KB | sebaiknya tidak |
| Shader halus — three.js | `three` | ~120 KB | jangan |

`three` **sudah terpasang tapi tidak pernah di-import** (347 KB menganggur di `package.json`),
begitu juga `framer-motion`. Dua komponen yang memakainya — `WhatIDo.js` dan `ui/Button.js` —
yatim, tidak dipanggil dari mana pun. Kode mati di repo yang akan dibuka perekrut lewat GitHub
adalah sinyal kecil yang tidak perlu.

Catatan jujur: `AboutMe.js` mengklaim "exploring interactive 3D experiences using GSAP and
Three.js" — klaim yang saat ini tidak didukung satu baris pun kode.

### Mode terang

Glow cyan pada sembilan foto kolase **sudah dipanggang ke dalam berkasnya** — pada
`kucing.png`, 78,9% piksel semi-transparannya bernada cyan. Tidak ada `filter` atau
`mix-blend-mode` yang bisa mengurangi piksel yang sudah ada di dalam berkas. Di atas latar
putih, halo itu tidak menyala; ia jadi kabut kebiruan yang terlihat seperti cutout gagal.

Dua jalan:

- **Buang mode terangnya.** Tidak ada sumber rancangannya (Figma seluruhnya gelap), dan
  butiran latar hanya dipasang di mode gelap sehingga mode terang jadi putih rata — rupa
  template generik yang justru ingin dihindari.
- **Kalau dipertahankan:** latar bukan putih tapi kertas hangat `#F2F0EB`, dan kolase About Me
  **tetap gelap di kedua tema** sehingga terbaca sebagai pulau gelap bertekstur di tengah
  halaman kertas. Itu menyelamatkan sembilan berkas foto sekaligus dan terlihat disengaja.
  Aturan yang mengunci masalahnya: warna cerah tidak pernah jadi warna teks — ia jadi warna
  isian dengan tinta gelap di atasnya.

Ada alasan struktural kenapa ini terus bocor: ada **dua sumber kebenaran warna** yang tidak
saling bicara. `globals.css` mendefinisikan `--background`/`--foreground` per tema, tapi tidak
satu pun komponen memakainya — semuanya menarik `useTheme().colors` lalu menempelkannya lewat
`style` inline. Jadi setiap perbaikan kontras harus dikerjakan di delapan komponen satu per
satu, dan tema kedua akan rusak lagi setiap kali ada section baru.

### Agen AI di kartu FixBeli

Gagasan karakter bergerak di ruang kantor berisiko terbaca sebagai aset unduhan — itu bahasa
visual stok, dan ia tidak menyampaikan satu pun hal yang membuat FixBeli menarik: rantai lima
penyedia dengan cadangan, LLM lokal yang memilih b-roll, render FFmpeg, unggah terjadwal.
Ilustrasi yang bisa dipakai proyek mana pun tidak menjual proyek ini.

Yang benar dari intuisinya: gerakan memang tepat untuk kartu ini, karena proyeknya memang
tentang sesuatu yang berjalan sendiri. Yang perlu diganti cuma *apa* yang bergerak.

Kartu FixBeli sekarang jatuh ke placeholder, dan karena judulnya sudah tampil di `<h3>` di
bawahnya, **"FixBeli ID" muncul dua kali di satu kartu**. Ada slot 192 px yang menganggur.

Usul: isi slot itu dengan SVG rantai lima simpul —
tautan produk, naskah, footage, render, jadwal unggah — dengan satu denyut berjalan di
sepanjangnya. Saat denyut melewati satu simpul, labelnya berganti jadi **data aslinya**: nama
produk sungguhan, durasi sungguhan, jam tayang sungguhan. Satu putaran sekitar 4 detik lalu
berhenti; jalan lagi hanya saat di-hover atau saat kartunya masuk layar lagi.

Kalau tetap ingin ada sosok agen: jadikan denyutnya itu sendiri agennya — glif 12 px yang
merayap di pipeline dan berhenti sejenak di tiap simpul. Agennya bergerak melewati
**pekerjaannya**, bukan melewati ruangan.

Satu catatan isi: tombol kartu FixBeli berbunyi "Live catalog" dan mengarah ke katalognya —
itu sudah jujur, jangan diubah jadi "Live demo". Tapi tambahkan tautan kedua langsung ke satu
video hasilnya di YouTube. Itu bukti terkuat yang dimiliki proyek ini dan sekarang tidak ada di
halaman sama sekali.

---

## Tiga momen yang diusulkan

Pasang `ScrollTrigger` dulu — itu prasyarat, bukan salah satu dari tiga.

**Hero: satu ketukan, bukan empat.** Sekarang Hero menjalankan empat animasi berlapis, dan
fotonya masuk dengan `{scale: 0, rotation: 180}`. Memutar wajah seseorang 180 derajat tidak
menyampaikan apa pun. Ganti: foto tersingkap dari bawah lewat `clip-path`, dan garis di bawah
nama menulis dirinya dengan `scaleX: 0 → 1` — elemen itu sudah punya `origin-left`, sisa dari
niat yang tidak pernah jadi. Nama yang menggarisbawahi dirinya adalah gerakan yang artinya
tanda tangan.

**About Me: kolase merakit dirinya.** Ini gong-nya. Tiap foto masuk dari tepi terdekatnya,
urutannya mengikuti `z` — sertifikat dulu, kucing terakhir — sehingga tumpukannya terbentuk
dari belakang ke depan di depan mata. Datanya sudah ada di kode: `TEGAK` dan `DIPUTAR` sudah
memuat `x`, `y`, `z`, `rot` per foto. Dikendalikan gulir (`scrub`), bukan berjalan sendiri.
Kolase ini satu-satunya tempat di halaman yang pantas dapat `pin`.

Jebakan: kolase itu `hidden lg:block`, jadi pin harus dimatikan di bawah `lg` lewat
`gsap.matchMedia()` — kalau tidak, layar kecil akan ter-pin pada elemen `display: none`.

**Latest Projects: kartu tersusun, bukan meletup.** `scale: 0` + `back.out(1.7)` adalah
gerakan demo bawaan GSAP; untuk halaman yang dinilai kemampuannya itu sinyal negatif. Ganti
dengan reveal `y: 24 → 0` yang dipicu gulir, plus garis aksen 3 px di tepi kiri tiap kartu yang
tumbuh mengikuti gulir memakai `project.accent` yang sudah ada di data.

Bonus murah: sambungkan laju marquee ke `ScrollTrigger.getVelocity()` — pita melaju lebih
kencang saat digulir cepat dan berbalik arah saat digulir ke atas. Lima belas baris, tanpa
aset.

---

## Urutan eksekusi

| # | Pekerjaan | Usaha | Kenapa di sini |
|---|---|---|---|
| 0 | ~~Konversi dua GIF Hero~~ **SELESAI** — 7,89 MB jadi 885 KB (89%), 44 dtk jadi 4,8 dtk | kecil | 44 detik muat; semua hal lain sia-sia tanpa ini |
| 1 | ~~Hidupkan tombol Hero + navbar, tambah `id` per section~~ **SELESAI** — PDF CV masih ditunggu | kecil | halaman belum bisa menjalankan tugasnya |
| 2 | ~~Perbaiki kontras tombol~~ **SELESAI** — 1,83 jadi 8,46 dan 2,88 jadi 5,36 | kecil | teks tak terbaca di dua tombol utama |
| 3 | ~~Pasang ScrollTrigger + `prefers-reduced-motion`~~ **SELESAI** | kecil | enam animasi yang sudah ditulis jadi terlihat |
| 4 | Susun ulang isi Projects (Atenim dan Cloubee masuk) — kartu BicaraKita **sudah dibuang** | sedang | bukti terkuat sekarang tidak tampil |
| 5 | ~~Lenis~~ **SELESAI** — navbar `fixed` terbukti tidak ikut tergulir | kecil | terasa di seluruh halaman |
| 6 | ~~Kartu miring ikut kursor~~ **SELESAI** — mati total di layar sentuh | kecil | risiko nol |
| 7 | Screenshot proyek (di luar kode) | — | prasyarat takeover |
| 8 | Project takeover | besar | fitur pamer utama |
| 9 | Parallax Hero, diagram pipeline FixBeli | sedang | |
| 10 | Shader OGL — opsional | sedang | hanya kalau 0 sampai 9 tuntas |

Tambahan bundel untuk 5, 6, dan 8: sekitar **15 KB gzip**. Itu 0,19% dari satu berkas
`awan.gif`.

---

## Yang perlu dijawab Abhi

1. ~~**EduSafe atau BicaraKita?**~~ **TERJAWAB oleh CV: EduSafe.** Sekalian ketahuan
   tanggalnya juga salah di dua tempat — lombanya **April 2024**, bukan Agustus, dan AWS
   Sagasitas **Januari 2024**, bukan Maret. Kartu BicaraKita sudah dibuang; prestasinya tetap
   ada di Achievements, dan di situ memang tempatnya. Yang belum: apakah kode EduSafe masih
   ada dan mau dinaikkan ke GitHub?
2. **Atenim:** perannya apa (bangun, ikut bangun, atau pelihara), dan boleh dipajang publik?
   Ini sistem internal TPM Group.
3. **P2HP Mobile App:** masih punya screenshot? Play Store-nya memang sudah 404.
4. **LaporIn, POLTEKIMIPAS, Guardian, mari-jaga-bumi:** karya sendiri atau kerja tim?
5. **StockoutApp** disebut di About Me tapi nol jejak — ada buktinya?
6. **Mode terang** dibuang, atau dipertahankan dengan palet kertas hangat?


---

## Catatan pelaksanaan

**GIF Hero.** VP9 dicoba lebih dulu dan hasilnya sembilan kali lebih kecil lagi (436 KB),
tapi dibatalkan: Safari tidak mendukung alfa pada VP9, jadi awan putihnya akan tampil di atas
kotak hitam di semua Mac dan iPhone. Lossless juga dicoba dan justru **lebih besar** (3,2 MB) —
gambarnya ternyata penuh gradien, bukan warna datar. Yang dipakai WebP beranimasi seukuran
tampil: awan 320 px fps 10, matahari 200 px fps 8. Frame sebelum dan sesudah dibandingkan
berdampingan, tidak ada penurunan yang terlihat.

`awan.gif` lama masih terkunci proses lain saat dihapus. Sudah dikeluarkan dari git dan
pola `public/assets/hero/*.gif` ditambahkan ke `.gitignore`, jadi ia tidak akan ikut
ter-deploy — tapi berkasnya masih ada di disk dan perlu dihapus manual nanti.

**Alamat CV.** `Hero.js` punya konstanta `ALAMAT_CV` di bagian atas, sementara menunjuk
LinkedIn. Begitu `public/cv.pdf` ada, ganti satu baris itu jadi `"/cv.pdf"`.

**Kontras tombol kedua.** Ada dua jalan: menggelapkan birunya atau menggelapkan teksnya.
Yang dipilih menggelapkan teksnya, supaya `#4F91C9` dari rancangan tetap utuh. Efek
sampingnya bagus: kedua tombol jadi konsisten mengikuti aturan yang sama — warna cerah
sebagai isian, tinta gelap di atasnya.


---

## Catatan pelaksanaan — langkah 3, 5, 6

**ScrollTrigger.** Enam salinan `useEffect` yang identik diganti satu hook
`useRevealOnScroll`. Dibuktikan dengan mengukur `opacity` sebelum dan sesudah menggulir:
empat bagian bawah 0 lalu 1, dan kartu proyek `[0,0,0,0]` lalu `[1,1,1,1]`. Dengan setelan
"kurangi gerak", semuanya langsung 1 tanpa animasi sama sekali.

`once: true` disengaja — animasi yang mengulang tiap kali bagiannya dilewati terasa seperti
halaman yang gelisah.

**Lenis.** Alasan memilihnya dibuktikan, bukan cuma diyakini: posisi navigasi bawah diukur
sebelum dan sesudah menggulir 2000 px, hasilnya tetap 694 px. Kalau memakai ScrollSmoother,
angka itu akan ikut bergeser karena `transform` pada leluhur membuat `position: fixed`
kehilangan acuannya. Sentuhan dibiarkan memakai momentum bawaan sistem; gulir buatan di
ponsel terasa lebih lambat daripada yang asli, bukan lebih halus.

Dengan "kurangi gerak", Lenis tidak dinyalakan sama sekali (kelas `lenis` tidak muncul di
`<html>`), dan setelan yang berubah di tengah jalan langsung diikuti.

**Kartu miring.** CSS 3D biasa dengan `gsap.quickTo`, bukan `gsap.to` per gerakan tetikus —
`quickTo` mendaur ulang satu tween, sementara `gsap.to` membuat tween baru tiap kejadian dan
pada tetikus 120 Hz itu ratusan tween per detik yang saling menimpa. Sudutnya 6 derajat;
kemiringan besar terbaca sebagai efek demo.

Di layar sentuh tidak ada satu baris pun yang dijalankan — diuji dengan emulasi
`pointer: coarse`, `transform` kartu tidak berubah sama sekali.

Pembesaran hover yang lama dihapus: ia menulis ke properti `transform` yang sama dengan
kemiringan, jadi keduanya akan saling menimpa.

**Kontras kartu proyek** sekalian dibereskan karena sedang menyentuh berkasnya:

| | dulu | sekarang |
|---|---|---|
| Tombol tautan (mode terang) | 1,25 : 1 | **14,41 : 1** |
| Badge tahun (mode terang) | 1,22 : 1 | **6,01 : 1** |
| Badge tahun (mode gelap) | — | 9,33 : 1 |

Tambahan bundel: **Lenis 18 KB sebelum gzip** (sekitar 6 KB sesudah). Kemiringan kartu nol
tambahan — hook sendiri, memakai GSAP yang sudah ada.
