/*
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
		
		if (!$scope.currency && attrs.currency) {
			$scope.currency = attrs.currency;
		}
		
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
});