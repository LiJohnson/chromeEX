chrome.browserAction.onClicked.addListener(function(tab){
	
	
	chrome.pageAction.getTitle(tab,function(res){
		console.log(res);
	})
});