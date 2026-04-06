// ===== TYPING ANIMATION =====
const roles = ['Junior Programmer', 'Web Developer', 'SMK RPL Student', 'Problem Solver', 'Future Full-Stack Dev'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
}));

// ===== SCROLL REVEAL =====
const ro = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 70); ro.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px 0px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ===== COUNTER =====
function counter(el) {
  const t = parseInt(el.dataset.target), dur = 1600, step = t / (dur / 16);
  let c = 0;
  const tm = setInterval(() => {
    c += step; if (c >= t) { el.textContent = t; clearInterval(tm); } else el.textContent = Math.floor(c);
  }, 16);
}
const co = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.hnum').forEach(counter); co.unobserve(e.target); } });
}, { threshold: 0.5 });
const hs = document.querySelector('.hero-stats');
if (hs) co.observe(hs);

// ===== SCROLL TOP =====
document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-text');
  const ok = document.getElementById('formSuccess');
  btn.textContent = 'Mengirim...';
  setTimeout(() => {
    btn.textContent = 'Kirim Pesan';
    ok.classList.add('show');
    this.reset();
    setTimeout(() => ok.classList.remove('show'), 5000);
  }, 1500);
});

// ===== ACTIVE NAV =====
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  nls.forEach(a => { a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--pl)' : ''; });
});

// ===== SKILL HOVER =====
document.querySelectorAll('.skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => el.style.boxShadow = '0 0 16px rgba(124,58,237,0.18)');
  el.addEventListener('mouseleave', () => el.style.boxShadow = '');
});

// ===== SERVICE CARD EXPAND =====
document.querySelectorAll('.scard-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.scard');
    const isOpen = card.classList.contains('open');

    // tutup semua card lain
    document.querySelectorAll('.scard.open').forEach(c => {
      c.classList.remove('open');
      c.querySelector('.scard-toggle').innerHTML = 'Lihat Detail <span class="toggle-arrow">↓</span>';
    });

    // buka card yang diklik (kalau belum open)
    if (!isOpen) {
      card.classList.add('open');
      btn.innerHTML = 'Tutup <span class="toggle-arrow">↓</span>';
    }
  });
});

// ===== LIVE CLOCK =====
function updateClock() {
  const el = document.getElementById('live-clock');
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  el.textContent = `${h}:${m}:${s}`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== PARTICLE CANVAS =====
(function() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = window.innerWidth < 600 ? 25 : 80;
  for (let i = 0; i < COUNT; i++) {
    dots.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${d.a})`;
      ctx.fill();
    });
    // draw lines between close dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(14,165,233,${0.12 * (1 - dist/100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== SKILL BARS ANIMATE ON SCROLL =====
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sbar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const skillBars = document.querySelector('.skill-bars');
if (skillBars) barObserver.observe(skillBars);

// ===== TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll('.pcard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== MAGNETIC HOVER ON BUTTONS =====
document.querySelectorAll('.btn-glow, .btn-outline, .btn-nav').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== MOBILE: JOURNEY ZOOM FOLLOWS SPINE =====
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  function updateJourneyMobile() {
    const rows = document.querySelectorAll('.jrow');
    const spineFill = document.getElementById('journeySpineFill');
    if (!spineFill) return;

    // posisi ujung bawah spine fill (px dari top viewport)
    const spineRect = spineFill.getBoundingClientRect();
    const spineTip = spineRect.bottom;

    rows.forEach(row => {
      const rect = row.getBoundingClientRect();
      const rowDot = rect.top + 28; // posisi dot di row
      const dist = Math.abs(spineTip - rowDot);
      const maxDist = 180;
      // ratio: 0 = spine tepat di dot ini, 1 = jauh
      const ratio = Math.min(dist / maxDist, 1);
      const active = ratio < 0.6;

      active ? row.classList.add('in-view') : row.classList.remove('in-view');

      const yearEl = row.querySelector('.jrow-year');
      const folderBtn = row.querySelector('.jfolder-btn');

      if (yearEl) {
        const scale = active ? (1 + (1 - ratio) * 2.8) : 1;
        const opacity = active ? (0.08 + (1 - ratio) * 0.55) : 0.05;
        yearEl.style.transform = `scale(${scale.toFixed(2)})`;
        yearEl.style.color = `rgba(192,132,252,${opacity.toFixed(2)})`;
      }
      if (folderBtn) {
        const scale = active ? (1 + (1 - ratio) * 0.5) : 1;
        folderBtn.style.transform = `scale(${scale.toFixed(2)})`;
      }
    });
  }

  window.addEventListener('scroll', updateJourneyMobile, { passive: true });
  updateJourneyMobile();
}
document.querySelectorAll('.jfolder-btn').forEach(btn => {
  let touchMoved = false;

  btn.addEventListener('touchstart', () => { touchMoved = false; }, { passive: true });
  btn.addEventListener('touchmove', () => { touchMoved = true; }, { passive: true });
  btn.addEventListener('touchend', (e) => {
    if (touchMoved) return; // user lagi scroll, bukan tap
    e.preventDefault();
    const idx = btn.dataset.index;
    const gallery = document.getElementById('gallery-' + idx);
    if (!gallery) return;
    const isOpen = gallery.classList.contains('open');
    document.querySelectorAll('.jfolder-gallery.open').forEach(g => g.classList.remove('open'));
    if (!isOpen) gallery.classList.add('open');
  });

  // tetap support click untuk desktop
  btn.addEventListener('click', (e) => {
    if ('ontouchstart' in window) return; // skip di mobile, sudah handled touchend
    const idx = btn.dataset.index;
    const gallery = document.getElementById('gallery-' + idx);
    if (!gallery) return;
    const isOpen = gallery.classList.contains('open');
    document.querySelectorAll('.jfolder-gallery.open').forEach(g => g.classList.remove('open'));
    if (!isOpen) gallery.classList.add('open');
  });
});

// ===== JOURNEY SPINE SCROLL =====
function updateJourneySpine() {
  const wrap = document.querySelector('.journey-wrap');
  const fill = document.getElementById('journeySpineFill');
  if (!wrap || !fill) return;
  const rect = wrap.getBoundingClientRect();
  const wrapH = wrap.offsetHeight;
  const scrolled = -rect.top;
  const visible = window.innerHeight;
  const pct = Math.min(100, Math.max(0, (scrolled + visible * 0.6) / wrapH * 100));
  fill.style.height = pct + '%';
}
window.addEventListener('scroll', updateJourneySpine, { passive: true });
updateJourneySpine();

// ============================================================
// CUSTOM CURSOR
// ============================================================
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

// ring follows with lag
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// hover state on interactive elements
document.querySelectorAll('a, button, .scard, .pcard, .tcard, .jitem-card, .skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

// ============================================================
// RIPPLE ON CLICK
// ============================================================
document.addEventListener('click', e => {
  const r = document.createElement('div');
  r.className = 'ripple';
  const size = 60;
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - size/2}px;top:${e.clientY - size/2}px`;
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 700);
});

