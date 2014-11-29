$(function(){
	var p = new MyProxy();
	p.getIpInfo(function(data){
		$(".city").html([data.city,data.region,data.country].join(" . "));
		$(".flag").addClass("flag-icon flag-icon-"+data.country.toLowerCase());
	});
});