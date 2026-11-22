# Conversion Optimization V2 — Sangkara Karya

Status: **WhatsApp dikonfigurasi. FormSubmit tetap perlu aktivasi inbox. GA4 tidak dipakai.**

## Formulir konsultasi langsung
- Halaman: `https://sangkarakarya.my.id/mulai/`.
- HTML form action fallback (tanpa JS): `https://formsubmit.co/bussiness@allif.me`.
- AJAX form endpoint: `https://formsubmit.co/ajax/bussiness@allif.me`.
- Pengguna mengisi brief, menekan kirim, lalu melihat respons dari layanan.
- Jika respons error/network timeout, form **tidak** menampilkan klaim pesan berhasil terkirim; teks brief masih tersedia untuk disalin atau dibuka di aplikasi email.
- Layanan pihak ketiga FormSubmit memproses data (nama, email, kebutuhan, anggaran, dll.) dan menurut dokumentasinya menyimpan submission sampai 30 hari; periksa kebijakan layanan sebelum menggunakan untuk data sensitif.
- Honeypot sederhana digunakan untuk mengurangi spam, tetapi ini bukan pengganti CAPTCHA/rate limit di backend.
- Pengiriman pertama ke alamat email baru memicu **email aktivasi FormSubmit**. Buka inbox `bussiness@allif.me`, cek Spam, klik tautan aktivasi yang benar, lalu kirim ulang formulir untuk uji nyata.
- Aktivasi belum dilakukan dari ChatGPT. **Jangan mengandalkan channel ini untuk lead sungguhan sebelum uji penerimaan inbox berhasil.**

## WhatsApp
- Nomor WhatsApp resmi yang disampaikan pemilik: **085759907854**.
- Format tautan internasional: `6285759907854`.
- CTA mengambang seluruh halaman membuka `https://wa.me/6285759907854` dengan pesan awal dan konteks halaman.
- Footer seluruh halaman memiliki tombol WhatsApp langsung.
- Verifikasi di perangkat sebelum promosi: nomor, akun WhatsApp aktif, dan penerima chat sesuai.

## Analitik
- Pemilik memilih tidak menggunakan GA4. Script GA4, banner analitik, konfigurasi Measurement ID, dan event tracking sudah dihapus dari website.
- FormSubmit tetap digunakan sebagai kanal pengiriman brief; fitur ini bukan sistem analitik.

## Checklist uji setelah konfigurasi
1. Pastikan `https://sangkarakarya.my.id/mulai/` terbuka dan dapat mengisi validasi form.
2. Kirim **satu tes dari data sendiri**, kemudian cek inbox email bisnis (serta tautan aktivasi FormSubmit).
3. Setelah aktivasi, ulangi tes dan verifikasi pesan benar-benar tiba di inbox.
4. Uji jaringan gagal/offline: tampilkan error dan salinan brief, bukan konfirmasi palsu.
5. Uji tombol WhatsApp dan footer di desktop serta HP. Pastikan chat ke 085759907854.
6. Pastikan tidak ada banner izin analitik atau request GA4 yang tersisa.
7. Pastikan semua halaman navigasi/mobile tetap normal; jangan mengubah DNS/hosting karena implementasi ini.

## Batasan teknis
GitHub Pages adalah hosting statis, tidak ada API/SMTP backend bawaan. Pengiriman email bergantung pada FormSubmit dan aktivasi inbox. WhatsApp memakai nomor yang diberikan pemilik, tetapi chat nyata belum diverifikasi melalui aplikasi WhatsApp.
