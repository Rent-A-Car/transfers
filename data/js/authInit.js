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
//provider.addScope("https://www.googleapis.com/auth/contacts")
//provider.addScope("https://www.googleapis.com/auth/calendar")
//firebase.auth().languageCode = 'sr';
firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    console.log(result);
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    firebase.auth().currentUser = result.user;
    // ...
  }).catch((error) => {
  	console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

const loginOut = ()=>{
firebase.auth().signOut().then(() => {
  // Sign-out successful.
  console.log("ok logout")
}).catch((error) => {
  // An error happened.
  console.log(error)
});

}
(document.getElementById("google-login-in"))?document.getElementById("google-login-in").addEventListener("click",loginIn):false;
(document.getElementById("google-login-out"))?document.getElementById("google-login-out").addEventListener("click",loginOut):false;

firebase.auth().onAuthStateChanged(function(user) {
	loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
		keyboard:false,
		backdrop:"static"
	})
  if (user) {
    console.log("logged now",user)
     loginModal.hide()
  } else {
    console.log("notlogged now",user)
    loginModal.show()
  }
});