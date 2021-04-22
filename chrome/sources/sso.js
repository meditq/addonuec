var username;
var password;
var usernameLength;
var passwordLength;

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

chrome.storage.local.get("autologin", item => {
	if(item.autologin == "on"){
		if(document.title == "統合認証ログインページ"){
			if(!document.getElementsByClassName("form-error")[0]){
				username = document.getElementById("username");
				password = document.getElementById("password");
				usernameLength = username.value.length;
				passwordLength = password.value.length;
				chrome.storage.local.get("autologined", item => {
					if(!item.autologined){
						alert(  "【AddonUECからのお知らせ】\n"
						      + "自動ログイン機能が実装されました。\n"
						      + "パスワードの自動入力を検知してログイン画面を飛ばします。\n"
						      + "この機能は設定画面でオフにできます。\n"
						      + "(このメッセージは今後表示されません)"
						);
						chrome.storage.local.set({"autologined": "yes"});
					}
					if(usernameLength > 0 && passwordLength > 0){
							document.getElementsByName("_eventId_proceed")[0].click();
					}else{
						username.addEventListener("input", checkUsername);
					}
				});
			}
		}
	}
});
