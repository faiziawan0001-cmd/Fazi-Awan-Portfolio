/* ============================================================
   MAIN.JS — Fazi Awan Portfolio (Luxury Edition)
   ============================================================ */
'use strict';

/* ── DOM References ── */
const navbar       = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu   = document.getElementById('mobile-menu');
const contactForm  = document.getElementById('contact-form');
const navLinks     = document.querySelectorAll('.nav-link');
const sections     = document.querySelectorAll('section[id]');
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const caseStudyModal = document.getElementById('case-study-modal');
const modalPanel   = document.getElementById('modal-panel');
const modalBackdrop = document.getElementById('modal-backdrop');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle   = document.getElementById('modal-title');
const modalTags    = document.getElementById('modal-tags');
const modalProblem = document.getElementById('modal-problem');
const modalSolution = document.getElementById('modal-solution');
const modalImpact  = document.getElementById('modal-impact');
const modalGallery = document.getElementById('modal-gallery');

/* =================================================================
   LUXURY 1: INTERACTIVE PARTICLE CANVAS
   - Floating particles that connect when near each other or the mouse
   - Decorative ambient background layer for the portfolio
================================================================== */
(function initParticleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'portfolio-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let mouse = { x: -9999, y: -9999 };
  let particles = [];
  const PARTICLE_COUNT = 80;
  const CONNECT_DIST = 140;
  const MOUSE_DIST = 160;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  document.addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
  });

  function rand(a, b) { return Math.random() * (b - a) + a; }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = rand(0, window.innerWidth);
      this.y  = init ? rand(0, window.innerHeight) : -10;
      this.vx = rand(-0.25, 0.25);
      this.vy = rand(0.1, 0.4);
      this.r  = rand(1, 2.2);
      this.alpha = rand(0.3, 0.8);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > window.innerHeight + 10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 181, 153, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      // Particle–particle connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 94, 0, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Particle–mouse connections
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_DIST) {
        const alpha = (1 - dist / MOUSE_DIST) * 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 181, 153, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* =================================================================
   LUXURY 2: MAGNETIC CUSTOM CURSOR WITH BLEND RING
================================================================== */
(function initCursor() {
  if (window.innerWidth < 768) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.id  = 'custom-cursor';
  ring.id = 'custom-cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0;  // mouse position
  let rx = 0, ry = 0;  // ring position (lagged)

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  }, { passive: true });

  // Smooth ring follows cursor with physics lag
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  })();

  // Hover states — expand ring on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .magnetic, .project-card, .beam-card, .glow-card'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    });
  });

  // Click pulse
  document.addEventListener('mousedown', () => dot.classList.add('cursor-clicking'));
  document.addEventListener('mouseup',   () => dot.classList.remove('cursor-clicking'));
})();

/* =================================================================
   LUXURY 3: MOUSE-TRACKING GLOW INSIDE CARDS
================================================================== */
(function initGlowCards() {
  const cards = document.querySelectorAll('.glow-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });
})();

/* =================================================================
   LUXURY 4: SCROLL-DRIVEN TEXT REVEAL (IntersectionObserver)
================================================================== */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-text, .clip-reveal, .expertise-reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
})();

