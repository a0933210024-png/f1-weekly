/* ---- F1 Weekly Service Worker ---- */
var CACHE_NAME = 'f1weekly-v1';

var PRE_CACHE = [
  '/',
  '/teams',
  '/schedule',
  '/standings',
  '/news',
  '/css/style.css',
  '/js/data.js',
  '/js/main.js',
  '/js/live.js',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

/* ---- Install: pre-cache shell ---- */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRE_CACHE);
    })
  );
  self.skipWaiting();
});

/* ---- Activate: clean old caches ---- */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names
          .filter(function (n) { return n !== CACHE_NAME; })
          .map(function (n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

/* ---- Fetch: network-first for HTML, cache-first for assets ---- */
self.addEventListener('fetch', function (e) {
  var req = e.request;

  /* Only handle GET requests */
  if (req.method !== 'GET') return;

  /* Skip cross-origin requests (CDN images, APIs, etc.) */
  if (!req.url.startsWith(self.location.origin)) return;

  var isHTML = req.headers.get('accept') && req.headers.get('accept').indexOf('text/html') !== -1;

  if (isHTML) {
    /* Network-first for HTML pages */
    e.respondWith(
      fetch(req)
        .then(function (res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(req, clone);
          });
          return res;
        })
        .catch(function () {
          return caches.match(req).then(function (cached) {
            return cached || offlineFallback();
          });
        })
    );
  } else {
    /* Cache-first for CSS, JS, images, SVG, fonts */
    e.respondWith(
      caches.match(req).then(function (cached) {
        if (cached) return cached;
        return fetch(req).then(function (res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(req, clone);
          });
          return res;
        });
      })
    );
  }
});

/* ---- Offline fallback page ---- */
function offlineFallback() {
  var html =
    '<!DOCTYPE html>' +
    '<html lang="en"><head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Offline — F1 Weekly</title>' +
    '<style>' +
    'body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;' +
    'background:#111113;color:#fff;font-family:system-ui,sans-serif;text-align:center;padding:20px}' +
    '.box{max-width:420px}' +
    'h1{font-size:48px;font-weight:900;margin:0 0 8px;letter-spacing:-1px}' +
    'h1 span{color:#e10600}' +
    'p{color:#888;font-size:14px;line-height:1.6;margin:16px 0 24px}' +
    'button{background:#e10600;color:#fff;border:none;padding:10px 28px;font-size:14px;' +
    'font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer}' +
    '</style></head><body>' +
    '<div class="box">' +
    '<h1><span>F1</span> WEEKLY</h1>' +
    '<p>You are currently offline. Please check your connection and try again.</p>' +
    '<button onclick="location.reload()">Retry</button>' +
    '</div></body></html>';

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
