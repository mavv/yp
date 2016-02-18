(function () {
	'use strict';

	angular.module('root')
		.directive('Player', function () {
			return {
				restrict: 'E',
				templateUrl: '../views/player.html',
				controllerAs: 'player',
				controller: '../controllers/yp.controller.js',
				link: function ($scope, $element, $attrs, YpController) {
					console.log('!!!! dire');
					console.log('from player $scope ', $scope);
					console.log(YpController);
					// $attrs.link = vid.link;
					// $attrs.description = vid.description;
				}
			};
		});
})();
