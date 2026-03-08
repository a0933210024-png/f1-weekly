/* ============================================================
   F1 WEEKLY — MAIN SCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ---- State ---- */
  var lang = localStorage.getItem('f1w-lang') || 'en';

  /* ---- DOM ready ---- */
  document.addEventListener('DOMContentLoaded', function () {
    applyLang();
    initLangToggle();
    initThemeToggle();
    initMobileMenu();
    initCountdown();
    initScheduleFilter();
    initCircuitModal();
    initStandingsTabs();
    markActiveNav();
    initShareFab();
  });

  /* ============================================================
     LANGUAGE
  ============================================================ */
  function t(key) {
    return (F1.i18n[lang] && F1.i18n[lang][key]) || (F1.i18n.en[key]) || key;
  }

  function applyLang() {
    document.body.className = document.body.className
      .replace(/\blang-\w+/g, '').trim();
    document.body.classList.add('lang-' + lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

    /* data-i18n elements */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    /* lang toggle active state */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* re-render dynamic sections if they exist on this page */
    if (document.getElementById('idx-driver-standings'))   renderIndexStandings();
    if (document.getElementById('idx-news-grid'))          renderIndexNews();
    if (document.getElementById('teams-grid'))             renderTeams();
    if (document.querySelector('.schedule-list'))          renderSchedule(currentFilter);
    if (document.getElementById('driver-standings-tbody')) renderDriverStandings();
    if (document.getElementById('constructor-standings-tbody')) renderConstructorStandings();
    if (document.getElementById('quali-grid-tbody'))       renderQualiGrid();
    if (typeof window.renderNews === 'function' && document.getElementById('news-page-grid')) window.renderNews();
    if (typeof window.renderCompare === 'function' && document.getElementById('cmp-arena')) window.renderCompare();

    /* update countdown labels */
    updateCountdownLabels();
  }

  function initLangToggle() {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lang = btn.dataset.lang;
        localStorage.setItem('f1w-lang', lang);
        applyLang();
      });
    });
  }

  /* expose for pages that override renderNews */
  window.getLang = function () { return lang; };
  window.t = t;

  /* ============================================================
     THEME TOGGLE
  ============================================================ */
  function initThemeToggle() {
    var saved = localStorage.getItem('f1w-theme') || 'dark';
    applyTheme(saved);

    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('f1w-theme', next);
        applyTheme(next);
      });
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    /* Update button icons */
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.textContent = theme === 'light' ? '\u2600' : '\uD83C\uDF19';
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    });
  }

  /* ============================================================
     SHARE FAB
     Platforms: X (EN) · Threads (ZH) · Facebook (ZH) · LINE (ZH) · Copy
  ============================================================ */
  function initShareFab() {
    var fab = document.getElementById('share-fab');
    if (!fab) return;
    var btn = fab.querySelector('.share-fab-btn');
    var menu = document.getElementById('share-menu');
    if (!btn || !menu) return;

    /* --- Build page-aware bilingual share texts --- */
    function getShareTexts() {
      var path = window.location.pathname;
      var en, zh;
      if (path.indexOf('compare') !== -1) {
        /* Try to read currently selected drivers */
        var selA = document.querySelector('select:first-of-type');
        var selB = document.querySelectorAll('select')[1];
        var nameA = selA ? selA.options[selA.selectedIndex].text.replace(/^#\d+\s+/, '').split('(')[0].trim() : 'Driver A';
        var nameB = selB ? selB.options[selB.selectedIndex].text.replace(/^#\d+\s+/, '').split('(')[0].trim() : 'Driver B';
        en = nameA + ' vs ' + nameB + ' \u2014 head-to-head 2026 F1 comparison \uD83C\uDFCE\uFE0F #F1 #Formula1';
        zh = nameA + ' vs ' + nameB + ' \u8eca\u624b\u5c0d\u6c7a\uff01\uD83C\uDFCE\uFE0F 2026 F1 \u8cfd\u5b63\u6578\u64da\u5168\u9762\u6bd4\u8f03\u2014\u2014\u5feb\u4f86\u770b\u770b\uff01 #F1 #F1\u8cfd\u8eca';
      } else if (path.indexOf('simulator') !== -1) {
        en = 'I just simulated the 2026 F1 Championship on F1 Weekly \uD83C\uDFC6 What\u2019s your prediction? #F1 #Formula1 #2026F1';
        zh = '\u6211\u525b\u7528 F1 Weekly \u6a21\u64ec\u4e862026 F1 \u5e74\u5ea6\u5192\u8ecd\uff01\uD83C\uDFC6 \u4f60\u5c0b\u5c6c\u8acb\u5049\u6c2a\u5198\u51a0\uff1f\u5feb\u4f86\u9810\u6e2c\uff01 #F1 #F1\u8cfd\u8eca';
      } else if (path.indexOf('teams') !== -1) {
        en = 'Complete 2026 F1 grid: all 11 teams & 22 drivers \uD83C\uDFCE\uFE0F Check it out on F1 Weekly! #F1 #Formula1';
        zh = '2026 F1 \u5b8c\u6574\u8eca\u968a\u9663\u5bb9\u2014\u201411 \u652f\u8eca\u968a\u300122 \u4f4d\u8eca\u624b\u5927\u516c\u958b\uD83C\uDFCE\uFE0F #F1 #F1\u8cfd\u8eca #2026\u8cfd\u5b63';
      } else if (path.indexOf('schedule') !== -1) {
        en = '2026 F1 season: 24 races, 5 continents \uD83C\uDF0D Full calendar on F1 Weekly! Season opens March 8. #F1 #Formula1';
        zh = '2026 F1 \u8cfd\u66862024 \u5834\u6bd4\u8cfd\u6a6b\u8de8\u4e94\u5927\u6d32\uD83C\uDF0D \u6fb3\u6d32\u5927\u734e\u8cfd\u4e09\u6708\u516b\u65e5\u958b\u5e55\uff01 #F1 #F1\u8cfd\u8eca #2026\u8cfd\u5b63';
      } else if (path.indexOf('standings') !== -1) {
        en = '2026 F1 Championship standings \uD83C\uDFC6 Who\u2019s leading the title fight? #F1 #Formula1';
        zh = '2026 F1 \u5e74\u5ea6\u7a4d\u5206\u6392\u884c\u699c\uD83C\uDFC6 \u8ab0\u5c07\u554f\u9f0e\u5e74\u5ea6\u5192\u8ecd\uff1f #F1 #F1\u8cfd\u8eca';
      } else if (path.indexOf('news') !== -1) {
        en = 'Latest 2026 F1 news & race updates \uD83D\uDCF0 Stay informed on F1 Weekly! #F1 #Formula1';
        zh = '2026 F1 \u6700\u65b0\u8cfd\u4e8b\u65b0\u805e\u8207\u8cfd\u6cc1\u52d5\u614b\uD83D\uDCF0 #F1 #F1\u8cfd\u8eca';
      } else {
        en = 'F1 Weekly \u2014 your complete 2026 Formula 1 companion \uD83C\uDFCE\uFE0F Standings, schedule, driver comparison & championship simulator! #F1 #Formula1';
        zh = '\uD83C\uDFCE\uFE0F F1 Weekly \u2014 2026 \u5e74 F1 \u8cfd\u5b63\u5b8c\u6574\u8cc7\u8a0a\u7ad99\uff01\u7a4d\u5206\u69dc\u3001\u8cfd\u7a0b\u3001\u8eca\u624b\u5c0d\u6bd4\u3001\u5192\u8ecd\u6a21\u64ec\u5668\u4e00\u7ad9\u641e\u5b9a\u3002\u8cfd\u5b63\u4e09\u6708\u516b\u65e5\u958b\u5e55\uff01 #F1 #F1\u8cfd\u8eca #2026\u8cfd\u5b63';
      }
      return { en: en, zh: zh };
    }

    /* --- SVG icons --- */
    var iconX = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.726-8.84L1.254 2.25H8.08l4.226 5.593L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>';
    var iconThreads = '<svg width="15" height="15" viewBox="0 0 192 192" fill="currentColor"><path d="M141.537 88.988c-.954-.49-1.923-.959-2.908-1.408a65.97 65.97 0 0 0-1.449-6.306C129.04 57.899 113.786 44 95.813 44H95.8c-13.617 0-26.22 7.128-33.546 18.659a7.5 7.5 0 0 0 12.783 7.848C79.686 63.51 87.464 59 95.8 59h.013c13.064 0 24.117 10.007 29.487 26.054.4 1.2.754 2.44 1.064 3.714-3.893-.546-8.042-.751-12.416-.586-16.734.628-30.713 9.012-32.923 21.127-1.195 6.648.604 13.411 4.98 18.51 4.18 4.872 10.35 7.695 17.382 7.695 10.012 0 19.03-5.532 23.854-14.432 3.558-6.57 5.35-14.44 5.33-23.383.42.256.829.519 1.225.788 6.47 4.367 10.625 10.932 11.688 18.539.97 6.927-.6 13.804-4.415 19.35-5.32 7.77-14.28 12.25-24.62 12.25-17.688 0-32.25-14.507-32.25-32.336 0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5c0 26.108 21.178 47.336 47.25 47.336 15.33 0 28.863-6.77 37.203-18.584 6.044-8.83 8.397-19.59 6.826-30.318-1.85-13.2-9.25-24.5-20.987-31.773zm-26.52 21.23c-.246 5.57-1.428 10.64-3.43 14.42-2.557 4.722-6.773 7.36-11.583 7.36-3.56 0-6.485-1.293-8.472-3.637-1.885-2.196-2.634-5.134-2.108-8.052.91-5.066 8.03-10.396 20.08-10.841 1.813-.068 3.571-.048 5.265.047a14.32 14.32 0 0 1 .248.702z"/></svg>';
    var iconFB = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.994 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
    var iconLINE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>';
    var iconLink = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

    /* --- Build menu on each open so compare page gets current drivers --- */
    function buildMenu() {
      var texts = getShareTexts();
      var url = encodeURIComponent(window.location.href);
      var enEnc = encodeURIComponent(texts.en);
      var zhEnc = encodeURIComponent(texts.zh);
      var l = getLang();
      menu.innerHTML =
        /* X — English */
        '<a class="share-fab-item share-fab-item--x" href="https://twitter.com/intent/tweet?url=' + url + '&text=' + enEnc + '" target="_blank" rel="noopener" title="X \u00b7 English">' + iconX + '</a>' +
        /* Threads — Chinese */
        '<a class="share-fab-item share-fab-item--threads" href="https://www.threads.net/intent/post?text=' + zhEnc + '%20' + url + '" target="_blank" rel="noopener" title="Threads \u00b7 \u4e2d\u6587">' + iconThreads + '</a>' +
        /* Facebook — Chinese */
        '<a class="share-fab-item share-fab-item--fb" href="https://www.facebook.com/sharer/sharer.php?u=' + url + '&quote=' + zhEnc + '" target="_blank" rel="noopener" title="Facebook \u00b7 \u4e2d\u6587">' + iconFB + '</a>' +
        /* LINE — Chinese */
        '<a class="share-fab-item share-fab-item--line" href="https://social-plugins.line.me/lineit/share?url=' + url + '&text=' + zhEnc + '" target="_blank" rel="noopener" title="LINE \u00b7 \u4e2d\u6587">' + iconLINE + '</a>' +
        /* Copy link */
        '<button class="share-fab-item" id="share-copy-link" title="' + (l === 'zh' ? '\u8907\u88fd\u9023\u7d50' : 'Copy link') + '">' + iconLink + '</button>';
    }

    btn.addEventListener('click', function () {
      var opening = !fab.classList.contains('open');
      fab.classList.toggle('open');
      if (opening) buildMenu();
    });

    /* Copy link */
    menu.addEventListener('click', function (e) {
      var copyBtn = e.target.closest('#share-copy-link');
      if (!copyBtn) return;
      e.preventDefault();
      var l = getLang();
      var successMsg = l === 'zh' ? '\u5df2\u8907\u88fd\u9023\u7d50\uff01' : 'Link copied!';
      navigator.clipboard.writeText(window.location.href).then(function () {
        showShareToast(successMsg);
      }).catch(function () {
        var ta = document.createElement('textarea');
        ta.value = window.location.href;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showShareToast(successMsg);
      });
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!fab.contains(e.target)) fab.classList.remove('open');
    });
  }

  function showShareToast(msg) {
    var existing = document.querySelector('.share-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 250);
    }, 1800);
  }

  /* ============================================================
     MOBILE MENU
  ============================================================ */
  function initMobileMenu() {
    var btn = document.querySelector('.mobile-menu-btn');
    var links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  /* ============================================================
     ACTIVE NAV LINK
  ============================================================ */
  function markActiveNav() {
    var page = location.pathname.split('/').pop() || 'index.html';
    if (page === '') page = 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === page);
    });
  }

  /* ============================================================
     COUNTDOWN TIMER
  ============================================================ */
  var countdownInterval = null;

  function updateCountdownLabels() {
    var keys = ['days','hours','minutes','seconds'];
    var sels = ['.cd-lbl-d','.cd-lbl-h','.cd-lbl-m','.cd-lbl-s'];
    keys.forEach(function(k, i) {
      document.querySelectorAll(sels[i]).forEach(function(el) { el.textContent = t(k); });
    });
  }

  function initCountdown() {
    var containers = document.querySelectorAll('[data-countdown]');
    if (!containers.length) return;

    var nextRace = F1.races.find(function (r) { return r.status === 'next'; }) ||
                   F1.races.find(function (r) { return r.status === 'upcoming'; });
    if (!nextRace) return;

    /* Fill static race info */
    function fillRaceInfo() {
      document.querySelectorAll('.js-next-round').forEach(function (el) {
        el.textContent = t('round') ? t('round') + ' ' + nextRace.round : 'Round ' + nextRace.round;
      });
      document.querySelectorAll('.js-next-round-num').forEach(function (el) {
        el.textContent = 'Round ' + nextRace.round;
      });
      document.querySelectorAll('.js-next-name').forEach(function (el) {
        el.textContent = lang === 'zh' ? nextRace.nameZH : nextRace.name;
      });
      document.querySelectorAll('.js-next-circuit').forEach(function (el) {
        el.textContent = lang === 'zh' ? nextRace.circuitZH : nextRace.circuit;
      });
      document.querySelectorAll('.js-next-country').forEach(function (el) {
        el.textContent = lang === 'zh' ? nextRace.countryZH : nextRace.country;
      });
      document.querySelectorAll('.js-next-flag').forEach(function (el) {
        el.textContent = nextRace.flag;
      });
      document.querySelectorAll('.js-next-date').forEach(function (el) {
        el.textContent = nextRace.display;
      });
      document.querySelectorAll('.js-next-weekend').forEach(function (el) {
        el.textContent = nextRace.weekend;
      });
    }

    fillRaceInfo();

    /* Circuit SVG */
    document.querySelectorAll('.js-next-circuit-svg').forEach(function (c) {
      if (F1.circuits[nextRace.key]) {
        c.innerHTML = buildCircuitSVG(nextRace.key, 260, 170);
      }
    });

    function tick() {
      var now    = new Date();
      var target = new Date(nextRace.date + 'T06:00:00Z');
      var diff   = target - now;

      if (diff <= 0) {
        containers.forEach(function (el) {
          el.innerHTML = '<div style="font-family:var(--font-display);font-size:22px;font-weight:900;color:var(--red);letter-spacing:0.06em;text-transform:uppercase;text-align:center;padding:12px 0;">RACE DAY</div>';
        });
        clearInterval(countdownInterval);
        return;
      }

      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);

      containers.forEach(function (el) {
        var dEl = el.querySelector('.cd-d');
        var hEl = el.querySelector('.cd-h');
        var mEl = el.querySelector('.cd-m');
        var sEl = el.querySelector('.cd-s');
        if (dEl) dEl.textContent = pad(d);
        if (hEl) hEl.textContent = pad(h);
        if (mEl) mEl.textContent = pad(m);
        if (sEl) sEl.textContent = pad(s);
      });
    }

    if (countdownInterval) clearInterval(countdownInterval);
    tick();
    countdownInterval = setInterval(tick, 1000);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  /* ============================================================
     CIRCUIT IMAGE BUILDER
     Images sourced from media.formula1.com (official F1 media CDN)
  ============================================================ */
  function buildCircuitSVG(key, w, h) {
    var c = F1.circuits[key];
    if (!c) return '';
    var filename = (typeof c === 'object') ? c.img    : c;
    var invert   = (typeof c === 'object') ? !!c.invert : false;
    var src = 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/' + filename + '.webp';
    var style = 'object-fit:contain;display:block;background:var(--bg-2);' + (invert ? 'filter:invert(1);' : '');
    return '<img src="' + src + '" alt="' + key + ' circuit" ' +
      'width="' + w + '" height="' + h + '" ' +
      'style="' + style + '" ' +
      'loading="lazy">';
  }

  window.buildCircuitSVG = buildCircuitSVG;

  /* ============================================================
     SCHEDULE (schedule.html)
  ============================================================ */
  var currentFilter = 'all';

  function initScheduleFilter() {
    var btns = document.querySelectorAll('.filter-btn');
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderSchedule(currentFilter);
      });
    });
    renderSchedule('all');
  }

  function renderSchedule(filter) {
    var list = document.querySelector('.schedule-list');
    if (!list) return;

    var races = F1.races.slice();
    if (filter === 'done')     races = races.filter(function (r) { return r.status === 'completed'; });
    if (filter === 'upcoming') races = races.filter(function (r) { return r.status !== 'completed'; });

    if (races.length === 0) {
      list.innerHTML = '<div style="padding:60px var(--gutter);text-align:center;font-family:var(--font-mono);font-size:11px;color:var(--text-3);letter-spacing:0.14em;text-transform:uppercase;">No results</div>';
      return;
    }

    list.innerHTML = races.map(function (r) {
      var statusLabel, statusClass;
      if (r.status === 'completed')    { statusLabel = t('race_complete');      statusClass = 'done'; }
      else if (r.status === 'next')    { statusLabel = t('race_next');          statusClass = 'next'; }
      else                             { statusLabel = t('race_upcoming');       statusClass = 'upcoming'; }

      var rowCls = 'race-row' +
        (r.status === 'completed' ? ' completed' : '') +
        (r.status === 'next'      ? ' next'      : '');

      var circSVG = F1.circuits[r.key] ? buildCircuitSVG(r.key, 120, 68) : '';
      var winnerBlock = r.winner
        ? '<div style="font-family:var(--font-mono);font-size:9px;color:var(--text-3);margin-top:4px;letter-spacing:0.06em;">W: ' + r.winner + '</div>'
        : '';

      return '<div class="' + rowCls + '" data-round="' + r.round + '">' +
        '<div class="rr-round">R' + String(r.round).padStart(2, '0') + '</div>' +
        '<div class="rr-flag">' + r.flag + '</div>' +
        '<div>' +
          '<div class="rr-name">' + (lang === 'zh' ? r.nameZH : r.name) + '</div>' +
          '<div class="rr-circuit">' + (lang === 'zh' ? r.circuitZH : r.circuit) + '</div>' +
        '</div>' +
        '<div class="rr-circuit-svg">' + circSVG + '</div>' +
        '<div>' +
          '<div class="rr-date">' + r.display + '</div>' +
          '<div class="rr-date-sub">' + r.weekend + '</div>' +
        '</div>' +
        '<div>' +
          '<span class="status-badge ' + statusClass + '">' + statusLabel + '</span>' +
          winnerBlock +
        '</div>' +
        '</div>';
    }).join('');

    list.querySelectorAll('.race-row[data-round]').forEach(function (row) {
      row.addEventListener('click', function () {
        var race = F1.races.find(function (r) { return r.round === parseInt(row.dataset.round); });
        if (race) openCircuitModal(race);
      });
    });
  }

  window.renderSchedule = function (f) { renderSchedule(f || currentFilter); };

  /* ============================================================
     CIRCUIT MODAL
  ============================================================ */
  function initCircuitModal() {
    var modal = document.querySelector('.circuit-modal');
    if (!modal) return;
    var closeBtn = modal.querySelector('.cm-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { modal.classList.remove('open'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('open'); });
  }

  function openCircuitModal(race) {
    var modal = document.querySelector('.circuit-modal');
    if (!modal) return;

    modal.querySelector('.cm-country').textContent  = lang === 'zh' ? race.countryZH : race.country;
    modal.querySelector('.cm-title').textContent    = lang === 'zh' ? race.nameZH    : race.name;
    modal.querySelector('.cm-circuit-name').textContent = lang === 'zh' ? race.circuitZH : race.circuit;
    modal.querySelector('.cm-stat-length').textContent  = race.length;
    modal.querySelector('.cm-stat-laps').textContent    = race.laps;
    modal.querySelector('.cm-stat-record').textContent  = race.lapRecord;
    modal.querySelector('.cm-stat-turns').textContent   = race.turns;

    var dateEl = modal.querySelector('.cm-date-big');
    if (dateEl) dateEl.innerHTML = '<span>' + t('modal_date') + '</span>' + race.display + ' · ' + race.weekend;

    var svgHolder = modal.querySelector('.cm-svg-holder');
    if (svgHolder && F1.circuits[race.key]) svgHolder.innerHTML = buildCircuitSVG(race.key, 260, 175);

    var winnerEl = modal.querySelector('.cm-winner');
    if (winnerEl) {
      winnerEl.style.display = race.winner ? '' : 'none';
      if (race.winner) modal.querySelector('.cm-winner-name').textContent = race.winner;
    }

    modal.classList.add('open');
  }

  window.openCircuitModal = openCircuitModal;

  /* ============================================================
     STANDINGS TABS (standings.html)
  ============================================================ */
  function initStandingsTabs() {
    var tabs = document.querySelectorAll('.s-tab');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.s-tab-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var panel = document.getElementById(tab.dataset.target);
        if (panel) panel.classList.add('active');
      });
    });
    renderDriverStandings();
    renderConstructorStandings();
    renderQualiGrid();
  }

  /* ---- Driver standings ---- */
  function renderDriverStandings() {
    var tbody = document.getElementById('driver-standings-tbody');
    if (!tbody) return;

    var drivers = [];
    F1.teams.forEach(function (team) {
      team.drivers.forEach(function (d) {
        drivers.push({
          num: d.num, flag: d.flag,
          name: d.first + ' ' + d.last,
          teamName: lang === 'zh' ? team.nameZH : team.name,
          teamColor: team.color,
          nat: d.nat, pts: d.pts, wins: d.wins
        });
      });
    });
    /* Sort by pts desc, then by car number asc as tiebreak */
    drivers.sort(function (a, b) { return b.pts - a.pts || a.num - b.num; });

    tbody.innerHTML = drivers.map(function (d, i) {
      var pos = i + 1;
      return '<tr>' +
        '<td class="st-pos' + (pos <= 3 ? ' top' : '') + '">' + pos + '</td>' +
        '<td><div class="driver-cell">' +
          '<div class="dc-bar" style="background:' + d.teamColor + '"></div>' +
          '<div>' +
            '<div class="dc-name">' + d.name + '</div>' +
            '<div class="dc-sub">' + d.flag + ' &nbsp;' + d.teamName + '</div>' +
          '</div>' +
        '</div></td>' +
        '<td class="st-wins">' + d.wins + '</td>' +
        '<td class="st-pts">' + d.pts + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ---- Constructor standings ---- */
  function renderConstructorStandings() {
    var tbody = document.getElementById('constructor-standings-tbody');
    if (!tbody) return;

    var teams = F1.teams.slice().sort(function (a, b) { return b.pts - a.pts || a.pos - b.pos; });
    var max = teams[0].pts || 1; /* avoid /0 */

    tbody.innerHTML = teams.map(function (team, i) {
      var pos = i + 1;
      var barW = Math.round((team.pts / max) * 100);
      return '<tr>' +
        '<td class="st-pos' + (pos <= 3 ? ' top' : '') + '">' + pos + '</td>' +
        '<td><div class="driver-cell">' +
          '<div class="dc-bar" style="background:' + team.color + '"></div>' +
          '<div>' +
            '<div class="dc-name">' + (lang === 'zh' ? team.nameZH : team.name) + '</div>' +
            '<div class="dc-sub">' + team.fullName + '</div>' +
          '</div>' +
        '</div></td>' +
        '<td class="team-bar-cell"><div class="team-bar-wrap"><div class="team-bar-fill" style="width:' + barW + '%;background:' + team.color + '"></div></div></td>' +
        '<td class="st-pts">' + team.pts + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ---- Qualifying grid (Australia) ---- */
  function renderQualiGrid() {
    var tbody = document.getElementById('quali-grid-tbody');
    if (!tbody || !F1.australiaQuali) return;

    /* Find team color by driver number */
    function getTeamColor(num) {
      for (var i = 0; i < F1.teams.length; i++) {
        for (var j = 0; j < F1.teams[i].drivers.length; j++) {
          if (F1.teams[i].drivers[j].num === num) return F1.teams[i].color;
        }
      }
      return '#555';
    }

    tbody.innerHTML = F1.australiaQuali.map(function (q) {
      var color = getTeamColor(q.num);
      var posClass = q.pos <= 3 ? 'st-pos top' : 'st-pos';
      var timeStyle = !q.confirmed ? 'color:var(--text-3)' : '';
      var crashStyle = q.time === 'Q1 Crash' ? 'color:var(--red)' : '';
      return '<tr>' +
        '<td class="' + posClass + '">' + q.pos + '</td>' +
        '<td><div class="driver-cell">' +
          '<div class="dc-bar" style="background:' + color + '"></div>' +
          '<div>' +
            '<div class="dc-name">' + q.driver + '</div>' +
            '<div class="dc-sub">#' + q.num + ' · ' + q.team + '</div>' +
          '</div>' +
        '</div></td>' +
        '<td style="font-family:var(--font-mono);font-size:14px;text-align:right;' + timeStyle + crashStyle + '">' + q.time + '</td>' +
        '</tr>';
    }).join('');
  }

  window.renderStandings = function () {
    renderDriverStandings();
    renderConstructorStandings();
    renderQualiGrid();
  };

  /* ============================================================
     INDEX PAGE
  ============================================================ */
  function renderIndexStandings() {
    /* Top 5 drivers */
    var dList = document.getElementById('idx-driver-standings');
    if (dList) {
      var drivers = [];
      F1.teams.forEach(function (team) {
        team.drivers.forEach(function (d) {
          drivers.push({ name: d.first + ' ' + d.last, team: lang === 'zh' ? team.nameZH : team.name, pts: d.pts });
        });
      });
      drivers.sort(function (a, b) { return b.pts - a.pts; });
      dList.innerHTML = drivers.slice(0, 5).map(function (d, i) {
        var p = i + 1;
        return '<div class="sp-row">' +
          '<div class="sp-pos' + (p <= 3 ? ' p' + p : '') + '">' + p + '</div>' +
          '<div><div class="sp-name">' + d.name + '</div><div class="sp-sub">' + d.team + '</div></div>' +
          '<div class="sp-pts">' + d.pts + '</div>' +
          '</div>';
      }).join('');
    }

    /* Top 5 constructors */
    var cList = document.getElementById('idx-constructor-standings');
    if (cList) {
      var teams = F1.teams.slice().sort(function (a, b) { return b.pts - a.pts || a.pos - b.pos; });
      cList.innerHTML = teams.slice(0, 5).map(function (team, i) {
        var p = i + 1;
        return '<div class="sp-row">' +
          '<div class="sp-pos' + (p <= 3 ? ' p' + p : '') + '">' + p + '</div>' +
          '<div><div class="sp-name">' +
            '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + team.color + ';margin-right:7px;vertical-align:middle;"></span>' +
            (lang === 'zh' ? team.nameZH : team.name) +
          '</div><div class="sp-sub">' + team.fullName + '</div></div>' +
          '<div class="sp-pts">' + team.pts + '</div>' +
          '</div>';
      }).join('');
    }
  }

  function renderIndexNews() {
    var grid = document.getElementById('idx-news-grid');
    if (!grid) return;
    grid.innerHTML = F1.news.slice(0, 5).map(function (n, i) {
      return '<div class="news-tile' + (i === 0 ? ' big' : '') + '" onclick="location.href=\'news.html\'">' +
        '<div class="news-cat">' + n.cat[lang] + '</div>' +
        '<div class="news-tile-title">' + n.title[lang] + '</div>' +
        (i === 0 ? '<div class="news-excerpt">' + n.excerpt[lang] + '</div>' : '') +
        '<div class="news-meta">' +
          '<span>' + n.date[lang] + '</span>' +
          '<span class="news-meta-sep"></span>' +
          '<span>' + n.readTime[lang] + '</span>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  window.renderIndexDynamic = function () {
    renderIndexStandings();
    renderIndexNews();
  };

  /* ============================================================
     TEAMS PAGE (teams.html)
  ============================================================ */
  window.renderTeams = function () {
    var grid = document.getElementById('teams-grid');
    if (!grid) return;

    /* engines map */
    var engines = {
      mclaren: 'Mercedes', ferrari: 'Ferrari', redbull: 'Red Bull Ford',
      mercedes: 'Mercedes', astonmartin: 'Honda', alpine: 'Mercedes',
      haas: 'Ferrari', williams: 'Mercedes', racingbulls: 'Red Bull Ford',
      audi: 'Audi', cadillac: 'Ferrari'
    };

    grid.innerHTML = F1.teams.map(function (team) {
      var l = lang;
      var logoUrl = team.cdnSlug ? F1.getTeamLogo(team.cdnSlug, 48) : '';
      var driverCards = team.drivers.map(function (d) {
        var imgUrl = d.code ? F1.getDriverImg(d.code, team.cdnSlug, 440) : '';
        return '<div class="driver-tile">' +
          '<div class="driver-tile-accent" style="background:' + team.color + '"></div>' +
          '<div class="driver-tile-num">' + d.num + '</div>' +
          (imgUrl ? '<img class="driver-tile-img" src="' + imgUrl + '" alt="' + d.first + ' ' + d.last + '" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
          '<div class="driver-tile-name">' +
            '<span class="driver-tile-firstname">' + d.first + '</span>' +
            '<span class="driver-tile-lastname">' + d.last + '</span>' +
          '</div>' +
          '<div class="driver-tile-nat">' + d.flag + '&nbsp;&nbsp;' + d.nat + '</div>' +
          '<div class="driver-tile-pts">#' + d.num + '</div>' +
          '</div>';
      }).join('');

      return '<div class="team-card" id="team-' + team.id + '" style="border-left-color:' + team.color + '">' +
        '<div class="team-card-top">' +
          '<div class="team-name-block">' +
            '<div class="team-header-row">' +
              (logoUrl ? '<img class="team-logo" src="' + logoUrl + '" alt="' + team.name + '" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
              '<div class="team-name">' + (l === 'zh' ? team.nameZH : team.name) + '</div>' +
            '</div>' +
            '<div class="team-fullname">' + team.fullName + '</div>' +
            '<div class="engine-badge">' +
              (l === 'zh' ? '動力單元：' : 'Power Unit: ') + (engines[team.id] || '—') +
            '</div>' +
          '</div>' +
          '<div class="team-meta">' +
            '<div class="team-pos-label">P' + team.pos + '</div>' +
            '<div class="team-pts">' + team.pts + '</div>' +
            '<div class="team-pts-lbl">PTS</div>' +
          '</div>' +
        '</div>' +
        '<div class="team-drivers">' + driverCards + '</div>' +
        '</div>';
    }).join('');
  };

  /* ============================================================
     DEFAULT renderNews (overridden by news.html inline script)
  ============================================================ */
  window.renderNews = function () {};

})();
