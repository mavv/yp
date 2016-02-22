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
			// $timeout(function  () {
			// 	if (grabber.apiReady) {
			// 		console.log('mess with it already');
			// 		grabber.bindPlayerToId('atPlay');
			// 		grabber.setPlayerWidth(400);
			// 		grabber.setPlayerHeight(200);
			// 		grabber.setVideoUid('Y6qNjFQArsA');
			// 		grabber.createPlayer();
			//
			// 	}
			// }, 2000);

			var viewModel = this;

			var list = [
				{
					videoUid: 'Y6qNjFQArsA',
					description:'guru jazzmatazz 4',
				},
				{
					videoUid: 'vB2Hy-pJ2TM',
					description: 'esperanza spalding concert',
				}
			];

			viewModel.readyForm = false;
			store.fetchItems()
				.then(function (response) {
					console.log(response);
					viewModel.list = response;
				}, function (reason) {
					console.log('something happened ', reason);
				})
				.catch(function (error) {
					console.log('wtf?? ', error);
				});
			// viewModel.refreshList();
			// viewModel.formLink = '';
			// viewModel.formLinkDescription = '';

			viewModel.refreshList = function () {
				store.fetchItems()
					.then(function (response) {
						// console.log(response);
						viewModel.list = response;
					}, function (reason) {
						console.log('something happened ', reason);
					});
			};

			viewModel.addFormToggle = function (evt) {
				if (viewModel.readyForm === false) {
					viewModel.readyForm = true;
				} else if (viewModel.readyForm === true) {
					viewModel.readyForm = false;
				}
				// console.log('toggle called from ', evt.target);
				// console.log('readyForm? ', viewModel.readyForm);
			}

			viewModel.submitToList = function ($event) {
				var toSave = {
					videoUid: viewModel.formLink.split('=')[1],
					description: viewModel.formLinkDescription
				};
				store.saveItem(toSave)
					.then(function (response) {
						console.log('saved successfully ', response);
					}, function (reason) {
						console.log('NOT saved ', reason);
					});
				console.log('item to be saved ', toSave);
				viewModel.addFormToggle();
				viewModel.refreshList();
			};

			viewModel.removeFromList = function (item) {
				store.removeItem(item)
					.then(function (response) {
						console.log('removed successfully ', item);
					});
			}
			// console.log(viewModel);
			// $scope.expand = false;
			// $scope.imagePath = 'washedout.png';
			// store.saveItem(vid);
		}]);
})();


// module.exports = 'YpController';
