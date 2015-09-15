angular.module('starter.controllers')

.controller('SwapsCtrl', function($rootScope, $scope, $ionicNavBarDelegate, $timeout, Api, General, Notification, ShiftType, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  $scope.subControllers = General

  // Not disabling cache on the view so that the tab state is maintained
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.url == "/swaps/index") {
      notificationCheck()
      $scope.subControllers.upForGrabsController.loader = true
      $scope.subControllers.upForGrabsController.calendarObjects = null
      Api.getOwnShiftsWithSwaps()
      Api.swapsOffered()
      Api.getAllShifts()
    }
  })

  function notificationCheck() {
    if (Notification.message) {
      $scope.message = Notification.message
      $("notification").removeClass("ng-hide")
      $timeout(function(){
        clearMessage()
      }, 10000);
    }
  }

  function clearMessage() {
    $("notification").addClass("ng-hide")
    Notification.message = ""
  }

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

  $scope.countShiftsOffered = function(swaps) {
    var num = 0
    for (var i = 0; i < swaps.length; i++) {
      num += swaps[i].offered_shifts.length
    };
    return num
  }

  $scope.stringDateToWords = function(startDate) {
    if (startDate) {
      return General.stringDateToWords(startDate)
    }
  }
})