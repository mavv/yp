(function () {
	'use strict';

	angular.module('root')
		.directive('player', [
			'$timeout',
			'YoutubeService',
			function () {
				return {
					restrict: 'E',
					templateUrl: 'player.html',
					scope: {
						removeFromList: '=',
						item: '='
					},
					link: function ($scope, $element, $attrs) {
						
						// console.log(ngModel);
						// console.log('player link phase ', $scope, $element, $attrs);
						// console.log('!!!! dire');
						// console.log('from player $scope ', $scope);
						// console.log(YpController);
						// $attrs.link = vid.link;
						// $attrs.description = vid.description;
					}
				};
		}]);
})();
