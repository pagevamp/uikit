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
			$scope.$parent.$eval(attrs.onUpdate);
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