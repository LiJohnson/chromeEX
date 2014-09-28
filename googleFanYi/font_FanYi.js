(function(document,chrome){
	document.addEventListener('selectionchange', function() {
		var selection =  window.getSelection().toString().trim()
		selection && chrome.extension.sendMessage({
			request: 'updateContextMenu',
			selection : selection
		});
	});

	document.addEventListener('message', function( e ) {
		console.log(e);
	});

})(document,chrome);