// ============================================================
// ROPE PHYSICS — removed
// ============================================================

// ============================================================
// TEXT SCRAMBLE on name hover
// ============================================================
const scrambleEl = document.getElementById('scrambleName');
if (scrambleEl) {
  const original = 'Median\nSipayung';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
  let scrambleTimer = null;

  scrambleEl.addEventListener('mouseenter', () => {
    let iter = 0;
    clearInterval(scrambleTimer);
    scrambleTimer = setInterval(() => {
      const parts = original.split('\n');
      scrambleEl.innerHTML = parts.map(word =>
        word.split('').map((c, i) =>
          i < iter ? c : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      ).join('<br/>');
      if (iter >= original.replace('\n','').length) clearInterval(scrambleTimer);
      iter += 0.5;
    }, 40);
  });

  scrambleEl.addEventListener('mouseleave', () => {
    clearInterval(scrambleTimer);
    scrambleEl.innerHTML = 'Median<br/>Sipayung';
  });
}

// ===== SPOTLIGHT EFFECT ON ABOUT PHOTO =====
const imgFrame = document.querySelector('.img-frame');
const spotlight = document.getElementById('imgSpotlight');
if (imgFrame && spotlight) {
  imgFrame.addEventListener('mousemove', e => {
    const rect = imgFrame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pct_x = (x / rect.width) * 100;
    const pct_y = (y / rect.height) * 100;
    spotlight.style.background = `radial-gradient(circle 110px at ${pct_x}% ${pct_y}%, transparent 0%, rgba(0,0,0,0.82) 100%)`;
  });
  imgFrame.addEventListener('mouseleave', () => {
    spotlight.style.background = 'radial-gradient(circle 110px at 50% 50%, transparent 0%, rgba(0,0,0,0.82) 100%)';
  });
}

// ===== TESTIMONIAL CAROUSEL DOTS =====
const testiGrid = document.querySelector('.testi-grid');
const testiDots = document.querySelectorAll('.testi-dot');
if (testiGrid && testiDots.length) {
  testiGrid.addEventListener('scroll', () => {
    const cards = testiGrid.querySelectorAll('.tcard');
    const scrollLeft = testiGrid.scrollLeft;
    const cardW = cards[0]?.offsetWidth + 14 || 1;
    const idx = Math.round(scrollLeft / cardW);
    testiDots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }, { passive: true });

  // click dot to scroll
  testiDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const cards = testiGrid.querySelectorAll('.tcard');
      const cardW = cards[0]?.offsetWidth + 14 || 0;
      testiGrid.scrollTo({ left: i * cardW, behavior: 'smooth' });
    });
  });
}

// ===== SPLASH SCREEN =====
(function() {
  const splash = document.getElementById('splash');
  const btn = document.getElementById('splashBtn');
  const hint = document.getElementById('splashHint');
  const barFill = document.getElementById('splashBarFill');
  const pct = document.getElementById('splashPct');
  const audio = document.getElementById('bgAudio');

  let progress = 0;
  let pageReady = false;

  // simulasi loading bar
  const interval = setInterval(() => {
    const increment = pageReady ? 4 : 1.2;
    progress = Math.min(progress + increment, 100);
    barFill.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';

    if (progress >= 100) {
      clearInterval(interval);
      btn.classList.add('ready');
      hint.textContent = 'Siap! Klik untuk masuk 🎵';
    }
  }, 40);

  // tandai page sudah load
  window.addEventListener('load', () => {
    pageReady = true;
  });

  // klik tombol
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('ready')) return;
    // play audio
    audio.volume = 0.5;
    audio.play().catch(() => {});
    // hide splash
    splash.classList.add('hide');
    setTimeout(() => { splash.style.display = 'none'; }, 700);
  });
})();
