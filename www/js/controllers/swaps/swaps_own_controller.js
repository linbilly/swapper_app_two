angular.module('starter.controllers')

.controller('SwapsOwnCtrl', function($scope, $state, Api, General) {
  $scope.mySwapsTabSelected = function() {
    $scope.mySwapsLoader = true
    Api.getOwnShiftsWithSwaps()
  }

  $scope.$on('ownShiftsWithSwapsFetched', function(event, args) {
    $scope.ownShiftsWithSwaps = Api.ownShiftsWithSwaps
    $scope.ownShiftsByStatus = Api.ownShiftsByStatus
    $scope.mySwapsLoader = false
    $scope.$apply()
  });

  $scope.stringDateToWords = function(startDate) {
    if (startDate) {
      return General.stringDateToWords(startDate)
    }
  }
})