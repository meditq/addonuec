//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

for(elem of document.getElementsByClassName("showLoginButton")){
	elem.removeAttribute("href");
}

const injectCode = `function openWebClassWindow(url){
	location.href = url;
}`;

const script = document.createElement("script");
script.textContent = injectCode;
document.body.appendChild(script);
