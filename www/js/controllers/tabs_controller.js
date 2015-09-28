angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope, $location, $interval, Api, Notification) {
  if (hasToken() && !Api.initialSignUp) {
    Api.numUnreadNotifications()
    $interval(Api.numUnreadNotifications, 1000 * 60 * 5) // Check for num of unread notifications every 5 minutes
  }

  $scope.$on('numUnreadNotificationsFetched', function(event, args) {
    updateTabNumBadge()
  });

  $scope.$on('notificationMarkedAsRead', function(event, args) {
    updateTabNumBadge()
  });

  function updateTabNumBadge() {
    if (Notification.numUnread == 0) {
      $scope.num = ""
    } else {
      $scope.num = Notification.numUnread
    }
  }

  function hasToken() {
    if (Api.userToken()) {
      return true
    } else {
      return false
    }
  }
})