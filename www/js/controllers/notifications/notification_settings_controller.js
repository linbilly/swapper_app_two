angular.module('starter.controllers')

.controller('NotificationSettingsCtrl', function($scope, $ionicHistory, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})