import * as THREE from 'three';

// =============================================
// 1. LENIS SMOOTH SCROLL — faster duration
// =============================================
const lenis = new Lenis({
  duration: 0.75,         // snappier than default 1.3
  easing: t => 1 - Math.pow(1 - t, 4),
  smooth: true,
});

// Single RAF — do NOT also pass to gsap.ticker
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// =============================================
// 2. THREE.JS — minimal lightweight background
// =============================================
const canvas = document.getElementById('webgl');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearAlpha(0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 50);
camera.position.set(0, 0, 7);

// 5 very simple edge-only wireframe panels – no solid mesh geometry
const panelGroup = new THREE.Group();
[
  { w: 3, h: 4.5, x: -4.2, y: 1, z: -3, ry: -0.3, c: 0xdc2626, o: 0.11 },
  { w: 2, h: 5.5, x: 4.8, y: -0.5, z: -4, ry: 0.4, c: 0x99aacc, o: 0.13 },
  { w: 4.5, h: 1.8, x: 1.5, y: 3.5, z: -5, ry: -0.15, c: 0xdc2626, o: 0.09 },
  { w: 1.2, h: 3.5, x: 3.2, y: -2.5, z: -2, ry: 0.3, c: 0x99aacc, o: 0.12 },
  { w: 2.5, h: 1.5, x: -5, y: -1.5, z: -4, ry: 0.1, c: 0xdc2626, o: 0.08 },
].forEach(cfg => {
  const geo = new THREE.PlaneGeometry(cfg.w, cfg.h);
  const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color: cfg.c, transparent: true, opacity: cfg.o })
  );
  geo.dispose();
  line.position.set(cfg.x, cfg.y, cfg.z);
  line.rotation.y = cfg.ry;
  panelGroup.add(line);
});
scene.add(panelGroup);

// Light particle field — 150 points only
const pArr = new Float32Array(150 * 3);
for (let i = 0; i < pArr.length; i++) pArr[i] = (Math.random() - 0.5) * 20;
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
  color: 0xdc2626, size: 0.03, transparent: true, opacity: 0.2
}));
scene.add(particles);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}, { passive: true });

// Mouse parallax (smoothed)
let mx = 0, my = 0, tx = 0, ty = 0;
window.addEventListener('mousemove', e => {
  mx = (e.clientX / innerWidth - 0.5) * 0.4;
  my = (e.clientY / innerHeight - 0.5) * 0.3;
}, { passive: true });

// Three.js render loop (separate from Lenis RAF — intentional)
const clock = new THREE.Clock();
(function render3D() {
  requestAnimationFrame(render3D);
  const t = clock.getElapsedTime();
  tx += (mx - tx) * 0.035;
  ty += (my - ty) * 0.035;
  panelGroup.rotation.y += (tx - panelGroup.rotation.y) * 0.025 + 0.0005;
  panelGroup.rotation.x += (-ty - panelGroup.rotation.x) * 0.025;
  particles.rotation.y = t * 0.018;
  renderer.render(scene, camera);
})();

// =============================================
// 3. HERO CARD TILT
// =============================================
const tiltCard = document.getElementById('heroCard');
if (tiltCard) {
  window.addEventListener('mousemove', e => {
    const r = tiltCard.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / r.width;
    const dy = (e.clientY - r.top - r.height / 2) / r.height;
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) { tiltCard.style.transform = ''; return; }
    tiltCard.style.transform = `perspective(1000px) rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg)`;
  }, { passive: true });
}

// =============================================
// 4. NAVBAR
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// =============================================
// 5. SCROLL REVEALS — native IntersectionObserver
//    No GSAP, no ScrollTrigger = zero delay
// =============================================
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target); // fire once only
    }
  });
}, { threshold: 0.08 }); // trigger as soon as 8% is visible

// Observe reveals and hero elements
document.querySelectorAll('.reveal, .anim-fade-up').forEach(el => io.observe(el));

// Hero elements: mark visible immediately on load (they're already on-screen)
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.anim-fade-up').forEach(el => {
    el.classList.add('visible');
  });
});

// Project rows: dedicated observer that directly sets inline styles to avoid
// the specificity conflict between inline style opacity:0 and .visible class
const projectIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      projectIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.project-row').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(36px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  projectIO.observe(el);
});

// =============================================
// 6. COUNT-UP STATS — GSAP used only here
// =============================================
gsap.registerPlugin(ScrollTrigger);

function countUp(el, target, suffix, prefix) {
  const decimal = target % 1 !== 0;
  gsap.fromTo({ v: 0 }, { v: target }, {
    duration: 1.6, ease: 'power2.out',
    onUpdate() {
      const v = this.targets()[0].v;
      el.textContent = prefix + (decimal ? v.toFixed(1) : Math.floor(v).toLocaleString()) + suffix;
    }
  });
}

ScrollTrigger.create({
  trigger: '.stats-band',
  start: 'top 90%',
  once: true,
  onEnter() {
    document.querySelectorAll('.counter').forEach(el => {
      countUp(el, parseFloat(el.dataset.target), el.dataset.suffix || '', el.dataset.prefix || '');
    });
    document.querySelectorAll('.metric-num').forEach(el => {
      const t = parseFloat(el.dataset.count);
      if (t) countUp(el, t, el.dataset.suffix || '', '');
    });
  }
});
