String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};
const stopLoading=()=>{
document.getElementById("pagedataloading").classList.add("d-none")
}
const startLoading=()=>{
setdata2page("")
document.getElementById("pagedataloading").classList.remove("d-none")
}
const setdata2page = (html)=>{
	document.getElementById("page-container").innerHTML=html;
}

//   Render  functions

const fetchCSV=(url)=>{
	return new Promise((resolve, reject)=>{
		fetch(url).then((r)=>{
			return r.text()
		}).then((r)=>{
			resolve(CSV.csvToObject(r,{trim:!0}))
		}).catch((e)=>{
			reject(e)
		})
	});
}

let rPagehome = ()=>{
	data=fetchCSV("https://docs.google.com/spreadsheets/d/e/2PACX-1vROKYurp41BsWy1wIl60L4xRJVpzHC0Cz8ccuSID3s28OtcIUXGvGPBk08y8XowkSBkE7VfFEiegdCa/pub?gid=1463143925&single=true&output=csv")
	temp=fetch("/pages/home.html").then((r)=>{return r.text()}).then((r)=>{return new DOMParser().parseFromString(r,"text/html").querySelector("[template]")})
	routs={}
	finalOutput=""
Promise.all([data, temp]).then((values) => {
  for (var i = 0; i < values[0].length; i++) {
  	if(values[0][i].route in routs){
  		routs[values[0][i].route].push(values[0][i])
  	}else{
  		routs[values[0][i].route]=[]
  		routs[values[0][i].route].push(values[0][i])
  	}
  }
  for (x in routs){
  	r = x.split(";");
  	t = values[1].cloneNode(!0)

  	crdshhdr = t.querySelector(".flags-shema")
  	cntry = crdshhdr.querySelector("div")
  	cntry.setAttribute("country",r[0])
  	for (var i = 1; i < r.length; i++) {
  		ncntry = cntry.cloneNode()
  		ncntry.setAttribute("country",r[i])
  		crdshhdr.append(ncntry)
  	}

  	lfr = t.querySelector(".list-group")
  	a=lfr.firstElementChild
  	nwa=a.cloneNode(!0)
  	a.innerHTML=a.innerHTML.formatUnicorn(routs[x][0])
  	a.setAttribute("onclick","go2Page(\"routedetails\",{control:{title:\""+routs[x][0].drivern+"\",top:\"bnn\",nav:\"h\"}})")
  	for (var i = 1; i < routs[x].length; i++) {
  		tnwa=nwa.cloneNode(!0)
  		tnwa.innerHTML=nwa.innerHTML.formatUnicorn(routs[x][i])
  		tnwa.setAttribute("onclick","go2Page(go2Page(\"routedetails\",{control:{title:\""+routs[x][i].drivern+"\",top:\"bnn\",nav:\"h\"}}))")
  		lfr.append(tnwa)
  	}
  	

	finalOutput +=t.outerHTML

  }
  console.log(values[0],values[1],routs)
  stopLoading()
  setdata2page(finalOutput)
  document.querySelectorAll("div[country]").forEach(t=>{t.style.background="url(https://hatscripts.github.io/circle-flags/flags/"+t.getAttribute("country")+".svg)"});

});
}

//end of render functions
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

	},"add-driver":{
		control:{
			title:"Добавить перевозчика",
			top:"bnn",
			nav:"h"
			
		},
		back:{
				page:"home",
				data:"home"

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
	home:rPagehome,
	drivers:()=>{
		setTimeout (stopLoading,3000);
	},
	calendar:console.log,
	routedetails:console.log,
	"add-driver":console.log,

}
window.onpopstate = (e)=>{
	if(e.state){
		console.log("ONPOPSTATE",e.state)
		go2Page(...e.state)	
	}
}
const curPage = ()=>{
	console.log("curpage")
	let ourl = new URL(window.location.href)
	
	let page =""
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

	if(ourl.searchParams.has("p")){
		p = ourl.searchParams.get("p").toLowerCase() || "home"
		sessionStorage.setItem('page',p)
		if(p in PAGEDATA){
			sessionStorage.setItem('pdata',JSON.stringify(PAGEDATA[p]))
		}
		window.history.replaceState(null, null, "/");
		return [p,PAGEDATA[p]]
	}else if ("page" in sessionStorage){
		return [page,pdata]
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
	console.log(page,data)	
	startLoading()
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
						d.getElementById("searchclsbutton").click()
						d.getElementById('searchnavbutton').classList.add("d-none")
					})();
					break;
					case 2:
					(cb=="m")?(()=>{
						m = d.getElementById('mmenunavbutton');
						m.classList.remove("d-none");
						li = ""
						for (var i = 0; i < data.control.menu.length; i++) {
							li += "<li><a class=dropdown-item role=button onclick="+data.control.menu[i].a+"(this) tabindex=0>"+data.control.menu[i].t+"</a></li>"
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
	console.log(data)
	sessionStorage.setItem('pdata',JSON.stringify(data))
	sessionStorage.setItem('page',page)
	if (data.back){
		history.pushState([data.back.page,data.back.data], page, "#"+page)
		history.pushState(null, page, "#f"+page)
	}else{
		history.pushState(null, page, "#")	
	}
	if (page in PAGERENDER){
		f = PAGERENDER[page]
		f(data)
	}

}
