angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($rootScope, $scope, $ionicPopover, $ionicNavBarDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)

  Api.getShiftPatterns()

  $scope.$on('shiftTypesFetched', function(event, args) {
    $scope.shiftTypes = Api.inputButtons
  });

  $scope.createShift = function($event) {
    var ele = $($event.target)
    var abbreviation = ele.text().trim()
    var selected = $(".col.date-col.active")
    var selectedDate = $(".col.date-col.active").attr("data-date")
    var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");

    for (var i = 0; i < selectedCells.length; i++) {
      $(selectedCells[i]).find(".content-text").text(abbreviation)
    };
    Calendar.highlightNextDay()

    var shiftParams = {
      shift_type_id: ele.attr("data-shift-type-id"),
      group_id: ele.attr("data-group-id"),
      start_date: selected.attr("data-date")
    }
    Api.createShift(shiftParams, selected)
  }

  $scope.swapShift = function() {
    var selected = $(".col.date-col.active")
    var shiftId = selected.attr("data-shift-id")

    if (shiftId) {
      openSwapModal(shiftId, selected)
    }
  }

  function openSwapModal(shiftId, selected) {
    swal({
      title: "Swap me!",
      text: "Write an optional message to go with your swap:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      confirmButtonText: "Swap",
      showLoaderOnConfirm: true,
      inputPlaceholder: "E.g. No night shifts plz..."
    }, function(inputValue) {
      var shiftParams = {
        notes: inputValue
      }
      Api.setOwnShiftToSwap(shiftParams, shiftId, selected)
    });
  }

  $scope.$on('ownShiftSwapSet', function(event, args) {
    swal("Your shift is now up for grabs!", null, "success");
    args.selected.addClass("swap")
  })

  $scope.deleteShift = function() {
    var selected = $(".col.date-col.active")
    var shiftId = selected.attr("data-shift-id")

    if (shiftId) {
      var selectedDate = $(".col.date-col.active").attr("data-date")
      var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");
      for (var i = 0; i < selectedCells.length; i++) {
        $(selectedCells[i]).find(".content-text").text("")
        $(selectedCells[i]).attr("data-shift-id", "")
      };
      Calendar.highlightNextDay()
      Api.deleteShift(shiftId)
    } else {
      Calendar.highlightNextDay()
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

  $scope.$on('arrivedOnNextCalendarSlide', function(event, args) {
    Calendar.highlightNextDayFromPreviousSlide(args.nextDay)
  });
})