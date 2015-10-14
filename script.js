var showHeaderMessage = true;
var headerMessageText = "Site is currently under construction. Expect constant changes to style, structure, and content.";
var atRealUrl = !document.URL.search("http://tomgenco.com/");
var smallScreen = false, forceDesktop = false;

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

		if (smallScreen)
			$(this).off("click.toggleNav");

		// Change active to selected page
		$(".active").removeAttr("class");
		$(this).attr("class", "active");

		// Replace Content
		$("title").text($(this).text() + " - tomgenco.com");
		$("#content").load(href + " #content > *", undefined, function () {
			greetingSetup();
		});
		history.pushState(1, "test",
			"http://tomgenco.com/" + (href == "index.html" ? "" : href.substring(0, href.search(".html"))));

		if (smallScreen) {
			// This link doesn't control the navbar anymore
			$(this).off("click.toggleNav");

			// This one does
			$("nav a.active").on("click.toggleNav", toggleNav);

			// Close the navbar after navigation
			$("nav a.active").attr("style", "border-radius:3px");
			$("nav a")
				.not("[class='active']")
				.parent()
				.slideUp(125);

			// Put the triangle on the new active
			$("nav span").remove();
			$("nav a.active").html($("nav a.active").html() + "<span style=\"float:right;padding-right:5px;\">▼</span>");
		}

		// Update footer Rawgit link
		footerRawgitLinkSetup();
	});
}

function greetingSetup() {
	if ($("#greeting").length) {
		var greetings = ["Good morning", "Good afternoon", "Good evening", "Greetings", "Aloha", "Hi there", "Hey there", "Hey you", "Hello"];

		$("#greeting").text(greetings[Math.floor(Math.random() * greetings.length)]);
	}
}

function navSmallscreenStyleSetup() {
	// Initially hide non-active nav items
	$("nav a").not("[class='active']")
						.parent()
						.attr("style", "display:none");

	// Give active nav link rounded edges
	$("nav a.active").attr("style","border-radius:3px");

	// Add a triangle icon
	$("nav a.active").html($("nav a.active").html() + "<span style=\"float:right;padding-right:5px;\">▼</span>");

	// Clicking the active nav items toggles the rest
	$("nav a.active").on("click.toggleNav", toggleNav);

}

function toggleNav(event) {
	event.preventDefault();

	// Fix the rounded edges and triangle
	if ($("nav a:hidden").length) {
		$("nav a.active").removeAttr("style");
		$("nav span").text("▲");
	} else {
		$("nav a.active").attr("style", "border-radius:3px");
		$("nav span").text("▼");
	}

	$("nav a")
		.not("[class='active']")
		.parent()
		.slideToggle(125);
}

function navRevertToNormalStyle() {
	$("nav li, nav a").removeAttr("style");
	$("nav a").off("click");
	$("nav span").remove();
	if (atRealUrl)
		navigationSetup();
}

function footerDesktopLinkSetup() {
	$("<li id=\"desktop\" ><a href=\"\">Desktop Version</a></li>")
		.insertAfter("footer li:last-of-type")
		.click(function (event) {
			event.preventDefault();
			forceDesktop = true;
			smallScreen = false;
			navRevertToNormalStyle();
			footerRemoveDesktopLink();
			$("link[href='style.css']").removeAttr("media");
			$("link[href='style_smallscreen.css']").remove();
		});
}

function footerRemoveDesktopLink() {
	$("#desktop").remove();
}

window.onresize = updateScreenSize;

function updateScreenSize() {
	if ((window.innerWidth < 700 && !forceDesktop) && !smallScreen) {
		smallScreen = true;
		navSmallscreenStyleSetup();
		footerDesktopLinkSetup();
	}
	else if ((window.innerWidth >= 700 || forceDesktop) && smallScreen) {
		smallScreen = false;
		navRevertToNormalStyle();
		footerRemoveDesktopLink();

	}
}

$("document").ready(function() {
	updateScreenSize();
	headerMessageSetup();
	greetingSetup();
	if (atRealUrl) {
		footerRawgitLinkSetup();
		navigationSetup();
	}
});
