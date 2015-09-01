angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($rootScope, $scope, $ionicPopover, $ionicNavBarDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)

  Api.getShiftPatterns()

  $scope.$on('shiftTypesFetched', function(event, args) {
    $scope.shiftTypes = Api.inputButtons
    highlightToday()
  });

  function highlightToday() {
    var today = new Date()
    var todayCell = $(".dates").find("[data-date='" + today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear() + "']");
    todayCell.addClass("active")
  }

  $scope.createShift = function($event) {
    var ele = $($event.target)
    var abbreviation = ele.text().trim()
    var selected = $(".col.date-col.active")
    var selectedDate = $(".col.date-col.active").attr("data-date")
    var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");

    for (var i = 0; i < selectedCells.length; i++) {
      $(selectedCells[i]).find(".content-text").text(abbreviation)
    };
    highlightNextDay()

    var shiftParams = {
      shift_type_id: ele.attr("data-shift-type-id"),
      group_id: ele.attr("data-group-id"),
      start_date: selected.attr("data-date")
    }
    Api.createShift(shiftParams, selected)
  }

  $scope.deleteShift = function($event) {
    var ele = $($event.target)
    var selected = $(".col.date-col.active")
    var shiftId = selected.attr("data-shift-id")

    if (shiftId) {
      var selectedDate = $(".col.date-col.active").attr("data-date")
      var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");
      for (var i = 0; i < selectedCells.length; i++) {
        $(selectedCells[i]).find(".content-text").text("")
        $(selectedCells[i]).attr("data-shift-id", "")
      };
      highlightNextDay()
      Api.deleteShift(shiftId)
    } else {
      highlightNextDay()
    }
  }

  $scope.$on('shiftCreated', function(event, args) {
    var selected = args.selected
    var selectedDate = selected.attr("data-date")
    var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");
    for (var i = 0; i < selectedCells.length; i++) {
      $(selectedCells[i]).attr("data-shift-id", args.shift.id)
    };
  });

  function highlightNextDay() {
    var selected = $(".col.date-col.active")
    selected.removeClass("active")
    if (selected.next().length == 0) { // if last date in row
      if (selected.parents(".row").next().length == 0) { // if last date in month
        var todayInText = selected.attr("data-date")
        $rootScope.$broadcast("goToNextCalendarSlide", {nextDay: nextDayInText(todayInText)});
      } else {
        selected.parents(".row").next().find(".col.date-col").first().addClass("active")
      }
    } else {
      selected.next().addClass("active")
    }
  }

  function highlightNextDayFromPreviousSlide(date) {
    $(".col.date-col.active").removeClass("active")
    var nextDay = $(".dates").find("[data-date='" + date + "']");
    nextDay.addClass("active")
  }

  $scope.$on('arrivedOnNextCalendarSlide', function(event, args) {
    highlightNextDayFromPreviousSlide(args.nextDay)
  });

  function nextDayInText(today) {
    var splitDate = today.split("-")
    var currentDate = new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]) // Year, Month, Date
    var nextDate = new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]) // Year, Month, Date
    nextDate.setDate(currentDate.getDate() + 1)
    return nextDate.getDate() + "-" + (nextDate.getMonth() + 1) + "-" + nextDate.getFullYear()
  }
})