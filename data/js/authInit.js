("firebase" in window && CONETCSTATE) ? 0 : (() => {
	go2Page(...curPage())
})();

firebase.initializeApp({
	apiKey: "AIzaSyChvee1gUsGHeV5rJ6JTCiFGTnVQlRbxKk",
	authDomain: "transfers4me.firebaseapp.com",
	projectId: "transfers4me",
	storageBucket: "transfers4me.appspot.com",
	messagingSenderId: "264089197452",
	appId: "1:264089197452:web:8aac1bb44f6f0b94a054a9",
});
const loginIn = (Ascope) => {
	let provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope("profile")
	provider.addScope("email")
	provider.addScope("openid")
	if (Ascope) {
		if (typeof Ascope == "object") {
			for (var i = 0; i < Ascope.length; i++) {
				provider.addScope(Ascope[i])
			}
		} else if (typeof Ascope == "string") {
			provider.addScope(Ascope)
		}
	}

	//firebase.auth().languageCode = 'sr';

	function AuthOnError(error) {
		console.log(error);
		let erAlrt = document.getElementById("errorLogin");
		switch (error.code) {
			case "auth/user-disabled":
				erAlrt.innerHTML = "Ваш аккаунт заблокирован. Свяжитесь с <a class=text-secondary href=mailto:arendamontenegro.car+transfers@gmail.com>администратором</a>"
				break;
			case "login/connectError":
				erAlrt.innerText = error.message;
				loginOut(!1)
				break;
			default:
				erAlrt.innerText = error.message;

		}
		erAlrt.classList.remove("d-none");
		console.log("show error")
	}


	firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
			console.log(result)

			let scopes = result.additionalUserInfo.profile.granted_scopes.split(" ")
			let storage = window.localStorage
			/*
			if(!scopes.includes("https://www.googleapis.com/auth/user.phonenumbers.read")){
				storage.setItem("auth",false)
				throw {code:"login/no-phone-accept",message:"Для авторизации разрешите доступ до вашего номера телефона"}
			}
		*/

			storage.setItem("token", result.credential.accessToken.split("").reverse().join(""))
			storage.setItem("auth", true)
			//go to server

			const C2SEr = { message: "Ошибка подключения к серверу", code: "login/connectError" }
			if (result.additionalUserInfo.isNewUser) {
				API.signUp(result.credential.accessToken).then((a) => {
					if (a === false) {
						return AuthOnError(C2SEr)
					}
					console.log("signup", a)
					loginModal.hide()
					localStorage.setItem("likes", a["likes"])
					if (a["isDriver"]) {

					}

				})
			} else {
				API.loginIn(result.credential.accessToken).then((a) => {
					if (a === false) {
						return AuthOnError(C2SEr)
					}
					console.log("loginIn", a)
					loginModal.hide()
					localStorage.setItem("likes", a["likes"])
					if (a["isDriver"]) {

					}

				})
			}



			firebase.auth().currentUser = result.user;
		}).catch(AuthOnError);
}

const loginOut = (hideError = false) => {
	firebase.auth().signOut().then(() => {
		// Sign-out successful.
		(hideError)
			? document.getElementById("errorLogin").classList.add("d-none")
			: 0;
		console.log("ok logout")
		window.localStorage.setItem("auth", !1);
	}).catch((error) => {
		// An error happened.
		alert(error)
	});

}
(document.getElementById("google-login-in")) ? document.getElementById("google-login-in").addEventListener("click", loginIn) : false;
(document.getElementById("google-login-out")) ? document.getElementById("google-login-out").addEventListener("click", loginOut) : false;

let loginModal = new bootstrap.Modal(document.getElementById('loginModal'), { keyboard: false, backdrop: "static" })
firebase.auth().onAuthStateChanged(function (user) {
	console.log("onAuthStateChanged")
	if (user && window.localStorage.getItem("auth")) {
		loginModal.hide()
		firebase.auth().currentUser = user;
		document.getElementById("emailDispl").innerText = user.email;
		go2Page(...curPage())
	} else {
		loginModal.show()
	}
});