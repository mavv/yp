(function () {
	'use strict';

	angular.module('root')
	.controller('YpController', [
		'$scope',
		'store',
		'grabber',
		'$timeout',
		'$filter',
		function ($scope, store, grabber, $timeout, $filter) {

			var viewModel = this;
			viewModel.readyForm = false;
			viewModel.searchingReady = true;
			// viewModel.

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

			viewModel.filterList = function (query) {

				viewModel.list = $filter('filter')(viewModel.list, query);
			}

			viewModel.addFormToggle = function (evt) {
				if (viewModel.readyForm === false) {
					viewModel.readyForm = true;
				} else if (viewModel.readyForm === true) {
					viewModel.readyForm = false;
					viewModel.formLink = '';
					viewModel.formLinkDescription = '';
				}
				// console.log('toggle called from ', evt.target);
				// console.log('readyForm? ', viewModel.readyForm);
			}

			viewModel.searchingToggle = function () {
				// TODO: clear search input

				if (viewModel.searchingReady === false) {
					viewModel.searchingReady = true;
				} else if (viewModel.searchingReady === true) {
					viewModel.searchingReady = false;
				}
			};

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
