const PAGEDATA={
	home:{
		control:{
			title:"Рейсы",
			top:"msn",
			nav:"s",
			navTab:"1"
		}
	},
	drivers:{
		control:{
			title:"Водители",
			top:"msn",
			nav:"s",
			navTab:"2"
		}

	},
	calendar:{
		control:{
			title:"Календарь",
			top:"bnn",
			nav:"h"
		}
	}

}


const PAGERENDER={
	home:console.log,
	drivers:()=>{
		setTimeout (function() {document.getElementById("pagedataloading").classList.add("d-none");},2000);
		
	},
	calendar:console.log

}

const curPage = ()=>{
	let ourl = new URL(window.location.href)
	
	page =""
	if ("page" in sessionStorage){
		page = sessionStorage.getItem('page')
	}else if(ourl.searchParams.has("p")){
		p = ourl.searchParams.get("p").toLowerCase() || "home"
		window.history.replaceState(null, null, "/");
		page = p
	}else{
		page = "home"
	}

let pdata = PAGEDATA[page] || {
		control:{
			top:"msn",
			nav:"s"
		}
	}



	if ("pdata" in sessionStorage){
		pdata = JSON.parse(sessionStorage.getItem('pdata'))
	}else{

		sessionStorage.setItem('pdata',JSON.stringify(pdata))
	}

	if ("page" in sessionStorage){
		return [page,pdata]
	}else if(ourl.searchParams.has("p")){
		p = ourl.searchParams.get("p").toLowerCase() || "home"
		sessionStorage.setItem('page',p)
		(p in PAGEDATA)?sessionStorage.setItem('pdata',JSON.stringify(PAGEDATA[p])):0;
		window.history.replaceState(null, null, "/");
		return [p,pdata]
	}else{
		sessionStorage.setItem('page',"home")
		return ["home",PAGEDATA.home]
	}
}

/*

data = {
	control:{
		title:"Home"
		top:["menuopenbutton","backnavbutton","searchnavbutton","reloadnavbutton","offlinnavbutton","mmenunavbutton"],
			"msm" - menuopenbutton searchnavbutton mmenunavbutton
			"msn" - menuopenbutton searchnavbutton
			"mnm" - menuopenbutton mmenunavbutton
			"mnn" - menuopenbutton
			"bsm" - backnavbutton searchnavbutton mmenunavbutton
			"bnm" - backnavbutton mmenunavbutton
			"bsn" - backnavbutton searchnavbutton
			"bnn" - backnavbutton
		nav:"s" || "h",
		navTab:""
		menu:[ {t:"title",a:mufunc} ]
	}
	back:{
		data:{}
		page:"/"
	}
}

*/
const go2Page = (page,data)=>{
	d = document;
	if(data){
		(typeof data == "string")?data = PAGEDATA[data]:0;
		if (data.control){	
			data.control.top.split("").forEach((cb,cn)=>{
				switch(cn){
					case 0:
					(cb=="m")?(()=>{
						d.getElementById('backnavbutton').classList.add("d-none")
						d.getElementById('menuopenbutton').classList.remove("d-none")
					})():(()=>{
						d.getElementById('menuopenbutton').classList.add("d-none")
						d.getElementById('backnavbutton').classList.remove("d-none")
						if (!data.back){
							data.back={
								page:sessionStorage.getItem('page'),
								data:JSON.parse(sessionStorage.getItem('pdata'))
							}
						}
						d.getElementById('backnavbutton').onclick = ()=>{
								go2Page(data.back.page,data.back.data)
						}
					})();
					break;
					case 1:
					(cb=="s")?(()=>{
						d.getElementById('searchnavbutton').classList.remove("d-none")
					})():(()=>{
						d.getElementById('searchnavbutton').classList.add("d-none")
					})();
					break;
					case 2:
					(cb=="m")?(()=>{
						m = d.getElementById('mmenunavbutton');
						m.classList.remove("d-none");
						li = ""
						for (var i = 0; i < data.control.menu.length; i++) {
							li += "<li><a class=dropdown-item role=button onclick="+data.control.menu[i].a.name+"(this)  tabindex=0>"+data.control.menu[i].t+"</a></li>"
						}
						m.parentNode.querySelector(".dropdown-menu").innerHTML = li

					})():(()=>{
						d.getElementById('mmenunavbutton').classList.add("d-none")
					})();
					break;
				}
			});

			(data.control.nav == "s")?(()=>{
				d.getElementById('navPages').classList.remove("d-none")
				d.querySelectorAll("[data-nav-id]").forEach((e)=>{
					if(e.dataset.navId == data.control.navTab){
						e.classList.add("active")
					}else{
						e.classList.remove("active")
					}
				})
			})():(()=>{
				d.getElementById('navPages').classList.add("d-none")
			})();

			d.getElementById("pageName").innerText = data.control.title||""
		}
	}
	sessionStorage.setItem('pdata',JSON.stringify(data))
	sessionStorage.setItem('page',page)
	if (page in PAGERENDER){
		f = PAGERENDER[page]
		f(data)
	}

}