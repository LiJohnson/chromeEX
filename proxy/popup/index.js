$(gg=function(){
	var p = new MyProxy();
	var googleMap = "https://www.google.com.hk/maps/place/"
	p.getIpInfo(function(data){
		setData($(".from"),data);
		debugger
		$(".loading").addClass('hide');
	});

	$(".map").click(function() {
		chrome.tabs.create({url:this.href,selected:false});
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
		
	};
});