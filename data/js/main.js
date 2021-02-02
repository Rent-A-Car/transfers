let CONETCSTATE = 1;
/*
sw
*/
d = document;
window.addEventListener('load', () => {

    if ('serviceWorker' in navigator){

        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
            	registration.update()
                if(registration.waiting){
                	if(navigator.onLine){
                		registration.unregister().then((urs)=>{
                			window.location.reload();
                		}).catch((e)=>{
                			window.console.log(e)
                		})
                	}
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
})
d.getElementById("searchclsbutton").addEventListener('click',()=>{
	d.getElementById("searchnavbutton").classList.remove("d-none")
	d.getElementById("searchclsbutton").classList.add("d-none")
	d.getElementById("searchinput").classList.add("d-none")
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

//navigator.connection.onchange = ()=>{console.log(navigator.onLine)}

//new Hammer(document.getElementById("navPages")).get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL}).manager.on("swipe",(e)=>{(e.direction == 2)?document.getElementById("page-container").append("left"):document.getElementById("page-container").append("right")})