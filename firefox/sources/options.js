//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

function loadConfig(){
	browser.storage.local.get("shozoku").then(item => document.config.shozoku.value = item.shozoku);
}

function saveConfig(event){
	event.preventDefault();
	browser.storage.local.set({"shozoku": parseInt(document.config.shozoku.value, 10)}).then(alert("保存しました"), error => alert("保存に失敗しました: " + error));
}

function loadOtpStatus(){
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
	const str = document.otpSetting.otpURL.value;
	const secret;
	if((secret = /(?<=secret=|^)[A-Z2-7]{32}/.exec(str)) == null){
		alert("無効な入力です");
		event.preventDefault();
		return;
	}
	browser.storage.local.set({"secret": secret[0]}).then(alert("鍵を保存しました"), error => alert("鍵の保存に失敗しました: " + error));
}

function clearOtpSecret(){
	if(confirm("本当に消去しますか？")){
		browser.storage.local.remove("secret").then(alert("消去しました"), error => alert("消去に失敗しました: " + error)).then(location.reload());
	}
}

document.addEventListener("DOMContentLoaded", loadConfig);
document.addEventListener("DOMContentLoaded", loadOtpStatus);
document.config.addEventListener("submit", saveConfig);
document.otpSetting.addEventListener("submit", saveOtpSecret);
document.otpSetting.clear.addEventListener("click", clearOtpSecret);
