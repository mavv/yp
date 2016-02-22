(function () {
	'use strict';

	angular.module('root')
		.directive('player', [
			'$timeout',
			function ($timeout) {
				return {
					restrict: 'E',
					templateUrl: 'player.html',
					scope: {
						item: '=ngModel',
						remove: '&'
					},
					link: function ($scope, $element, $attrs) {

						$scope.itemId = $scope.item.$$hashKey.split(':')[1];
						// $timeout(function  () {
						// 	console.log('in timeout at ', $scope.itemId);
						// 	console.log('and apiReady ', grabber.apiReady);
						// 	if (grabber.apiReady) {
						// 		console.log('mess with it already');
						// 		grabber.bindPlayerToId('atPlay' + $scope.itemId);
						// 		grabber.setPlayerWidth(400);
						// 		grabber.setPlayerHeight(200);
						// 		grabber.setVideoUid($scope.item.videoUid);
						// 		grabber.createPlayer();
						//
						// 	}
						// }, 1000);

						// console.log('player link phase ', $scope, $element, $attrs);
						// console.log('!!!! dire');
						// console.log('from player $scope ', $scope);
						// console.log(YpController);
						// $attrs.link = vid.link;
						// $attrs.description = vid.description;
					}
				};
		}]);

		require('../services/youtube.service.js');
})();
