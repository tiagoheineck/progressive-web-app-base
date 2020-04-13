const CACHE_NAME = 'dheineck-2020-04-17';

self.addEventListener("install", event => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        caches.open(CACHE_NAME).then(function (cache) {
          return cache.addAll([
            '/',
            '/index.html',                
            '/manifest.json',
            '/favicon.ico',
            '/styles/default.css',
            '/offline/index.html'
          ]);
        })
    })
  )
});


// Clear cache on activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('dheineck-')))
          .filter(cacheName => (cacheName !== CACHE_NAME))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Serve from Cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('/offline/index.html');
      })
  )
});