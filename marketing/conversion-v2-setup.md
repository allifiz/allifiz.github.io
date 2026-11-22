# Conversion Optimization V2 — Sangkara Karya

Status: **kode dipasang; pengiriman email, WhatsApp, dan GA4 memerlukan aktivasi/pengaturan dari pemilik**.

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
- Isi `whatsappNumber` di file `config.js` dengan nomor **WhatsApp bisnis asli** memakai format internasional tanpa tanda plus, misalnya format `628...`. Jangan masukkan angka contoh atau nomor pribadi tanpa izin.
- Jika nomor valid, CTA mengambang memakai tautan resmi `https://wa.me/<nomor>?text=...` dan konteks halaman saat ini.
- Jika nomor belum ada, CTA mengambang secara jujur memakai label **Konsultasi** dan mengarah ke `/mulai/`.
- Buka di HP dan desktop untuk memeriksa target chat yang benar sebelum mempromosikannya.

## Google Analytics 4
- Buat akun/property di https://analytics.google.com/, pilih data stream **Web** untuk `https://sangkarakarya.my.id`.
- Dapatkan **Measurement ID** asli yang berformat `G-...`, lalu isi `ga4MeasurementId` di `config.js`.
- Dengan ID kosong, **tidak ada Google tag yang dikirim** dan tidak ada laporan GA4.
- Dengan ID valid, pengunjung ditanya izin sebelum skrip Google Analytics dimuat. Preferensi disimpan lokal dan dapat diubah melalui tombol Privasi.
- Script `analytics.js` hanya mengirim event tanpa email, nama, pesan brief atau nomor kontak.
- Event yang tersedia: `page_view` dari GA4, `view_service`, `consultation_click`, `begin_brief`, `submit_brief`, `brief_error`, `whatsapp_click`, `contact_click`.
- `submit_brief` berarti FormSubmit merespons sukses, **bukan bukti email sampai inbox atau menjadi pelanggan**.
- Uji melalui Google Analytics > Realtime / DebugView dan Google Tag Assistant; kemudian tandai event yang relevan sebagai key event sesuai kebutuhan.

## Checklist uji setelah konfigurasi
1. Pastikan `https://sangkarakarya.my.id/mulai/` terbuka dan dapat mengisi validasi form.
2. Kirim **satu tes dari data sendiri**, kemudian cek inbox email bisnis (serta tautan aktivasi FormSubmit).
3. Setelah aktivasi, ulangi tes dan verifikasi pesan benar-benar tiba di inbox.
4. Uji jaringan gagal/offline: tampilkan error dan salinan brief, bukan konfirmasi palsu.
5. Aktifkan nomor WhatsApp asli, lalu pastikan tombol membuka chat yang benar.
6. Masukkan Measurement ID, uji consent Tolak/Izinkan, kemudian cek Page View dan event di Realtime.
7. Pastikan semua halaman navigasi/mobile tetap normal; jangan mengubah DNS/hosting karena implementasi ini.

## Batasan teknis
GitHub Pages adalah hosting statis, tidak ada API/SMTP backend bawaan. Pengiriman email bergantung pada FormSubmit dan aktivasi inbox; GA4 memerlukan Measurement ID dari Google; WhatsApp memerlukan nomor yang disetujui pemilik. Tidak ada klaim bahwa integrasi eksternal sudah aktif sebelum diuji.
