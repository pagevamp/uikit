/*
	On/Off Switch
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
		
		
		/*
			
			- Internal $scope.value remains a boolean at all time
			- ngModelController keeps its type: Bool or int
			
		*/
		
		//console.log("ngModelController", ngModelController.$viewValue, attrs.type);
		
		ngModelController.$render = function() {
			//console.log("$render", ngModelController.$viewValue, attrs.type);
			if (attrs.type=='binary') {
				$scope.value = parseInt(ngModelController.$viewValue)==1;
			} else {
				$scope.value = ngModelController.$viewValue || ngModelController.$viewValue === 'true';
			}
			console.log("$scope.value",$scope.value, element);
		};
		
		
		$scope.switch = function() {
			// No action/change for read-only
			if ($scope.readOnly) {
				return true;
			}
			$scope.safeApply(function() {
				// Update the internal value
				$scope.value = !$scope.value;
				
				// Setup the return format
				if (attrs.type=='binary') {
					ngModelController.$setViewValue($scope.value?1:0);
				} else {
					ngModelController.$setViewValue($scope.value?true:false);
				}
				
				// Execute the callback
				$scope.$parent.$eval(attrs.onChange);
			});
		}
		
		
		/*
		
		// Setup the initial value
	
		
		console.log("$scope.value",$scope.value);
		
		*/
		/*
		ngModelController.$render = function() {
			$scope.safeApply(function() {
				if (attrs.type=='binary') {
					$scope.value = ngModelController.$viewValue || 0;
				} else {
					$scope.value = ngModelController.$viewValue || false;
				}
			});
		};
		
		$scope.$watch("value", function(a,b) {
			console.log("$watch",$scope.value);
			if ($scope.value===true) {
				ngModelController.$setViewValue($scope.value);
			}
		});
		
		$scope.switch = function() {
			if ($scope.readOnly) {
				return true;
			}
			$scope.safeApply(function() {
				if (attrs.type=='binary') {
					if ($scope.value) {
						$scope.value = 1;
					} else {
						$scope.value = 0;
					}
				} else {
					$scope.value = !$scope.value;
				}
				$scope.$parent.$eval(attrs.onChange);
			});
		}*/
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