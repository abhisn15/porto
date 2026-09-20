# Peta Figma → Web

Sumber: file Figma `GYHkXH2aYnLmDC2iAHg7Rp`, dibaca langsung lewat MCP (bukan dari tangkapan
layar). Kanvas rancangan **1280 px**. Semua angka di bawah diambil apa adanya dari node-nya.

Diperiksa dengan merender halaman memakai Chrome headless, lalu membandingkan hasilnya dengan
tangkapan layar node Figma yang sama.

---

## Ringkasan

| Bagian | Node | Status |
|---|---|---|
| Hero | `246:12` | ⚠️ bug posisi dibereskan, belum diadu dengan node-nya |
| About Me | `234:17` | ✅ selesai, 9 foto lengkap |
| Marquee | `226:41` | ✅ selesai, diadu ulang lewat ukuran |
| Skill Sets | `281:24` | ✅ selesai |
| Education | `281:32` | ✅ selesai |
| Achievements | `306:36` | ✅ selesai |
| Work Experience | `281:50` | ✅ selesai, kurang foto |
| Latest Projects | `309:58` | ⚠️ isi sudah benar, tata letak belum dibandingkan |

---

## Yang salah dan sudah diperbaiki

**Satu foto tidak pernah dipasang** — node `Desaintanpajudul3` (x 427,6 / y 572 / 229x292),
foto berkaos hitam di antara label "# Fullstack Developer" dan kolom teks. Berkasnya ada di
repo tapi versi export yang latarnya sudah menyatu jadi kotak abu; yang dipakai sekarang
gambar sumbernya yang tembus pandang. Glow cyan-nya juga beda sendiri: pada foto lain glow
sudah menyatu di berkasnya, yang ini efek bayangan pada layer, jadi dibuat ulang dengan
`drop-shadow` supaya mengikuti siluet, bukan `box-shadow` yang menggambar kotak.

**Geser mendatar (overflow-x)** — pita PORTOFOLIO memakai `width: 100vw`, dan `100vw`
menghitung lebar scrollbar. Di halaman yang panjang, pitanya jadi ~15 px lebih lebar dari
area yang terlihat. Dua percobaan pertama meleset: `width: 100%` menghapus gesernya tapi
membuat pita berhenti di 1920 lagi di layar lebih lebar, dan `overflow-x: clip` pada `<html>`
ternyata masih bisa digeser di Chrome (`scrollLeft` tetap berpindah 38 px). Yang dipakai
sekarang: pembungkus biasa di dalam `<body>` dengan `overflow-x: clip`, karena di elemen
non-root clip benar-benar memotong, dan lebarnya mengikuti body — yaitu lebar layar tanpa
scrollbar. Diukur dengan scrollbar menyala pada 380/768/1024/1280/1440/1920/2400: `scrollLeft`
tetap 0 setelah didorong, dan pitanya tetap menyentuh kedua tepi.

**Batas lebar di tempat yang salah** — `globals.css` memasang `max-width: 1440px` pada `:root`,
yaitu elemen `<html>`. Seluruh dokumen jadi pulau di tengah begitu layar lebih lebar dari 1440,
dan makin parah saat di-zoom out. Inilah sebab keluhan "marquee kepotong", bukan marquee-nya.
Batas itu dipindah ke pembungkus halaman; marquee menembusnya dengan `100vw`.

**Kanvas dikira 1440** — ternyata 1280. Semua titik `calc(80% + n)` meleset 128 px, jadi seluruh
sisi kanan About Me melenceng.

**Gambar diambil mentah** — berkas yang diunduh dari Figma adalah foto sumber sebelum dipotong
mask, jadi muncul sebagai kotak berlatar putih. Yang dipakai sekarang cutout kiriman Abhi.

**Ukuran foto cuma diatur lebarnya** — tingginya ikut gambar asli, jadi semua melar. Sekarang
tiap foto punya kotak berukuran tetap seperti di Figma.

**Urutan tumpuk mengikuti urutan kode**, bukan urutan layer Figma — judul "About Me" sempat
tertutup foto. Sekarang: sertifikat → closeup → duduk → jaket → piala → potret → rebah → kaos →
label → kucing → teks.

**Marquee** — pemisahnya titik tersendiri (bukan `●` yang menempel di teks), pita diputar
−2,71° sementara teksnya −2,62°. Tiga hal lain baru ketahuan setelah gambarnya diukur:

- *Pitanya melar.* SVG-nya ber-viewBox setinggi 231 tapi dipasang setinggi section (347)
  dengan `preserveAspectRatio: none`, jadi vertikalnya teregang 1,5× dan pitanya jauh lebih
  tebal dari hurufnya. Sekarang tingginya dipatok pada skala rancangan.
