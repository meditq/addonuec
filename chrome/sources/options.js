//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

function loadConfig(event){
	chrome.storage.local.get("shozoku", item => document.config.shozoku.value = item.shozoku);
}

function saveConfig(event){
	event.preventDefault();
	chrome.storage.local.set({"shozoku": parseInt(document.config.shozoku.value, 10)}, () => {
		if(chrome.runtime.lastError) chrome.extension.getBackgroundPage().alert("保存に失敗しました: " + chrome.runtime.lastError);
		else chrome.extension.getBackgroundPage().alert("保存しました");
	});
}

function loadOtpStatus(event){
	chrome.storage.local.get("secret", item => {
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
		chrome.extension.getBackgroundPage().alert("無効な入力です");
		event.preventDefault();
		return;
	}
	chrome.storage.local.set({"secret": secret[0]}, () => {
		if(chrome.runtime.lastError) chrome.extension.getBackgroundPage().alert("鍵の保存に失敗しました: " + chrome.runtime.lastError);
		else chrome.extension.getBackgroundPage().alert("鍵を保存しました");
	});
}

function clearOtpSecret(event){
	if(chrome.extension.getBackgroundPage().confirm("本当に消去しますか？")){
		chrome.storage.local.remove("secret", () => {
			if(chrome.runtime.lastError) chrome.extension.getBackgroundPage().alert("消去に失敗しました: " + chrome.runtime.lastError);
			else chrome.extension.getBackgroundPage().alert("消去しました");
			location.reload();
		});
	}
}

document.addEventListener("DOMContentLoaded", loadConfig);
document.addEventListener("DOMContentLoaded", loadOtpStatus);
document.config.addEventListener("submit", saveConfig);
document.otpSetting.addEventListener("submit", saveOtpSecret);
document.otpSetting.clear.addEventListener("click", clearOtpSecret);
