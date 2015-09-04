angular.module('starter.controllers')

.controller('SwapsPendingCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.pendingTabSelected = function() {
    console.log("Pending")
  }
})