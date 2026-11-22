# Google Search Console — yang perlu dilakukan pemilik domain

Domain website: `sangkarakarya.my.id`

## Verifikasi kepemilikan
1. Buka https://search.google.com/search-console dan masuk dengan akun Google pemilik bisnis.
2. Tambahkan properti tipe **Domain**, masukkan `sangkarakarya.my.id`.
3. Google akan memberi TXT DNS khusus yang diawali `google-site-verification=`. **Salin nilai asli dari Google; jangan buat token sendiri.**
4. Di pengelola DNS BOC untuk domain tersebut, tambahkan record TXT untuk host `@` / root domain (ikuti format panel).
5. Pastikan TXT tersimpan, lalu klik Verify di Search Console. Jangan menghapus A record GitHub Pages yang sudah aktif.
6. Dalam Search Console > Indexing > Sitemaps, masukkan `https://sangkarakarya.my.id/sitemap.xml`.
7. Gunakan URL Inspection pada homepage dan halaman layanan. Request Indexing bila perlu.

## URL penting
- https://sangkarakarya.my.id/
- https://sangkarakarya.my.id/website-company-profile/
- https://sangkarakarya.my.id/website-sekolah-pesantren/
- https://sangkarakarya.my.id/landing-page-umkm/
- https://sangkarakarya.my.id/sistem-web-custom/
- https://sangkarakarya.my.id/mulai/

## Data untuk laporan mingguan
Catat tanggal, halaman, kueri utama, impressions, clicks, CTR, average position, dan inquiry masuk.
Tunggu data yang nyata dari Search Console; kueri `site:` di Google bukan pengganti laporan indexing.

## Batasan
- Implementasi kode di GitHub **bukan** verifikasi akun Google.
- Belum ada Measurement ID GA4 dan belum ada kode tracking Google Analytics yang dipasang.
- Jangan membuat Google Business Profile untuk bisnis yang seluruh interaksi pelanggannya hanya online tanpa memenuhi persyaratan Google.
- Tidak ada jaminan hasil ranking Top 1 atau jangka waktu indexing.
