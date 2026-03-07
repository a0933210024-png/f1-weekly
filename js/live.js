/* ============================================================
   F1 WEEKLY — LIVE DATA (js/live.js)
   Fetches from Jolpica F1 API (Ergast successor) on page load.
   Falls back gracefully to hardcoded data.js values if unavailable.
   Caches 5 minutes in localStorage to avoid hammering the API.

   API base: https://api.jolpi.ca/ergast/f1/
   Docs: https://github.com/jolpica/jolpica-f1
   ============================================================ */

(function() {
  'use strict';

  var YEAR   = 2026;
  var BASE   = 'https://api.jolpi.ca/ergast/f1';
  var CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  /* ---- ID maps: Jolpica → local F1.teams ids / driver nums ---- */
  var CONSTRUCTOR_MAP = {
    mclaren:      'mclaren',
    ferrari:      'ferrari',
    red_bull:     'redbull',
    mercedes:     'mercedes',
    aston_martin: 'astonmartin',
    alpine:       'alpine',
    haas:         'haas',
    williams:     'williams',
    rb:           'racingbulls',
    audi:         'audi',
    cadillac:     'cadillac'
  };

  /* Maps Jolpica driverId → car number in F1.teams */
  var DRIVER_NUM_MAP = {
    norris:          1,
    piastri:         81,
    leclerc:         16,
    hamilton:        44,
    max_verstappen:  3,
    hadjar:          6,
    russell:         63,
    antonelli:       12,
    alonso:          14,
    stroll:          18,
    gasly:           10,
    colapinto:       43,
    ocon:            31,
    bearman:         87,
    sainz:           55,
    albon:           23,
    lawson:          30,
    lindblad:        41,
    hulkenberg:      27,
    bortoleto:       5,
    perez:           11,
    bottas:          77
  };

  /* ---- Cache helpers ---- */
  function cacheGet(key) {
    try {
      var raw = localStorage.getItem('f1live_' + key);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (Date.now() - obj.ts > CACHE_TTL) return null;
      return obj.data;
    } catch(e) { return null; }
  }

  function cacheSet(key, data) {
    try {
      localStorage.setItem('f1live_' + key, JSON.stringify({ ts: Date.now(), data: data }));
    } catch(e) {}
  }

  /* ---- Status badge ---- */
  function showBadge(state) {
    /* state: 'updating' | 'live' | 'cached' | 'offline' */
    var existing = document.getElementById('f1live-badge');
    if (!existing) return; // only show if placeholder exists

    var labels = {
      updating: { en: 'UPDATING…', zh: '更新中…',  color: '#888'           },
      live:     { en: 'LIVE DATA', zh: '即時資料',  color: '#00C853'        },
      cached:   { en: 'CACHED',    zh: '已快取',    color: '#FF8F00'        },
      offline:  { en: 'OFFLINE',   zh: '無法連線',  color: 'var(--red)'     }
    };
    var l = (typeof getLang === 'function') ? getLang() : 'en';
    var info = labels[state] || labels.offline;
    existing.textContent = info[l] || info.en;
    existing.style.color = info.color;
    existing.style.borderColor = info.color;
    existing.dataset.state = state;
  }

  /* ---- Fetch with cache ---- */
  function fetchJSON(url, cacheKey) {
    var cached = cacheGet(cacheKey);
    if (cached) { return Promise.resolve({ data: cached, fromCache: true }); }

    return fetch(url)
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(json) {
        cacheSet(cacheKey, json);
        return { data: json, fromCache: false };
      });
  }

  /* ---- Apply driver standings to F1.teams ---- */
  function applyDriverStandings(standings) {
    if (!standings || !standings.length) return;
    standings.forEach(function(entry) {
      var num = DRIVER_NUM_MAP[entry.Driver.driverId];
      if (num == null) return;
      var pts  = parseInt(entry.points, 10)  || 0;
      var wins = parseInt(entry.wins,   10)  || 0;
      for (var i = 0; i < F1.teams.length; i++) {
        var team = F1.teams[i];
        for (var j = 0; j < team.drivers.length; j++) {
          if (team.drivers[j].num === num) {
            team.drivers[j].pts  = pts;
            team.drivers[j].wins = wins;
            return;
          }
        }
      }
    });
  }

  /* ---- Apply constructor standings to F1.teams ---- */
  function applyConstructorStandings(standings) {
    if (!standings || !standings.length) return;
    standings.forEach(function(entry) {
      var localId = CONSTRUCTOR_MAP[entry.Constructor.constructorId];
      if (!localId) return;
      var pts = parseInt(entry.points, 10) || 0;
      var pos = parseInt(entry.position, 10) || null;
      for (var i = 0; i < F1.teams.length; i++) {
        if (F1.teams[i].id === localId) {
          F1.teams[i].pts = pts;
          if (pos) F1.teams[i].pos = pos;
          return;
        }
      }
    });
  }

  /* ---- Apply race schedule (mark completed / next) ---- */
  function applySchedule(races) {
    if (!races || !races.length) return;

    /* Build a set of completed round numbers from the API */
    var completedRounds = {};
    races.forEach(function(r) {
      if (r.Results && r.Results.length) {
        completedRounds[parseInt(r.round, 10)] = true;
      }
    });

    if (!Object.keys(completedRounds).length) return; // no races done yet

    /* Find the highest completed round */
    var maxDone = Math.max.apply(null, Object.keys(completedRounds).map(Number));

    /* Update F1.races statuses */
    var foundNext = false;
    F1.races.forEach(function(race) {
      var rnd = race.round;
      if (completedRounds[rnd]) {
        race.status = 'done';
      } else if (!foundNext) {
        race.status = 'next';
        foundNext = true;
      } else {
        race.status = 'upcoming';
      }
    });

    /* Update next-race countdown target in main.js if available */
    if (typeof initCountdown === 'function') {
      initCountdown();
    }
  }

  /* ---- Trigger re-render of any visible standings / schedule ---- */
  function rerender() {
    /* standings.html */
    if (typeof renderDriverStandings === 'function')      renderDriverStandings();
    if (typeof renderConstructorStandings === 'function') renderConstructorStandings();
    if (typeof renderQualiGrid === 'function')            renderQualiGrid();

    /* index.html */
    if (typeof renderIndexDynamic === 'function')         renderIndexDynamic();

    /* schedule.html */
    if (typeof renderSchedule === 'function')             renderSchedule();

    /* teams.html — teams are rendered by inline script; trigger custom event */
    document.dispatchEvent(new CustomEvent('f1live:updated'));
  }

  /* ---- Main load ---- */
  function load() {
    showBadge('updating');

    var driverUrl  = BASE + '/' + YEAR + '/driverstandings.json?limit=30';
    var constrUrl  = BASE + '/' + YEAR + '/constructorstandings.json?limit=30';
    var schedUrl   = BASE + '/' + YEAR + '/results.json?limit=100';

    Promise.allSettled([
      fetchJSON(driverUrl,  'drvstand'),
      fetchJSON(constrUrl,  'constand'),
      fetchJSON(schedUrl,   'schedule')
    ]).then(function(results) {
      var anyFromNetwork = false;
      var anySuccess     = false;

      /* Driver standings */
      var drvResult = results[0];
      if (drvResult.status === 'fulfilled') {
        try {
          var lists = drvResult.value.data.MRData.StandingsTable.StandingsLists;
          if (lists && lists.length && lists[0].DriverStandings) {
            applyDriverStandings(lists[0].DriverStandings);
            anySuccess = true;
            if (!drvResult.value.fromCache) anyFromNetwork = true;
          }
        } catch(e) {}
      }

      /* Constructor standings */
      var conResult = results[1];
      if (conResult.status === 'fulfilled') {
        try {
          var clists = conResult.value.data.MRData.StandingsTable.StandingsLists;
          if (clists && clists.length && clists[0].ConstructorStandings) {
            applyConstructorStandings(clists[0].ConstructorStandings);
            anySuccess = true;
            if (!conResult.value.fromCache) anyFromNetwork = true;
          }
        } catch(e) {}
      }

      /* Race results / schedule */
      var schResult = results[2];
      if (schResult.status === 'fulfilled') {
        try {
          var raceList = schResult.value.data.MRData.RaceTable.Races;
          if (raceList) {
            applySchedule(raceList);
            anySuccess = true;
            if (!schResult.value.fromCache) anyFromNetwork = true;
          }
        } catch(e) {}
      }

      /* Badge */
      if (!anySuccess) {
        showBadge('offline');
      } else if (anyFromNetwork) {
        showBadge('live');
      } else {
        showBadge('cached');
      }

      rerender();
    });
  }

  /* ---- Expose for manual refresh button ---- */
  window.F1Live = {
    refresh: function() {
      /* Clear cache and reload */
      ['drvstand', 'constand', 'schedule'].forEach(function(k) {
        try { localStorage.removeItem('f1live_' + k); } catch(e) {}
      });
      load();
    }
  };

  /* ---- Auto-load when DOM is ready ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }

})();
