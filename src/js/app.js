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
		.config(($routeProvider, $mdThemingProvider) => {


			var routeConfig = {
				controllerAs: 'YpController',
				// templateUrl: 'todomvc-index.html',
				redirectTo: '/',
				resolve: {
					store: function (StorageService) {
						StorageService.fetchItems();
						console.log(StorageService);
						return StorageService;
					}
				}
			};

		$routeProvider
			.when('/', routeConfig)
			// .when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});

			// $mdThemingProvider.theme('default');

				// .dark();
		})
		.run(['$templateCache', function ($templateCache) {
			$templateCache.put('player.html', '<md-card>mavu</md-card>')
			console.log($templateCache);
			console.log($templateCache.get('player.html'));
		}]);

		// .config(($routeProvider) => {
		// 	console.log($routeProvider);
    // });

		require('./controllers/yp.controller.js');
		require('./services/storage.service.js');
})(require('angular'));
