document.getElementById('year').textContent = new Date().getFullYear();
const toggle = document.querySelector('.menu-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => { const open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));
