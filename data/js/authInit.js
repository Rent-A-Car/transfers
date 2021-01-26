firebase.initializeApp({
	apiKey: "AIzaSyChvee1gUsGHeV5rJ6JTCiFGTnVQlRbxKk",
	authDomain: "transfers4me.firebaseapp.com",
	projectId: "transfers4me",
	storageBucket: "transfers4me.appspot.com",
	messagingSenderId: "264089197452",
	appId: "1:264089197452:web:8aac1bb44f6f0b94a054a9"
});
const loginIn = (Ascope)=>{
let provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile")
provider.addScope("email")
provider.addScope("openid")
provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read")
if(Ascope){
	if(typeof Ascope == "object"){
		for (var i = 0; i < Ascope.length; i++) {
			provider.addScope(Ascope[i])
		}
	}else if(typeof Ascope == "string"){
		provider.addScope(Ascope)
	}
}

//firebase.auth().languageCode = 'sr';
firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
  	console.log(result)

  	let scopes =result.additionalUserInfo.profile.granted_scopes.split(" ")

  	if(!scopes.includes("https://www.googleapis.com/auth/user.phonenumbers.read")){
  		return Promise.reject({code:"login/no-phone-accept",message:"Для авторизации разрешите доступ до вашего номера телефона"})
  	}

  	let storage=window.localStorage
  	storage.setItem("token",result.credential.accessToken.split("").reverse().join(""))
  	storage.setItem("scopes",result.additionalUserInfo.profile.granted_scopes)
  	//go to server

    firebase.auth().currentUser = result.user;
  }).catch((error) => {
  	console.log(error,"fromcatch");
	let erAlrt = document.getElementById("errorLogin");
	switch(error.code){
		case "auth/user-disabled":
		erAlrt.innerHTML = "Ваш аккаунт заблокирован. Свяжитесь с <a class=text-secondary href=mailto:arendamontenegro.car+transfers@gmail.com>администратором</a>"
		break;
		default:
		erAlrt.innerText = error.message;

	}
	erAlrt.classList.remove("d-none");
    

	

  });
}

const loginOut = ()=>{
firebase.auth().signOut().then(() => {
  // Sign-out successful.
  console.log("ok logout")
}).catch((error) => {
  // An error happened.
  alert(error)
});

}
(document.getElementById("google-login-in"))?document.getElementById("google-login-in").addEventListener("click",loginIn):false;
(document.getElementById("google-login-out"))?document.getElementById("google-login-out").addEventListener("click",loginOut):false;

let loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {keyboard:false,backdrop:"static"})
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loginModal.hide()
    console.log("hide",user)
  } else {
  	loginModal.show()
  	console.log("show")
  }
});