angular.module('starter.controllers')

.controller('SwapsOwnDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Api, General, ShiftType) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  if (Api.ownShiftsWithSwaps) {
    $scope.shift = General.findById(Api.ownShiftsWithSwaps, $stateParams.shiftId)
  } else {
    // In case user jumps straight to the detail page
    Api.getOwnShiftsWithSwaps()
  }

  $scope.$on('ownShiftsWithSwapsFetched', function(event, args) {
    $scope.shift = General.findById(Api.ownShiftsWithSwaps, $stateParams.shiftId)
    $scope.$apply()
    $scope.loader = false
  });

  $scope.prettyEndTime = function(shiftType) {
    if (shiftType) {
      return ShiftType.prettyEndTime(shiftType)
    } else {
      // In case shift has not loaded yet
      return ""
    }
  }
})