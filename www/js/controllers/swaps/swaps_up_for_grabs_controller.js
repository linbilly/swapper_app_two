angular.module('starter.controllers')

.controller('SwapsUpForGrabsCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.upForGrabsTabSelected = function() {
    console.log("Up for Grabs")
  }
})