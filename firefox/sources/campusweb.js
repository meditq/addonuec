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
	if(document.getElementsByName("time_cnt")[0].value - 0 > 30){
		document.querySelector('input[type="button"]').click();
	}
}

if(document.title.startsWith("シラバス参照")){
	if(document.getElementById("jikanwariInputForm").name == "InputForm"){
		browser.storage.local.get("shozoku").then(item => {
			var index = item.shozoku - 1;
			var shozokuList = document.getElementById("jikanwariShozokuCode");
			if(!shozokuList[index]) index = 0;
			shozokuList.selectedIndex = index;
		});
		document.getElementById("jikanwariInputForm")[6].type = "submit";
		document.getElementById("jikanwariSearchForm")[15].type = "submit";
	}

}else if(document.title == "単位修得状況照会"){
	var personalInfo = document.getElementsByTagName("table")[1];
	if(personalInfo.getElementsByTagName("th")[0].textContent.includes("氏名")){
		for(cell of personalInfo.querySelectorAll("td")) createMask(cell);
	}

}else if(document.title == ""){
	if(document.getElementsByName("TopForm")[0]){
		var username = document.getElementsByClassName("user")[0];
		if(username) createMask(username);
		setInterval(autoExtend, 302000);
	}else if(document.getElementsByName("Generator")[0].content.includes("Word")){
		for(link of document.getElementsByTagName("a")){
			link.target = "_blank";
		}
		for(item of document.querySelectorAll("*[lang]")){
			item.removeAttribute("lang");
		}
	}
}