- *Fontnya beda keluarga.* Rancangan memakai **Baloo** yang asli, situsnya memuat **Baloo 2** —
  Baloo lama jauh lebih gemuk. Yang paling mendekati: Baloo 2 **Bold 63 px**, diukur lewat
  canvas: tinggi huruf 40 px dan kata selebar 397,5 px, sementara rancangannya 40 px dan 397 px.
- *Jaraknya dua kali lipat.* Kata berulang tiap 451 px dengan lebar 397 px, jadi celahnya 54 px:
  titik 28 px plus dua sela 14 px. Sebelumnya selanya 40 px di kedua sisi.

**Label "# Fullstack Developer"** — alasnya bukan satu kotak melainkan dua persegi bertingkat
(putih 104×26 dan abu 121,8×26 berujung bulat) yang bersama-sama menutupi teks sepanjang 171 px,
dan teksnya **putih dengan bayangan cyan**, bukan gelap. Versi lama memakai satu kotak 122 px
dengan teks gelap, jadi "loper" keluar dari kotak lalu hilang di latar hitam. Bentuk akhirnya
berupa hamburan butiran bertekstur yang tidak punya padanan CSS: SVG dari Figma pun tidak
terpakai karena `feTurbulence`-nya jauh lebih ganas di Chrome sampai bentuknya habis. Yang
dipakai render PNG-nya dengan latar kanvas Figma dilepas lewat un-composite.

**Foto berkaos hitam kegedean dan menabrak teks** — node `Desaintanpajudul3` ternyata
**diputar**, dan itu merusaknya dua kali. Pertama, gambarnya tidak mengisi penuh kotak
pembatasnya; dipasang apa adanya ke kotak 229×292 itu, ia membesar sekitar satu setengah kali.
Kedua, metadata memberi titik **sebelum** rotasi: `x` tertulis 427,6 padahal aslinya 338 —
meleset **89 px** ke kanan, tepat menindih kolom teks. `get_design_context` untuk satu node
tidak menunjukkan rotasi ini sama sekali (kodenya cuma `size-full`), jadi node berotasi terlihat
seperti node biasa.

Yang dipakai sekarang render nodenya — sudah memuat rotasi dan glow cyan-nya, latar dilepas
lewat un-composite — dan letaknya **dicari dengan mencocokkan render itu ke gambar rancangan**.
Ketemu di 332, 572 dengan selisih 6 dari 255, sementara geser satu piksel saja melonjak ke 16.
Cara ini yang dipakai kalau metadata tidak bisa dipercaya.

**Pita PORTOFOLIO menggantung jauh di bawah About Me** — di rancangan kedua bagian itu
**tumpang tindih 200 px**: About Me menempati y 572–1433 sementara frame pita mulai di 1233.
Section di web ditumpuk berurutan, jadi pitanya turun 200 px dan meninggalkan ruang kosong
yang tidak ada di rancangan. Diperbaiki dengan `margin-top` negatif sebesar itu. Ukurannya
juga dulu berhenti tumbuh di 1440 sementara sisa halaman terus sampai 1920, jadi di layar
lebar pitanya mengecil sendiri dan tidak lagi sebanding dengan sekitarnya.

**Foto rebah diputar dua kali** — berkasnya sudah berupa render node yang memuat rotasi dan
glow cyan-nya, tapi kodenya mengecilkan gambarnya dulu ke 228×147 lalu memutarnya lagi 71,65°.
Hasilnya mengerut jadi sekitar sepertiga ukuran sambil miring ke arah yang salah. Kotaknya
sendiri sudah benar sejak awal: 211×263 adalah kotak pembatas **sesudah** rotasi, dan karena
rotasinya sudah ada di dalam berkas, kotak itulah ukuran yang tepat.

**Berkas gambar yang isinya diganti tapi namanya tetap** — `kaos.png` sempat diganti isinya
dua kali; peramban terus menyajikan versi lama, jadi fotonya terlihat gepeng dan glow-nya
hilang padahal berkas di repo sudah benar. Sekarang bernama `kaos-render.png`. Kalau nanti
mengganti isi sebuah gambar, ganti juga namanya.

**Hero: awan dan matahari menempel ke kolom, bukan ke fotonya** — matahari dipasang
`left-90` (360 px) dari tepi kolom, jadi letaknya ikut berubah setiap kali kolomnya melebar.
Di layar lebar ia mendarat tepat di wajah, dan di 1024 px ia menyembul 38 px keluar layar
(itu juga sumber geser mendatar yang tercatat di atas). Sekarang keduanya ditempelkan ke
fotonya, dan bagian atas Hero diberi ruang lebih supaya kepala dan matahari tidak terpotong.