/* =================================================================
   LUXURY 5: HERO ANIMATIONS ON LOAD
================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const heroAnims = document.querySelectorAll('.hero-anim');
  setTimeout(() => {
    heroAnims.forEach(el => {
      const existingDelay = el.style.transitionDelay || '0ms';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${existingDelay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${existingDelay}`;
    });
  }, 200);

  // Typewriter Effect
  const roles = ['Software Developer', 'UI/UX Specialist', 'AI Engineer'];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  const typeEl = document.querySelector('.typewriter-text');

  function typeEffect() {
    if (!typeEl) return;
    const current = roles[roleIndex];
    typeEl.innerText = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);
    isDeleting ? charIndex-- : charIndex++;

    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500;
    }
    setTimeout(typeEffect, speed);
  }
  if (typeEl) setTimeout(typeEffect, 1800);

  // Initial reveal for static reveal-text elements already in viewport
  setTimeout(() => {
    document.querySelectorAll('.reveal-text, .expertise-reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('is-revealed');
    });
  }, 100);

  // ── Jitu Navbar: scroll class + active link ──
  const jituNav = document.getElementById('navbar');
  const jituLinks = document.querySelectorAll('[data-nav]');
  const sections = ['hero','expertise','work','experience','testimonials']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function onNavScroll() {
    if (!jituNav) return;
    // Frosted glass after scrolling 60px
    jituNav.classList.toggle('scrolled', window.scrollY > 60);

    // Active link highlight
    let current = 'hero';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    jituLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll(); // run once on load
});


/* =================================================================
   LUXURY 6: MAGNETIC BUTTONS
================================================================== */
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach(elem => {
  elem.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const rect = elem.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    elem.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  });
  elem.addEventListener('mouseleave', () => {
    elem.style.transform = 'translate(0px, 0px)';
  });
});

/* =================================================================
   7. NAVBAR SCROLL BEHAVIOUR
================================================================== */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('nav-backdrop', 'border-surface-border');
    navbar.classList.remove('bg-transparent', 'border-transparent');
    navbar.style.boxShadow = '0 4px 40px rgba(0,0,0,0.5)';
  } else {
    navbar.classList.remove('nav-backdrop', 'border-surface-border');
    navbar.classList.add('bg-transparent', 'border-transparent');
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });

/* =================================================================
   7b. SCROLL TO TOP BUTTON
================================================================== */
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    btn.style.setProperty('--p', p.toFixed(3));
  }

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
    updateProgress();
  }, { passive: true });
  updateProgress();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =================================================================
   8. ACTIVE NAV LINK (IntersectionObserver)
================================================================== */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', href === id);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
sections.forEach(s => sectionObserver.observe(s));

/* =================================================================
   9. MOBILE MENU TOGGLE
================================================================== */
mobileMenuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
  icon.textContent = isOpen ? 'menu' : 'close';
});

window.closeMobileMenu = function () {
  mobileMenu.classList.add('hidden');
  mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
};

