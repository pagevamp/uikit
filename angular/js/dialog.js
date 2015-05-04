/*
	In-place editor
*/
ngModule.directive('uiDialog', ['$compile', function ($compile) {
	var component = function(scope, element, attrs, ctlr, transcludeFn) {
		var $scope;
		
		// Get an instance of the scope
		switch (attrs.ngScope) {
			case "parent":
				$scope = scope.$parent;
				console.log("parent",scope.$parent);
			break;
			default:
				$scope = scope.ngScope;
			break;
		}
		
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
		
		if (attrs.width) {
			scope.width = attrs.width;
		} else {
			scope.width = 500;
		}
		
		/*
		// Find the popup's ID
		scope.popupId = attrs.uiDialog;
		
		scope.close = function() {
			$scope.dialogs.hide(scope.popupId);
		}
		*/
		//$(element).html($compile($(element).html()));
		
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
		
		
		/*
		$scope.value = false;
		
		ngModelController.$render = function() {
			$scope.safeApply(function() {
				$scope.value = ngModelController.$viewValue || false;
			});
		};
		
		$scope.$watch("value", function(a,b) {
			ngModelController.$setViewValue(a);
		});
		
		*/
		
		
		/*
		// Monitor the display status fo the dialog
		$scope.$watch('dialogs.display.'+scope.popupId, function() {
			if ($scope.dialogs.display[scope.popupId]) {
				$(element).fadeIn();
			} else {
				$(element).fadeOut();
			}
		});
		*/
		/*
		// Monitor the popup width
		$scope.$watch('dialogs.data.'+popupId+'.width', function() {
			$scope.safeApply(function() {
				// I forgot where I was going with that...
			});
			//$scope.dialogs.set(popupId, '');
		});
		*/
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