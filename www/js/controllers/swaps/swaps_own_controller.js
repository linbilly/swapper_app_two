angular.module('starter.controllers')

.controller('SwapsOwnCtrl', function($scope, Api, General) {
  $scope.mySwapsTabSelected = function() {
    Api.getOwnShiftsWithSwaps()
  }

  $scope.$on('ownShiftsWithSwapsFetched', function(event, args) {
    $scope.ownShiftsWithSwaps = Api.ownShiftsWithSwaps
    $scope.ownShiftsByStatus = Api.ownShiftsByStatus
    $scope.loader = false
  });

  $scope.stringDateToWords = function(startDate) {
    if (startDate) {
      return General.stringDateToWords(startDate)
    }
  }
})