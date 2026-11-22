'use strict';
const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();

const toggle=document.querySelector('.menu-toggle');
const links=document.getElementById('nav-links');
if(toggle&&links){
  function setOpen(open){
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Tutup menu navigasi':'Buka menu navigasi');
    links.classList.toggle('is-open',open);
  }
  toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false);});
  document.addEventListener('click',e=>{
    if(!toggle.contains(e.target)&&!links.contains(e.target))setOpen(false);
  });
}
const anchors=[...document.querySelectorAll('.nav-links a[href^="#"]')];
if('IntersectionObserver' in window && anchors.length){
  const sections=anchors.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  const observer=new IntersectionObserver(entries=>{
    const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!active)return;
    anchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+active.target.id));
  },{rootMargin:'-18% 0px -64% 0px',threshold:[0,.15,.5]});
  sections.forEach(section=>observer.observe(section));
}
(function(){
  const conf=window.SANGKARA_CONFIG||{};
  const phone=typeof conf.whatsappNumber==='string'?conf.whatsappNumber.replace(/[^0-9]/g,''):'';
  const hasWhatsApp=/^[1-9][0-9]{8,14}$/.test(phone);
  const isBrief=window.location.pathname.replace(/index\.html$/,'')==='/mulai/';
  if(!hasWhatsApp && isBrief)return;
  const button=document.createElement('a');
  button.className='conversion-float';
  if(hasWhatsApp){
    button.href='https://wa.me/'+phone+'?text='+encodeURIComponent('Halo Sangkara Karya, saya ingin konsultasi website. Saya melihat halaman '+window.location.pathname+'.');
    button.target='_blank';
    button.rel='noopener noreferrer';
    button.setAttribute('aria-label','Konsultasi Sangkara Karya melalui WhatsApp');
    button.textContent='WhatsApp ↗';
    button.classList.add('has-whatsapp');
  }else{
    button.href='/mulai/?utm_source=website&utm_medium=floating_cta';
    button.setAttribute('aria-label','Mulai konsultasi website');
    button.textContent='Konsultasi ↗';
  }
  document.body.appendChild(button);
})();
