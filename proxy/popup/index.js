$(function(){
	var p = new MyProxy();
	var googleMap = "https://www.google.com.hk/maps/place/"
	p.getIpInfo(function(data){
		var map = googleMap + data.loc;
		$(".ip").html(data.ip);
		$(".city").html([data.city,data.region,data.country].join(" . "));
		$(".flag").addClass("flag-icon flag-icon-"+data.country.toLowerCase());
		$(".map").removeClass('hide').prop("href" ,  map );
		$("iframe").prop('src', map);
		$(".loading").addClass('hide');
	});

	$(".map").click(function() {
		chrome.tabs.create({url:this.href,selected:false});
	});
});