/* ============================================
   HINES — Modern SaaS Real Estate Platform
   Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────── Navigation ───────
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // ─────── Scroll Reveal ───────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─────── Animated Counters ───────
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;

      if (isDecimal) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.round(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ─────── 3D Building Tilt ───────
  const heroBuilding = document.getElementById('heroBuilding');
  const buildingInner = document.getElementById('heroBuildingInner');

  if (heroBuilding && buildingInner) {
    heroBuilding.addEventListener('mousemove', (e) => {
      const rect = heroBuilding.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt (max ±12 degrees)
      const rotateY = ((x - centerX) / centerX) * 12;
      const rotateX = -((y - centerY) / centerY) * 8;

      buildingInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    heroBuilding.addEventListener('mouseleave', () => {
      buildingInner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  }

  // ─────── Map Pin Hover ───────
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      pin.style.transform = 'translate(-50%, -50%) scale(1.5)';
      pin.style.boxShadow = '0 0 20px rgba(79,110,247,0.5)';
    });
    pin.addEventListener('mouseleave', () => {
      pin.style.transform = 'translate(-50%, -50%) scale(1)';
      pin.style.boxShadow = '0 0 10px rgba(79,110,247,0.3)';
    });
  });

  // ─────── Project Modal ───────
  const projectCards = document.querySelectorAll('.project-card');
  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('projectModalClose');

  function openModal(card) {
    document.getElementById('modalImage').src = card.dataset.projectImage;
    document.getElementById('modalImage').alt = card.dataset.projectName;
    document.getElementById('modalLocationText').textContent = card.dataset.projectLocation;
    document.getElementById('modalName').textContent = card.dataset.projectName;
    document.getElementById('modalDesc').textContent = card.dataset.projectDesc;
    document.getElementById('modalYear').textContent = card.dataset.projectYear;
    document.getElementById('modalSize').textContent = card.dataset.projectSize;
    document.getElementById('modalFloors').textContent = card.dataset.projectFloors;

    document.body.classList.add('modal-open');
    modalBackdrop.classList.add('active');
    requestAnimationFrame(() => modal.classList.add('active'));
  }

  function closeModal() {
    modal.classList.remove('active');
    modalBackdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  projectCards.forEach(card => card.addEventListener('click', () => openModal(card)));
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // ─────── Smooth Image Load ───────
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
  });

  // ─────── Body Load ───────
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.5s ease';
});
