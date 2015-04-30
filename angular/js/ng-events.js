/*
	ng-enter and ng-escape
*/
ngModule.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});
ngModule.directive('ngEscape', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 27 || event.which === 0) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEscape);
				});
				event.preventDefault();
			}
		});
	};
});