function openSidebarNav() {
d=document;
  d.getElementById("sidenav").style.width = "51%";
  d.getElementById("main-page").style.marginLeft = "51%";
  d.getElementById("navPages").style.marginLeft = "51%";
  d.getElementById("SidebarOpasity").style.width = "100%";
  d.getElementById("SidebarOpasity").style.opacity = "0.6";  

}

function closeSidebarNav() {
d=document;
  d.getElementById("sidenav").style.width = "0";
  d.getElementById("main-page").style.marginLeft= "0";
  d.getElementById("navPages").style.marginLeft = "0";
  d.getElementById("SidebarOpasity").style.opacity = "0.5"; 
  d.getElementById("SidebarOpasity").style.width = "0px";
  
}