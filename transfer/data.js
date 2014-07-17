console.log("hei lcs");
this.onmessage = function(data){
	console.log(data);
}

chrome.runtime.onMessage.addListener(function( request, sender, sendResponse ){
    sendResponse({
        from:   'hay, it\'s me from background.js'
    });
});
