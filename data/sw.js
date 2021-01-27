const Static_CACHE_Version = '21-01-27-2'
const Static_CACHE= 'static-'+Static_CACHE_Version
const Static_CACHEAssets = [
	//html
    '/',
    '/offline.html',
    //css
    '/css/main.css',
    '/css/iconsfont.css',
    '/css/RobotoSlab.css',
    '/css/bootstrap.min.css',
    //js
    '/js/main.js',
    '/js/menu.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js',
    //icons
    '/favicon.ico',
    '/icons/android-chrome-192x192.png',
    '/icons/apple-touch-icon-precomposed.png',
    '/icons/GoogleLogo.svg',
    
    //fonts
    '/css/fonts/iconsfont.woff2',
    '/css/fonts/iconsfont.woff',
    'https://fonts.gstatic.com/s/robotoslab/v12/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISma2RjRdE.woff2',
    'https://fonts.gstatic.com/s/robotoslab/v12/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISmb2Rj.woff2',
    //other
    '/manifest.webmanifest'
];
const DCACHE= 'cache-auto';


const NoCACHEHosts=[
	"apis.google.com",
	"www.googleapis.com",
	"securetoken.googleapis.com"
]

const NoCACHEPaths=[
"/TermsOfService",
"/PrivacyPolicy",
"/cdn-cgi"
]



self.addEventListener('install', async event => {
    const cache = await caches.open(Static_CACHE);
    let ec = 0
    for (var i = 0; i < 5; i++) {
	try{
    	await cache.addAll(Static_CACHEAssets);
    	break;
	}catch(e){
		console.log(e,ec)
		ec += 1
	}
   }
    if(ec==5){
    	for (var i = 0; i < Static_CACHEAssets.length; i++) {
    		try{
    			await cache.add(Static_CACHEAssets[i])
    		}catch(e){
    			console.log(e,Static_CACHEAssets[i])
    		}
    	}


    }else{
    	console.log('Service worker fetch ok')
    }
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
			if(Rurl.pathname == "/index.html"){
				Rurl.pathname="/"
			}
			
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
    	let Rurl = new URL(req.url);
        const res = await fetch(req);
        console.log("fetch to",req.url)
        if(!navigator.onLine){
        	throw "Offline"
        }

        let isBanedHost =NoCACHEHosts.includes(Rurl.hostname),
        isBanedPath = (NoCACHEHosts.filter((i,ii,iii,m=Rurl.pathname)=>{return m.match(i)}).length>0)

        if(!isBanedHost && !isBanedPath) {
         await cache.put(req, res.clone());
        }else{
        	console.log("noCACHED")
        }

        return res;
    } catch (error) {
    	console.log(error)
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        }else{
        	let type=new URL(req.url).pathname.match(/\.\w+/);
        	if(type && type != ".html"){
        		return new Response(new Blob(),{ "status" : 503 , "statusText" : "You Offline!" })

        	}else{
        		return await caches.match("/offline.html")
        	}

        }
       
    }
}
