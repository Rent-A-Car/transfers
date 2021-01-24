firebase.initializeApp({
	apiKey: "AIzaSyChvee1gUsGHeV5rJ6JTCiFGTnVQlRbxKk",
	authDomain: "transfers4me.firebaseapp.com",
	projectId: "transfers4me",
	storageBucket: "transfers4me.appspot.com",
	messagingSenderId: "264089197452",
	appId: "1:264089197452:web:8aac1bb44f6f0b94a054a9"
});
const loginIn = ()=>{
let provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile")
provider.addScope("email")
provider.addScope("openid")
provider.addScope("https://www.googleapis.com/auth/profile.language.read")
provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read")

//firebase.auth().languageCode = 'sr';
firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
  	console.log(result)
  	let storage=window.localStorage
  	storage.setItem("randString",result.credential.accessToken)
  	//go to server

    firebase.auth().currentUser = result.user;
  }).catch((error) => {
  	console.log(error);
	let erAlrt = document.getElementById("errorLogin");
	(!erAlrt.innerText)?(error,erAlrt)=>{
    erAlrt.innerText = error.message;
		loginIn()
	}:(error,erAlrt)=>{
	erAlrt.classList.remove("d-none");
    erAlrt.innerText = error.message;
	}

	

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
  } else {
  	loginModal.show()
  }
});