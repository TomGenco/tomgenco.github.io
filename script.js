var showHeaderMessage = true;
var headerMessageText = "Site is currently under construction. " + 
	"Expect constant changes to style, structure, and content.";

// If `showHeaderMessage` at the top is set to true, and the session storage
// key doesn't have a value "true", then a header will be shown that contains
// content from `headerMessageText
function headerMessageSetup() {
	var message = $("#message");

	if (showHeaderMessage && !sessionStorage.getItem("headerDismissed")) {
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
	$("nav a").on("click", function(event) {
		// No ajax for anything but real page
		if (document.URL.search("http://tomgenco.com") != 0)
			return;

		var href = $(this).attr("href");

		// Don't let the links actually function like links
		event.preventDefault();

		// Don't try to ajax the current page
		if ($(this).attr("class") == "active")
			return;

		// Change active to selected page
		$(".active").removeAttr("class");
		$(this).attr("class", "active");

		// Replace Content
		$("title").text($(this).text());
		$("#content").load(href + " #content > *");
		history.pushState(1, "test", 
			"http://tomgenco.com/" + (href == "index.html" ? "" : href.substring(0, href.search(".html"))));
	});
}

$("document").ready(function() {
	headerMessageSetup();
	footerRawgitLinkSetup();
	navigationSetup();
});