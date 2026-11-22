"use strict";
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("nav-menu");
if (menuButton && menu) {
  const setMenu = (isOpen) => {
    menu.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  };
  menuButton.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => { if (!menu.contains(e.target) && !menuButton.contains(e.target)) setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 760) setMenu(false); });
}

const form = document.getElementById("project-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const jenis = document.getElementById("jenis").value;
    const pesan = document.getElementById("pesan").value.trim();
    if (!nama || !email || !jenis || !pesan) return;
    const subject = "Konsultasi Proyek Sangkara Karya - " + jenis;
    const body = "Halo Sangkara Karya,\n\nSaya ingin konsultasi mengenai proyek digital.\n\nNama: " + nama + "\nEmail: " + email + "\nJenis kebutuhan: " + jenis + "\n\nDetail proyek:\n" + pesan + "\n\nTerima kasih.";
    window.location.href = "mailto:bussiness@allif.me?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
}
