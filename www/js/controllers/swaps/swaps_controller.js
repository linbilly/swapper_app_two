angular.module('starter.controllers')

.controller('SwapsCtrl', function($scope, $ionicNavBarDelegate, Api, General, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  if (Notification.message) {
    $scope.message = Notification.message
    Notification.message = null
  }
})