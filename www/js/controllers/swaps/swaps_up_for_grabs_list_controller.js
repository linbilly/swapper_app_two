angular.module('starter.controllers')

.controller('SwapsUpForGrabsListCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, Api, General, ShiftType, Calendar, Notification, Shift) {
  // $ionicNavBarDelegate.showBackButton(false)

  $scope.loader = true
  $scope.day = $stateParams.day

  if (Notification.message) {
    $scope.message = Notification.message
    Notification.message = null
  }

  Api.getShiftsUpForGrabs($stateParams.day)

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }

  $scope.$on('shiftsUpForGrabsFetched', function(event, args) {
    Shift.removeAlreadyAccepted()
    $scope.shiftsUpForGrabs = Api.shiftsUpForGrabs
    $scope.loader = false
    $scope.$apply()
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