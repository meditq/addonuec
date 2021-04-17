//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

const digits = 6;
const duration = 30;

function base32decode(str){
	/* it works correctly only when str.length is a multiple of 8 */

	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
	var bits = "";
	for(let i = 0; i < str.length; i++){
		bits += chars.indexOf(str.charAt(i)).toString(2).padStart(5, "0");
	}
	var ret = new Uint8Array(bits.length / 8);
	for(let i = 0; i < ret.length; i++){
		ret[i] = parseInt(bits.substr(i * 8, 8), 2);
	}
	return ret;
}

async function hotp(secret, count){
	var key = await crypto.subtle.importKey("raw", base32decode(secret), {name: "HMAC", hash: "SHA-1"}, false, ["sign"]);
	var msg = new DataView(new ArrayBuffer(8));
	msg.setBigUint64(0, BigInt(count));
	var signature = new DataView(await crypto.subtle.sign("HMAC", key, msg));
	var code = (signature.getUint32(signature.getUint8(19) & 0x0F) & 0x7FFFFFFF).toString(10).padStart(digits, "0").slice(-digits);
	return code;
}

async function totp(secret){
	var count = Math.floor(Date.now() / 1000 / duration);
	return await hotp(secret, count);
}

browser.storage.local.get("secret").then(item => {
	if(item.secret){
		if(!document.getElementsByClassName("input_error_for_user")[0]){
			totp(item.secret).then(code => {
				document.getElementsByName("authcode")[0].value = code;
				document.getElementsByName("login")[0].click();
			});
		}else{
			alert("自動認証に失敗しました。手動でコードを入力するか、[リセット]を押して自動認証をやり直してください。");
		}
	}
});
