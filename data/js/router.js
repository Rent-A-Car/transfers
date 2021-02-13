String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
  function() {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
      var t = typeof arguments[0];
      var key;
      var args = ("string" === t || "number" === t) ?
        Array.prototype.slice.call(arguments) :
        arguments[0];

      for (key in args) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
      }
    }

    return str;
  };
const DBURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vROKYurp41BsWy1wIl60L4xRJVpzHC0Cz8ccuSID3s28OtcIUXGvGPBk08y8XowkSBkE7VfFEiegdCa/pub"
function stopLoading() {
  d.getElementById("pagedataloading").classList.add("d-none")
}
function startLoading (nodel) {
  (nodel) ? 0: setdata2page("")
  d.getElementById("pagedataloading").classList.remove("d-none")
}
function setdata2page (html) {
  d.getElementById("page-container").innerHTML = html;
}

function searchInRoute(text) {
  searchBody = d.querySelectorAll(".list-group-item").forEach((i) => {
    if (i.innerText.toUpperCase().indexOf(text.toUpperCase()) > -1 || !text) {
      i.parentNode.style.display = "flex";
    } else {
      i.parentNode.style.display = "none";
    }
  });
};

//   Render  functions


const fetchCSV = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((r) => {
      return r.text()
    }).then((r) => {
      resolve(CSV.csvToObject(r, {
        trim: !0
      }))
    }).catch((e) => {
      reject(e)
    })
  });
}

let Oroutedetails = (x, i) => {
  go2Page("blank", {
    control: {
      title: "",
      top: "bnn",
      nav: "h"
    }
  })
  fetchCSV(DBURL + "?gid=1463143925&single=true&output=csv").then((data) => {
    let routs = {}
    for (var ii = 0; ii < data.length; ii++) {
      if (data[ii].route in routs) {
        routs[data[ii].route].push(data[ii])
      } else {
        routs[data[ii].route] = []
        routs[data[ii].route].push(data[ii])
      }
    }
    go2Page("routedetails", {
      control: {
        title: routs[x][i].drivern + " (" + routs[x][i].date + ")",
        top: "bnm",
        nav: "h",
        menu:[]
      },
      data: routs[x][i]
    })

  })
}

let shareRoute = (id, btn) => {
	[name,date] = Array.from(btn.parentElement.parentElement.firstElementChild.firstElementChild.children).map(e=>{return e.innerText})
  if (navigator.share) {
    navigator.share({
      title:name+" ("+date+")",
      url: "https://transfers.arendacg.space/?p=routedetails&id=" + id
    });
  } else {
    //to copy
    alert("Ссылка скопирована в буфер обмена")?0
    :navigator.clipboard.writeText(name+" ("+date+") https://transfers.arendacg.space/?p=routedetails&id="+id)
  }
  btn.parentElement.parentElement.scrollBy({
    left: -1,
    behavior: "smooth"
  })
}


let driverLiker = {
	lock:false,
	LikeDriver: btn=>{
		user = btn.parentElement.parentElement.querySelector(".uname").innerText.substr(1)
		if(driverLiker.lock){
			return !1
		}
		driverLiker.lock=true
		API.like(user).then(driverLiker.rDriversLike).then(()=>{driverLiker.lock=false})

	},
	DisLikeDriver:btn=>{
		user = btn.parentElement.parentElement.querySelector(".uname").innerText.substr(1)
		if(driverLiker.lock){
			return !1
		}
		driverLiker.lock=true
		API.dislike(user).then(driverLiker.rDriversLike).then(()=>{driverLiker.lock=false})
	},
	rDriversLike:data=>{
		d.querySelectorAll(".driveraction").forEach((el)=>{
			el.querySelector(".likeDriverBtn i").classList.remove()
			el.querySelector(".likeDriverBtn i").classList.add()

			el.querySelector(".dislikeDriverBtn i").classList.remove()
			el.querySelector(".dislikeDriverBtn i").classList.add()
		})
	}
}


