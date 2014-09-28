(function( chrome ){
	var contextMenuId ;

	contextMenuId = chrome.contextMenus.create({
		title:"google 翻译",
		contexts:["selection"],
		onclick:function(clickData,tab){

			chrome.tabs.create({url:"https://www.google.com.hk/search?q=%E7%BF%BB%E8%AF%91+"+clickData.selectionText});
		}
	});

	chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
		if( msg.request !== 'updateContextMenu' )return;
		var title = msg.selection.length < 15 ? msg.selection : msg.selection.replace(/.$/,'...');
		
		chrome.contextMenus.update(contextMenuId, {title:"google 翻译("+ title +")"});
	});

})(chrome);
