const CACHE_Version = 'v1'
const CACHE= 'static-'+CACHE_Version
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

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');
});