let rPagehome = () => {
  data = fetchCSV(DBURL + "?gid=1463143925&single=true&output=csv")
  temp = fetch("/pages/home.html").then((r) => {
    return r.text()
  }).then((r) => {
    return new DOMParser().parseFromString(r, "text/html").querySelector("[template]")
  })
  let routs = {}
  finalOutput = ""
  Promise.all([data, temp]).then((values) => {

    for (var i = 0; i < values[0].length; i++) {
      if (values[0][i].route in routs) {
        routs[values[0][i].route].push(values[0][i])
      } else {
        routs[values[0][i].route] = []
        routs[values[0][i].route].push(values[0][i])
      }
    }
    for (x in routs) {
      r = x.split(";");
      t = values[1].cloneNode(!0)
      crdshhdr = t.querySelector(".flags-shema")
      cntry = crdshhdr.querySelector("div")
      cntry.setAttribute("country", r[0])
      for (var i = 1; i < r.length; i++) {
        ncntry = cntry.cloneNode()
        ncntry.setAttribute("country", r[i])
        crdshhdr.append(ncntry)
      }

      lfr = t.querySelector(".list-group")
      a = lfr.firstElementChild
      nwa = a.cloneNode(!0)
      a.innerHTML = a.innerHTML.formatUnicorn(routs[x][0])
      id = routs[x][0].driveru + "-" + routs[x][0].date.replaceAll(".", "") + "-" + routs[x][0].route.replaceAll(";", "-")
      a.firstElementChild.setAttribute("onclick", "Oroutedetails(\"" + x + "\",0)")
      a.querySelector(".slidemenu .share").setAttribute("onclick", "shareRoute(\"" + id + "\",this)")
      //add to calendar a.querySelector(".slidemenu .share").setAttribute("onclick","shareRoute(\""+id+"\",this)")
      a.querySelectorAll("i.Ttype").forEach((e, c) => {
        if (routs[x][0].type * 1 == c + 1 || routs[x][0].type * 1 == 3) {
          e.classList.remove("d-none")
        } else {
          e.classList.add("d-none")
        }
      })

      for (var i = 1; i < routs[x].length; i++) {
        tnwa = nwa.cloneNode(!0)
        id = routs[x][i].driveru + "-" + routs[x][i].date.replaceAll(".", "") + "-" + routs[x][i].route.replaceAll(";", "-")
        tnwa.innerHTML = nwa.innerHTML.formatUnicorn(routs[x][i])
        tnwa.firstElementChild.setAttribute("onclick", "Oroutedetails(\"" + x + "\"," + i + ")")
        tnwa.querySelector(".slidemenu .share").setAttribute("onclick", "shareRoute(\"" + id + "\",this)")
        //tnwa.querySelector(".slidemenu .share").setAttribute("onclick","shareRoute(\""+id+"\",this)")
        tnwa.querySelectorAll("i.Ttype").forEach((e, c) => {
          if (routs[x][i].type * 1 == c + 1 || routs[x][i].type * 1 == 3) {
            e.classList.remove("d-none")
          } else {
            e.classList.add("d-none")
          }
        })
        lfr.append(tnwa)
      }


      finalOutput += t.outerHTML

    }
    console.log(values[0], values[1], routs)
    stopLoading()
    setdata2page(finalOutput)
    d.querySelectorAll("div[country]").forEach(t => {
      t.style.background = "url(https://hatscripts.github.io/circle-flags/flags/" + t.getAttribute("country") + ".svg)"
    });
  });
}

let rPagedrivers = () => {
  data = fetchCSV(DBURL + "?gid=0&single=true&output=csv&range=B:F")
  temp = fetch("/pages/drivers.html").then((r) => {
    return r.text()
  }).then((r) => {
    return new DOMParser().parseFromString(r, "text/html").querySelector("[template]")
  })
  let finalOutput = ""
  Promise.all([data, temp]).then((values) => {
    //let t = values[1].cloneNode(!0)
    finalOutput = values[1].firstElementChild.outerHTML
    for (driver of values[0]) {
      //console.log(driver)
      values[1].querySelector(".likeDriverBtn").setAttribute("onclick","driverLiker.LikeDriver(this)")
      values[1].querySelector(".dislikeDriverBtn").setAttribute("onclick","driverLiker.DisLikeDriver(this)")
      finalOutput += values[1].lastElementChild.outerHTML.formatUnicorn(driver)
    }

    stopLoading()
    setdata2page(finalOutput)
  })

}


const rPageRdetails=data=>{
	if(data.data){
		rPageRdetails_render(data.data)
	}else{
		fetchCSV(DBURL + "?gid=1463143925&single=true&output=csv").then(data=>{
			
			myUrl = new URL(location.href)
			let id = myUrl.searchParams.get("id")
			if(!id){
				go2Page("home","home")
				return
			}
			id=id.split("-")
			//myUrl.searchParams.delete("id")
    		//window.history.replaceState(null, null, myUrl);
			if (id.length < 4) {
				return go2Page("home","home")
			} 

			finded=!1;
			data.forEach(el=>{
				if (el.driveru == id[0] &&
					el.date == id[1][0]+id[1][1]+"."+id[1][2]+id[1][3]+"."+id[1][4]+id[1][5]+id[1][6]+id[1][7] &&
					id.length == new Set([...id,...el.route.split(";")]).size)
				{
					finded=!0
					return rPageRdetails_render(el,true)
				}

			})
			
			return (!finded)?go2Page("home","home"):0
		})
	}
}

function rPageRdetails_render(Rdata,fromLink=false){
	if(fromLink){
		setTitle(Rdata.drivern +"("+Rdata.date+")")
	}
	//debugger
	setMenuItems([
		{
			a:"ShowToastMessage('Тестова провірка алертів')",
			t:"Call"
		}
	])

}


//end of render functions
const PAGEDATA = {
  home: {
    control: {
      title: "Рейсы",
      top: "msn",
      nav: "s",
      navTab: "1",
    }
  },
  drivers: {
    control: {
      title: "Водители",
      top: "msn",
      nav: "s",
      navTab: "2",
    }

  },
  routedetails: {
    control: {
      title: "",
      top: "bnm",
      nav: "h",
      menu: []
    },
    back: {
      page: "home",
      data: "home"

    }
  },
  "add-driver": {
    control: {
      title: "Добавить перевозчика",
      top: "bnn",
      nav: "h"

    },
    back: {
      page: "home",
      data: "home"

    }

  },
  calendar: {
    control: {
      title: "Календарь",
      top: "bnn",
      nav: "h"
    }
  }

}

