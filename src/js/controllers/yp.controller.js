(function () {
	'use strict';

	angular.module('root')
	.controller('YpController', [
		'$scope',
		'store',
		'grabber',
		'$timeout',
		function ($scope, store, grabber, $timeout) {

			var viewModel = this;
			viewModel.readyForm = false;
			// initial item fetch
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
		}]);
})();


// module.exports = 'YpController';
