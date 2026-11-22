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
