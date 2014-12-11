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
	var $this = this;

	this.set = function(host , port , cb){
		var opt = host;
		if( typeof host != 'object' ){
			opt = {
				host:host,
				port:port*1
			};
		}else{
			cb = port;
		}
		for( var name in opt ){
			config.rules.singleProxy[name] = opt[name];
		}
		config.rules.bypassList = (localStorage.bypassList||"").split(/[;,]/);
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

	this.get = function(cb){
		chrome.proxy.settings.get({},function(data){
			cb && cb.call(this,data.value);
		});
	};

	this.setBypassList = function(bypassList,cb){
		config.rules.bypassList = bypassList;
		this.get(function(data){
			if( data.mode == 'direct' ) return cb && cb.call(this,dara);
			$this.set(data.rules.singleProxy,cb);
		});
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