const Static_CACHE_Version = '21-01-22-2b'
const Static_CACHE= 'static-'+Static_CACHE_Version
const Static_CACHEAssets = [
	//html
    './',
    './offline.html',
    //css
    './css/main.css',
    './css/iconsfont.css',
    './css/RobotoSlab.css',
    './css/bootstrap.min.css',
    //js
    './js/main.js',
    './js/menu.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js',
    //icons
    './favicon.ico',
    './icons/android-chrome-192x192.png',
    './icons/apple-touch-icon-precomposed.png',
    './icons/GoogleLogo.svg',
    
    //fonts
    '/css/fonts/iconsfont.woff2',
    '/css/fonts/iconsfont.woff',
    'https://fonts.gstatic.com/s/robotoslab/v12/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISma2RjRdE.woff2',
    'https://fonts.gstatic.com/s/robotoslab/v12/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISmb2Rj.woff2',
    //other
   './manifest.webmanifest'
];
const DCACHE= 'cache-auto';


const ROUTETable={
	
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
		let Rurl = new URL(req.url)
		let nreq = req;
		if (location.hostname == Rurl.hostname){
			Rurl.search=""
			nreq = new Request(Rurl.toString(),{
				cache : req.cache,
				context : req.context,
				credentials: req.credentials,
				headers : req.headers,
				integrity : req.integrity,
				method : req.method,
				redirect : req.redirect,
				referrer : req.referrer,
				referrerPolicy : req.referrerPolicy,
				body : req.body,
				bodyUsed : req.bodyUsed
				})
		}
		
		
		
		const cacheS = await caches.open(Static_CACHE);
		const StaticCachedResponse = await cacheS.match((nreq)?nreq:req);

		return StaticCachedResponse || checkOnline((nreq)?nreq:req);

	}else{
		return await fetch(req);
	}
}
async function checkOnline(req) {
    const cache = await caches.open(DCACHE);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
    	console.log(error)
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        }else{

        }
       
    }
}
