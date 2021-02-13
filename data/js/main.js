let CONETCSTATE = 1;
/*
sw
*/
d = document;
window.addEventListener('load', () => {

    if ('serviceWorker' in navigator){

        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
            	registration.onupdatefound = (e)=>{
debugger
            		window.location.reload()
            	}
                console.log('Service worker successfully registered');
            })
            .catch(error => {
                console.log('Service worker registration failed', error);
            });
    }
});


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./sw.js')
//       .then(() => navigator.serviceWorker.ready.then((worker) => {
//         worker.sync.register('syncdata');
//       }))
//       .catch((err) => console.log(err));
// }
/*
 sw end
*/
Swiper(d.getElementById("sidenav"),closeSidebarNav,4)
//Swiper(d.getElementById("navControl"),openSidebarNav,2)

// function b64EncodeUnicode(str) {
//     // first we use encodeURIComponent to get percent-encoded UTF-8,
//     // then we convert the percent encodings into raw bytes which
//     // can be fed into btoa.
//     return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
//         function toSolidBytes(match, p1) {
//             return String.fromCharCode('0x' + p1);
//     }));
// }

// function b64DecodeUnicode(str) {
//     // Going backwards: from bytestream, to percent-encoding, to original string.
//     return decodeURIComponent(atob(str).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
// }

const DetectConection=()=>{
	if(navigator.onLine){
		console.log("online")
		CONETCSTATE = 1
		d.getElementById("reloadnavbutton").classList.remove("d-none")
		d.getElementById("offlinnavbutton").classList.add("d-none")
	}else{
		console.log("offline")
		CONETCSTATE = 0
		d.getElementById("reloadnavbutton").classList.add("d-none")
		d.getElementById("offlinnavbutton").classList.remove("d-none")
	}
}
if (navigator.connection){
	console.log("have conn")
	if("onchange" in navigator.connection){
		console.log("have onchange")
		navigator.connection.onchange = DetectConection
	}else if ("ontypechange" in navigator.connection){
		console.log("have ontypechange")
		navigator.connection.ontypechange=DetectConection
	}
	DetectConection()
}

d.getElementById("menuopenbutton").addEventListener('click', openSidebarNav);
d.getElementById("reloadnavbutton").addEventListener('click',()=>{
	startLoading();
	page = sessionStorage.getItem('page')
	data = sessionStorage.getItem('pdata')
	if (page in PAGERENDER){
		f = PAGERENDER[page]
		f(data)
	}
})


d.getElementById("searchnavbutton").addEventListener('click',()=>{
	d.getElementById("searchnavbutton").classList.add("d-none")
	d.getElementById("searchclsbutton").classList.remove("d-none")
	d.getElementById("searchinput").classList.remove("d-none")
	d.querySelector("#searchinput input").focus()
})
d.getElementById("searchclsbutton").addEventListener('click',()=>{
	d.getElementById("searchnavbutton").classList.remove("d-none")
	d.getElementById("searchclsbutton").classList.add("d-none")
	d.getElementById("searchinput").classList.add("d-none")
	d.querySelector("#searchinput input").value="";
	page = sessionStorage.getItem('page')
	if (page in PAGESEARCH){
		f = PAGESEARCH[page]
		eval(f+"('')")
	}
})

function openSidebarNav() {
d=document;
  d.getElementById("sidenav").style.width = "80%";
  //d.getElementById("main-page").style.marginLeft = "15rem";
  //d.getElementById("navPages").style.marginLeft = "15rem";
  d.getElementById("SidebarOpasity").style.width = "100%";
  d.getElementById("SidebarOpasity").style.opacity = "0.6";  

}

function closeSidebarNav() {
d=document;
  d.getElementById("sidenav").style.width = "0";
  //d.getElementById("main-page").style.marginLeft= "0";
  //d.getElementById("navPages").style.marginLeft = "0";
  d.getElementById("SidebarOpasity").style.opacity = "0.5"; 
  d.getElementById("SidebarOpasity").style.width = "0px";
  
}

function ShowToastMessage(message="",type="primary",delay=1300){
	return new Promise((rs,rj)=>{
		let tm = d.createElement("div")
		tm.style="bottom:12%;left:50%;transform:translateX(-50%);z-index:2;position:fixed"

		tm.innerHTML='<div class="alert alert-'+type+'" role=alert style="padding:.4em 1em;border-radius:30px">'+message+'</div>'
		d.body.append(tm)
		tm.style.animation = "backInUp 1s both"
		setTimeout(()=>{
			tm.style.animation = "fadeOutDown 1s both"
			setTimeout(()=>{
				tm.remove()
				rs()
			},1000)

		},delay+1000)
	})
}

const API = (()=>{
	let apiurl = "https://script.google.com/macros/s/AKfycbz6fGzgSxLaCwhjcvvxFTcWRJHV5jKXyFvS0KljbUbjtW9CGKjY6-j8/exec",
	getToken = ()=>{return new Promise((s,e)=>{firebase.auth().currentUser.getIdToken().then(s,e)})},
	get =(params)=>{
		
	},
	post = (params)=>{
		return getToken()
		.then(
			(token)=>{
				let url = new URL(apiurl) 
				if(params){url.search = new URLSearchParams(params).toString()}

				let req = new Request(url.toString(),{
					method: 'POST',
					body:token
				});
				console.log(req)
				return fetch(req).then((r)=>{return r.json()}).then((r)=>{return r})
		})
		//return fetch(apiurl,{method:"post",body:}).then((r)=>{return r.json()}).then((r)=>{return r})
	},
	API={
		signUp: (token)=>{
			return post({a:"signup",atk:token})

		},
		loginIn: (token)=>{
			return post({a:"login",atk:token})
		},
		like:(user)=>{
			return post({a:"like",drv:user})
		},
		dislike:(user)=>{
			return post({a:"dislike",drv:user})
		},
	};
	return API
})();

//navigator.connection.onchange = ()=>{console.log(navigator.onLine)}

//new Hammer(document.getElementById("navPages")).get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL}).manager.on("swipe",(e)=>{(e.direction == 2)?document.getElementById("page-container").append("left"):document.getElementById("page-container").append("right")})