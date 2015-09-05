angular.module('starter.controllers')

.controller('SwapsCtrl', function($rootScope, $scope, $ionicNavBarDelegate, Api, General, Notification, ShiftType) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  if (Notification.message) {
    $scope.message = Notification.message
    Notification.message = null
  }

  // Not disabling cache on the view so that the tab state is maintained
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.url == "/swaps/index") {
      Api.getOwnShiftsWithSwaps()
    }
  })

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