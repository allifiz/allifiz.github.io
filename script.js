// ===== PARTICLE SYSTEM =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(138, 43, 226, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    
    // Connect particles
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.strokeStyle = `rgba(138, 43, 226, ${0.2 - distance / 500})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

// ===== CUSTOM CURSOR =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;
  
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  
  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;
});

// Cursor hover effects
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.transform = 'scale(2)';
    cursorOutline.style.transform = 'scale(1.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursorDot.style.transform = 'scale(1)';
    cursorOutline.style.transform = 'scale(1)';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(entry.target.dataset.animation || 'animate-fade-in-up');
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-progress')) {
        const width = entry.target.dataset.width;
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 200);
      }
      
      // Animate counters
      if (entry.target.classList.contains('stat-number')) {
        animateCounter(entry.target);
      }
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.glass-card, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in').forEach(el => {
  observer.observe(el);
});

// Observe skill bars
document.querySelectorAll('.skill-progress').forEach(el => {
  observer.observe(el);
});

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(el => {
  observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== 3D CARD TILT EFFECT =====
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ===== TYPING ANIMATION =====
const typingText = document.getElementById('typing-text');
if (typingText) {
  const text = 'Frontend Developer & UI/UX Designer';
  let index = 0;
  typingText.textContent = '';
  
  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  
  setTimeout(type, 1000);
}

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const nav = document.querySelector('.glass-nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
  }
  
  // Hide/show navbar on scroll
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.animate-float');
  
  parallaxElements.forEach(el => {
    const speed = 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.querySelector('.md\\:hidden button');
const navLinks = document.querySelector('.md\\:flex');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
    navLinks.classList.toggle('flex-col');
    navLinks.classList.toggle('absolute');
    navLinks.classList.toggle('top-full');
    navLinks.classList.toggle('left-0');
    navLinks.classList.toggle('w-full');
    navLinks.classList.toggle('bg-gray-900');
    navLinks.classList.toggle('p-6');
  });
}

console.log('🚀 Portfolio loaded successfully!');