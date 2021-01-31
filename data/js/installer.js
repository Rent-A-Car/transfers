
// 1 chrome
// 2 firefox
// 3 safari
// 4 ios not safari
// 5 no suport
const renderInstallModal = (type)=>{
	modalstyles = document.createElement("style");
	modalstyles.innerText=`.pwa-install-prompt__container{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:center;left:-999em;padding:30px;position:fixed;top:-999em;transition:left 0s .15s,top 0s .15s,visibility 0s .15s;visibility:hidden;width:100%;z-index:100000}.pwa-install-prompt__container.is-active{left:0;top:0;transition:none;visibility:visible}.pwa-install-prompt__overlay{background:rgba(0,0,0,.5);border:0;height:100%;left:0;opacity:0;position:absolute;text-indent:-999em;top:0;transition:opacity .15s;width:100%;z-index:0}.pwa-install-prompt__container.is-active .pwa-install-prompt__overlay{opacity:1}.pwa-install-prompt{background:#fff;border-radius:2px;box-shadow:0 4px 8px rgba(0,0,0,.125);box-sizing:border-box;color:#424242;font-family:sans-serif;max-width:320px;opacity:0;position:relative;text-align:center;transform:translateY(25%);transition:opacity .15s,transform .15s ease-in-out;z-index:1}.pwa-install-prompt__container.is-active .pwa-install-prompt{opacity:1;transform:translateY(0)}.pwa-install-prompt__icon__container{background:url("data:image/svg+xml,%3Csvg viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23F0F0F0' d='M65,17C65,10.377 59.623,5 53,5L17,5C10.377,5 5,10.377 5,17L5,53C5,59.623 10.377,65 17,65L53,65C59.623,65 65,59.623 65,53L65,17Z' /%3E%3C/svg%3E%0A") center center/70px 70px repeat-x;margin:40px 0 0}.pwa-install-prompt__icon{border-radius:12px;display:block;margin:0 auto;width:60px}.pwa-install-prompt__content{padding:10px 35px}.pwa-install-prompt__title{font-size:24px;margin:0 0 20px}.pwa-install-prompt__text{font-size:16px;line-height:20px;margin:0 0 46px}.pwa-install-prompt__guide{align-items:center;display:flex;font-size:12px;justify-content:center;margin:0}.pwa-install-prompt__guide__icon{margin:0 2px 6px;width:20px}`
	document.head.appendChild(modalstyles)
	container = document.createElement("div")
	container.className = "pwa-install-prompt__container"
	install_guide = ""
	switch(type){
		case 1:
		install_guide='<p class="pwa-install-prompt__guide"><button class="btn btn-outline-success" id="beforeInstallButton">install</button></p>'
		break;
		case 2:
		install_guide='<p class="pwa-install-prompt__guide"><button class="btn btn-outline-success" onclick="window.open(\'googlechrome://navigate?url=\'+location.href);">Open in Chrome</button></p>'
		break;
		case 3:
		install_guide='<p class="pwa-install-prompt__guide">Just tap <svg class="pwa-install-prompt__guide__icon" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Share</title><path fill="#007AFF" d="M48.883,22.992L61.146,10.677L61.146,78.282C61.146,80.005 62.285,81.149 64,81.149C65.715,81.149 66.854,80.005 66.854,78.282L66.854,10.677L79.117,22.992C79.693,23.57 80.256,23.853 81.114,23.853C81.971,23.853 82.534,23.57 83.11,22.992C84.25,21.848 84.25,20.125 83.11,18.981L65.997,1.794C65.715,1.511 65.421,1.215 65.139,1.215C64.563,0.932 63.718,0.932 62.861,1.215C62.579,1.498 62.285,1.498 62.003,1.794L44.89,18.981C43.75,20.125 43.75,21.848 44.89,22.992C46.029,24.149 47.744,24.149 48.883,22.992ZM103.936,35.32L81.114,35.32L81.114,41.053L103.936,41.053L103.936,121.27L24.064,121.27L24.064,41.053L46.886,41.053L46.886,35.32L24.064,35.32C20.928,35.32 18.355,37.904 18.355,41.053L18.355,121.27C18.355,124.419 20.928,127.003 24.064,127.003L103.936,127.003C107.072,127.003 109.645,124.419 109.645,121.27L109.645,41.053C109.645,37.891 107.072,35.32 103.936,35.32Z" /></svg> then “Add to Home Screen”</p>'
		break;
		case 4:
		install_guide='<p class="pwa-install-prompt__guide"><button class="btn btn-outline-success" onclick="(prompt(\'Скопируйте ссылку\',location.href))?window.open(\'x-web-search://\'):0;">Open in Safari</button></p>'
		break;
		case 5:
		install_guide='<p class="pwa-install-prompt__guide"><a href="https://caniuse.com/?search=A2HS" class="btn btn-outline-danger">Your browser not supported</a></p>'
		break;
	}
template = `<div class="pwa-install-prompt__overlay"></div><div class="pwa-install-prompt"><div class="pwa-install-prompt__icon__container"><img class="pwa-install-prompt__icon" src=/icons/apple-touch-icon-precomposed.png alt=Transfers4Me /></div><div class="pwa-install-prompt__content"><h3 class="pwa-install-prompt__title">Install Transfers4Me</h3><p class="pwa-install-prompt__text">Install this application on your home screen for quick and easy access when you’re on the go.</p>
`+install_guide+`</div></div>`
    container.innerHTML = template;
    document.body.prepend(container)
    setTimeout(function(){ container.classList.add("is-active") }, 1000);
    
}
const detectBrowserType=()=>{
	
let ua = navigator.userAgent.toLowerCase()
isAndroid  = ua.indexOf("android")>-1
isIDevice  = /iphone|ipod|ipad/i.test(navigator.platform.toLowerCase());
isFirefox  = ua.indexOf("firefox")>-1 || ua.indexOf("fxios")>-1
isSafari   = ua.indexOf("safari") >-1
isChromeIOS= ua.indexOf("crios")  >-1

if (isAndroid && isFirefox){
renderInstallModal(2)
}else if(isIDevice && isSafari && !isChromeIOS && !isFirefox){
renderInstallModal(3)
}else if(isIDevice){
renderInstallModal(4)
}else{
renderInstallModal(5)
}

}

const beforeInstallPrompt = (event)=>{
	event.preventDefault();
	//window.console.log(event);
	let beforeInstallEvent = event;
	renderInstallModal(1);
	document.getElementById("beforeInstallButton").addEventListener("click", ()=>{
		beforeInstallEvent.prompt();
	});
	event.userChoice.then((result)=>{
		if(result.outcome=="accepted"){
			console.log("install")
			  var myWindow = window.open("?close", "_self");
  				myWindow.document.write("");
  				alert("Откройте приложение после установки на ваше устройство")
  				setTimeout (function() {myWindow.close()},1000);

		}else{
			console.log("noinstall")
			(window.location.reload())?1:(confirm())?window.location.reload():window.location.href="/?n"
		}

	},console.log)
}

if ("onbeforeinstallprompt" in window) {
	window.addEventListener("beforeinstallprompt", beforeInstallPrompt);
}else{
	detectBrowserType();
}