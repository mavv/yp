(function () {
  'use strict';

  angular.module('root')
    .factory('YoutubeService', function ($window, $q, $http, $log, $rootScope) {
      var grabber = $rootScope.$new(true);
      var deferred = $q.defer();

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

        grabber.setVideoUid = function (uid) {
          grabber.videoUid = uid;
        }

        grabber.onPlayerReady = function (event) {
          // $log.log('@onPlayerReady');
          event.target.playVideo();
        };

        grabber.onStateChange = function (event) {
          // $log.log('@onStateChange');
          if (event.data == $window.YT.PlayerState.PLAYING && !done) {
            $timeout(grabber.stopVideo, 2000);
            grabber.done = true;
          }
        };

        grabber.stopVideo = function () {
          $window.player.stopVideo();
        }

        grabber.createPlayer = function () {
          console.log('before returning new player');
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
      deferred.resolve(grabber);
      return deferred.promise;
      // return grabber;
    });
})();
