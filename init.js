//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

browser.storage.local.get("shozoku").then(item => {
	if(!item.shozoku) browser.storage.local.set({"shozoku": 2});
});
