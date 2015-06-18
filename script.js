"use strict";

var showHeaderMessage = true;
var headerMessageText = "Site is currently under construction. " + 
	"Expect constant changes to style, structure, and content.";

// If `showHeaderMessage` at the top is set to true, and the session storage
// key doesn't have a value "true", then a header will be shown that contains
// content from `headerMessageText
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

// If the url starts with "http://tomgenco.com/", a link to a rendering of the
// current page in the most recent commit in dev will appear
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

function navigationSetup() {
	var navLinks = $("nav li");

	navLinks.on("click", function(event) {
		event.preventDefault();
		$("li.active").removeAttr("class");
		$(this).attr("class", "active");
		$("#content").remove();
		$("body").load($(this).children().attr("href") + ".html #content");
	});
}

$("document").ready(function() {
	headerMessageSetup();
	footerRawgitLinkSetup();
	navigationSetup();
});