const curPage = ()=>{
	let ourl = new URL(window.location.href)
	let pdata = {
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
		return [sessionStorage.getItem('page'),pdata]
	}else if(ourl.searchParams.has("p")){
		p = ourl.searchParams.get("p").toLowerCase() || "home"
		sessionStorage.setItem('page',p)
		window.history.replaceState(null, null, "/");
		return [p,pdata]
	}else{
		sessionStorage.setItem('page',"home")
		return ["home",pdata]
	}
}

/*

data = {
	control:{
		top:["menuopenbutton","backnavbutton","searchnavbutton","reloadnavbutton","offlinnavbutton","mmenunavbutton"]
			"msm" - menuopenbutton searchnavbutton mmenunavbutton
			"msn" - menuopenbutton searchnavbutton
			"mnm" - menuopenbutton mmenunavbutton
			"mnn" - menuopenbutton
			"bsm" - backnavbutton searchnavbutton mmenunavbutton
			"bnm" - backnavbutton mmenunavbutton
			"bsn" - backnavbutton searchnavbutton
			"bnn" - backnavbutton
		nav:"s" || "h"
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
						d.getElementById('mmenunavbutton').classList.remove("d-none")
					})():(()=>{
						d.getElementById('mmenunavbutton').classList.add("d-none")
					})();
					break;
				}
			});

			(data.control.nav == "s")?(()=>{
				d.getElementById('navPages').classList.remove("d-none")
			})():(()=>{
				d.getElementById('navPages').classList.add("d-none")
			})();
		}
	}

}