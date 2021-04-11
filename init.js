browser.storage.local.get("shozoku").then(item => {
	if(!item.shozoku) browser.storage.local.set({"shozoku": 2});
});
