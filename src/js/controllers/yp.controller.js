(function () {
	'use strict';

	angular.module('root')
	.controller('YpController', [
		'$scope',
		'store',
		'grabber',
		'$timeout',
		function ($scope, store, grabber, $timeout) {

			// console.log('yp ctrl // youtube 	', grabber);
			$timeout(function  () {
				if (grabber.apiReady) {
					console.log('mess with it already');
					grabber.bindPlayerToId('atPlay');
					grabber.setPlayerWidth(400);
					grabber.setPlayerHeight(200);
					grabber.setVideoUid('Y6qNjFQArsA');
					grabber.createPlayer();

				}
			}, 2000);

			// store.fetchItems()
			// 	.then(function (res) {
			// 		console.log(res);
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error);
			// 	})
			var viewModel = this;

			var list = [
				{
					videoUid: 'Y6qNjFQArsA',
					description:'guru jazzmatazz 4',
					keywords: 'jazz, rap, hip hop'
				},
				{
					videoUid: 'vB2Hy-pJ2TM',
					description: 'esperanza spalding concert',
					keywords: 'jazz, double bass'
				}
			];
			viewModel.list = list;

			viewModel.addItem = function (event) {
				store.saveItem({
					videoUid: 'Y6qNjFQArsA',
					description:'guru jazzmatazz 4',
					keywords: 'jazz, rap, hip hop'
				});
				store.fetchItems()
					.then(function (response) {
						console.log(response);
						viewModel.list = response;
					}, function (reason) {});
				console.log('new list ', viewModel.list);
			}
			// console.log(viewModel);
			// $scope.expand = false;
			// $scope.imagePath = 'washedout.png';
			// store.saveItem(vid);
		}]);
})();


// module.exports = 'YpController';
