// The module definition
var ngModule = angular.module('pagevamp-ui', ['ui.bootstrap']);

// The viewPath (@TODO: needs to be updated dynamically)
var viewPath = "http://127.0.0.1/git/uikit/angular";ngModule.filter('capitalize', function() {
	return function(input, all) {
		return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
	}
});

ngModule.filter('filtered', function() {
	return function(items, property, query, order) {
		if (query && query != '' && query.length>1) {
			var regex = new RegExp(query, 'gmi');
			var filtered = _.filter(items, function(item) {
				return item.hasOwnProperty(property) && regex.test(item[property]);
			});
			
			if (order) {
				filtered = filtered.sort(function(a, b) {
					return b[order] - a[order];
				});
			}
			
			return filtered;
		}
		return items;
	};
});/*
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
});/*
	In-place editor
*/
ngModule.directive('inPlace', function ($timeout) {
	var component = function($scope, element, attrs, ngModelController) {
		
		$scope.safeApply = function(fn) {
			var phase = this.$root.$$phase;
			if(phase == '$apply' || phase == '$digest') {
				if(fn && (typeof(fn) === 'function')) {
					fn();
				}
			} else {
				this.$apply(fn);
			}
		};
		
		$scope.value = "";
		$scope.editMode = false;
		
		ngModelController.$render = function() {
			$scope.safeApply(function() {
				$scope.value = ngModelController.$viewValue;
			});
		};
		
		$scope.$watch("value", function(a,b) {
			ngModelController.$setViewValue(a);
		});
		
		$scope.edit = function() {
			$scope.safeApply(function() {
				$scope.editMode = true;
				$scope.backup = $scope.value+'';
			});
		}
		
		$scope.cancel = function() {
			$scope.safeApply(function() {
				$scope.editMode = false;
				$scope.value = $scope.backup;
			});
		}
		
		$scope.save = function() {
			$scope.safeApply(function() {
				$scope.editMode = false;
			});
			if (attrs.onUpdate) {
				$scope.$parent.$eval(attrs.onUpdate);
			}
		}
	}
	return {
		link: 			component,
		replace:		true,
		require:		"ngModel",
		scope:			{
			placeholder:	'@',
			format:			'@',
			currency:		'='
		},
		templateUrl:	viewPath+'/view/in-place/in-place.html'
	};
});/*
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
}]);/*
	In-place editor
*/
ngModule.directive('onOffSwitch', function ($timeout) {
	var component = function($scope, element, attrs, ngModelController) {
		
		$scope.safeApply = function(fn) {
			var phase = this.$root.$$phase;
			if(phase == '$apply' || phase == '$digest') {
				if(fn && (typeof(fn) === 'function')) {
					fn();
				}
			} else {
				this.$apply(fn);
			}
		};
		
		//console.log("passive",$scope.passive);
		
		
		
		/*
		$scope.$watch(function () {
			//return ngModelController.$modelValue;
			console.log("a",ngModelController.$modelValue);
		}, function(newValue) {
			console.log("b",ngModelController.$modelValue);
		});
		*/
		
		$scope.value = false;
		
		ngModelController.$render = function() {
			$scope.safeApply(function() {
				$scope.value = ngModelController.$viewValue || false;
			});
		};
		
		$scope.$watch("value", function(a,b) {
			ngModelController.$setViewValue(a);
		});
		
		$scope.switch = function() {
			if ($scope.passive) {
				return true;
			}
			$scope.safeApply(function() {
				$scope.value = !$scope.value;
				if ($scope.value===true) {
					$scope.$parent.$eval(attrs.whenOn);
				} else {
					$scope.$parent.$eval(attrs.whenOff);
				}
			});
		}
	}
	return {
		link: 			component,
		replace:		true,
		require:		"ngModel",
		scope:			{
			passive:	'='
		},
		templateUrl:	viewPath+'/view/on-off-switch/on-off-switch.html'
	};
});