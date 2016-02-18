(function () {
	'use strict';

	angular.module('root')
		.directive('player', function () {
			return {
				restrict: 'E',
				templateUrl: 'player.html',
				controllerAs: 'player',
				controller: function () {},
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
