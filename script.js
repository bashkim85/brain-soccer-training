// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.pillar-card, .plan-card, .tcard, .proof-item, .benefit-item, .about-grid, .contact-wrap, .section-header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

// Stagger pillar cards
document.querySelectorAll('.pillar-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '✓ Message sent — I\'ll be in touch soon!';
  btn.style.background = 'linear-gradient(135deg, #00c853, #00b0cc)';
  btn.disabled = true;
});

// Animate stat numbers on scroll
const statEls = document.querySelectorAll('.hstat strong');
let statsAnimated = false;
const statsObserver = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !statsAnimated) {
    statsAnimated = true;
    statEls.forEach(el => {
      const target = el.textContent;
      const isNum = /[\d.]+/.test(target);
      if (!isNum) return;
      const num = parseFloat(target.replace(/[^\d.]/g, ''));
      const suffix = target.replace(/[\d.]/g, '');
      let start = 0;
      const duration = 1200;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const val = Math.floor(progress * num);
        el.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    });
  }
});
if (statEls.length) statsObserver.observe(statEls[0].closest('.hero-stats') || document.body);
