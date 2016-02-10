(function () {
	'use strict';

	angular.module('yp')
		.directive('PasteDirective', function () {
			return {
				restrict: 'A',
				// controllerAs: 'YpController',
				// templateUrl: '',
				link: function ($scope, $element, $attrs) {
					$scope.ytLink = 'asdasdasdas';

					console.log('from paste ', $element);
					$element.on('paste', function (e) {
						console.log('paste done');
						console.log(e);
					});
				}
			};
		});
})();
