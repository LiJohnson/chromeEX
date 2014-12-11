$(function(){
	var TAB = "    ";
	var jsonToString = function(json,tab){
		tab = tab || "";
		if( !json || typeof json != 'object' || Array.isArray(json) ){
			return json;
		}

		var str = [];
		for( var k in json ){
			str.push( tab + TAB + k + " : " + jsonToString(json[k],tab+TAB));
		}

		return "{\n" + str.join(",\n") + "\n"+  tab + "}";
	};

	var proxy = new MyProxy();

	$("form").submit(function() {
		localStorage.bypassList = $("textarea").val().replace(/\s/g,'');
		proxy.setBypassList(localStorage.bypassList.split(/[;,]/),function(data){
			proxy.get(function(data){
				$("pre").html(jsonToString(data));
			});
		});
		return false;
	});
	$("textarea").val(localStorage.bypassList);
	proxy.get(function(data){
		$("pre").html(jsonToString(data));
	});
});
