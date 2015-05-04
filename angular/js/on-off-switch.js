/*
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
		
		if (attrs.type=='binary') {
			$scope.value = 0;
		} else {
			$scope.value = false;
		}
		
		
		ngModelController.$render = function() {
			$scope.safeApply(function() {
				if (attrs.type=='binary') {
					$scope.value = ngModelController.$viewValue || false;
				} else {
					$scope.value = ngModelController.$viewValue || 0;
				}
			});
		};
		
		$scope.$watch("value", function(a,b) {
			ngModelController.$setViewValue(a);
		});
		
		$scope.switch = function() {
			if ($scope.readOnly) {
				return true;
			}
			$scope.safeApply(function() {
				if (attrs.type=='binary') {
					if ($scope.value===0) {
						$scope.value = 1;
					} else {
						$scope.value = 0;
					}
				} else {
					$scope.value = !$scope.value;
				}
				$scope.$parent.$eval(attrs.onChange);
			});
		}
	}
	return {
		link: 			component,
		replace:		true,
		require:		"ngModel",
		scope:			{
			readOnly:	'='
		},
		templateUrl:	viewPath+'/view/on-off-switch/on-off-switch.html'
	};
});