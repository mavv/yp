(function () {
	'use strict';
	// require('angular-route');
	// require('angular-material');
	angular
		.module('root', [
			require('angular-animate'),
			require('angular-aria'),
			require('angular-route'),
			require('angular-material')
		])
		// .controller('MainController', MainController)
		.config([
			'$routeProvider',
			'$mdThemingProvider',
			function conf($routeProvider, $mdThemingProvider) {

				// console.log('from app config!!');
				$routeProvider.when('/',  {
					controller: 'YpController',
					controllerAs: 'yp',
					templateUrl: 'player.html',
					redirectTo: '/',
					resolve: {
						store: function (StorageService) {
							StorageService.fetchItems();
							// console.log('resolver for ctrl route / ', StorageService);
							console.log('yp resolve ', StorageService);
							return StorageService;
						}
					}
				})
				.otherwise({
					redirectTo: '/'
				});

				// console.log($routeProvider, routeConfig);
				// $mdThemingProvider.theme('default');
				// .dark();
		}])
		.run(['$rootScope', '$location', function ($rootScope, $location) {
			// console.log('from run@bootstrap ', $rootScope);
			// $rootScope.$on('$routeChangeStart', function (event, next, current) {
			// 	console.log($location);
			// 	console.log(event, next, current);
			// })
		}]);


		require('./controllers/yp.controller.js');
		require('./services/storage.service.js');
		require('./templates.js');
})(require('angular'));
