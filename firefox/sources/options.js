//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

function loadConfig(event){
	browser.storage.local.get().then(item => {
		document.syllabus.shozoku.value = item.shozoku;
		document.sso.autologin.value = item.autologin;
	});
}

function saveShozoku(event){
	event.preventDefault();
	browser.storage.local.set({"shozoku": parseInt(document.syllabus.shozoku.value, 10)}).catch(error => {
		alert("保存に失敗しました: " + error);
	});
}

function saveAutoLogin(event){
	event.preventDefault();
	browser.storage.local.set({"autologin": document.sso.autologin.value}).catch(error => {
		alert("保存に失敗しました: " + error);
	});
}

function loadOtpStatus(event){
	browser.storage.local.get("secret").then(item => {
		if(item.secret){
			document.otpSetting.otpStatus.innerHTML = "設定されています";
			document.otpSetting.clear.style.display = "inline";
		}else{
			document.otpSetting.otpStatus.innerHTML = "設定されていません";
			document.otpSetting.clear.style.display = "none";
		}
	});
}

function saveOtpSecret(event){
	var str = document.otpSetting.otpURL.value;
	var secret;
	if((secret = /(?<=secret=|^)[A-Z2-7]{32}/.exec(str)) == null){
		alert("無効な入力です");
		event.preventDefault();
		return;
	}
	browser.storage.local.set({"secret": secret[0]}).then(alert("鍵を保存しました"), error => alert("鍵の保存に失敗しました: " + error));
}

function clearOtpSecret(event){
	if(confirm("本当に消去しますか？")){
		browser.storage.local.remove("secret").then(alert("消去しました"), error => alert("消去に失敗しました: " + error)).then(location.reload());
	}
}

document.addEventListener("DOMContentLoaded", loadConfig);
document.addEventListener("DOMContentLoaded", loadOtpStatus);
document.syllabus.shozoku.addEventListener("change", saveShozoku);
document.sso.autologin.addEventListener("change", saveAutoLogin);
document.otpSetting.addEventListener("submit", saveOtpSecret);
document.otpSetting.clear.addEventListener("click", clearOtpSecret);
