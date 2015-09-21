angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope, $state, $interval, Api, Notification) {
  Api.numUnreadNotifications()
  $interval(Api.numUnreadNotifications, 1000 * 60 * 5) // Check for num of unread notifications every 5 minutes

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
})