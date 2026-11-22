'use strict';
(function () {
  const form = document.getElementById('brief-builder');
  const result = document.getElementById('brief-result');
  const preview = document.getElementById('brief-preview');
  const mail = document.getElementById('brief-mail');
  const copy = document.getElementById('brief-copy');
  const status = document.getElementById('brief-copy-status');
  if (!form || !result || !preview || !mail || !copy || !status) return;
  const source = new URLSearchParams(window.location.search);
  const safeCampaign = value => (value || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48);
  const campaign = ['utm_source', 'utm_medium', 'utm_campaign'].map(key => [key, safeCampaign(source.get(key))]).filter(entry => entry[1]);
  const field = id => document.getElementById(id).value.trim();
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const nama = field('brief-nama');
    const email = field('brief-email');
    const jenis = field('brief-jenis');
    const tujuan = field('brief-tujuan');
    const fitur = field('brief-fitur') || 'Belum dirinci';
    const budget = field('brief-budget') || 'Belum ditentukan';
    const waktu = field('brief-waktu') || 'Fleksibel';
    if (!nama || !email || !jenis || !tujuan) return;
    const body = [
      'Halo Sangkara Karya,',
      '',
      'Saya ingin mendiskusikan proyek website atau solusi digital.',
      '',
      'Nama: ' + nama,
      'Email: ' + email,
      'Jenis proyek: ' + jenis,
      'Tujuan utama: ' + tujuan,
      'Fitur / halaman: ' + fitur,
      'Perkiraan anggaran: ' + budget,
      'Target peluncuran: ' + waktu,
      ...(campaign.length ? ['', 'Sumber kunjungan (dari link):', ...campaign.map(pair => pair[0] + ': ' + pair[1])] : []),
      '',
      'Terima kasih.'
    ].join('\n');
    preview.value = body;
    const subject = 'Konsultasi Proyek Sangkara Karya - ' + jenis;
    mail.href = 'mailto:bussiness@allif.me?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    result.hidden = false;
    status.textContent = '';
    result.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'nearest'});
  });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preview.value);
      status.textContent = 'Ringkasan berhasil disalin.';
    } catch (error) {
      preview.focus();
      preview.select();
      status.textContent = 'Salin teks yang terseleksi dengan Ctrl+C (atau Copy pada HP).';
    }
  });
})();
