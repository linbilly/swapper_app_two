angular.module('starter.controllers')

.controller('SwapsOfferedDetailCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory, $timeout, $ionicScrollDelegate, Api, General, ShiftType, Notification, Calendar) {
  // $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  Api.swapsOffered()

  $scope.$on('swapsOfferedFetched', function(event, args) {
    setSwapAndShifts()
    $scope.$apply()
    $scope.loader = false
    setupView()
  });

  function setupView() {
    $timeout(function() {
      if ($scope.swap.state == "Pending approval") {
        addSwapIconToAcceptedSwap()
      } else {
        highlightSwapsBeingOffered()
      }
      Calendar.addStarToDateToSwap($scope.shift.start_date)
      Calendar.goToRightDefaultSlide($scope.shift.start_date)
    }, 1000)
  }

  function setSwapAndShifts() {
    $scope.swap = General.findById(Api.swapsOfferedByUser, $stateParams.swapId)
    if ($scope.swap) {
      $scope.shift = $scope.swap.shift
      $scope.orderedOfferedShifts = General.compareByDate($scope.swap.offered_shifts)
    } else {
      // In case user was still on this page when shift was removed
      $state.go('tab.swaps', {}, {reload: true});
    }
  }

  Api.getAllShifts()

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, args.available_shifts)
    $scope.$apply()
    $scope.loader = false
  })

  $scope.isBeingOffered = function(shift) {
    return General.findById($scope.swap.offered_shifts, shift.id)
  }

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

  function highlightSwapsBeingOffered() {
    for (var i = 0; i < $scope.swap.offered_shifts.length; i++) {
      var date = General.railsDateToCalendarDate($scope.swap.offered_shifts[i].start_date)
      var dateToSwap = $(".dates").find("[data-date='" + date + "']");
      dateToSwap.find("a").attr("data-anchor-class", "." + $scope.swap.offered_shifts[i].start_date)
      dateToSwap.addClass("active")
    };
  }

  function addSwapIconToAcceptedSwap() {
    var date = General.railsDateToCalendarDate($scope.swap.accepted_shift.start_date)
    var acceptedSwapDate = $(".dates").find("[data-date='" + date + "']");
    acceptedSwapDate.find(".content-text").html("<i class='icon ion-arrow-swap'></i>")
  }

  $scope.scrollToAnchor = function($event) {
    var ele = $($event.target)
    var anchor = ele.attr("data-anchor-class")
    if (anchor) {
      var currentPosition = $ionicScrollDelegate.getScrollPosition().top
      var anchorOffset = $($(anchor)[0]).offset().top - 45 + currentPosition
      $ionicScrollDelegate.scrollTo(0, anchorOffset, [true])
    }
  }

  $scope.cancelOfferedShift = function($event, offeredShiftId, startDate) {
    $scope.startDate = startDate
    swal({
      title: "Are you sure?",
      text: $scope.shift.user.first_name + " will be sad that you are no longer offering this shift to swap",
      type: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Yup!",
    }, function(){
      var params = {
        offered_shift_id: offeredShiftId,
        swap_id: $stateParams.swapId
      }
      Api.cancelOfferedShift(params)

      $($event.target).parents(".item").remove()
      var date = General.railsDateToCalendarDate($scope.startDate)
      $(".dates").find("[data-date='" + date + "']").removeClass("active")

      if (offeredShiftId == $scope.swap.accepted_shift_id) {
        Notification.message = "Accepted swap cancelled for " + $scope.shift.shift_type.name + " on " + General.stringDateToWords($scope.shift.start_date)
        $state.go('tab.swaps', {}, {reload: true});
      } else if (noMoreSwaps()) {
        Notification.message = "All offers to swap cancelled for " + $scope.shift.shift_type.name + " on " + General.stringDateToWords($scope.shift.start_date)
        $state.go('tab.swaps', {}, {reload: true});
      }
    });
    $("fieldset").addClass("hide")
  }

  $scope.cancelAllOfferedShifts = function() {
    swal({
      title: "Are you sure?",
      text: $scope.shift.user.first_name + " will be sad!",
      type: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Yup!",
    }, function(){
      var params = {
        swap_id: $stateParams.swapId
      }
      Api.cancelAllOfferedShifts(params)

      Notification.message = "All offers to swap cancelled for " + $scope.shift.shift_type.name + " on " + General.stringDateToWords($scope.shift.start_date)
      $state.go('tab.swaps', {}, {reload: true});
    });
    $("fieldset").addClass("hide")
  }

  function noMoreSwaps() {
    return $(".offered-shifts-list-holder .item").length == 0
  }

  $scope.approved = function() {
    swal({
      title: "Are you sure?",
      text: "Approving this swap will update your calendar accordingly. You can see a record of the swap in the notifications tab.",
      type: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "OK!",
    }, function(){
      Api.approveSwap($scope.shift.id)
    });
    $("fieldset").addClass("hide")
  }

  $scope.$on('swapApproved', function(event, args) {
    Notification.message = "Swap approved and calendar successfully updated."
    $state.go('tab.swaps', {}, {reload: true});
  });

  $scope.goToEditShifts = function() {
    $state.go('tab.swaps-edit-offer', {shiftId: $scope.shift.id, day: $scope.shift.start_date, swapId: $scope.swap.id}, {reload: true});
  }
})