function checkUsername(event){
	var l = username.value.length;
	if(l - usernameLength >= 3){
		passwordLength = password.value.length;
		addEventListener("input", checkPassword);
	}
	usernameLength = l;
}

function checkPassword(event){
	var l = password.value.length;
	if(l - passwordLength >= 3){
		document.getElementsByName("_eventId_proceed")[0].click();
	}
	passwordLength = l;
}

if(document.title == "統合認証ログインページ"){
	if(!document.getElementsByClassName("form-error")[0]){
		var username = document.getElementById("username");
		var password = document.getElementById("password");
		var usernameLength = username.value.length;
		var passwordLength = password.value.length;
		if(usernameLength > 0 && passwordLength > 0){
				document.getElementsByName("_eventId_proceed")[0].click();
		}else{
			username.addEventListener("input", checkUsername);
		}
	}
}
