const PAGEDATA={home:{control:{title:"Рейсы",top:"msn",nav:"s",navTab:"1"}},drivers:{control:{title:"Водители",top:"msn",nav:"s",navTab:"2"}},calendar:{control:{title:"Календарь",top:"bnn",nav:"h"}}},PAGERENDER={home:console.log,drivers:()=>{setTimeout(function(){document.getElementById("pagedataloading").classList.add("d-none")},3e3)},calendar:console.log},curPage=()=>{let e=new URL(window.location.href);page="","page"in sessionStorage?page=sessionStorage.getItem("page"):e.searchParams.has("p")?(p=e.searchParams.get("p").toLowerCase()||"home",window.history.replaceState(null,null,"/"),page=p):page="home";let t=PAGEDATA[page]||{control:{top:"msn",nav:"s"}};return"pdata"in sessionStorage?t=JSON.parse(sessionStorage.getItem("pdata")):sessionStorage.setItem("pdata",JSON.stringify(t)),"page"in sessionStorage?[page,t]:e.searchParams.has("p")?(p=e.searchParams.get("p").toLowerCase()||"home",sessionStorage.setItem("page",p)(p in PAGEDATA)&&sessionStorage.setItem("pdata",JSON.stringify(PAGEDATA[p])),window.history.replaceState(null,null,"/"),[p,t]):(sessionStorage.setItem("page","home"),["home",PAGEDATA.home])},go2Page=(e,t)=>{d=document,t&&("string"==typeof t&&(t=PAGEDATA[t]),t.control&&(t.control.top.split("").forEach((e,a)=>{switch(a){case 0:"m"==e?(d.getElementById("backnavbutton").classList.add("d-none"),d.getElementById("menuopenbutton").classList.remove("d-none")):(d.getElementById("menuopenbutton").classList.add("d-none"),d.getElementById("backnavbutton").classList.remove("d-none"),t.back||(t.back={page:sessionStorage.getItem("page"),data:JSON.parse(sessionStorage.getItem("pdata"))}),d.getElementById("backnavbutton").onclick=(()=>{go2Page(t.back.page,t.back.data)}));break;case 1:"s"==e?d.getElementById("searchnavbutton").classList.remove("d-none"):d.getElementById("searchnavbutton").classList.add("d-none");break;case 2:"m"==e?(()=>{m=d.getElementById("mmenunavbutton"),m.classList.remove("d-none"),li="";for(var e=0;e<t.control.menu.length;e++)li+="<li><a class=dropdown-item role=button onclick="+t.control.menu[e].a.name+"(this)  tabindex=0>"+t.control.menu[e].t+"</a></li>";m.parentNode.querySelector(".dropdown-menu").innerHTML=li})():d.getElementById("mmenunavbutton").classList.add("d-none")}}),"s"==t.control.nav?(d.getElementById("navPages").classList.remove("d-none"),d.querySelectorAll("[data-nav-id]").forEach(e=>{e.dataset.navId==t.control.navTab?e.classList.add("active"):e.classList.remove("active")})):d.getElementById("navPages").classList.add("d-none"),d.getElementById("pageName").innerText=t.control.title||"")),sessionStorage.setItem("pdata",JSON.stringify(t)),sessionStorage.setItem("page",e),e in PAGERENDER&&(f=PAGERENDER[e],f(t))};