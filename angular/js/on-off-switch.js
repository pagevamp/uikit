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