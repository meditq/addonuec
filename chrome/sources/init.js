//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

chrome.storage.local.get(item => {
	if(!item.shozoku) chrome.storage.local.set({"shozoku": 2});
//	if(!item.autologin) chrome.storage.local.set({"autologin": "on"});
//	if(item.autologined) browser.storage.local.remove("autologined");
});
