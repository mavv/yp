(function () {
	'use strict';

	angular
		.module('root', [
			require('angular-animate'),
			require('angular-aria'),
			require('angular-route'),
			require('angular-material')
		])
		.config([
			'$routeProvider',
			'$mdThemingProvider',
			conf])
		.run(['$rootScope', '$location', function ($rootScope, $location) {
			// console.log('from run@bootstrap ', $rootScope);
			// $rootScope.$on('$routeChangeStart', function (event, next, current) {
			// 	console.log($location);
			// 	console.log(event, next, current);
			//
		}]);

		function conf($routeProvider, $mdThemingProvider) {

			$routeProvider.when('/',  {
				controller: 'YpController',
				controllerAs: 'yp',
				templateUrl: 'app.html',
				redirectTo: '/',
				resolve: {
					store: function (StorageService) {
						StorageService.fetchItems();
						// console.log('resolver for ctrl route / ', StorageService);
						// console.log('yp resolve ', StorageService);
						return StorageService;
					},
					grabber: function (YoutubeService) {
						// console.log('ctrl resolve - youtube service', YoutubeService);
						return YoutubeService;
					}
				}
			})
			.otherwise({
			redirectTo: '/'
			});

			// console.log($routeProvider, routeConfig);
			$mdThemingProvider.theme('default');//.dark();
		}

		require('./controllers/yp.controller.js');
		require('./directives/player.directive.js');
		require('./services/storage.service.js');
		require('./services/youtube.service.js');
		require('./templates.js');
})(require('angular'));
