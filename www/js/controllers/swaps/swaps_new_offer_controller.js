angular.module('starter.controllers')

.controller('SwapsNewOfferCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.day = $stateParams.day

  Api.getAllShiftsSwappable($stateParams.shiftId)

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }

  $scope.$on('shiftsFetched', function(event, args) {
    Calendar.cannot_swap_shift_dates = args.cannot_swap_shift_dates
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
    $scope.loader = false
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
})