const PAGERENDER = {
  home: rPagehome,
  drivers: rPagedrivers,
  calendar: console.log,
  routedetails: rPageRdetails,
  driverdetails: console.log,
  "add-driver": console.log

}
const PAGESEARCH = {
  home: "searchInRoute",
  drivers: "console.log"

}


window.onpopstate = (e) => {
  if (e.state) {
    //console.log("ONPOPSTATE", e.state)
    //debugger
    go2Page(...e.state)
  }
}
const curPage = () => {
  console.log("curpage")
  let ourl = new URL(window.location.href)
  let page = sessionStorage.getItem('page') || "home"

  let pdata = PAGEDATA[page]


  if ("pdata" in sessionStorage) {
    pdata = JSON.parse(sessionStorage.getItem('pdata'))
  } else {

    sessionStorage.setItem('pdata', JSON.stringify(pdata))
  }

  if (ourl.searchParams.has("p")) {
    p = ourl.searchParams.get("p").toLowerCase() || "home"
    if (p in PAGEDATA) {
      sessionStorage.setItem('pdata', JSON.stringify(PAGEDATA[p]))
      sessionStorage.setItem('page', p)
    }
    ourl.searchParams.delete("p")
    window.history.replaceState(null, null, ourl);

    return (PAGEDATA[p]) ? [p, PAGEDATA[p]] : ["home", PAGEDATA.home]
  } else if ("page" in sessionStorage) {
    sessionStorage.setItem('page', page)
    return [page, pdata]
  } else {
    sessionStorage.setItem('page', "home")
    return ["home", PAGEDATA.home]
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
		page:"home"
	}
}
*/
function setTitle(title){
	 d.getElementById("pageName").innerText = title
}

function setMenuItems(items=[]){

  m = d.getElementById('mmenunavbutton');
  m.classList.remove("d-none");
  li = ""
  for (var i = 0; i < items.length; i++) {
    li += "<li><a class=dropdown-item role=button onclick=\"" + ((items[i].a.match(/\(.*\)/))?items[i].a:items[i].a+"(this)") + "\" tabindex=0>" + items[i].t + "</a></li>"
  }
  m.parentNode.querySelector(".dropdown-menu").innerHTML = li

}

const go2Page = (page, data) => {
  //d = d;
  console.log(page, data)
  startLoading()
  if (data) {
    (typeof data == "string") ? data = PAGEDATA[data]: 0;
    if (data.control) {
      data.control.top.split("").forEach((cb, cn) => {
        switch (cn) {
          case 0:
            (cb == "m") ? (() => {
              d.getElementById('backnavbutton').classList.add("d-none")
              d.getElementById('menuopenbutton').classList.remove("d-none")
            })() : (() => {
              d.getElementById('menuopenbutton').classList.add("d-none")
              d.getElementById('backnavbutton').classList.remove("d-none")
              if (!data.back) {
                data.back = {
                  page: sessionStorage.getItem('page'),
                  data: JSON.parse(sessionStorage.getItem('pdata'))
                }
              }
              d.getElementById('backnavbutton').onclick = () => {
                go2Page(data.back.page, data.back.data)
              }
            })();
            break;
          case 1:
            (cb == "s") ? (() => {
              d.getElementById('searchnavbutton').classList.remove("d-none")
              d.querySelector("#searchinput input").setAttribute("onclick", PAGESEARCH[page] + "(this.value)")
              d.getElementById("searchclsbutton").click()
            })() : (() => {
              d.getElementById("searchclsbutton").click()
              d.getElementById('searchnavbutton').classList.add("d-none")
            })();
            break;
          case 2:
            (cb == "m") ? (() => {
            	setMenuItems(data.control.menu)
              })() : (() => {
              d.getElementById('mmenunavbutton').classList.add("d-none")
            })();
            break;
        }
      });

      (data.control.nav == "s") ? (() => {
        d.getElementById('navPages').classList.remove("d-none")
        d.querySelectorAll("[data-nav-id]").forEach((e) => {
          if (e.dataset.navId == data.control.navTab) {
            e.classList.add("active")
          } else {
            e.classList.remove("active")
          }
        })
      })() : (() => {
        d.getElementById('navPages').classList.add("d-none")
      })();

      setTitle(data.control.title || "")
    }
  }
  console.log(data)
  if (page != "blank") {
    sessionStorage.setItem('pdata', JSON.stringify(data))
    sessionStorage.setItem('page', page)
  }
  
  if (data.back && page != "blank") {
    history.pushState([data.back.page, data.back.data], page, "#d" + page)
    history.pushState(null, page, "#f" + page)
  } else {
    history.pushState(null, page, "#")
  }
  if (page in PAGERENDER) {
    f = PAGERENDER[page]
    f(data)
  }

}