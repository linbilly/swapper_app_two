angular.module('starter.controllers')

.controller('SwapsOfferedDetailCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory, $timeout, $ionicScrollDelegate, Api, General, ShiftType, Notification, Calendar) {
  // $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  if (Api.swapsOfferedByUser) {
    setSwapAndShifts()
    $scope.loader = false
    setupView()
  } else {
    // In case user jumps straight to the detail page
    Api.swapsOffered()
  }

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
    $scope.shift = $scope.swap.shift
    $scope.orderedOfferedShifts = General.compareByDate($scope.swap.offered_shifts)
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
      var date = $scope.swap.offered_shifts[i].start_date.split("-")
      var dateToSwap = $(".dates").find("[data-date='" + parseInt(date[2]) + "-" + parseInt(date[1]) + "-" + parseInt(date[0]) + "']");
      dateToSwap.find("a").attr("data-anchor-class", "." + $scope.swap.offered_shifts[i].start_date)
      dateToSwap.addClass("active")
    };
  }

  function addSwapIconToAcceptedSwap() {
    var date = $scope.swap.accepted_shift.start_date.split("-")
    var acceptedSwapDate = $(".dates").find("[data-date='" + parseInt(date[2]) + "-" + parseInt(date[1]) + "-" + parseInt(date[0]) + "']");
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
})