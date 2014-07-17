

setInterval(function(){
$("img:not([haha=haha])").each(function(){
	$(this).data("image" , this.src).prop("haha","haha").prop("src","http://ubuntu.lcs.com/html/emojis/bofu/21.gif");
});	
},500);
