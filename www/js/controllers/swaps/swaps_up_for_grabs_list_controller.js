angular.module('starter.controllers')

.controller('SwapsUpForGrabsListCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, Api, General, ShiftType, Calendar) {
  // $ionicNavBarDelegate.showBackButton(false)

  if ($stateParams.day == "all") {
    Api.getShiftsUpForGrabs()
  } else {
    $scope.shiftsUpForGrabs = Calendar.availableShifts[$stateParams.day]
  }

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }

  $scope.$on('shiftsUpForGrabsFetched', function(event, args) {
    $scope.shiftsUpForGrabs = Api.shiftsUpForGrabs
    $scope.$apply()
    $scope.loader = false
  });

  $scope.abbreviatedMonth = function(startDate) {
    return General.abbreviatedMonth(startDate)
  }

  $scope.dateFromString = function(startDate) {
    return General.dateFromString(startDate)
  }

  $scope.prettyEndTime = function(shiftType) {
    if (shiftType) {
      return ShiftType.prettyEndTime(shiftType)
    } else {
      // In case shift has not loaded yet
      return ""
    }
  }
})