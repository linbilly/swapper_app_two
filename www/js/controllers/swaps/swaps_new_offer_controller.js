angular.module('starter.controllers')

.controller('SwapsNewOfferCtrl', function($scope, $state, $stateParams, $ionicNavBarDelegate, $ionicHistory, $timeout, $ionicSlideBoxDelegate, $interval, Api, Calendar, General, ShiftType, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  $scope.shiftsSelectedError = false

  $scope.day = $stateParams.day

  Api.getAllShiftsSwappable($stateParams.shiftId)

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }

  $scope.$on('swappableShiftsFetched', function(event, args) {
    Calendar.cannot_swap_shift_dates = args.cannot_swap_shift_dates
    Calendar.shifts_already_accepted = args.shifts_already_accepted
    $scope.shift_owner = args.shift_owner
    $scope.shift_up_for_swap = JSON.parse(args.shift_up_for_swap)
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
    $scope.loader = false
    $scope.setupInterval = $interval(function() {
      Calendar.addStarToDateToSwap($scope.shift_up_for_swap.start_date)
      Calendar.goToRightDefaultSlide($scope.day)
      if ($(".ion-star").length > 0) {
        $interval.cancel($scope.setupInterval)
      }
    }, 100)
  })

  $scope.multipleDatesSelected = function($event) {
    var ele = null
    if ($($event.target).hasClass("date-col")) {
      ele = $($event.target)
    } else {
      ele = $($event.target).parents(".date-col")
    }
    if (!ele.hasClass("cannot-offer-as-swap")) {
      var selectedDate = ele.attr("data-date")
      var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");
      for (var i = 0; i < selectedCells.length; i++) {
        if ($(selectedCells[i]).hasClass("active")) {
          $(selectedCells[i]).removeClass("active")
        } else {
          $(selectedCells[i]).addClass("active")
        }
      };
    }
  }

  $scope.stringDateToWords = function(startDate) {
    return General.stringDateToWords(startDate)
  }

  $scope.prettyEndTime = function(shiftType) {
    return ShiftType.prettyEndTime(shiftType)
  }

  $scope.offerToSwap = function() {
    $scope.shiftsSelectedError = false
    var selectedDates = $(".date-col.active")

    if (selectedDates.length == 0) {
      $scope.shiftsSelectedError = true
    } else {
      var selectedShiftIds = []

      for (var i = 0; i < selectedDates.length; i++) {
        selectedShiftIds.push($(selectedDates[i]).attr("data-shift-id"))
      };

      var shiftParams = {
        shift_id: $stateParams.shiftId,
        offered_shifts: selectedShiftIds
      }
      Api.offerToSwap(shiftParams)
      Notification.message = "Swap successfully offered to " + $scope.shift_owner.first_name + ". You can see it on the \"Swaps\" tab under \"Swaps Offered\"."
      $state.go('tab.swaps-up-for-grabs-list', {day: $scope.day}, {reload: true});
    }
  }
})