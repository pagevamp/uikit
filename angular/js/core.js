// The module definition
var ngModule = angular.module('pagevamp-ui', ['ui.bootstrap']);

// The viewPath (@TODO: needs to be updated dynamically)
if (!window.viewPath) {
	window.viewPath = "http://localhost/git/uikit/angular";
}
