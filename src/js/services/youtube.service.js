(function () {
  'use strict';

  angular.module('root')
    .factory('YoutubeService', function ($window, $q, $http, $log, $rootScope) {
      var grabber = $rootScope.$new(true);
      // var deferred = $q.defer();

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
          // if (event.data == $window.YT.PlayerState.PLAYING && !done) {
          //   $timeout(grabber.stopVideo, 2000);
          //   grabber.done = true;
          // }
          var prefix = grabber.player;
          switch (event.data) {
            case prefix.ENDED:
              console.log('ended');
              break;
            case prefix.PLAYING:
              console.log('playing');
              break;
            case prefix.PAUSED:
              console.log('paused');
              break;
            case prefix.BUFFERING:
              console.log('buffering');
              break;
            case prefix.CUED:
              console.log('cued');
              break;
            default:
              console.log('unstarted');
              break;
          }
        };

        grabber.onApiChange = function (event) {
          $log.log('apiChange ', grabber.player.getOptions());
        };

        grabber.onError = function (event) {
          $log.log('error on this event ', event.data, event);
        };

        grabber.stopVideo = function () {
          $window.player.stopVideo();
        }

        grabber.createPlayer = function () {
          // console.log('before returning new player');
          if (grabber.player) {
            grabber.player.destroy();
          }
          grabber.player =  new $window.YT.Player(grabber.playerId, {
            height: grabber.height,
            width: grabber.width,
            videoId: grabber.videoUid,
            playerVars: {
              'controls': 0,
              'fs': 0,
              'iv_load_policy': 3,
              'showinfo': 0  ,
              'modestbranding': 1
            },
            events: {
              'onReady': grabber.onPlayerReady,
              'onStateChange': grabber.onStateChange,
              'onError': grabber.onError
            }
          });
        };
      };
      // deferred.resolve(grabber);
      // return deferred.promise;
      return grabber;
    });
})();
