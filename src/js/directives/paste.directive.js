(function () {
	'use strict';

	angular.module('root')
		.directive('PasteDirective', function () {
			return {
				restrict: 'A',
				// controllerAs: 'YpController',
				templateUrl: '../views/player.html',
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
