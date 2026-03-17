/* ============================================
   JAYANT SHARMA PORTFOLIO – JAVASCRIPT
   ============================================ */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// ---- TYPEWRITER EFFECT ----
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Stunning Websites',
  'Mobile Applications',
  'AI-Powered Platforms',
  'E-Commerce Stores',
  'Real Estate Solutions',
  'CRM Systems',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typeTimeout = setTimeout(type, delay);
}
type();

// ---- SCROLL REVEAL (PROJECT CARDS) ----
const animatedEls = document.querySelectorAll('[data-animation="fade-up"]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => observer.observe(el));

// ---- GENERAL FADE-IN ON SCROLL ----
const fadeEls = document.querySelectorAll('.skill-card, .ai-feature-card, .highlight-item');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(24px)';
      entry.target.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
      setTimeout(() => {
        entry.target.style.opacity = '';
        entry.target.style.transform = '';
      }, 50);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  fadeObserver.observe(el);
});

// ---- CONTACT FORM ----
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Build mailto link
  const mailtoLink = `mailto:jayyantsharma@gmail.com?subject=Portfolio Inquiry – ${encodeURIComponent(subject)}&body=Hi Jayant,%0D%0A%0D%0AMy name is ${encodeURIComponent(name)}.%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AContact: ${encodeURIComponent(email)}`;

  btn.textContent = 'Opening Mail Client...';
  btn.style.opacity = '0.8';

  window.location.href = mailtoLink;

  setTimeout(() => {
    btn.innerHTML = `Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    btn.style.opacity = '';
  }, 2000);
}

// ---- SMOOTH SCROLL FOR ALL ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- CURSOR GLOW EFFECT (desktop only) ----
if (window.matchMedia('(min-width: 1024px)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ---- HERO STATS COUNTER ANIMATION ----
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 40);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(num => {
        const text = num.textContent;
        const val = parseInt(text);
        const suffix = text.replace(val.toString(), '');
        animateCounter(num, val, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
