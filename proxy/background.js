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


chrome.webRequest.onBeforeSendHeaders.addListener( function(details) {
	details.requestHeaders.push({name:'referer',value:'https://www.google.com.hk/'});
	return {requestHeaders:details.requestHeaders};
}, {
		urls: ["https://www.google.com.hk/maps*"]
	},["blocking", "requestHeaders"]
);