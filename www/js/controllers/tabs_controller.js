angular.module('starter.controllers', [])

.controller('TabsCtrl', function($rootScope, $scope, $location, $interval, $ionicPlatform, $cordovaPush, $cordovaDialogs, $cordovaMedia, $state, $cordovaBadge, Api, Notification) {
  if (Api.userToken() && !Api.initialSignUp) {
    Api.numUnreadNotifications()
    $interval(Api.numUnreadNotifications, 1000 * 60 * 5) // Check for num of unread notifications every 5 minutes
  }

  $ionicPlatform.ready(function() {
    // Can only register after the platform is ready
    if (Api.userToken()) {
      Api.registerWithPushService()
    }
  })

  $scope.$on('numUnreadNotificationsFetched', function(event, args) {
    updateTabNumBadge()
    updateIconBadge()
  });

  $scope.$on('notificationMarkedAsRead', function(event, args) {
    updateTabNumBadge()
    updateIconBadge()
  });

  function updateTabNumBadge() {
    $scope.num = Notification.numUnread
    $scope.$apply()
  }

  function updateIconBadge() {
    if (window.cordova) {
      $cordovaBadge.hasPermission().then(function(yes) {
        $cordovaBadge.set(Notification.numUnread).then(function() {
          console.log("Badge set to: " + Notification.numUnread)
        }, function(err) {
          console.log(err)
        });
      }, function(no) {
        console.log(no)
      });
    }
  }

  // Notification Received
  // Code from https://github.com/hollyschinsky/PushNotificationSample

  $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
    if (ionic.Platform.isAndroid()) {
      handleAndroid(notification);
    } else if (ionic.Platform.isIOS()) {
      handleIOS(notification);
    }
  });

  function handleAndroid(notification) {
    if (notification.payload) {
      var customPayload = notification.payload.payload
      console.log(customPayload)
      // Api.readNotifications(customPayload.notification_id)
      // var url = customPayload.url
      // window.location = url
      if (notification.foreground && Api.userToken()) {
        Api.numUnreadNotifications()
      } else {
        $state.go('tab.notifications', {}, {reload: true});
      }
    }
  }

  function handleIOS(notification) {
    // Api.readNotifications(notification.notification_id)
    // var url = notification.url
    // window.location = url
    console.log(notification)
    if (notification.foreground == "1" && Api.userToken()) {
      Api.numUnreadNotifications()
    } else {
      $state.go('tab.notifications', {}, {reload: true});
    }
  }
})