(function () {
	'use strict';

	angular.module('root')
		.directive('addToList', [
			function () {
				return {
					restrict: 'A',
          link: function (scope, attrs, elem, ctrl) {
            console.log('addToList active ', scope, attrs, elem, ctrl);
          }
          // scope: true,
          // bindToController: 'yp',
          // controller: function () {
          //   var vm = this;
          //   vm.addItem = function (evt) {
          //     console.log('clicked ---------');
          //   }
          // },
          // controller: function ($scope, $element) {
          //   // $element.$on('click', function () {
          //   //   console.log('0qwpqwpweiqwpoiepoqwieopqwipeoiqwpoiepoqiwopeiqwopeiopwq');
          //   // });
          //   $scope.addItem = function () {
          //     console.log('ffffs');
          //   };
          // }
				};
		}]);
})();
