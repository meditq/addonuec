//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

browser.storage.local.get().then(item => {
	if(!item.shozoku) browser.storage.local.set({"shozoku": 2});
	if(!item.autologin) browser.storage.local.set({"autologin": "on"});
	if(item.autologined) browser.storage.local.remove("autologined");
});
