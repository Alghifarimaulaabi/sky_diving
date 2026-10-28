/* ===== everydive.id x BAC - Script =====
   Ganti isi DATA di bagian GEAR dan DISIPLIN untuk memperbarui konten. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Konfigurasi (GANTI) ---------- */
  // Nomor WhatsApp admin diatur di js/catalog-data.js
  var WA_NUMBER = (function () {
    var n = String((window.FUNDIVE && window.FUNDIVE.wa) || '').replace(/\D/g, '');
    return n.charAt(0) === '0' ? '62' + n.slice(1) : n;
  })();

  /* ---------- Tema ---------- */
  var root = document.documentElement;
  // Warna bar status HP (Android Chrome / iOS Safari) ikut tema
  function setThemeColor(t) {
    var m = $('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'light' ? '#F4FBFF' : '#04152B');
  }
  try { var saved = localStorage.getItem('theme'); if (saved) { root.setAttribute('data-theme', saved); setThemeColor(saved); } } catch (e) {}
  $('#themeBtn').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    setThemeColor(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------- Service worker (hanya di https/localhost) ---------- */
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  /* ---------- Menu mobile (lembar layar penuh) ---------- */
  var burger = $('#burger'), menu = $('#menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    document.body.classList.toggle('no-scroll', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 960) setMenu(false); });

  /* ---------- Indikator kedalaman + gradasi makin gelap ---------- */
  var fill = $('#depthFill'), num = $('#depthNum'), nav = $('#nav');
  var tabs = $$('.tabbar a');
  var tabIds = tabs.map(function (a) { return a.getAttribute('href').slice(1); });
  function setActiveTab() {
    var cur = tabIds[0], y = window.innerHeight * 0.4;
    tabIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= y) cur = id;
    });
    tabs.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + cur;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  var ticking = false, lastY = 0, wa = $('.wa-float');
  function update() {
    ticking = false;
    var y = window.scrollY;
    if (wa) {
      if (y > lastY + 6 && y > 200) wa.classList.add('hide');
      else if (y < lastY - 6 || y <= 200) wa.classList.remove('hide');
    }
    lastY = y;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    fill.style.height = (p * 100) + '%';
    num.textContent = Math.round(p * 30); // 0 - 30 m
    nav.style.setProperty('--p', p.toFixed(4)); // garis progres di navbar (HP)
    setActiveTab();
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- Gelembung di hero ---------- */
  var cv = $('#bubbles');
  if (cv && !reduce) {
    var ctx = cv.getContext('2d'), bubbles = [], W, H;
    var lastW = 0, visible = true;
    function size() { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; lastW = window.innerWidth; }
    size();
    // Resize hanya jika lebarnya berubah (address bar HP naik-turun tidak mereset kanvas)
    window.addEventListener('resize', function () { if (window.innerWidth !== lastW) size(); });
    // Hemat baterai: berhenti menggambar saat hero tidak terlihat
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(cv);
    }
    var COUNT = window.innerWidth < 760 ? 6 : 12;
    for (var i = 0; i < COUNT; i++) {
      bubbles.push({
        x: Math.random(),
        y: Math.random(),
        r: 1.5 + Math.random() * 3,
        s: 0.00015 + Math.random() * 0.00025,
        d: Math.random() * 6
      });
    }
    (function loop(t) {
      if (!visible || document.hidden) { requestAnimationFrame(loop); return; }
      ctx.clearRect(0, 0, W, H);
      var isLight = root.getAttribute('data-theme') === 'light';
      var stroke = isLight ? 'rgba(0,127,138,.12)' : 'rgba(0,194,209,.15)';
      var fill = isLight ? 'rgba(0,127,138,.03)' : 'rgba(0,194,209,.04)';
      bubbles.forEach(function (b) {
        b.y -= b.s * 2;
        if (b.y < -0.05) { b.y = 1.05; b.x = Math.random(); }
        var x = b.x * W + Math.sin(t / 2400 + b.d) * 3, y = b.y * H;
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, 6.283);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = fill;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    })(0);
  }

  /* ---------- DISIPLIN FREEDIVE ---------- */
  var disciplines = [
    { code: 'STA', name: 'Static Apnea', desc: 'Menahan napas selama mungkin dalam posisi diam, biasanya mengapung di kolam dengan wajah di air. Latihan paling dasar untuk relaksasi dan toleransi CO2. Wajib ada pengawas.' },
    { code: 'DYN', name: 'Dynamic with Fins', desc: 'Berenang horizontal sejauh mungkin di bawah air memakai fins (monofin atau bifins), dalam satu tarikan napas.' },
    { code: 'DNF', name: 'Dynamic No Fins', desc: 'Berenang horizontal tanpa fins, hanya dengan gaya dada khusus. Menuntut teknik dan efisiensi gerak.' },
    { code: 'CWT', name: 'Constant Weight', desc: 'Turun dan naik di sepanjang tali dengan tenaga sendiri memakai fins atau monofin, tanpa mengubah beban.' },
    { code: 'FIM', name: 'Free Immersion', desc: 'Turun dan naik dengan menarik tali tanpa fins. Cara bagus untuk melatih equalization dan relaksasi.' },
    { code: 'CNF', name: 'Constant No Fins', desc: 'Turun dan naik di sepanjang tali tanpa fins dan tanpa menarik tali. Salah satu disiplin tersulit.' },
    { code: 'VWT', name: 'Variable Weight', desc: 'Turun memakai pemberat (sled) dan naik dengan tenaga sendiri. Disiplin lanjutan yang butuh pengalaman dan tim pengawas.' },
    { code: 'NLT', name: 'No Limits', desc: 'Turun dengan sled dan naik dengan balon atau alat bantu. Disiplin ekstrem untuk atlet berpengalaman, bukan untuk pemula.' }
  ];
  var dGrid = $('#disciplines'), dModal = $('#discModal');
  disciplines.forEach(function (d) {
    var b = document.createElement('button');
    b.className = 'card disc reveal in'; b.type = 'button';
    b.innerHTML = '<strong>' + d.code + '</strong><span>' + d.name + '</span>';
    b.addEventListener('click', function () {
      $('#dmTitle').textContent = d.code + ' - ' + d.name;
      $('#dmBody').textContent = d.desc;
      dModal.showModal();
    });
    dGrid.appendChild(b);
  });
  $('#dmClose').addEventListener('click', function () { dModal.close(); });
  dModal.addEventListener('click', function (e) { if (e.target === dModal) dModal.close(); });

  /* ---------- Kalkulator wetsuit & pemberat (estimasi awal) ---------- */
  $('#calcForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var h = +$('#cH').value, w = +$('#cW').value, t = +$('#cT').value;
    var size = w < 50 ? 'S' : w < 62 ? 'M' : w < 75 ? 'L' : w < 90 ? 'XL' : 'XXL';
    if (h >= 180 && size !== 'XXL') size += ' (tall)';
    var f = { 0: 0.01, 1.5: 0.025, 3: 0.035, 5: 0.05 }[t];
    var kg = w * f;
    var lo = Math.max(0, kg - 0.5).toFixed(1), hi = (kg + 0.5).toFixed(1);
    $('#calcOut').textContent = 'Estimasi ukuran wetsuit: ' + size + '. Estimasi awal pemberat: ' + lo + ' - ' + hi + ' kg.';
  });
  
  /* ---------- Lightbox galeri ---------- */
  var lb = $('#lightbox');
  $$('#gallery button').forEach(function (b) {
    b.addEventListener('click', function () { $('#lbCap').textContent = b.dataset.cap; lb.showModal(); });
  });
  $('#lbClose').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  /* ---------- Form gabung -> WhatsApp ---------- */
  $('#joinForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('#fName').value.trim(), a = $('#fAge').value, x = $('#fExp').value, w = $('#fWa').value.trim();
    var msg = $('#formMsg');
    if (!n || !a || !x || !/^[0-9+\s-]{9,16}$/.test(w)) { msg.textContent = 'Lengkapi semua kolom dengan benar ya.'; return; }
    if (!/^62\d{8,13}$/.test(WA_NUMBER)) { msg.textContent = 'Nomor WhatsApp admin belum diatur di js/catalog-data.js.'; return; }
    var text = 'Halo BAC! Saya mau gabung.\nNama: ' + n + '\nUsia: ' + a + '\nPengalaman: ' + x + '\nWA: ' + w;
    msg.textContent = 'Membuka WhatsApp...';
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
})();
