//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

chrome.storage.local.get("shozoku", item => {
	if(!item.shozoku) chrome.storage.local.set({"shozoku": 2});
});
