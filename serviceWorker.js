self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'images/mascot.png',
        'stylesheets/App.css',
        'stylesheets/Header.css',
        'stylesheets/index.css',
        'stylesheets/Level.css',
        'stylesheets/Modal.css',
        'stylesheets/Report.css',
        'lib/nozes/nozes.js',
        'javascripts/ApiService.js',
        'javascripts/App.js',
        'javascripts/Categories.js',
        'javascripts/Header.js',
        'javascripts/index.js',
        'javascripts/Level.js',
        'javascripts/Modal.js',
        'javascripts/Report.js',
        'javascripts/Trivia.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
