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


	$("a").click(function() {
		if(this.href && this.href.match(/^http/i)){
			chrome.tabs.create({url:this.href,selected:false});
		}
	});

	$(".loading").dblclick(function() {
		$(this).addClass('hide');
	});

	chrome.extension.sendMessage({getIp: true},function(ip){
		ip && p.getIpInfo(ip,function(data){
			setData($(".to"),data);
		});
	});

	var updateIpInfo = function(){
		$(".loading").removeClass('hide');
		p.getIpInfo(function(data){
			setData($(".from"),data);
			$(".loading").addClass('hide');
		});
	}
	var setData = function($html,data){
		//data = data || {country:""}
		var map = googleMap + data.loc;
		$html.find(".ip").html(data.ip);
		$html.find(".city").html([data.city,data.region,data.country].join(" . "));
		$html.find(".flag").prop('class',"flag flag-icon flag-icon-"+data.country.toLowerCase());
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
	updateIpInfo();

	(function($html){
		var stor = new Storage("proxy");
		var myProxy = new MyProxy();
		
		var updateProxy = function(){
			var host = $html.find("input[name=host-item]:checked").val();
			if( host && stor.get("proxy") ){
				host = host.split(":");
				myProxy.set(host[0],host[1]*1||(void 0),updateIpInfo);
			}else{
				myProxy.direct(updateIpInfo);
				$html.find("input[name=host-item]").prop("checked",false);
			}
		};

		var hostList = function(list){
			var $list = $html.find(".list");
			$.each(list||[],function(index, el) {
				$list.append("<li >" + el +  "<span ><input type=radio name=host-item value='"+el+"' /><a class=close >&times;</a></span></li>");
			});
			saveHost();
		};

		var saveHost = function(){
			var host = [];
			$html.find('input[name=host-item]').each(function() {
				host.push(this.value);
			});
			stor.set('host',host);
		}

		$html.find('input[name=proxy]').prop("checked",stor.get("proxy"));

		$html.on("change","input[name=proxy]",function(){
			stor.set(this.name,this.checked);
			updateProxy();	
		});

		$html.on("change","textarea",function(){
			var host = this.value.trim().split(/\n|\s/);
			hostList(host);
			this.value = "";
		}).on("change","input[name=host-item]",function(){
			updateProxy();
		}).on("click",".close",function(){
			$(this).parents("li:eq(0)").remove();
			saveHost();
			updateProxy();
		});


		hostList(stor.get("host"));
		myProxy.get(function(data){
			console.log(data);
			$html.find("input[name=host-item]").each(function() {
				this.checked = !!this.value.match(data.host+":"+data.port);
			});
		});

	})($(".proxy"));
});
