firebase.initializeApp({apiKey:"AIzaSyChvee1gUsGHeV5rJ6JTCiFGTnVQlRbxKk",authDomain:"transfers4me.firebaseapp.com",projectId:"transfers4me",storageBucket:"transfers4me.appspot.com",messagingSenderId:"264089197452",appId:"1:264089197452:web:8aac1bb44f6f0b94a054a9"});const loginIn=e=>{let o=new firebase.auth.GoogleAuthProvider;if(o.addScope("profile"),o.addScope("email"),o.addScope("openid"),o.addScope("https://www.googleapis.com/auth/user.phonenumbers.read"),e)if("object"==typeof e)for(var t=0;t<e.length;t++)o.addScope(e[t]);else"string"==typeof e&&o.addScope(e);firebase.auth().signInWithPopup(o).then(e=>{if(console.log(e),!e.additionalUserInfo.profile.granted_scopes.split(" ").includes("https://www.googleapis.com/auth/user.phonenumbers.read"))return Promise.reject({code:"login/no-phone-accept",message:"Для авторизации разрешите доступ до вашего номера телефона"});let o=window.localStorage;o.setItem("token",e.credential.accessToken.split("").reverse().join("")),o.setItem("scopes",e.additionalUserInfo.profile.granted_scopes),firebase.auth().currentUser=e.user}).catch(e=>{console.log(e,"fromcatch");let o=document.getElementById("errorLogin");switch(e.code){case"auth/user-disabled":o.innerHTML="Ваш аккаунт заблокирован. Свяжитесь с <a class=text-secondary href=mailto:arendamontenegro.car+transfers@gmail.com>администратором</a>";break;default:o.innerText=e.message}o.classList.remove("d-none"),loginOut()})},loginOut=()=>{firebase.auth().signOut().then(()=>{console.log("ok logout")}).catch(e=>{alert(e)})};document.getElementById("google-login-in")&&document.getElementById("google-login-in").addEventListener("click",loginIn),document.getElementById("google-login-out")&&document.getElementById("google-login-out").addEventListener("click",loginOut);let loginModal=new bootstrap.Modal(document.getElementById("loginModal"),{keyboard:!1,backdrop:"static"});firebase.auth().onAuthStateChanged(function(e){e?(loginModal.hide(),console.log("hide",e)):(loginModal.show(),console.log("show"))});