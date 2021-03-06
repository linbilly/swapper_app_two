angular.module('starter.controllers')

.controller('SwapsNewOfferCtrl', function($scope, $state, $stateParams, $ionicNavBarDelegate, $ionicHistory, $timeout, $ionicSlideBoxDelegate, $interval, Api, Calendar, General, ShiftType, Notification, Shift) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  $scope.shiftsSelectedError = false

  $scope.day = $stateParams.day

  Api.getAllShiftsSwappable($stateParams.shiftId)

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
    $interval.cancel($scope.setupInterval)
  }

  $scope.$on('swappableShiftsFetched', function(event, args) {
    if (args.success) {
      $scope.shift_up_for_swap = args.shift_up_for_swap
      if (Shift.isInThePast($scope.shift_up_for_swap)) {
        Notification.message = "This swap is in the past now."
        $state.go('tab.swaps', {}, {reload: true})
      } else if (Shift.alreadyAcceptedOffer($scope.shift_up_for_swap)) {
        Notification.message = "Another swap offer has already been accepted."
        $state.go('tab.swaps', {}, {reload: true})
      }
      
      if (args.already_offered_swap) {
        var swap = JSON.parse(args.swap)
        $state.go('tab.swaps-offered-swap-detail', {swapId: swap.id}, {reload: true});
      }

      Calendar.cannot_swap_shift_dates = args.cannot_swap_shift_dates
      Calendar.shifts_already_accepted = args.shifts_already_accepted
      $scope.shift_owner = args.shift_owner
      $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
      $scope.loader = false

      var setupInterval = $interval(function() {
        Calendar.addStarToDateToSwap($scope.shift_up_for_swap.start_date)
        Calendar.goToRightDefaultSlide($scope.day)
        if ($(".new-offer-page .dates .ion-star").length > 0 || $(".new-offer-page").length == 0) {
          $interval.cancel(setupInterval)
        }
      }, 100)

    } else {
      noLongerUpForSwap()
    }

  })

  function noLongerUpForSwap() {
    Notification.message = "This swap is no longer up for grabs"
    $state.go('tab.swaps', {}, {reload: true})
  }

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