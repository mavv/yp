(function () {
	'use strict';

	angular.module('yp')
	.controller('YpController', [
		// 'ngMaterial',
		// 'ngMessages',
		// require('angular-material'),
		function ($scope, store) {
			// $scope.expand = false;
			$scope.imagePath = 'washedout.png';
			// $scope.toggle()
			console.log('scope ', scope);
			console.log(store);
			// // var list = store.items;
			$scope.list = [
				{
					link: 'https://www.youtube.com/watch?v=Y6qNjFQArsA'
					'description'
				},
				{
					link: 'https://www.youtube.com/watch?v=vB2Hy-pJ2TM',
					description: 'esperanza spalding concert'
				}
			]
			// this.list = store.items;
			// // console.log($scope, vid);
			// store.saveItem(vid);
		}]);
})();


// module.exports = 'YpController';