/* =================================================================
   10. PROJECT GRID FILTERING
================================================================== */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      card.classList.toggle('filtered-out', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

/* =================================================================
   11. CASE STUDY MODAL
================================================================== */
const projectData = {
  'flight-local': {
    title: 'Flight Local',
    tags: ['React', 'GraphQL', 'Material UI', 'Node.js'],
    problem: 'Travel agencies struggle with legacy system timeouts during high-traffic windows. Flight Local needed a lightning-fast dashboard to query consolidated flight information from multiple APIs in real time.',
    solution: 'I designed a GraphQL aggregator on top of a Redis-cached database layer. The front-end queries only what it needs, and the backend handles concurrent API fetch parallelization via Node.js cluster processes.',
    impact: 'Reduced overall search page query time by 80%, decreasing reservation timeouts to nearly 0% and improving agency booking output.'
  },
  'crypto-bot': {
    title: 'Crypto Arbitrage Bot',
    tags: ['Python', 'Binance API', 'WebSockets', 'Redis'],
    problem: 'Cross-exchange price gaps across crypto markets last only fractions of a second. Manually chasing these spreads was impossible, and off-the-shelf tools were too slow and opaque.',
    solution: 'Built a real-time arbitrage engine that streams order books over WebSockets, normalizes fees across exchanges, and executes spread trades through the Binance API while persisting opportunities to a Redis-backed scoring layer.',
    impact: 'Detected over 200,000 arbitrage windows in a 30-day backtest and reduced average detection-to-execution latency to under 300ms.',
    images: ['assets/crypto bot/Arbitrage bot Dashboard.png', 'assets/crypto bot/Arbitrage bot 2.png', 'assets/crypto bot/Pic 3.png']
  },
  'khora': {
    title: 'Khora – Urban Thinkers',
    tags: ['JavaScript', 'Leaflet.js', 'D3.js', 'GeoJSON'],
    problem: 'Urban development consultants at Khora needed to present massive, complex geographic datasets regarding zoning, density, and public transit maps to municipal boards without performance lag.',
    solution: 'Created an interactive map platform powered by Leaflet.js and optimized vector layers. Used D3.js to render real-time interactive charting synced directly to map coordinates.',
    impact: 'Reduced browser memory footprint during complex mapping queries by 60%, ensuring fully smooth presentations on tablets.'
  },
  'crown-cafe': {
    title: 'Crown Cafe App',
    tags: ['JavaScript', 'AOS.js', 'HTML5', 'CSS3'],
    problem: 'Crown Cafe needed to transition their physical dining presence into an elegant web application that replicated their upscale bar and roastery ambiance while supporting clean online menus.',
    solution: 'Engineered a custom multi-page website with scroll-triggered animations (AOS.js), a dynamic online order checkout flow, and custom typography to fit their signature aesthetics.',
    impact: 'Helped capture over 5,000 online orders in the launch month while providing a responsive user experience across all smartphone screens.'
  },
  'aeroquest': {
    title: 'AeroQuest Flight Engine',
    tags: ['React Native', 'SQLite', 'Expo', 'Redux Toolkit'],
    problem: 'Frequent flyers needed to search, track, and bookmark complex itineraries and travel codes while on the move, including in areas with spotty cellular connection.',
    solution: 'Developed a cross-platform mobile application utilizing SQLite for a local data cache and Redux Toolkit to manage sync operations when returning online.',
    impact: 'Achieved a 4.8 App Store rating and allowed offline booking lookup capabilities for over 20,000 travelers.'
  },
  'obsidian': {
    title: 'Obsidian UI Kit',
    tags: ['Figma', 'Tailwind CSS', 'Design Tokens', 'Storybook'],
    problem: 'A fintech startup suffered from fragmented components and styling drift across their customer portals, resulting in elevated UI design debt.',
    solution: 'Created an all-inclusive component library built on strict Figma design tokens and translated into custom-extended Tailwind variables with clear documentation.',
    impact: 'Accelerated developer implementation cycles by 35% and brought design consistency to 100% across all developer releases.'
  },
  'prismcolor': {
    title: 'PrismColor API & SDK',
    tags: ['TypeScript', 'Node.js', 'WCAG', 'NPM'],
    problem: 'Web developers manually checking color contrasts for compliance with WCAG guidelines slowed down design-to-production workflows.',
    solution: 'Built a math-driven REST API that processes hexadecimal pairs and returns accessible contrasts. Packaged it as an open-source NPM library.',
    impact: 'Surpassed 20,000 downloads on NPM; integrated by 3 major SaaS platforms to automatically adapt dark/light UI modes.'
  },
  'nexustalent': {
    title: 'NexusTalent Marketplace',
    tags: ['Next.js', 'PostgreSQL', 'Stripe Connect', 'Socket.io'],
    problem: 'Creative freelancers lacked secure escrow contracts, leading to frequent client payout disputes and communication leaks.',
    solution: 'Built a double-sided job marketplace backed by Stripe Connect milestone routing and built real-time contract signing widgets.',
    impact: 'Handled over $200k in pilot project contracts with zero transaction disputes and a 95% satisfaction rate.'
  },
  'smartchat-ai': {
    title: 'SmartChat AI Agent',
    tags: ['Claude API', 'Pinecone', 'Node.js', 'Express'],
    problem: 'Customer support agents spent up to 40% of their workday answering redundant operations queries from document sheets.',
    solution: 'Developed an AI assistant connected to a Pinecone vector index (RAG) that instantly answers queries with verifiable citations.',
    impact: 'Deflected 70% of support tickets, reducing average user response time to under 3 seconds.'
  }
};

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalProblem.textContent = data.problem;
  modalSolution.textContent = data.solution;
  modalImpact.textContent = data.impact;
  modalTags.innerHTML = '';
  data.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-label-code border border-primary/20';
    span.textContent = tag;
    modalTags.appendChild(span);
  });
  modalGallery.innerHTML = '';
  if (data.images && data.images.length) {
    data.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = data.title;
      img.className = 'w-full rounded-lg object-cover border border-surface-border';
      img.style.aspectRatio = '16 / 10';
      modalGallery.appendChild(img);
    });
    modalGallery.classList.remove('hidden');
  } else {
    modalGallery.classList.add('hidden');
  }
  caseStudyModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  setTimeout(() => {
    caseStudyModal.classList.remove('opacity-0');
    modalPanel.classList.remove('translate-x-full');
  }, 10);
}

