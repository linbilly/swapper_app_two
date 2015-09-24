angular.module('starter.controllers')

.controller('SwapsCtrl', function($rootScope, $scope, $ionicNavBarDelegate, $timeout, $ionicModal, Api, General, Notification, ShiftType, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.subControllers = General

  Api.getShiftPatterns()

  // Not disabling cache on the view so that the tab state is maintained
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.url == "/swaps/index") {
      notificationCheck()
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

  $ionicModal.fromTemplateUrl('templates/shared/legend/legend_swaps.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openLengendModal = function() {
    $scope.shiftTypesByGroup = Api.inputButtonsByGroup
    $scope.modal.show()
  }

  $scope.closeLengendModal = function() {
    $scope.modal.hide()
  }
})