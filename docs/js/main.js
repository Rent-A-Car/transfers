let CONETCSTATE=1;d=document,window.addEventListener("load",()=>{"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js").then(e=>{e.update(),e.waiting&&navigator.onLine&&e.unregister().then(e=>{window.location.reload()}).catch(e=>{window.console.log(e)}),console.log("Service worker successfully registered")}).catch(e=>{console.log("Service worker registration failed",e)})}),Swiper(d.getElementById("sidenav"),closeSidebarNav,4);const DetectConection=()=>{navigator.onLine?(console.log("online"),CONETCSTATE=1,d.getElementById("reloadnavbutton").classList.remove("d-none"),d.getElementById("offlinnavbutton").classList.add("d-none")):(console.log("offline"),CONETCSTATE=0,d.getElementById("reloadnavbutton").classList.add("d-none"),d.getElementById("offlinnavbutton").classList.remove("d-none"))};function openSidebarNav(){d=document,d.getElementById("sidenav").style.width="80%",d.getElementById("SidebarOpasity").style.width="100%",d.getElementById("SidebarOpasity").style.opacity="0.6"}function closeSidebarNav(){d=document,d.getElementById("sidenav").style.width="0",d.getElementById("SidebarOpasity").style.opacity="0.5",d.getElementById("SidebarOpasity").style.width="0px"}navigator.connection&&(console.log("have conn"),"onchange"in navigator.connection?(console.log("have onchange"),navigator.connection.onchange=DetectConection):"ontypechange"in navigator.connection&&(console.log("have ontypechange"),navigator.connection.ontypechange=DetectConection),DetectConection()),d.getElementById("menuopenbutton").addEventListener("click",openSidebarNav),d.getElementById("reloadnavbutton").addEventListener("click",()=>{startLoading(),page=sessionStorage.getItem("page"),data=sessionStorage.getItem("pdata"),page in PAGERENDER&&(f=PAGERENDER[page],f(data))});