function closeModal() {
  caseStudyModal.classList.add('opacity-0');
  modalPanel.classList.add('translate-x-full');
  document.body.classList.remove('modal-open');
  setTimeout(() => caseStudyModal.classList.add('hidden'), 500);
}

projectCards.forEach(card => {
  card.addEventListener('click', (e) => { e.preventDefault(); openModal(card.dataset.project); });
});
closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !caseStudyModal.classList.contains('hidden')) closeModal();
});

/* =================================================================
   12. CONTACT FORM
================================================================== */
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `Sending... <span class="material-symbols-outlined text-sm animate-spin">sync</span>`;
  btn.disabled = true;

  const payload = {
    name: document.getElementById('contact-name').value.trim(),
    email: document.getElementById('contact-email').value.trim(),
    subject: document.getElementById('contact-subject').value.trim(),
    message: document.getElementById('contact-message').value.trim()
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && result.ok) {
      btn.innerHTML = `Sent Successfully! <span class="material-symbols-outlined text-sm">check</span>`;
      btn.classList.add('bg-green-600');
      btn.classList.remove('bg-primary-container');
      contactForm.reset();
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.classList.remove('bg-green-600');
        btn.classList.add('bg-primary-container');
      }, 3000);
    } else {
      throw new Error(result.message || 'Failed to send message.');
    }
  } catch (err) {
    btn.innerHTML = `Error! ${err.message} <span class="material-symbols-outlined text-sm">error</span>`;
    btn.classList.add('bg-red-600');
    btn.classList.remove('bg-primary-container');
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      btn.classList.remove('bg-red-600');
      btn.classList.add('bg-primary-container');
    }, 4000);
  }
});

/* =================================================================
   LUXURY: THREE.JS METHODOLOGY 3D SCENE
================================================================== */
(function initMethodologyCanvas() {
  const canvas = document.getElementById('methodology-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 5);

  function resizeCanvas() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  const outerMat = new THREE.MeshBasicMaterial({ color: 0xff5e00, wireframe: true, transparent: true, opacity: 0.18 });
  const outerMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 1), outerMat);
  scene.add(outerMesh);

  const innerMat = new THREE.MeshStandardMaterial({ color: 0x1a0800, emissive: 0xff3800, emissiveIntensity: 0.3, roughness: 0.4, metalness: 0.8, transparent: true, opacity: 0.9 });
  const innerMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 1), innerMat);
  scene.add(innerMesh);

  const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.012, 8, 100), new THREE.MeshBasicMaterial({ color: 0xffb599, transparent: true, opacity: 0.5 }));
  torusMesh.rotation.x = Math.PI / 3;
  scene.add(torusMesh);

  const torusMesh2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.008, 8, 100), new THREE.MeshBasicMaterial({ color: 0xff5e00, transparent: true, opacity: 0.25 }));
  torusMesh2.rotation.x = Math.PI / 6;
  torusMesh2.rotation.y = Math.PI / 4;
  scene.add(torusMesh2);

  const particleCount = 60;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5 + Math.random() * 1.5;
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMesh = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0xffb599, size: 0.04, transparent: true, opacity: 0.7 }));
  scene.add(particleMesh);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const pLight1 = new THREE.PointLight(0xff5e00, 3, 10);
  pLight1.position.set(2, 2, 3);
  scene.add(pLight1);
  const pLight2 = new THREE.PointLight(0xffb599, 1.5, 8);
  pLight2.position.set(-2, -1, 2);
  scene.add(pLight2);

  let isDragging = false, prevMouse = { x: 0, y: 0 };
  let targetRot = { x: 0, y: 0 }, currentRot = { x: 0, y: 0 };
  canvas.addEventListener('mousedown', function(e) { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; });
  window.addEventListener('mouseup', function() { isDragging = false; });
  canvas.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    targetRot.y += (e.clientX - prevMouse.x) * 0.008;
    targetRot.x += (e.clientY - prevMouse.y) * 0.008;
    prevMouse = { x: e.clientX, y: e.clientY };
  });

  let time = 0;
  (function animate() {
    requestAnimationFrame(animate);
    time += 0.008;
    currentRot.x += (targetRot.x - currentRot.x) * 0.06;
    currentRot.y += (targetRot.y - currentRot.y) * 0.06;
    if (!isDragging) { targetRot.y += 0.003; targetRot.x = Math.sin(time * 0.3) * 0.2; }
    outerMesh.rotation.set(currentRot.x, currentRot.y, 0);
    innerMesh.rotation.set(currentRot.x * 0.8, currentRot.y * 0.8 + time * 0.2, 0);
    torusMesh.rotation.z  = time * 0.4;
    torusMesh2.rotation.z = -time * 0.25;
    particleMesh.rotation.y = time * 0.05;
    particleMesh.rotation.x = time * 0.03;
    innerMat.emissiveIntensity = 0.2 + Math.sin(time * 1.5) * 0.15;
    pLight1.intensity = 2.5 + Math.sin(time * 2) * 0.8;
    outerMat.opacity  = 0.13 + Math.sin(time) * 0.05;
    renderer.render(scene, camera);
  })();
})();

