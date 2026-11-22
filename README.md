# Sangkara Karya

Website profil studio **Sangkara Karya**, web & digital studio berbasis di Garut, Indonesia. Dipublikasikan sebagai situs statis menggunakan GitHub Pages.

## Identitas visual

Desain mengikuti mockup dark editorial: latar **navy gelap**, tipografi **putih-krem**, dan aksen **tembaga** yang selaras dengan logo bunga Sangkara Karya.

- Warna: navy `#091b28`, navy lebih gelap `#071622`, tembaga `#d0742e`, krem `#fff0dc`.
- Font: DM Serif Display (judul) dan DM Sans (antarmuka).
- `favicon.svg`: simbol bunga Sangkara Karya (tanpa tulisan).
- `assets/hero-facade.webp`: visual fasad gedung dengan simbol bunga berwarna tembaga, berasal dari aset gambar yang dipilih pemilik situs, dioptimalkan menjadi WebP untuk hero.
- Kartu portofolio menggunakan ilustrasi konsep, **bukan tangkapan layar proyek nyata**.

## Pengembangan lokal

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000`.

## Deploy

GitHub Pages dari branch `main`, dengan domain kustom di file `CNAME` (`sangkarakarya.my.id`). Tidak memerlukan build step.

## Kontak

Email: `bussiness@allif.me` (alamat yang telah digunakan di website sebelumnya, pastikan tetap aktif). Tautan konsultasi memakai `mailto:` dan tidak mengirim pesan otomatis.

## Pengaturan domain baru

Domain web: `sangkarakarya.my.id` (terdaftar di BOC). DNS apex menggunakan empat A record GitHub Pages `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. `www` (opsional tetapi direkomendasikan) menggunakan CNAME ke `allifiz.github.io`. Pastikan Custom domain pada Settings > Pages sesuai dan Enforce HTTPS diaktifkan setelah sertifikat tersedia. Email `bussiness@allif.me` tetap digunakan sebagai kontak sampai layanan email baru disiapkan.

## SEO 2026
- Beranda dioptimalkan untuk pencarian jasa website di Garut.
- Halaman layanan khusus: /website-company-profile/, /website-sekolah-pesantren/, /landing-page-umkm/, /sistem-web-custom/.
- Sitemap mencantumkan 5 URL. SEO CSS di `seo.css`.
- Media sosial dan Search Console harus dihubungkan lewat akun pemilik.
- Rencana konten ada di `marketing/30-day-growth-plan.md`.

## Mulai Proyek (social landing)
- `/mulai/` adalah halaman untuk link bio TikTok dan Instagram.
- Pembuat brief menggunakan JavaScript di browser; pesan tidak disimpan atau dikirim otomatis.
- Parameter `utm_source`, `utm_medium`, `utm_campaign` disertakan dalam brief jika pengunjung benar-benar menyiapkan pesan.
- Skrip video dan bio tersedia di `marketing/social-launch-kit.md`.
- Setup Search Console tersedia di `marketing/google-search-console.md` dan **masih memerlukan verifikasi TXT oleh pemilik domain**.

## Conversion Optimization V2
- `/mulai/` sekarang mendukung pengiriman AJAX melalui FormSubmit, dengan fallback email dan salin ringkasan.
- `config.js` berisi konfigurasi publik untuk email, nomor WhatsApp, dan ID GA4. Nomor WhatsApp dan Measurement ID belum diberikan dan sengaja dibiarkan kosong.
- `analytics.js` menangani event serta persetujuan analitik; `script.js` menangani CTA mengambang.
- **Panduan aktivasi wajib:** `marketing/conversion-v2-setup.md`.
