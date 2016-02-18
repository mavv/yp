(function () {
  'use strict';

  angular.module('root')
    .factory('YoutubeService', function ($window, $q, $http, $log, $rootScope) {
      var grabber = $rootScope.$new(true);
      // var grabber = {
      //   ase: 'tata'
      // };
      grabber.done = false;

      $window.onYouTubeIframeAPIReady = function () {
        grabber.apiReady = true;
        $log.log('service // youtube api is ready ', grabber.apiReady);

        grabber.bindPlayerToId = function (id) {
          grabber.playerId = id;
        };

        grabber.setPlayerHeight = function (height) {
          grabber.height = height;
        };

        grabber.setPlayerWidth = function (width) {
          grabber.width = width;
        };

        grabber.onPlayerReady = function (event) {
          event.target.playVideo();
        };

        grabber.onStateChange = function (event) {
          if (event.data == $window.YT.PlayerState.PLAYING && !done) {
            $timeout(grabber.stopVideo, 2000);
            grabber.done = true;
          }
        };

        // grabber.stopVideo = function () {
        //   $window.player.stopVideo();
        // }

        grabber.createPlayer = function () {
          return new $window.YT.Player(grabber.playerId, {
            height: grabber.height,
            width: grabber.width,
            videoUid: grabber.videoUid,
            events: {
              'onReady': grabber.onPlayerReady,
              'onStateChange': grabber.onStateChange
            }
          });
        };
      };

      return grabber;
    });
})();
