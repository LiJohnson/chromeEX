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

	this.setd = function(host , port){
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

		ip && (ip = "/"+ip); 
		$.get("http://ipinfo.io"+ ip + "/json" , cb, "json" );

	};
}