const Static_CACHE_Version = 'v0'
const Static_CACHE= 'static-'+Static_CACHE_Version
const Static_CACHEAssets = [
	//html
    './',
    './offline.html',
    //css
    './css/main.css',
    './css/bootstrap-icons.css',
    './css/RobotoSlab.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
    //js
    './js/main.js',
    './js/menu.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js',
    //icons
     'favicon.ico',
    './icons/android-chrome-192x192.png',
    
    //fonts
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/fonts/bootstrap-icons.woff2',
    'https://fonts.gstatic.com/s/robotoslab/v12/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISma2RjRdE.woff2',
    'https://fonts.gstatic.com/s/robotoslab/v12/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISmb2Rj.woff2',
    //other
   './manifest.webmanifest'
];
const DCACHE= 'cache-auto';


const ROUTETable={
	'transfers.arendacg.space':{
		'/index.html':"/"
	},
	'localhost:8088':{
		'/index.html':"/"
	}
}




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
    //console.log('Trying to fetch ',event.request.url);
    event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
	if (req.method == "GET"){
		let url = new URL(req.url)
		let furl = (url.host in ROUTETable)?(url.pathname in ROUTETable[url.host])?ROUTETable[url.host][url.pathname]:req.url:req.url;
		console.log(furl)
		const cachedResponse = await caches.match(furl);
		return cachedResponse || checkOnline(req);

	}else{
		return await fetch(req);
	}
}

async function checkOnline(req) {
    const cache = await caches.open(DCACHE);
    try {
        const res = await fetch(req);
        //await cache.put(req, res.clone());
        console.log(res.clone())
        return res;
    } catch (error) {
    	console.log(error)
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } 
       
    }
}