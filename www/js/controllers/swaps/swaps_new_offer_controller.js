angular.module('starter.controllers')

.controller('SwapsNewOfferCtrl', function($scope, $state, $stateParams, $ionicNavBarDelegate, $ionicHistory, $timeout, $ionicSlideBoxDelegate, Api, Calendar, General, ShiftType, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.day = $stateParams.day

  Api.getAllShiftsSwappable($stateParams.shiftId)

  function goToRightDefaultSlide() {
    var monthThatSwapIsIn = parseInt($scope.day.split("-")[1])
    var today = new Date()
    var todaysMonth = today.getMonth() + 1
    var slideToGoTo = (monthThatSwapIsIn - todaysMonth) + 3

    if (monthThatSwapIsIn != todaysMonth) {
      $ionicSlideBoxDelegate.slide(slideToGoTo, 1000)
    }
  }

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }

  $scope.$on('shiftsFetched', function(event, args) {
    Calendar.cannot_swap_shift_dates = args.cannot_swap_shift_dates
    $scope.shift_owner = args.shift_owner
    $scope.shift_up_for_swap = JSON.parse(args.shift_up_for_swap)
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
    $scope.loader = false
    $timeout(function() {
      addStarToDateToSwap($scope.shift_up_for_swap.start_date)
      goToRightDefaultSlide()
    }, 1000)
  })

  $scope.multipleDatesSelected = function($event) {
    var ele = null
    if ($($event.target).hasClass("date-col")) {
      ele = $($event.target)
    } else {
      ele = $($event.target).parents(".date-col")
    }
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

  $scope.stringDateToWords = function(startDate) {
    return General.stringDateToWords(startDate)
  }

  $scope.prettyEndTime = function(shiftType) {
    return ShiftType.prettyEndTime(shiftType)
  }

  function addStarToDateToSwap(startDate) {
    var formattedDate = startDate.split("-").reverse()
    var dateToSwap = $(".dates").find("[data-date='" + parseInt(formattedDate[0]) + "-" + parseInt(formattedDate[1]) + "-" + parseInt(formattedDate[2]) + "']");
    dateToSwap.find(".content-text").html("<i class='ion-star'></i>")
  }

  $scope.offerToSwap = function() {
    var selectedDates = $(".date-col.active")
    var selectedShiftIds = []

    for (var i = 0; i < selectedDates.length; i++) {
      selectedShiftIds.push($(selectedDates[i]).attr("data-shift-id"))
    };

    var shiftParams = {
      shift_id: $stateParams.shiftId,
      offered_shifts: selectedShiftIds
    }
    Api.offerToSwap(shiftParams)
    Notification.message = "Swap successfully offered to " + $scope.shift_owner.first_name + " for: " + $scope.shift_up_for_swap.shift_type.name + " on " + $scope.stringDateToWords($scope.shift_up_for_swap.start_date)
    $state.go('tab.swaps-up-for-grabs-list', {day: $scope.day}, {reload: true});
  }
})