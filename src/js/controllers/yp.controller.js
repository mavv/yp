(function () {
	'use strict';

	angular.module('root')
	.controller('YpController', [
		'store',
		'grabber',
		function (store, grabber) {
			// console.log(grabber.apiReady);
			if (grabber.apiReady === true) {
				console.log('ready to mess with');
			}

			// console.log('store in yp ', store, grabber);
			// console.log(store.fetchItems());
			var viewModel = this;

			var list = [
				{
					link: 'https://www.youtube.com/watch?v=Y6qNjFQArsA',
					description:'guru jazzmatazz 4'
				},
				{
					link: 'https://www.youtube.com/watch?v=vB2Hy-pJ2TM',
					description: 'esperanza spalding concert'
				}
			];
			viewModel.list = list;
			// console.log(viewModel);
			// $scope.expand = false;
			// $scope.imagePath = 'washedout.png';
			// store.saveItem(vid);
		}]);
})();


// module.exports = 'YpController';
