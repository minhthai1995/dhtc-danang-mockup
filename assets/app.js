/* DHTC Platform — Responsive UI helpers */
(function () {
  /* ── 1. body.app sidebar hamburger (admin / seller) ── */
  function initSidebar() {
    if (!document.body.classList.contains('app')) return;
    var sidebar = document.querySelector('aside.sidebar');
    var main    = document.querySelector('main');
    if (!sidebar || !main) return;

    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    var btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Mở menu');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    main.insertBefore(btn, main.firstChild);

    function open()  { sidebar.classList.add('open');    overlay.classList.add('show'); }
    function close() { sidebar.classList.remove('open'); overlay.classList.remove('show'); }

    btn.addEventListener('click', open);
    overlay.addEventListener('click', close);
    sidebar.querySelectorAll('nav a').forEach(function(a){ a.addEventListener('click', close); });
  }

  /* ── 2. .cust-nav hamburger (customer pages) ── */
  function initCustNav() {
    var nav  = document.querySelector('.cust-nav');
    var menu = document.querySelector('.cust-menu');
    if (!nav || !menu) return;

    var ham = document.createElement('button');
    ham.className = 'cust-ham';
    ham.setAttribute('aria-label', 'Mở menu');
    ham.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';

    var inner = document.querySelector('.cust-nav-top, .cust-nav-inner');
    if (inner) inner.appendChild(ham);

    ham.addEventListener('click', function(){ menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ menu.classList.remove('open'); }); });
    document.addEventListener('click', function(e){ if (!e.target.closest('.cust-nav')) menu.classList.remove('open'); });
  }

  /* ── 3. Collapse inline-style multi-column grids on mobile ── */
  function applyInlineGrids() {
    var mobile = window.innerWidth <= 820;
    document.querySelectorAll('[style]').forEach(function(el) {
      var gtc = el.style.gridTemplateColumns;
      if (!gtc) return;
      /* skip: auto-fill / auto-fit (already responsive) */
      if (/auto-(fill|fit)/.test(gtc)) return;
      /* skip: icon+text rows like "auto 1fr" */
      if (/^auto\s/.test(gtc)) return;
      if (/^min-content/.test(gtc)) return;
      /* detect multi-column: has a space OR is repeat(N>=2, ...) */
      var isRepeatMulti = /^repeat\(\s*([2-9]|\d{2,})\s*,/.test(gtc);
      if (!gtc.trim().includes(' ') && !isRepeatMulti) return; /* already 1-track */

      if (!el.dataset.gridOrig) el.dataset.gridOrig = gtc;
      if (!el.dataset.gapOrig  && el.style.gap) el.dataset.gapOrig = el.style.gap;

      if (mobile) {
        el.style.gridTemplateColumns = '1fr';
        if (el.dataset.gapOrig) el.style.gap = '14px';
      } else {
        el.style.gridTemplateColumns = el.dataset.gridOrig;
        if (el.dataset.gapOrig) el.style.gap = el.dataset.gapOrig;
      }
    });
  }

  /* ── 4. Lang pill persistence (shared across all pages) ── */
  function initLang() {
    if (localStorage.getItem('dhtc-lang') === 'en') {
      document.body.classList.add('en');
      document.querySelectorAll('.lang-pill button').forEach(function(b, i){ b.classList.toggle('active', i === 1); });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initCustNav();
    applyInlineGrids();
    initLang();
  });
  window.addEventListener('resize', applyInlineGrids);
})();
