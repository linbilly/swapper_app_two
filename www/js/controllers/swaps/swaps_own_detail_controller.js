angular.module('starter.controllers')

.controller('SwapsOwnDetailCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory, Api, General, ShiftType, Notification, Calendar) {
  // $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  if (Api.ownShiftsWithSwaps) {
    $scope.loader = false
    setShiftAndOfferedshifts()
  } else {
    // In case user jumps straight to the detail page
    Api.getOwnShiftsWithSwaps()
  }

  $scope.$on('ownShiftsWithSwapsFetched', function(event, args) {
    setShiftAndOfferedshifts()
    $scope.$apply()
    $scope.loader = false
  });

  function setShiftAndOfferedshifts() {
    $scope.shift = General.findById(Api.ownShiftsWithSwaps, $stateParams.shiftId)
    $scope.orderedOfferedShifts = orderByDateOfShiftOffered($scope.shift)
  }

  Api.getAllShifts()

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, args.available_shifts)
    $scope.$apply()
    $scope.loader = false
  })

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }

  $scope.prettyEndTime = function(shiftType) {
    if (shiftType) {
      return ShiftType.prettyEndTime(shiftType)
    } else {
      // In case shift has not loaded yet
      return ""
    }
  }

  $scope.cancelOwnSwap = function() {
    swal({
      title: "Are you sure?",
      text: "This shift will no longer be up for grabs by others",
      type: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Yup!",
    }, function(){
      Api.cancelOwnShiftToSwap($stateParams.shiftId)
    });
    $("fieldset").addClass("hide")
  }

  $scope.$on('ownShiftSwapCancelled', function(event, args) {
    Notification.message = "Your swap for " + args.shiftType.name + " on " + General.stringDateToWords(args.shift.start_date) + " has been cancelled"
    $state.go('tab.swaps', {}, {reload: true});
    $ionicHistory.clearHistory()
  });

  $scope.abbreviatedMonth = function(startDate) {
    if (startDate) {
      return General.abbreviatedMonth(startDate)
    }
  }

  $scope.dateFromString = function(startDate) {
    if (startDate) {
      return General.dateFromString(startDate)
    }
  }

  function orderByDateOfShiftOffered(shift) {
    var shifts = []
    for (var i = 0; i < shift.swaps.length; i++) {
      for (var index = 0; index < shift.swaps[i].offered_shifts.length; index++) {
        shift.swaps[i].offered_shifts[index]["shift_type"] = shift.shift_type
        shift.swaps[i].offered_shifts[index]["user"] = shift.swaps[i].user
        shifts.push(shift.swaps[i].offered_shifts[index])
      };
    };
    return General.compareByDate(shifts)
  }
})