/* =================================================================
   LUXURY: 3D CARD TILT (Methodology Cards)
================================================================== */
(function initMethodCardTilt() {
  document.querySelectorAll('.method-card').forEach(function(wrapper) {
    var card = wrapper.querySelector('.method-card-inner');
    if (!card) return;
    wrapper.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var rx = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      var ry = ((x - rect.width  / 2) / (rect.width  / 2)) *  8;
      card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(10px)';
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
    wrapper.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
})();

/* =================================================================
   LUXURY: DYNAMIC METRICS COUNTER
================================================================== */
(function initMetricsCounter() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-target'), 10);
        const suffix = target.getAttribute('data-suffix') || '';
        
        const duration = 2000; // 2 seconds animation
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing out cubic: progress = 1 - (1 - progress)^3
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeProgress * countTo);
          
          target.innerText = currentCount + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.innerText = countTo + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(target); // Only animate once
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
})();

/* =================================================================
   LUXURY: 3D CARD TILT FOR ABOUT CARD & EXPERTISE
================================================================== */
(function initTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.innerWidth < 768) return; // Disable on mobile for performance

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      const width = rect.width;
      const height = rect.height;
      
      // Calculate rotation angles relative to card center (Max: ~12 degrees)
      const rotateX = ((y / height) - 0.5) * -12; 
      const rotateY = ((x / width) - 0.5) * 12;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      
      // Update mouse variables for internal glow matching
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
})();


/* =================================================================
   NEW: EXPERTISE PILLAR ACCORDION
================================================================== */
window.togglePillar = function(index) {
  var pillars = document.querySelectorAll('.expertise-pillar');
  var target = pillars[index];
  if (!target) return;
  var body = target.querySelector('.pillar-body');
  var isOpen = target.classList.contains('is-open');
  pillars.forEach(function(p) {
    p.classList.remove('is-open');
    var b = p.querySelector('.pillar-body');
    if (b) b.style.maxHeight = '0';
  });
  if (!isOpen && body) {
    target.classList.add('is-open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
};

/* =================================================================
   EXTEND: Cursor hover to new interactive elements
================================================================== */
(function extendCursorTargets() {
  var dot  = document.getElementById('custom-cursor');
  var ring = document.getElementById('custom-cursor-ring');
  if (!dot || !ring) return;
  var newTargets = document.querySelectorAll('.expertise-pillar, .about-stat-card, .tech-chip');
  newTargets.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', function() {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    });
  });
})();
