const CACHE_STATIC_Version = 'v1'
const CACHE_STATIC = 'trc-'+CACHE_STATIC_Version


self.addEventListener('install', (event) => {
    console.log('Установлен');
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');
});