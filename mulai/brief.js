'use strict';
(function(){
  const form=document.getElementById('brief-builder'),result=document.getElementById('brief-result');
  const preview=document.getElementById('brief-preview'),mail=document.getElementById('brief-mail');
  const copy=document.getElementById('brief-copy'),status=document.getElementById('brief-copy-status');
  const requestStatus=document.getElementById('brief-request-status'),submit=document.getElementById('brief-send');
  const help=document.getElementById('brief-result-help');
  if(!form||!result||!preview||!mail||!copy||!status||!requestStatus||!submit)return;
  const query=new URLSearchParams(window.location.search);
  const clean=value=>(value||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,48);
  const campaign=['utm_source','utm_medium','utm_campaign'].map(k=>[k,clean(query.get(k))]).filter(x=>x[1]);
  const field=id=>document.getElementById(id).value.trim();
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(submit.disabled||!form.reportValidity())return;
    if(form.querySelector('[name="_honey"]').value)return;
    const nama=field('brief-nama'),email=field('brief-email'),jenis=field('brief-jenis'),tujuan=field('brief-tujuan');
    if(!nama||!email||!jenis||!tujuan)return;
    const fitur=field('brief-fitur')||'Belum dirinci',budget=field('brief-budget')||'Belum ditentukan',waktu=field('brief-waktu')||'Fleksibel';
    const body=[
      'Halo Sangkara Karya,','',
      'Saya ingin mendiskusikan proyek website atau solusi digital.','',
      'Nama: '+nama,'Email: '+email,'Jenis proyek: '+jenis,'Tujuan: '+tujuan,
      'Fitur / halaman: '+fitur,'Anggaran: '+budget,'Target waktu: '+waktu,
      ...(campaign.length?['','Sumber kunjungan:',...campaign.map(pair=>pair[0]+': '+pair[1])]:[]),
      '','Terima kasih.'
    ].join('\n');
    const subject='Konsultasi Proyek - '+jenis;
    preview.value=body;
    mail.href='mailto:bussiness@allif.me?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    result.hidden=false;
    requestStatus.className='start-request-status';
    requestStatus.textContent='Mengirim permintaan…';
    submit.disabled=true;submit.textContent='Mengirim…';
    const data=new FormData(form);
    data.set('_subject',subject);
    data.set('_url',window.location.origin+window.location.pathname);
    data.set('message',body);
    for(const [k,v] of campaign)data.set(k,v);
    const endpoint=window.SANGKARA_CONFIG&&window.SANGKARA_CONFIG.formEndpoint;
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),20000);
    try{
      if(!endpoint||!endpoint.startsWith('https://formsubmit.co/ajax/'))throw new Error('Form endpoint belum ada');
      const response=await fetch(endpoint,{method:'POST',body:data,signal:controller.signal,headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error('HTTP '+response.status);
      const json=await response.json();
      if(!(json.success===true||json.success==='true'))throw new Error(json.message||'Permintaan ditolak');
      requestStatus.className='start-request-status is-success';
      requestStatus.textContent='Permintaan diterima layanan formulir. Pesan masuk ke inbox setelah email penerima diaktifkan dan diproses oleh penyedia.';
      help.textContent='Simpan ringkasan ini sebagai cadangan. Pengiriman pertama mungkin menunggu aktivasi FormSubmit oleh pemilik situs.';
      form.reset();
    }catch(error){
      requestStatus.className='start-request-status is-error';
      requestStatus.textContent='Pengiriman otomatis gagal atau belum dapat dipastikan. Gunakan tombol Buka email atau Salin ringkasan di bawah.';
      help.textContent='Ringkasanmu aman di halaman ini, tetapi belum terbukti terkirim ke inbox.';
    }finally{
      clearTimeout(timer);
      submit.disabled=false;submit.textContent='Kirim permintaan konsultasi ↗';
      result.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
    }
  });
  copy.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(preview.value);
      status.textContent='Ringkasan berhasil disalin.';
    }catch(error){
      preview.focus();preview.select();
      status.textContent='Salin teks yang terseleksi dengan Ctrl+C atau opsi Salin di HP.';
    }
  });
})();
