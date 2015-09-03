angular.module('starter.controllers')

.controller('SwapsCtrl', function($scope, $ionicNavBarDelegate, Api, General) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.mySwapsTabSelected = function() {
    Api.getOwnShiftsWithSwaps()
  }

  $scope.$on('ownShiftsWithSwapsFetched', function(event, args) {
    $scope.ownShiftsWithSwaps = Api.ownShiftsWithSwaps
    $scope.$apply()
    $scope.loader = false
  });

  $scope.abbreviatedMonth = function(startDate) {
    return General.abbreviatedMonth(startDate)
  }

  $scope.dateFromString = function(startDate) {
    return General.dateFromString(startDate)
  }

  $scope.pendingTabSelected = function() {
    console.log("Pending")
  }

  $scope.upForGrabsTabSelected = function() {
    console.log("Up for Grabs")
  }
})