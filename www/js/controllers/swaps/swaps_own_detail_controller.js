angular.module('starter.controllers')

.controller('SwapsOwnDetailCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory, $timeout, $ionicScrollDelegate, Api, General, ShiftType, Notification, Calendar) {
  // $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  if (Api.ownShiftsWithSwaps) {
    setShiftAndOfferedshifts()
    $scope.loader = false
    setupView()
  } else {
    // In case user jumps straight to the detail page
    Api.getOwnShiftsWithSwaps()
  }

  $scope.$on('ownShiftsWithSwapsFetched', function(event, args) {
    setShiftAndOfferedshifts()
    $scope.$apply()
    $scope.loader = false
    setupView()
  });

  function setupView() {
    $timeout(function() {
      if ($scope.shift.has_accepted_a_swap) {
        addSwapIconToAcceptedSwap()
      } else {
        highlightSwapsBeingOffered()
      }
      Calendar.addStarToDateToSwap($scope.shift.start_date)
      Calendar.goToRightDefaultSlide($scope.shift.start_date)
    }, 1000)
  }

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
    var message = "This shift will no longer be up for grabs by others"

    if ($scope.shift.has_accepted_a_swap) {
      message = "You have already accepted a swap. Make sure you tell your supervisor that you are no longer doing the swap!"
    } else if ($scope.orderedOfferedShifts.length > 0) {
      message += ". Those who have already offered you swaps will be notified that your shift is no longer available to swap."
    }

    swal({
      title: "Are you sure?",
      text: message,
      type: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "OK!",
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

  $scope.stringDateToWords = function(startDate) {
    if (startDate) {
      return General.stringDateToWords(startDate)
    }
  }

  function orderByDateOfShiftOffered(shift) {
    var shifts = []
    for (var i = 0; i < shift.swaps.length; i++) {
      for (var index = 0; index < shift.swaps[i].offered_shifts.length; index++) {
        shift.swaps[i].offered_shifts[index]["shift_type"] = shift.shift_type
        shift.swaps[i].offered_shifts[index]["user"] = shift.swaps[i].user
        shift.swaps[i].offered_shifts[index]["swapId"] = shift.swaps[i].id
        shifts.push(shift.swaps[i].offered_shifts[index])
      };
    };
    return General.compareByDate(shifts)
  }

  function highlightSwapsBeingOffered() {
    for (var i = 0; i < $scope.orderedOfferedShifts.length; i++) {
      var date = General.railsDateToCalendarDate($scope.orderedOfferedShifts[i].start_date)
      var dateToSwap = $(".dates").find("[data-date='" + date + "']");
      dateToSwap.find(".num-shifts-available-on-calendar-holder").removeClass("hide")
      var currentNum = dateToSwap.find(".num-shifts-available-on-calendar").text()
      if (currentNum == "") {
        currentNum = 0
      } else {
        currentNum = parseInt(currentNum)
      }
      dateToSwap.find(".num-shifts-available-on-calendar").text(currentNum + 1)
      dateToSwap.find("a").attr("data-anchor-class", "." + $scope.orderedOfferedShifts[i].start_date)
    };
  }

  function addSwapIconToAcceptedSwap() {
    var date = General.railsDateToCalendarDate($scope.shift.offered_shift.start_date)
    var acceptedSwapDate = $(".dates").find("[data-date='" + date + "']");
    acceptedSwapDate.find(".content-text").html("<i class='icon ion-arrow-swap'></i>")
  }

  $scope.scrollToAnchor = function($event) {
    var ele = $($event.target)
    if (ele.hasClass("num-shifts-available-on-calendar")) {
      ele = ele.parents("a")
    }
    var anchor = ele.attr("data-anchor-class")
    var currentPosition = $ionicScrollDelegate.getScrollPosition().top
    var anchorOffset = $($(anchor)[0]).offset().top - 45 + currentPosition
    $ionicScrollDelegate.scrollTo(0, anchorOffset, [true])
  }

  $scope.acceptSwap = function(offeredShift) {
    var params = {
      offered_shift_id: offeredShift.id
    }
    Api.acceptOfferedSwap(params, offeredShift.swapId)
  }

  $scope.$on('swapAccepted', function(event, args) {
    Notification.message = "Swap successfully accepted"
    $state.go('tab.swaps', {}, {reload: true});
  });
})