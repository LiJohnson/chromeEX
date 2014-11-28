var MyProxy = function(){
	var config = {
		mode: "fixed_servers",
		rules: {
			singleProxy: {
				scheme: "http",
			},
			bypassList: []
		}
	};

	this.set = function(host , port){
		config.rules.singleProxy.host = host;
		config.rules.singleProxy.port = port;

		chrome.proxy.settings.set({
				value: config,
				scope: 'regular'
			},
			function(e) {
				console.log("proxy setted", e);
			}
		);
	};

	this.direct = function(){
		chrome.proxy.settings.set({
				value: {mode:'direct'}
			},
			function(e) {
				console.log("never use proxy ", e);
			}
		);
	};

	this.getIpInfo = function(ip,cb){
		if( typeof ip == 'function' )cb=ip , ip='';

		var listener = function(details) {
			if( details.url.indexOf("shit") != -1 ){
				details.requestHeaders = [];
			}
			return {requestHeaders:details.requestHeaders};
		};

		chrome.webRequest.onBeforeSendHeaders.addListener( listener, {
				urls: ["*://ipinfo.io/","http://ipinfo.io/","*://ipinfo.io/*","http://lcs.com/*"]
			},["blocking", "requestHeaders"]
		);

		$.get("http://ipinfo.io",{shit:'shit'}, cb ,'json').always(function(){
			chrome.webRequest.onBeforeSendHeaders.removeListener(listener);
		});

	};
}