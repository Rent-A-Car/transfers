function openSidebarNav(){d=document,d.getElementById("sidenav").style.width="80%",d.getElementById("SidebarOpasity").style.width="100%",d.getElementById("SidebarOpasity").style.opacity="0.6"}function closeSidebarNav(){d=document,d.getElementById("sidenav").style.width="0",d.getElementById("SidebarOpasity").style.opacity="0.5",d.getElementById("SidebarOpasity").style.width="0px"}window.addEventListener("load",()=>{"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js").then(e=>{console.log("Service worker successfully registered",e)}).catch(e=>{console.log("Service worker registration failed",e)})}),new Hammer(document.getElementById("sidenav")).get("swipe").set({direction:Hammer.DIRECTION_LEFT}).manager.on("swipe",closeSidebarNav),new Hammer(document.getElementById("navControl")).get("swipe").set({direction:Hammer.DIRECTION_RIGHT}).manager.on("swipe",openSidebarNav);