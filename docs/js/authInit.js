firebase.initializeApp({apiKey:"AIzaSyChvee1gUsGHeV5rJ6JTCiFGTnVQlRbxKk",authDomain:"auth.transfers.arendacg.space",projectId:"transfers4me",storageBucket:"transfers4me.appspot.com",messagingSenderId:"264089197452",appId:"1:264089197452:web:8aac1bb44f6f0b94a054a9"});const loginIn=()=>{let e=new firebase.auth.GoogleAuthProvider;e.addScope("profile"),e.addScope("email"),e.addScope("openid"),firebase.auth().signInWithPopup(e).then(e=>{firebase.auth().currentUser=e.user}).catch(e=>{console.log(e);let o=document.getElementById("errorLogin");o.classList.remove("d-none"),o.innerText=e.message})},loginOut=()=>{firebase.auth().signOut().then(()=>{console.log("ok logout")}).catch(e=>{alert(e)})};document.getElementById("google-login-in")&&document.getElementById("google-login-in").addEventListener("click",loginIn),document.getElementById("google-login-out")&&document.getElementById("google-login-out").addEventListener("click",loginOut);let loginModal=new bootstrap.Modal(document.getElementById("loginModal"),{keyboard:!1,backdrop:"static"});firebase.auth().onAuthStateChanged(function(e){e?loginModal.hide():loginModal.show()});