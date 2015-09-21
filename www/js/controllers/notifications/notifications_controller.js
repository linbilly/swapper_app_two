angular.module('starter.controllers')

.controller('NotificationsCtrl', function($scope, Api) {
  Api.getNotifications()
  Api.numUnreadNotifications()
  $scope.loader = true

  $scope.$on('notificationsFetched', function(event, args) {
    $scope.notifications = Api.notifications
    $scope.loader = false
    $scope.$apply()
  })

  $scope.read = function($event, notificationId) {
    $($event.target).removeClass("not-read")
    Api.readNotifications(notificationId)
  }

  $scope.onlyMarkAsRead = function($event, notificationId) {
    $event.preventDefault()
    $($event.target).parents(".item").removeClass("not-read")
    $($event.target).parents(".mark-as-read-holder").remove()
    Api.readNotifications(notificationId)
  }
})