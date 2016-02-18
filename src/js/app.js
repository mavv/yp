(function () {
	'use strict';
	// require('angular-route');
	// require('angular-material');
	angular
		.module('yp', [
			require('angular-animate'),
			require('angular-aria'),
			require('angular-route'),
			require('angular-material')
		])
		.config([
			'$routeProvider',
			'$mdThemingProvider',
			function conf($routeProvider, $mdThemingProvider) {

				var routeConfig = {
					controller: 'YpController as yp',
					templateUrl: 'index.html',
					redirectTo: '/',
					resolve: {
						store: function (StorageService) {
							StorageService.fetchItems();
							// console.log('resolver for ctrl route / ', StorageService);
							// console.log(StorageService);
							return StorageService;
						}
					}
				};

				// console.log($routeProvider, $mdThemingProvider);
				$routeProvider.when('/', routeConfig)
				.otherwise({
					redirectTo: '/'
				});

				// console.log($routeProvider, routeConfig);
				// $mdThemingProvider.theme('default');
				// .dark();
		}])
		.run(['$templateCache', function ($templateCache) {
			// $templateCache.put('player.html', '<md-card>mavu</md-card>')
			// $templateCache.put('player.html');
			console.log('from run@bootstrap');
		}]);

		require('./controllers/yp.controller.js');
		require('./services/storage.service.js');
		require('./templates.js');
})(require('angular'));
