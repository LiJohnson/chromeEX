var i = 0;
var p = new MyProxy();
/*
chrome.browserAction.onClicked.addListener(function(e) {
	i++;
	if( i%2 ){
		p.set("rpi.lcs.com",3128);
	}else{
		p.direct();
	}

	chrome.cookies.getAll({},function(data){
		console.log(data);
	});
});
*/

var ips = {};
var a = document.createElement("a");

chrome.webRequest.onBeforeSendHeaders.addListener( function(details) {
	details.requestHeaders.push({name:'referer',value:'https://www.google.com.hk/'});
	return {requestHeaders:details.requestHeaders};
}, {
		urls: ["https://www.google.com.hk/maps*"]
	},["blocking", "requestHeaders"]
);

chrome.webRequest.onResponseStarted.addListener(function(data){
	a.href = data.url;
	ips[a.host] = data.ip;
},{
	urls: ["<all_urls>"],
	types:["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest",  "other"]
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if( msg.getIp ){
		chrome.tabs.getSelected(function(tab){
			a.href = tab.url;
			sendResponse(ips[a.host]);
		});
	}
	return true;
});	