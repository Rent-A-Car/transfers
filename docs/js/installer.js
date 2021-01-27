const renderInstallModal=n=>{switch(modalstyles=document.createElement("style"),modalstyles.innerText="\n.pwa-install-prompt__container {\n    align-items: center;\n    box-sizing: border-box;\n    display: flex;\n    height: 100%;\n    justify-content: center;\n    left: -999em;\n    padding: 30px;\n    position: fixed;\n    top: -999em;\n    transition: left 0s 0.15s, top 0s 0.15s, visibility 0s 0.15s;\n    visibility: hidden;\n    width: 100%;\n    z-index: 100000;\n}\n\n.pwa-install-prompt__container.is-active {\n    left: 0;\n    top: 0;\n    transition: none;\n    visibility: visible;\n}\n\n.pwa-install-prompt__overlay {\n    background: rgba(0,0,0,0.5);\n    border: 0;\n    height: 100%;\n    left: 0;\n    opacity: 0;\n    position: absolute;\n    text-indent: -999em;\n    top: 0;\n    transition: opacity 0.15s;\n    width: 100%;\n    z-index: 0;\n}\n\n.pwa-install-prompt__container.is-active .pwa-install-prompt__overlay {\n    opacity: 1;\n}\n\n.pwa-install-prompt {\n    background: #FFF;\n    border-radius: 2px;\n    box-shadow: 0px 4px 8px rgba(0,0,0,0.125);\n    box-sizing: border-box;\n    color: #424242;\n    font-family: sans-serif;\n    max-width: 320px;\n    opacity: 0;\n    position: relative;\n    text-align: center;\n    transform: translateY(25%);\n    transition: opacity 0.15s, transform 0.15s ease-in-out;\n    z-index: 1;\n}\n\n.pwa-install-prompt__container.is-active .pwa-install-prompt {\n    opacity: 1;\n    transform: translateY(0%);\n}\n.pwa-install-prompt__icon__container {\n    background: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23F0F0F0' d='M65,17C65,10.377 59.623,5 53,5L17,5C10.377,5 5,10.377 5,17L5,53C5,59.623 10.377,65 17,65L53,65C59.623,65 65,59.623 65,53L65,17Z' /%3E%3C/svg%3E%0A\") center center / 70px 70px repeat-x;\n    margin: 40px 0 0;\n}\n\n.pwa-install-prompt__icon {\n    border-radius: 12px;\n    display: block;\n    margin: 0 auto;\n    width: 60px;\n}\n\n.pwa-install-prompt__content {\n    padding: 10px 35px;\n}\n\n.pwa-install-prompt__title {\n    font-size: 24px;\n    margin: 0 0 20px;\n}\n\n.pwa-install-prompt__text {\n    font-size: 16px;\n    line-height: 20px;\n    margin: 0 0 46px;\n}\n\n.pwa-install-prompt__guide {\n    align-items: center;\n    display: flex;\n    font-size: 12px;\n    justify-content: center;\n    margin: 0;\n}\n\n.pwa-install-prompt__guide__icon {\n    margin: 0 2px 6px;\n    width: 20px;\n}",document.head.appendChild(modalstyles),container=document.createElement("div"),container.className="pwa-install-prompt__container",install_guide="",n){case 1:install_guide='<p class="pwa-install-prompt__guide"><button class="btn btn-outline-success" id="beforeInstallButton">install</button></p></p>';break;case 2:install_guide="";break;case 3:install_guide='<p class="pwa-install-prompt__guide">Just tap <svg class="pwa-install-prompt__guide__icon" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Share</title><path fill="#007AFF" d="M48.883,22.992L61.146,10.677L61.146,78.282C61.146,80.005 62.285,81.149 64,81.149C65.715,81.149 66.854,80.005 66.854,78.282L66.854,10.677L79.117,22.992C79.693,23.57 80.256,23.853 81.114,23.853C81.971,23.853 82.534,23.57 83.11,22.992C84.25,21.848 84.25,20.125 83.11,18.981L65.997,1.794C65.715,1.511 65.421,1.215 65.139,1.215C64.563,0.932 63.718,0.932 62.861,1.215C62.579,1.498 62.285,1.498 62.003,1.794L44.89,18.981C43.75,20.125 43.75,21.848 44.89,22.992C46.029,24.149 47.744,24.149 48.883,22.992ZM103.936,35.32L81.114,35.32L81.114,41.053L103.936,41.053L103.936,121.27L24.064,121.27L24.064,41.053L46.886,41.053L46.886,35.32L24.064,35.32C20.928,35.32 18.355,37.904 18.355,41.053L18.355,121.27C18.355,124.419 20.928,127.003 24.064,127.003L103.936,127.003C107.072,127.003 109.645,124.419 109.645,121.27L109.645,41.053C109.645,37.891 107.072,35.32 103.936,35.32Z" /></svg> then “Add to Home Screen”</p>'}template='\n<div class="pwa-install-prompt__overlay"></div>\n    <div class="pwa-install-prompt">\n        <div class="pwa-install-prompt__icon__container">\n            <img class="pwa-install-prompt__icon" src=/icons/apple-touch-icon-precomposed.png alt=Transfers4Me />\n        </div>\n        <div class="pwa-install-prompt__content">\n            <h3 class="pwa-install-prompt__title">Install Transfers4Me</h3>\n            <p class="pwa-install-prompt__text">Install this application on your home screen for quick and easy access when you’re on the go.</p>\n            '+install_guide+"\n            \n        </div>\n    </div>",container.innerHTML=template,document.body.prepend(container),setTimeout(function(){container.classList.add("is-active")},1e3)};let ModalMode=0;const detectBrowserType=()=>{},beforeInstallPrompt=n=>{n.preventDefault();let t=n;renderInstallModal(1),document.getElementById("beforeInstallButton").addEventListener("click",()=>{t.prompt()}),n.userChoice.then(n=>{if("accepted"==n.outcome){console.log("install");var t=window.open("","_self");t.document.write(""),alert("Откройте приложение после установки на ваше устройство"),setTimeout(function(){t.close()},1e3)}else console.log("noinstall")(window.location.reload())||(confirm()?window.location.reload():window.location.href="/?n")},console.log)};"onbeforeinstallprompt"in window?(window.addEventListener("beforeinstallprompt",beforeInstallPrompt),console.log("bipr")):console.log("Nbipr");