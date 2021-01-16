const Static_CACHE_Version = 'v0'
const Static_CACHE= 'static-'+Static_CACHE_Version
const Static_CACHEAssets = [
	//html
    './',
    './index.html',
    //css
    './css/main.css',
    
    './js/main.js',
    './manifest.webmanifest',
    './css/bootstrap-icons.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js',
    'https://hammerjs.github.io/dist/hammer.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/fonts/bootstrap-icons.woff',
    'favicon.ico',
    './icons/android-chrome-192x192.png'
];
const DCACHE= 'cache-auto';

self.addEventListener('install', async event => {
    const cache = await caches.open(Static_CACHE);
    await cache.addAll(Static_CACHEAssets);
    console.log('Service worker встановлено');
});


// застарілий кеш
self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![Static_CACHE].includes(key)) {
            await caches.delete(key);
        }
});
    await Promise.all(checkKeys);
    console.log('Service worker актевовано (видалено застарілий кеш)');
});
// застарілий кеш



self.addEventListener('fetch', event => {
    console.log('Trying to fetch ',event.request);
    event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse /*|| checkOnline(req);*/
}

async function checkOnline(req) {
    const cache = await caches.open(CACHE);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('./offline.html');
        } else {
            return caches.match('./images/no-image.jpg');
        }
    }
}