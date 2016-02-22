(function () {
	'use strict';

	angular.module('root')
		.directive('player', [
			'$timeout',
			'YoutubeService',
			function ($timeout, grabber) {
				return {
					restrict: 'E',
					templateUrl: 'player.html',
					scope: {
						item: '=ngModel',
						remove: '&'
					},
					link: function ($scope, $element, $attrs) {
						// console.log('at item ', $scope.item);
						// console.log('videoUid for this instance ', $scope.item.videoUid,  $scope.item.videoUid.length);
						$scope.itemId = $scope.item.$$hashKey.split(':')[1];
						$scope.initPlayer = function (evt) {
							// console.log('initializing player ', evt);
							$timeout(function  () {
								// console.log('in timeout at ', $scope.itemId);
								// console.log('and apiReady ', grabber.player ,grabber.apiReady);
								if (grabber.apiReady) {
									// console.log('mess with it already');
									grabber.bindPlayerToId('atPlay' + $scope.itemId);
									grabber.setPlayerWidth(400);
									grabber.setPlayerHeight(200);
									grabber.setVideoUid($scope.item.videoUid);
									grabber.createPlayer();
									// console.log('player ', grabber.player);
								}
							}, 1000);
						};


					}
				};
		}]);

		// require('../services/youtube.service.js');
})();
