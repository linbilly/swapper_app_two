angular.module('starter.controllers')

.controller('SwapsCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.mySwapsTabSelected = function() {
    console.log("My Swaps")
  }

  $scope.pendingTabSelected = function() {
    console.log("Pending")
  }

  $scope.upForGrabsTabSelected = function() {
    console.log("Up for Grabs")
  }
})