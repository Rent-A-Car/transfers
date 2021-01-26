
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
Swiper(d.getElementById("navControl"),openSidebarNav,2)

d.getElementById("menuopenbutton").addEventListener('click', openSidebarNav);
d.getElementById("reloadnavbutton").addEventListener('click', ()=>{window.location.reload()});
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