"use strict";

var showHeaderMessage = true;
var headerMessageText = "Site is currently under construction. " + 
	"Expect constant changes to style, structure, and content.";

function headerMessageSetup() {
	var message = $("#message");

	if (showHeaderMessage && sessionStorage.getItem("headerDismissed") != "true") {
		message.text(headerMessageText + " Click to dismiss.");
		message.removeAttr("style");
	};

	message.on("click", function() {
		message.slideUp(200);
		sessionStorage.setItem("headerDismissed", "true");
	});
}

function footerRawgitLinkSetup() {
	var rawgit = $("#rawgit"),
		urlStart = "https://rawgit.com/TomGenco/tomgenco.github.io/dev/",
		baseUrl = "http://tomgenco.com/";

	if (document.URL.search(baseUrl) != 0)
		return;
	else {
		rawgit.removeAttr("style");
		if (document.URL == baseUrl)
			rawgit.attr("href", urlStart + "index.html");
		else
			rawgit.attr("href", urlStart + document.URL.slice(baseUrl.length) + ".html");
	}
}

$("document").ready(function() {
	headerMessageSetup();
	footerRawgitLinkSetup();
});