function openWebClassWindow(url){
	location.href = url;
}

exportFunction(openWebClassWindow, window, {defineAs: "openWebClassWindow"});

for(elem of document.getElementsByClassName("showLoginButton")){
	elem.removeAttribute("href");
}
