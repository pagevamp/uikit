/*
	In-place editor
*/
ngModule.directive('uiDialog', ['$compile', function ($compile) {
	var component = function(scope, element, attrs, ctlr, transcludeFn) {
		// Get an instance of the scope
		var $scope = window.$scope; //@TODO: Wrong scope, need to adapt.
		// POssible solution: Define the scope manually as a '=' input to the dialog's own scope
		
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
		
		// See this structure?
		// Now look when I close the file and re-open it:
		if (attrs.width) {
			scope.width = attrs.width;
		} else {
			scope.width = 500;
		}
		
		
		// Find the popup's ID
		scope.popupId = attrs.uiDialog;
		
		scope.close = function() {
			$scope.dialogs.hide(scope.popupId);
		}
		
		//$(element).html($compile($(element).html()));
		
		// Get the original content of the element
		var originalContent = transcludeFn();
		
		// Clone the content
		var cloned = angular.element('<div/>').append(originalContent);
		
		// Compile the html and inject into the element (replacing the original non-compiled content)
		$(element).find('.dialog-content-placeholder').html($compile(cloned.html())($scope));
		
		// Monitor the display status fo the dialog
		$scope.$watch('dialogs.display.'+scope.popupId, function() {
			if ($scope.dialogs.display[scope.popupId]) {
				$(element).fadeIn();
			} else {
				$(element).fadeOut();
			}
		});
		
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
		scope:			{},
		templateUrl:	viewPath+'/view/dialog/dialog.html'
	};
}]);