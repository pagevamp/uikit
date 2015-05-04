/*
	In-place editor
*/
ngModule.directive('uiDialog', ['$compile', function ($compile) {
	var component = function(scope, element, attrs, ctlr, transcludeFn) {
		
		scope.safeApply = function(fn) {
			var phase = this.$root.$$phase;
			if(phase == '$apply' || phase == '$digest') {
				if(fn && (typeof(fn) === 'function')) {
					fn();
				}
			} else {
				this.$apply(fn);
			}
		};
		
		// Get an instance of the scope
		var $scope;
		switch (attrs.ngScope) {
			case "parent":
				$scope = scope.$parent;
				console.log("parent",scope.$parent);
			break;
			default:
				$scope = scope.ngScope;
			break;
		}
		
		
		// Manage the size
		if (attrs.width) {
			scope.width = attrs.width;
		} else {
			scope.width = 500;
		}
		
		// transclude
		// Get the original content of the element
		var originalContent = transcludeFn();
		
		// Clone the content
		var cloned = angular.element('<div/>').append(originalContent);
		
		// Compile the html and inject into the element (replacing the original non-compiled content)
		$(element).find('.dialog-content-placeholder').html($compile(cloned.html())($scope));
		
		
		
		scope.$watch("visible", function(a,b) {
			if (scope.visible) {
				$(element).fadeIn();
			} else {
				$(element).fadeOut();
			}
		});
		
	}
	return {
		transclude:		true,
		link: 			component,
		replace:		false,
		//require:		"ngModel",
		scope:			{
			ngScope:	"=",
			visible:	'='
		},
		templateUrl:	viewPath+'/view/dialog/dialog.html'
	};
}]);