(function () {
	'use strict';

	angular.module('yp')
		.factory('StorageService', function ($window, $q) {

			var master = 'vid036';
			

			var lister = {
				items: [],
				getFromLocal: function () {
					console.log('c gfl');
					return JSON.parse($window.localStorage.getItem(master || []));
				},
				saveToLocal: function () {
					console.log('c stl');
					$window.localStorage.setItem(master, JSON.stringify(lister.items));
				},
				purgeLocal: function () {
					var deferred = $q.defer();

					localStorage.clear();
					deferred.resolve(lister);

					return deferred.promise;
				},
				saveItem: function (item) {
					var deferred = $q.defer();

					lister.items.push(item);
					lister.saveToLocal(lister.items);
					deferred.resolve(lister.items);

					return deferred.promise;
				},
				updateItem: function (item, index) {
					var deferred = $.defer();

					lister.items[lister.items.indexOf(item)] = item;
					lister.saveToLocal(lister.items);
					deferred.resolve(lister.items);

					return deferred.promise;
				},
				removeItem: function (item) {
					var deferred = $q.defer();

					lister.items.splice(lister.items.indexOf(item), 1);
					lister.saveToLocal(lister.items);
					deferred.resolve(lister.items);

					return deferred.promise;
				},
				fetchItems: function () {
					var deferred = $q.defer();

					angular.copy(store.getFromLocal(),  lister.items);
					deferred.resolve(lister.items);

					return deferred.promise;
				},



			};

			return lister;

		});

}());
