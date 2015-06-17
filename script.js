var showHeaderMessage = true;
var headerMessageText = "Site is currently under construction. Expect constant changes to style, structure, and content. Click to dismiss";

// ----- Header Message -----

var headerMessage = document.getElementById("message");

headerMessage.set = function(message) {
	this.innerHTML = message;
};

headerMessage.get = function() {
	return this.innerHTML;
};

headerMessage.show = function() {
	this.removeAttribute("style");
};

headerMessage.hide = function() {
	this.setAttribute("style", "display:none");
	document.cookie = "hideMessage=1";
};

headerMessage.onclick = function() {
	this.hide();
};

function getCookie(name) {
	var cookies = document.cookie.split(";");
	var pair;
	
	for (var i = 0; i < cookies.length; i++) {
		pair = cookies[i].trim().split("=");
		if (pair[0] == name)
			return pair[i];
	};

	return false;
}

// ----- Footer Rawgit link -----

var footerRawgitLink = document.getElementById("rawgit-link");

footerRawgitLink.setURL = function() {
	var urlStart = "https://rawgit.com/TomGenco/tomgenco.github.io/dev/";
	var currentBaseUrl = "http://tomgenco.com/";

	this.removeAttribute("style");

	if (document.URL == currentBaseUrl)
		this.setAttribute("href", urlStart + "index.html");
	else
		this.setAttribute("href", urlStart + document.URL.slice(currentBaseUrl.length));
}


window.onload = function() {
	var cookies = document.cookie.split(";");
	
	if (!getCookie("hideMessage") && showHeaderMessage) {
		headerMessage.set(headerMessageText);
		headerMessage.show();
	}

	if (document.URL.search("http://tomgenco.com/") == 0)
		footerRawgitLink.setURL();
}