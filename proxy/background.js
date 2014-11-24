i = 0;
setInterval(function() {
	//console.log(i++);
}, 1000);

chrome.browserAction.onClicked.addListener(function(e) {
	console.log(e)
});


var config = {
	mode: "fixed_servers",
	rules: {
		proxyForHttp: {
			scheme: "http",
			host: "192.168.199.111",
			port:3128
		},
		bypassList: []
	}
};
config = {"mode":"fixed_servers","rules":{"singleProxy":{"scheme":"http","host":"192.168.199.111","port":3128},"bypassList":[]}};
chrome.proxy.settings.set({
		value: config,
		scope: 'regular'
	},
	function(e) {
		console.log("proxy" , e);
});
chrome.proxy.onProxyError.addListener(function (e){
	console.log("proxy error");
});

document.addEventListener("DOMContentLoaded",function(e){
	console.log("DOM loaded",e);
})