var headerMessage = document.getElementById('message');

headerMessage.set = function(message) {
	this.innerHTML = message;
};

headerMessage.get = function() {
	return this.innerHTML;
};

headerMessage.show = function() {
	this.removeAttribute('style');
};

headerMessage.hide = function() {
	this.setAttribute('style', 'display:none');
	document.cookie = "hideMessage=1";
};

headerMessage.onclick = function() {
	this.hide();
};

function getCookie(name) {
	var cookies = document.cookie.split(';');
	var pair;
	
	for (var i = 0; i < cookies.length; i++) {
		pair = cookies[i].trim().split('=');
		if (pair[0] == name)
			return pair[i];
	};

	return "";
}

window.onload = function() {
	var cookies = document.cookie.split(';');

	headerMessage.set("Site is currently under construction. Expect constant changes to style, structure, and content. Click to dismiss");
	
	if (!getCookie("hideMessage"))
		headerMessage.show();
}