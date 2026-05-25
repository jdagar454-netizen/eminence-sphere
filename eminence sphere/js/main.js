// ================================================================
// EMINENCE SPHERE — Main JavaScript
// ================================================================

(function () {
  'use strict';

  // ── Navbar scroll effect ──────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ── Mobile hamburger menu ─────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Active nav link highlight ─────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });

  // ── Scroll reveal animations ──────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Counter animation ─────────────────────────────────────────
  function animateCounter(el, target, suffix = '', duration = 2000) {
    const start = performance.now();
    const startVal = 0;
    const endVal = parseFloat(target);

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = startVal + (endVal - startVal) * eased;
      el.textContent = (Number.isInteger(endVal) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.dataset.target;
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

  // ── Hero particle canvas ──────────────────────────────────────
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    function initParticles(count = 80) {
      particles = Array.from({ length: count }, createParticle);
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const opacity = p.opacity * (0.6 + 0.4 * Math.sin(time + p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    initParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

  // ── Contact form validation ───────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const successMsg = document.getElementById('form-success');

    function validateField(group, input) {
      const value = input.value.trim();
      const type = input.type || input.tagName.toLowerCase();
      let valid = true;

      if (input.required && !value) {
        valid = false;
      } else if (type === 'email' && value) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      } else if (input.dataset.minlength && value.length < parseInt(input.dataset.minlength)) {
        valid = false;
      }

      group.classList.toggle('has-error', !valid);
      return valid;
    }

    // Real-time validation
    contactForm.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
      input.addEventListener('blur', () => {
        const group = input.closest('.form-group');
        if (group) validateField(group, input);
      });
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group?.classList.contains('has-error')) validateField(group, input);
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;

      contactForm.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
        const group = input.closest('.form-group');
        if (group && !validateField(group, input)) allValid = false;
      });

      if (allValid) {
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Sending…';

        setTimeout(() => {
          contactForm.style.display = 'none';
          if (successMsg) successMsg.classList.add('show');
        }, 1200);
      }
    });
  }

  // ── Smooth scroll for anchor links ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 96;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
