angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($rootScope, $scope, $ionicPopover, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)


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

    selected.find(".content-text").text(abbreviation)
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
      selected.find(".content-text").text("")
      highlightNextDay()
      Api.deleteShift(shiftId)
    } else {
      highlightNextDay()
    }
  }

  $scope.$on('shiftCreated', function(event, args) {
    args.selected.attr("data-shift-id", args.shift.id)
  });

  function highlightNextDay() {
    var selected = $(".col.date-col.active")
    selected.removeClass("active")
    if (selected.next().length == 0) { // if last date in row
      if (selected.parents().next().length == 0) { // if last date in month
        var todayInText = selected.attr("data-date")
        $rootScope.$broadcast("goToNextCalendarSlide", {nextDay: nextDayInText(todayInText)});
      } else {
        selected.parents().next().find(".col.date-col").first().addClass("active")
      }
    } else {
      selected.next().addClass("active")
    }
  }

  $scope.$on('arrivedOnNextCalendarSlide', function(event, args) {
    
  });

  function nextDayInText(today) {
    var splitDate = today.split("-")
    parseInt(splitDate[2]) + 1
  }
})