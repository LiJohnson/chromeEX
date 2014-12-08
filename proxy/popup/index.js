/**
 * localStorage
 * @param  storage could be window.sessionStorage/window.localStorage
 * @param  String key     
 */
var Storage = function( key , storage  ){
	storage = storage || window.localStorage || {};
	var data = JSON.parse(storage[key]||"{}") || {};

	/**
	 * get a value
	 */
	this.get = function(key){
		return data[key];
	};

	/**
	 * set a value
	 */
	this.set = function( k , v){
		if( arguments.length == 1 ){
			data = k;
		}else{
			data[k] = v;	
		}
		storage[key] = JSON.stringify(data);
	};

	/**
	 * delete a key
	 */
	this.delete = function(k){
		delete data[k];
		storage[key] = JSON.stringify(data);
	};

	/**
	 * destory this storage
	 */
	this.destory = function(){
		if( storage.removeItem ){
			storage.removeItem(key);
		}else{
			storage[key] = null;
		}
	};
};

$(gg=function(){
	var p = new MyProxy();
	var googleMap = "https://www.google.com.hk/maps/place/"
	var path = [];

	p.getIpInfo(function(data){
		setData($(".from"),data);
		$(".loading").addClass('hide');
	});

	$("a").click(function() {
		if(this.href && this.href.match(/^http/i)){
			chrome.tabs.create({url:this.href,selected:false});
		}
	});

	chrome.extension.sendMessage({getIp: true},function(ip){
		ip && p.getIpInfo(ip,function(data){
			setData($(".to"),data);
		});
	});

	var setData = function($html,data){
		//data = data || {country:""}
		var map = googleMap + data.loc;
		$html.find(".ip").html(data.ip);
		$html.find(".city").html([data.city,data.region,data.country].join(" . "));
		$html.find(".flag").addClass("flag-icon flag-icon-"+data.country.toLowerCase());
		$html.find(".map").removeClass('hide').prop("href" ,  map );
		//$html.find("iframe").prop('src', map);
		
		updatePath(data.loc);
		
	};
	var updatePath = function(loc){
		if( path.indexOf(loc) == -1 ){
			path.push(loc);
		}
		
		$(".path a").prop('href', googleMap.replace('place','dir')+path.join('/	'));
	};

	(function($html){
		var stor = new Storage("proxy");
		var myProxy = new MyProxy();
		
		var updateProxy = function(){
			if( stor.get("proxy") ){
				var host = stor.get("proxy-host").split(":");
				myProxy.set(host[0],host[1]*1);
			}else{
				myProxy.direct();
			}
		};

		$html.find('input[name=proxy]').prop("checked",stor.get("proxy"));
		$html.find('input[name=proxy-host]').val(stor.get("proxy-host"));

		$html.on("change","input",function(){
			var val = this.value ;
			if(this.type == 'checkbox'){
				val = this.checked;
			}
			stor.set(this.name,val);
			updateProxy();	
		});

		$html.find(".btn").click(function(event) {
			updateProxy();
		});

		updateProxy();

	})($(".proxy"));
});