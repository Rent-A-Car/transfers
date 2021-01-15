const CACHE_Version = 'v1'
const CACHE= 'sitecache-'+CACHE_Version
const CacheAssets = [
'./index.html',
'./css/main.css',
'./js/main.js',
'./404.html'
]

self.addEventListener('install', (event) => {
    console.log('Установлен');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(CacheAssets);
  }));

});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});


self.addEventListener('fetch', function(evt) {
 console.log('Происходит запрос на сервер');
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  evt.waitUntil(update(evt.request));
});


// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
