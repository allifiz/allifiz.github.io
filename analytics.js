'use strict';
(function(){
  const id=(window.SANGKARA_CONFIG?.ga4MeasurementId||"").trim();
  const valid=/^G-[A-Z0-9]{5,20}$/.test(id);
  const key="sangkara.analytics.consent.v1";
  let choice=null;
  try{choice=localStorage.getItem(key);}catch(e){}
  let allowed=choice==="yes";
  let loaded=false;
  function start(){
    if(!valid||!allowed||loaded)return;
    loaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag("js",new Date());
    window.gtag("config",id);
    const script=document.createElement("script");
    script.async=true;
    script.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(id);
    document.head.appendChild(script);
  }
  window.SangkaraTrack=function(name,params={}){
    if(!valid||!allowed||!loaded||typeof window.gtag!=="function")return;
    if(!/^[a-z][a-z0-9_]{0,39}$/.test(name))return;
    const safe={};
    for(const prop of ["event_category","service_type","link_type","source"]){
      if(typeof params[prop]==="string")safe[prop]=params[prop].slice(0,65);
    }
    window.gtag("event",name,safe);
  };
  function show(force=false){
    if(!valid||(!force&&choice!==null)||document.querySelector(".analytics-consent"))return;
    const banner=document.createElement("aside");
    banner.className="analytics-consent";
    banner.setAttribute("aria-label","Izin pengukuran website");
    const text=document.createElement("p");
    text.textContent="Boleh kami menggunakan analitik untuk memahami kunjungan? Isi formulir dan data kontak tidak dikirim ke Google Analytics.";
    const buttons=document.createElement("div");
    for(const [label,value] of [["Tolak","no"],["Izinkan","yes"]]){
      const button=document.createElement("button");
      button.type="button";button.textContent=label;
      button.addEventListener("click",()=>{
        const previous=allowed;
        choice=value;
        allowed=value==="yes";
        try{localStorage.setItem(key,value);}catch(e){}
        banner.remove();
        if(allowed)start();
        if(previous&&!allowed)window.location.reload();
      });
      buttons.appendChild(button);
    }
    banner.append(text,buttons);
    document.body.appendChild(banner);
  }
  function init(){
    if(!valid)return;
    const privacy=document.createElement("button");
    privacy.type="button";
    privacy.className="analytics-pref";
    privacy.textContent="Privasi";
    privacy.setAttribute("aria-label","Ubah preferensi analitik");
    privacy.addEventListener("click",()=>show(true));
    document.body.appendChild(privacy);
    show();
  }
  start();
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
  else init();
})();
