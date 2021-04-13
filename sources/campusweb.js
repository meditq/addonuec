//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

function hideText(event){
	event.target.style.display = "none";
	event.target.previousSibling.style.display = "";
}

function showText(event){
	event.target.style.display = "none";
	event.target.nextSibling.style.display = "";
}

function createMask(element){
	var mask = element.cloneNode(false);
	mask.textContent = "＊＊＊＊＊＊";
	mask.style.display = "none";
	element.parentNode.insertBefore(mask, element);
	element.addEventListener("click", hideText);
	mask.addEventListener("click", showText);
}

function autoExtend(){
	if(document.TopForm.time_cnt.value - 0 > 30){
		try{
			window.wrappedJSObject.extendSession();
		}catch(error){
			console.log(error);
		}
	}
}

exportFunction(autoExtend, window, {defineAs: "autoExtend"});

if(document.title == "シラバス参照"){
	browser.storage.local.get("shozoku").then(item => {
		var index = item.shozoku - 1;
		if(!document.SearchForm.jikanwariShozokuCode[index]) index = 0;
		document.SearchForm.jikanwariShozokuCode.selectedIndex = index;
	});
	document.InputForm[6].type = "submit";
	document.SearchForm[15].type = "submit";

}else if(document.title == "単位修得状況照会"){
	var personalInfo = document.getElementsByTagName("table")[1];
	if(personalInfo.getElementsByTagName("th")[0].textContent.includes("氏名")){
		for(cell of personalInfo.querySelectorAll("td")) createMask(cell);
	}

}else if(document.title == ""){
	var username = document.getElementsByClassName("user")[0];
	if(username) createMask(username);
	if(document.TopForm) setInterval("autoExtend()", 302000);
}
