var showHeaderMessage = true;
var headerMessageText = "Site is currently under construction. " +
	"Expect constant changes to style, structure, and content.";

// If `showHeaderMessage` at the top is set to true, and the session storage
// doesn't have a `headerDismissed` key, then a header will be shown that contains
// content from `headerMessageText`
function headerMessageSetup() {
	if (showHeaderMessage && !sessionStorage.getItem("headerDismissed")) {
		$("#message").text(headerMessageText + " Click to dismiss.");
		$("header").removeAttr("style");
	};

	$("#message").on("click", function() {
		$("header").slideUp(200);
		sessionStorage.setItem("headerDismissed", "yup");
	});
}

// If the url starts with "http://tomgenco.com/", a link to the current page in
// the most recent commit in dev will appear
function footerRawgitLinkSetup() {
	var rawgit = $("#rawgit"),
		documentUrl = document.URL,
		urlStart = "https://rawgit.com/TomGenco/tomgenco.github.io/dev/",
		baseUrl = "http://tomgenco.com/";

	// If `documentUrl` doesn't start with `baseUrl`
	if (!documentUrl.search(baseUrl))
		return;

	rawgit.removeAttr("style");

	if (documentUrl == baseUrl)
		rawgit.attr("href", urlStart + "index.html");
	else {
		// Trim any trailing ".html"'s
		if (documentUrl.substr(-5) == ".html")
			rawgit.attr("href", urlStart + documentUrl.slice(baseUrl.length));
		else
			rawgit.attr("href", urlStart + documentUrl.slice(baseUrl.length) + ".html");
	}
}

function navigationSetup() {
	$("nav a").on("click", function(event) {
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
		$("main").load(href + " main > *");
		$("aside").load(href + " aside > *");
		history.pushState(1, "test",
			"http://tomgenco.com/" + (href == "index.html" ? "" : href.substring(0, href.search(".html"))));
	});
}

$("document").ready(function() {
	headerMessageSetup();
	if (!document.URL.search("http://tomgenco.com/")) {
		footerRawgitLinkSetup();
		navigationSetup();
	}
});
