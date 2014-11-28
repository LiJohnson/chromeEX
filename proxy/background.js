var i = 0;
var p = new MyProxy();

chrome.browserAction.onClicked.addListener(function(e) {
	i++;
	if( i%2 ){
		p.set("rpi.lcs.com",3128);
	}else{
		p.direct();
	}

	chrome.cookies.getAll({},function(data){
		console.log(data);
	});
});