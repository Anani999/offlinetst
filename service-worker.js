// Service Worker

const CACHE_NAME = 'offline-content';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/index.html' // A fallback page to display when offline
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/offline.html')) // Serve offline page if resource not found
  );
});
