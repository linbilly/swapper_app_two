angular.module('starter.controllers')

.controller('SwapsOwnCtrl', function($scope, Api, General) {
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
})