**Latar hitam pekat diganti warna kanvas rancangan** — `#0a0a0a` jadi `#1D2028`, plus butiran
halus dari `feTurbulence` di `html.dark`. Di hitam pekat, foto-foto kolase yang latarnya ikut
gelap terlihat seperti kotak yang menempel; di warna ini mereka menyatu.

**Render server dan klien berbeda (React #418)** — nilai awal tema dibaca dari `localStorage`
saat render pertama, jadi HTML klien tidak sama dengan HTML server dan React membuang seluruh
hasil render server lalu menyusunnya ulang. Sekarang provider selalu mulai dari terang (sama
dengan server) lalu memasang pilihan asli setelah mount, dan sebuah skrip kecil memasang kelas
`dark` sebelum React jalan supaya tidak ada kilatan. Catatan: `<head>` yang ditulis tangan di
App Router juga memicu error yang sama — skripnya harus diletakkan tanpa `<head>`.

**Bottom navbar** — enam tombol 56 px tidak muat di ponsel 320 px, jadi isinya meluber keluar
pil. Sekarang 40 px di bawah 360 px, 44 px sampai `sm`, 56 px di atasnya. Efek kaca yang
membelokkan konten di belakangnya sengaja **dipertahankan** karena memang diinginkan; yang
diperbaiki keterbacaannya, lewat bayangan di bawah tiap ikon dan peredam tipis. Meredam
efeknya sendiri (0,72 → 0,92 → 0,96) tidak berhasil karena efeknya digambar di atas peredam.

**Hero** — matahari tidak lagi menjulur ke atas foto. Sebelumnya bagian atas halaman harus
diberi ruang kosong hanya supaya dia tidak terpotong; sekarang dia duduk di dalam foto.
Awan juga tidak lagi keluar tepi kiri di ponsel.

**Metadata Figma tidak bisa dibaca apa adanya untuk node yang diputar** — `x`/`y` yang
diberikan adalah titik **sebelum** rotasi, sementara `width`/`height` sudah **sesudah** rotasi.
Pita marquee sempat meleset 62,75 px ke bawah karena ini (persis `1325 × sin 2,71°`). Untuk
node berotasi, posisinya diambil dari gambar rancangannya, bukan dari metadata.

**Nama yang salah tulis** — "LKS IT Solution **BAST** JAKARTA" → *East Jakarta*; "AWS
**Indonesian** Cloud Computing" → *AWS Sagasitas*; "Perhimpunan Pecinta **Alam** Putih" →
*Hitam Putih*; "PT. **Densa**" → *Denso*.

**Tanggal kerja** — semuanya meleset. Diperbaiki mengikuti LinkedIn, dan **TPM Group**
(pekerjaan sekarang) sebelumnya tidak ada sama sekali di portfolio.

**Skill Sets** — rancangannya daftar berpoin, implementasinya chip berjejer. PHP dan GSAP juga
hilang dari daftar.

**Tombol proyek mati** — semuanya `href="#"` dan memakai `<button>`; diklik tidak terjadi apa-apa.

---

## Sisa pekerjaan

1. **Hero belum diadu dengan node Figma-nya** (`246:12`). Yang dibereskan baru bug yang
   berdiri sendiri (awan dan matahari salah tempel, bagian atas terpotong); tata letak
   keseluruhannya — termasuk ruang kosong lebar antara teks dan foto — belum dibandingkan,
   karena kuota Figma MCP habis di tengah jalan.
2. **Foto Work Experience** — di rancangan ada foto kegiatan di atas tiap entri. Kodenya sudah
   siap menerima, tinggal berkasnya.
3. **Hero** — belum dibandingkan dengan node Figma-nya.
4. **Latest Projects** — isinya sudah benar, tapi tata letaknya belum diadu dengan node Figma.
5. **Tautan proyek** — P2HP Mobile App dan BicaraKita belum punya alamat.
6. **EduSafe vs BicaraKita** — Achievements menyebut EduSafe, kartu proyek menyebut BicaraKita,
   untuk lomba yang sama. Salah satunya keliru.
7. ~~**Kontras mode terang** — teks abu di latar putih terlalu tipis.~~ **Catatan ini keliru.**
   `rgba(0,0,0,0.6)` di atas putih ternyata **5,74 : 1**, lolos WCAG AA. Yang benar-benar rusak
   ada di tempat lain dan jauh lebih parah — lihat `RENCANA.md`: tombol kartu proyek memakai
   putih di atas cyan (**1,25 : 1**), dan di mode gelap dua tombol utama Hero memakai `#ededed`
   di atas cyan (**1,83 : 1**) dan di atas biru (**2,88 : 1**).
