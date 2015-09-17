angular.module('starter.controllers')

.controller('NotificationsCtrl', function($scope, Api) {
  Api.getNotifications()

  $scope.$on('notificationsFetched', function(event, args) {
    $scope.notifications = Api.notifications
  })
})