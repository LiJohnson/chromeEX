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

	this.setd = this.set = function(host , port , cb){
		config.rules.singleProxy.host = host;
		config.rules.singleProxy.port = port;

		chrome.proxy.settings.set({
				value: config,
				scope: 'regular'
			},
			function(e) {
				console.log("proxy setted", e);
				cb && cb.call(this,e);
			}
		);
	};

	this.direct = function(cb){
		chrome.proxy.settings.set({
				value: {mode:'direct'}
			},
			function(e) {
				console.log("never use proxy ", e);
				cb && cb.call(this,e);

			}
		);
	};

	this.getIpInfo = function(ip,cb){
		if( typeof ip == 'function' )cb=ip , ip='';

		ip && (ip = "/"+ip); 
		$.get("http://ipinfo.io"+ ip + "/json" , cb, "json" );

	};
}