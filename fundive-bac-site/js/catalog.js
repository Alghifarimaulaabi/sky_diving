/* ===== Katalog gear + Kit ke WhatsApp =====
   Data produk dan nomor WhatsApp ada di js/catalog-data.js. */
(function () {
  'use strict';
  var D = window.FUNDIVE;
  if (!D || !document.getElementById('catList')) return;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- WhatsApp ---------- */
  var wa = String(D.wa || '').replace(/\D/g, '');
  if (wa.charAt(0) === '0') wa = '62' + wa.slice(1);
  var waOk = /^62\d{8,13}$/.test(wa);
  function waLink(msg) { return 'https://wa.me/' + wa + (msg ? '?text=' + encodeURIComponent(msg) : ''); }
  // Tombol WhatsApp lain di halaman (melayang, footer) ikut nomor yang sama
  if (waOk) $$('[data-wa]').forEach(function (a) { a.href = waLink(); });
  ['isWarn', 'kitWarn'].forEach(function (id) { var w = document.getElementById(id); if (w) w.hidden = waOk; });

  /* ---------- Ikon produk (gambar garis, 48x48) ---------- */
  var ICONS = {
    mask: '<path d="M5 17c0-3 2-5 5-5h28c3 0 5 2 5 5v7c0 5-4 8-9 8h-2.5c-2 0-3-1-4-3-.6-1.1-1.6-1.6-3-1.6s-2.400.5-3 1.600c-1 2-2 3-4 3H14c-5 0-9-3-9-8z"/><path d="M24 12v9M12 18v5M36 18v5"/>',
    snorkel: '<path d="M33 5v28a10 10 0 0 1-20 0v-3"/><path d="M29 10h8"/><rect x="7" y="25" width="12" height="7" rx="3.500"/>',
    fins: '<path d="M4 17c0-3 2-5 5-5h5c2 0 3 1 3 3v1c9 0 19 3 27 6v6H8c-3 0-4-2-4-4z"/><path d="M17 21h26M17 27h26"/>',
    wetsuit: '<path d="M19 4l-10 5-5 16 6 2 5-11v27h6V28h2v15h6V16l5 11 6-2-5-16-10-5c-1 3-3 5-6 5s-5-2-6-5z"/><path d="M24 9v8"/>',
    belt: '<rect x="3" y="17" width="42" height="14" rx="4"/><rect x="19" y="14" width="10" height="20" rx="2.500"/><rect x="7" y="21" width="8" height="6" rx="1.500"/><rect x="33" y="21" width="8" height="6" rx="1.500"/>',
    neck: '<path d="M11 8c0 15 5.500 25 13 25s13-10 13-25"/><rect x="19.500" y="31" width="9" height="12" rx="2.500"/><path d="M17 8c0 8 3 13 7 13s7-5 7-13"/>',
    knife: '<path d="M10 38L34 8c2 1 4 3 5 5L18 42z"/><path d="M12 34l5 5"/><circle cx="9" cy="41" r="3"/>',
    buoy: '<ellipse cx="24" cy="29" rx="13" ry="9"/><path d="M24 20V5l11 4.500L24 14"/><path d="M5 42c4-3 8-3 12 0s8 3 12 0 8-3 12 0"/>',
    watch: '<rect x="13" y="12" width="22" height="24" rx="7"/><path d="M18 12l2-7h8l2 7M18 36l2 7h8l2-7"/><path d="M24 18v7l4.500 3"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 48 48" fill="none" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.mask) + '</svg>';
  }

  /* ---------- Data + penyimpanan ---------- */
  var byId = {};
  D.products.forEach(function (p) { p.options = p.options || []; byId[p.id] = p; });
  var cats = D.products.map(function (p) { return p.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; });

  var KEY = 'fundive-kit-v1', WHO = 'fundive-kit-who-v1';
  function read(k, fb) { try { var s = localStorage.getItem(k); return s ? JSON.parse(s) : fb; } catch (e) { return fb; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  // Bersihkan data tersimpan jika katalog berubah (produk dihapus, pilihan diganti)
  function cleanLine(l) {
    if (!l || !byId[l.id]) return null;
    var qty = Math.min(99, Math.max(1, parseInt(l.qty, 10) || 0));
    if (!qty) return null;
    var v = {};
    byId[l.id].options.forEach(function (o) {
      var val = l.v && l.v[o.key];
      if (val && o.choices.indexOf(val) !== -1) v[o.key] = val;
    });
    return { id: l.id, v: v, qty: qty };
  }
  var kit = (read(KEY, []) || []).map(cleanLine).filter(Boolean);
  var who = read(WHO, {}) || {};

  function sig(id, v) { return id + '|' + byId[id].options.map(function (o) { return v[o.key] || ''; }).join('|'); }
  function totalQty() { return kit.reduce(function (n, l) { return n + l.qty; }, 0); }
  function qtyOf(id) { return kit.reduce(function (n, l) { return l.id === id ? n + l.qty : n; }, 0); }
  function rupiah(n) { return 'Rp ' + Math.round(n).toLocaleString('id-ID'); }
  function priceText(p) { return p.price ? rupiah(p.price) : 'Tanya harga'; }
  function lvlClass(p) { return p.level === 'Lanjut' ? 'lanjut' : 'pemula'; }

  /* ---------- Pesan WhatsApp ---------- */
  function variantText(p, v) {
    if (!p.options.length) return '';
    return p.options.map(function (o) { return o.label + ': ' + (v[o.key] || 'belum dipilih'); }).join('; ');
  }
  function lineText(p, v, qty) {
    var vt = variantText(p, v);
    return p.name + (vt ? ' (' + vt + ')' : '') + ' x' + qty;
  }
  function estimate() {
    var sum = 0;
    for (var i = 0; i < kit.length; i++) {
      var p = byId[kit[i].id];
      if (!p.price) return 0;
      sum += p.price * kit[i].qty;
    }
    return sum;
  }
  function kitMessage() {
    var lines = kit.map(function (l, i) { return (i + 1) + '. ' + lineText(byId[l.id], l.v, l.qty); });
    var out = ['Halo ' + D.shop + ', saya mau tanya dan pesan gear dari katalog website:', '', lines.join('\n')];
    var total = estimate();
    if (total) out.push('', 'Perkiraan total: ' + rupiah(total) + ' (belum termasuk ongkir)');
    var info = [];
    if (who.name) info.push('Nama: ' + who.name);
    if (who.city) info.push('Domisili: ' + who.city);
    if (who.note) info.push('Catatan: ' + who.note);
    if (info.length) out.push('', info.join('\n'));
    out.push('', 'Mohon info stok, harga, dan cara pembayarannya. Terima kasih!');
    return out.join('\n');
  }
  function singleMessage(p, v, qty) {
    return 'Halo ' + D.shop + ', saya mau tanya soal gear ini dari katalog website:\n\n' + lineText(p, v, qty) + '\n\nApakah tersedia? Mohon info stok dan harganya. Terima kasih!';
  }
  function setLink(a, msg) { a.href = waOk ? waLink(msg) : '#'; }
  function guardLink(a) {
    a.addEventListener('click', function (e) { if (!waOk) e.preventDefault(); });
  }

  /* ---------- Dialog ---------- */
  var itemDlg = $('#itemSheet'), kitDlg = $('#kitSheet');
  function openDlg(d) {
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    document.body.classList.add('no-scroll');
  }
  function closeDlg(d) { if (d.close) d.close(); else d.removeAttribute('open'); }
  $$('dialog.sheet').forEach(function (d) {
    d.addEventListener('close', function () {
      if (!$('dialog.sheet[open]')) document.body.classList.remove('no-scroll');
    });
    d.addEventListener('click', function (e) { if (e.target === d) closeDlg(d); });
  });
  $('#isClose').addEventListener('click', function () { closeDlg(itemDlg); });
  $('#ksClose').addEventListener('click', function () { closeDlg(kitDlg); });

  /* ---------- Toast ---------- */
  var toastEl = $('#toast'), toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  /* ---------- Katalog: filter dan daftar ---------- */
  var state = { q: '', cat: 'Semua', lvl: 'Semua' };
  var list = $('#catList'), empty = $('#catEmpty'), countEl = $('#catCount');

  function matchBase(p) {
    if (state.lvl !== 'Semua' && p.level !== state.lvl) return false;
    if (state.q) {
      var hay = (p.name + ' ' + p.cat + ' ' + p.short + ' ' + p.fn).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }
  function matches(p) { return (state.cat === 'Semua' || p.cat === state.cat) && matchBase(p); }

  function buildRow(p) {
    var art = el('article', 'grow');
    art.setAttribute('data-id', p.id);

    var main = el('button', 'grow__main');
    main.type = 'button';
    main.setAttribute('aria-haspopup', 'dialog');
    var pic = el('span', 'grow__pic');
    if (p.photo) {
      var img = el('img'); img.src = p.photo; img.alt = ''; img.loading = 'lazy'; pic.appendChild(img);
    } else { pic.innerHTML = icon(p.icon); }
    var txt = el('span', 'grow__txt');
    txt.appendChild(el('strong', null, p.name));
    txt.appendChild(el('span', 'fn', p.short));
    var meta = el('span', 'grow__meta');
    meta.appendChild(el('span', 'lvl lvl--' + lvlClass(p), p.level));
    meta.appendChild(el('span', 'gprice' + (p.price ? '' : ' gprice--ask'), priceText(p)));
    txt.appendChild(meta);
    main.appendChild(pic); main.appendChild(txt);
    main.addEventListener('click', function () { openItem(p.id); });

    var add = el('button', 'grow__add');
    add.type = 'button';
    add.addEventListener('click', function () {
      if (p.options.length) { openItem(p.id); return; }
      addLine(p.id, {}, 1);
      toast(p.name + ' masuk kit');
    });
    art.appendChild(main); art.appendChild(add);
    syncRow(art);
    return art;
  }
  function syncRow(art) {
    var p = byId[art.getAttribute('data-id')], q = qtyOf(p.id), add = $('.grow__add', art);
    art.classList.toggle('in-kit', q > 0);
    add.textContent = q > 0 ? q : '+';
    add.setAttribute('aria-label', q > 0
      ? p.name + ' di kit: ' + q + '. ' + (p.options.length ? 'Buka pilihan' : 'Tambah satu lagi')
      : (p.options.length ? 'Pilih varian ' + p.name : 'Tambah ' + p.name + ' ke kit'));
  }
  function syncRows() { $$('.grow', list).forEach(syncRow); }

  function renderList() {
    list.innerHTML = '';
    var shown = D.products.filter(matches);
    shown.forEach(function (p) { list.appendChild(buildRow(p)); });
    empty.hidden = shown.length > 0;
    list.hidden = shown.length === 0;
    countEl.textContent = shown.length === D.products.length ? D.products.length + ' gear' : shown.length + ' dari ' + D.products.length + ' gear';
    syncFilters();
  }

  // Kategori: dibuat sekali (posisi geser chip tidak ikut reset), lalu hanya diperbarui
  var catBox = $('#catCats'), lvlBox = $('#catLvl');
  function buildFilters() {
    ['Semua'].concat(cats).forEach(function (c) {
      var b = el('button', 'cchip'); b.type = 'button'; b.setAttribute('data-cat', c);
      var first = D.products.filter(function (p) { return p.cat === c; })[0];
      if (first) { var ic = el('span', 'cchip__ic'); ic.innerHTML = icon(first.icon); b.appendChild(ic); }
      b.appendChild(el('span', 'cchip__t', c));
      b.appendChild(el('small', null, ''));
      b.addEventListener('click', function () { state.cat = c; renderList(); });
      catBox.appendChild(b);
    });
    ['Semua', 'Pemula', 'Lanjut'].forEach(function (l) {
      var b = el('button', null, l); b.type = 'button'; b.setAttribute('data-lvl', l);
      b.addEventListener('click', function () { state.lvl = l; renderList(); });
      lvlBox.appendChild(b);
    });
  }
  function syncFilters() {
    $$('.cchip', catBox).forEach(function (b) {
      var c = b.getAttribute('data-cat');
      b.setAttribute('aria-pressed', c === state.cat);
      var n = D.products.filter(function (p) { return (c === 'Semua' || p.cat === c) && matchBase(p); }).length;
      $('small', b).textContent = n;
    });
    $$('button', lvlBox).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lvl') === state.lvl); });
  }
  $('#catQ').addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); renderList(); });
  $('#catReset').addEventListener('click', function () {
    state.q = ''; state.cat = 'Semua'; state.lvl = 'Semua'; $('#catQ').value = ''; renderList();
  });

  /* ---------- Paket ---------- */
  var packBox = $('#packs');
  (D.packs || []).forEach(function (pk) {
    var row = el('div', 'pack');
    var t = el('div');
    t.appendChild(el('h3', null, pk.name));
    t.appendChild(el('p', null, pk.desc));
    var b = el('button', 'btn btn--ghost btn--sm', 'Tambah paket');
    b.type = 'button';
    b.setAttribute('aria-label', 'Tambah ' + pk.name + ' ke kit');
    b.addEventListener('click', function () {
      var added = 0;
      pk.items.forEach(function (id) { if (byId[id] && qtyOf(id) === 0) { addLine(id, {}, 1, true); added++; } });
      toast(added ? pk.name + ': ' + added + ' item masuk kit' : pk.name + ' sudah ada di kit');
    });
    row.appendChild(t); row.appendChild(b);
    packBox.appendChild(row);
  });

  /* ---------- Kit: tambah, ubah, simpan ---------- */
  function addLine(id, v, qty, quiet) {
    var s = sig(id, v), hit = kit.filter(function (l) { return sig(l.id, l.v) === s; })[0];
    if (hit) hit.qty = Math.min(99, hit.qty + qty); else kit.push({ id: id, v: v, qty: qty });
    changed(!quiet);
  }
  function changed(bump) {
    write(KEY, kit);
    renderBar(bump);
    syncRows();
    if (kitDlg.open) renderKit();
  }

  var bar = $('#kitBar'), stack = $('#kitStack'), countN = $('#kitCount');
  function renderBar(bump) {
    var n = totalQty(), was = !bar.hidden;
    bar.hidden = n === 0;
    document.body.classList.toggle('has-kit', n > 0);
    countN.textContent = n;
    stack.innerHTML = '';
    var ids = [];
    kit.forEach(function (l) { if (ids.indexOf(l.id) === -1) ids.push(l.id); });
    ids.slice(0, 4).forEach(function (id) { var s = el('span'); s.innerHTML = icon(byId[id].icon); stack.appendChild(s); });
    if (ids.length > 4) stack.appendChild(el('span', 'more', '+' + (ids.length - 4)));
    if (n > 0 && !was) { bar.classList.remove('enter'); void bar.offsetWidth; bar.classList.add('enter'); }
    else if (bump && n > 0) { stack.classList.remove('bump'); void stack.offsetWidth; stack.classList.add('bump'); }
  }
  $('#kitOpen').addEventListener('click', function () { renderKit(); openDlg(kitDlg); });

  /* ---------- Lembar detail produk ---------- */
  var cur = null;
  function opt(value, text) { var o = document.createElement('option'); o.value = value; o.textContent = text; return o; }
  function openItem(id) {
    var p = byId[id];
    cur = { p: p, qty: 1, v: {} };
    var pic = $('#isPic');
    pic.innerHTML = '';
    if (p.photo) { var img = el('img'); img.src = p.photo; img.alt = p.name; pic.appendChild(img); } else { pic.innerHTML = icon(p.icon); }
    $('#isTitle').textContent = p.name;
    var tags = $('#isTags'); tags.innerHTML = '';
    tags.appendChild(el('span', 'gtag', p.cat));
    tags.appendChild(el('span', 'gtag gtag--' + lvlClass(p), p.level));
    $('#isFn').textContent = p.fn;
    $('#isTip').textContent = p.tip;
    var box = $('#isOpts'); box.innerHTML = '';
    p.options.forEach(function (o) {
      var lab = el('label'); lab.appendChild(document.createTextNode(o.label));
      var sel = document.createElement('select');
      sel.appendChild(opt('', 'Belum dipilih'));
      o.choices.forEach(function (c) { sel.appendChild(opt(c, c)); });
      sel.addEventListener('change', function () { cur.v[o.key] = sel.value; syncItem(); });
      lab.appendChild(sel); box.appendChild(lab);
    });
    $('#isHint').hidden = p.options.length === 0;
    syncItem();
    openDlg(itemDlg);
  }
  function syncItem() {
    var p = cur.p;
    $('#isQty').textContent = cur.qty;
    $('#isMinus').disabled = cur.qty <= 1;
    $('#isPrice').textContent = p.price ? rupiah(p.price * cur.qty) : 'Harga dikonfirmasi admin lewat WhatsApp';
    setLink($('#isAsk'), singleMessage(p, cur.v, cur.qty));
  }
  $('#isMinus').addEventListener('click', function () { if (cur.qty > 1) { cur.qty--; syncItem(); } });
  $('#isPlus').addEventListener('click', function () { if (cur.qty < 99) { cur.qty++; syncItem(); } });
  $('#isAdd').addEventListener('click', function () {
    var v = {}; Object.keys(cur.v).forEach(function (k) { if (cur.v[k]) v[k] = cur.v[k]; });
    addLine(cur.p.id, v, cur.qty);
    closeDlg(itemDlg);
    toast(cur.p.name + ' masuk kit');
  });
  guardLink($('#isAsk'));

  /* ---------- Lembar kit ---------- */
  var linesBox = $('#kitLines'), sendA = $('#kitSend'), prev = $('#kitPreview');
  function renderKit() {
    var has = kit.length > 0;
    $('#kitEmpty').hidden = has;
    $('#kitFull').hidden = !has;
    $('#ksTitle').textContent = has ? 'Kit saya (' + totalQty() + ' item)' : 'Kit saya';
    linesBox.innerHTML = '';
    kit.forEach(function (l, idx) {
      var p = byId[l.id];
      var li = el('li', 'kline');
      var pic = el('span', 'kline__pic'); pic.innerHTML = icon(p.icon);
      var txt = el('div', 'kline__txt');
      txt.appendChild(el('strong', null, p.name));
      var vt = variantText(p, l.v);
      if (vt) txt.appendChild(el('span', null, vt));
      var ctl = el('div', 'kline__ctl');
      var q = el('div', 'qty');
      var minus = el('button', null, '−'); minus.type = 'button'; minus.disabled = l.qty <= 1;
      minus.setAttribute('aria-label', 'Kurangi jumlah ' + p.name);
      var out = el('output', null, l.qty); out.setAttribute('aria-live', 'polite');
      var plus = el('button', null, '+'); plus.type = 'button';
      plus.setAttribute('aria-label', 'Tambah jumlah ' + p.name);
      minus.addEventListener('click', function () { if (l.qty > 1) { l.qty--; changed(false); } });
      plus.addEventListener('click', function () { if (l.qty < 99) { l.qty++; changed(false); } });
      q.appendChild(minus); q.appendChild(out); q.appendChild(plus);
      var rm = el('button', 'kline__rm', 'Hapus'); rm.type = 'button';
      rm.setAttribute('aria-label', 'Hapus ' + p.name + ' dari kit');
      rm.addEventListener('click', function () { kit.splice(idx, 1); changed(false); });
      ctl.appendChild(q); ctl.appendChild(rm);
      var body = el('div', 'kline__body'); body.appendChild(txt); body.appendChild(ctl);
      li.appendChild(pic); li.appendChild(body);
      linesBox.appendChild(li);
    });
    $('#kName').value = who.name || '';
    $('#kCity').value = who.city || '';
    $('#kNote').value = who.note || '';
    refreshMessage();
  }
  function refreshMessage() {
    if (!kit.length) return;
    var msg = kitMessage();
    prev.textContent = msg;
    setLink(sendA, msg);
  }
  [['#kName', 'name'], ['#kCity', 'city'], ['#kNote', 'note']].forEach(function (f) {
    $(f[0]).addEventListener('input', function (e) {
      who[f[1]] = e.target.value.trim();
      write(WHO, who);
      refreshMessage();
    });
  });
  guardLink(sendA);
  $('#ksBrowse').addEventListener('click', function () { closeDlg(kitDlg); });

  // Salin pesan (cadangan jika WhatsApp tidak terpasang atau mau ditempel di tempat lain)
  $('#kitCopy').addEventListener('click', function () {
    var msg = kitMessage(), btn = this;
    function ok() { btn.textContent = 'Tersalin'; setTimeout(function () { btn.textContent = 'Salin pesan'; }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(msg).then(ok, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = msg; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) {}
      document.body.removeChild(ta);
    }
  });

  // Kosongkan kit: ketuk dua kali agar tidak terhapus tidak sengaja
  var clearT;
  $('#kitClear').addEventListener('click', function () {
    var btn = this;
    if (btn.getAttribute('data-sure') === '1') {
      clearTimeout(clearT);
      btn.removeAttribute('data-sure'); btn.textContent = 'Kosongkan kit';
      kit = []; changed(false);
      return;
    }
    btn.setAttribute('data-sure', '1'); btn.textContent = 'Ketuk lagi untuk kosongkan';
    clearT = setTimeout(function () { btn.removeAttribute('data-sure'); btn.textContent = 'Kosongkan kit'; }, 3000);
  });

  /* ---------- Mulai ---------- */
  buildFilters();
  renderList();
  renderBar(false);
})();
