angular.module('starter.controllers')

.controller('NotificationsCtrl', function($scope, Api) {
  Api.getNotifications()
  $scope.loader = true

  $scope.$on('notificationsFetched', function(event, args) {
    $scope.notifications = Api.notifications
    $scope.loader = false
    $scope.$apply()
  })
})