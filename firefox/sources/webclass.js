//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

function openWebClassWindow(url){
	location.href = url;
}

exportFunction(openWebClassWindow, window, {defineAs: "openWebClassWindow"});

for(elem of document.getElementsByClassName("showLoginButton")){
	elem.removeAttribute("href");
}
