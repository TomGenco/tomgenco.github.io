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
};

headerMessage.onclick = function() {
	this.hide();
};

window.onload = function() {
	headerMessage.set("Site is currently under construction. Expect constant changes to style, structure, and content. Click to dismiss");
	headerMessage.show();
}