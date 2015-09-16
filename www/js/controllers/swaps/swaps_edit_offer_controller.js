angular.module('starter.controllers')

.controller('SwapsEditOfferCtrl', function($scope, $state, $stateParams, $ionicNavBarDelegate, $ionicHistory, $timeout, $ionicSlideBoxDelegate, Api, Calendar, General, ShiftType, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.day = $stateParams.day
  $scope.swapId = $stateParams.swapId

  Api.getAllShiftsSwappable($stateParams.shiftId)

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }

  $scope.$on('swappableShiftsFetched', function(event, args) {
    Calendar.cannot_swap_shift_dates = args.cannot_swap_shift_dates
    $scope.shift_owner = args.shift_owner
    $scope.shift_up_for_swap = JSON.parse(args.shift_up_for_swap)
    $scope.swap = JSON.parse(args.swap)
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
    $scope.loader = false
    $timeout(function() {
      Calendar.addStarToDateToSwap($scope.shift_up_for_swap.start_date)
      Calendar.goToRightDefaultSlide($scope.day)
      highlightSwapsBeingOffered()
    }, 1000)
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

  $scope.updateSwap = function() {
    var selectedDates = $(".date-col.active")
    var selectedShiftIds = []

    for (var i = 0; i < selectedDates.length; i++) {
      selectedShiftIds.push($(selectedDates[i]).attr("data-shift-id"))
    };

    var shiftParams = {
      shift_id: $stateParams.shiftId,
      offered_shifts: selectedShiftIds
    }
    Api.updateSwap(shiftParams, $scope.swapId)
    $state.go('tab.swaps-offered-swap-detail', {swapId: $scope.swapId}, {reload: true});
  }

  function highlightSwapsBeingOffered() {
    for (var i = 0; i < $scope.swap.offered_shifts.length; i++) {
      var date = $scope.swap.offered_shifts[i].start_date.split("-")
      var dateToSwap = $(".dates").find("[data-date='" + parseInt(date[2]) + "-" + parseInt(date[1]) + "-" + parseInt(date[0]) + "']");
      dateToSwap.find("a").attr("data-anchor-class", "." + $scope.swap.offered_shifts[i].start_date)
      dateToSwap.addClass("active")
    };
  }
})