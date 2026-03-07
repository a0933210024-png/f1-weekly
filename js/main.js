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
    initMobileMenu();
    initCountdown();
    initScheduleFilter();
    initCircuitModal();
    initStandingsTabs();
    markActiveNav();
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
    var style = 'object-fit:contain;display:block;background:#111;' + (invert ? 'filter:invert(1);' : '');
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
