$(function(){
	var p = new MyProxy();
	var googleMap = "https://www.google.com.hk/maps/search/"
	p.getIpInfo(function(data){
		$(".city").html([data.city,data.region,data.country].join(" . "));
		$(".flag").addClass("flag-icon flag-icon-"+data.country.toLowerCase());
		$(".map").prop("href" ,  googleMap + data.loc );
	});

	$(".map").click(function() {
		chrome.tabs.create({url:this.href,selected:false});
	});
});