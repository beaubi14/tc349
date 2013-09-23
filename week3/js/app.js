function hello(){
	alert("Hello, World!");
	var whatBrowser, checkUser = navigator.userAgent;

	if(checkUser.indexOf("Chrome") > -1) {
	    whatBrowser = "Google Chrome";
	} else if (checkUser.indexOf("Safari") > -1) {
	    whatBrowser = "Apple Safari";
	} else if (checkUser.indexOf("Opera") > -1) {
	    whatBrowser = "Opera";
	} else if (checkUser.indexOf("Firefox") > -1) {
	    whatBrowser = "Mozilla Firefox";
	} else if (checkUser.indexOf("MSIE") > -1) {
	    whatBrowser = "Microsoft Internet Explorer";
	}

	alert("Welcome, " + whatBrowser + " User!");
}