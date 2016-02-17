(function () {
	'use strict';

	angular.module('yp')
		.directive('PlayerDirective', function () {
			return {
				restrict: 'E',
				templateUrl: '../views/player.html',
				controller: function () {
					console.log(this);
				},
				link: function ($scope, $element, $attrs, YpController) {
					console.log('from player $scope ', $scope);
					console.log(YpController);
					// $attrs.link = vid.link;
					// $attrs.description = vid.description;
				}
			};
		});
})();
