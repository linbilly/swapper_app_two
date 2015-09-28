angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($rootScope, $scope, $ionicPopover, $ionicNavBarDelegate, Api, Calendar, General) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.calendar = Calendar
  $scope.calendar.emptyNote = true

  if (Api.userToken()) {
    Api.getShiftPatterns()
  }

  $scope.$on('shiftTypesFetched', function(event, args) {
    $scope.shiftTypesByGroup = Api.inputButtonsByGroup
    $scope.$apply()
  });

  $scope.createShift = function($event) {
    var ele = $($event.target)
    var abbreviation = ele.text().trim()
    var selected = $(".col.date-col.active")
    if (abbreviation == selected.find(".content-text").text().trim()) {
      Calendar.highlightNextDay()
    } else {
      if (selected.hasClass("swap")) {
        swal({
          title: "Woah there!",
          text: "You have already put this shift up for a swap. If you want to change the shift, the swap will be removed.",
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: true,
          animation: "slide-from-top",
          confirmButtonText: "OK"
        }, function(isConfirm) {
          if (isConfirm) {
            selected.removeClass("swap")
            continueCreatingShift(ele, abbreviation, selected)
          }
        });
        $("fieldset").addClass("hide")
      } else {
        continueCreatingShift(ele, abbreviation, selected)
      }
    }
  }

  function continueCreatingShift(ele, abbreviation, selected) {
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
    $("fieldset").removeClass("hide")
    swal({
      title: "Swap me!",
      text: "Optional message for your swap:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      confirmButtonText: "Swap",
      showLoaderOnConfirm: true,
      inputPlaceholder: "E.g. No night shifts plz..."
    }, function(inputValue) {
      if (inputValue === false) {
        return false;
      } else {
        var shiftParams = {
          swap_notes: inputValue
        }
        Api.setOwnShiftToSwap(shiftParams, shiftId, selected)
      }
    });
    // $(".sweet-alert").css({marginTop: '-=100px'});
  }

  // window.addEventListener('native.keyboardshow', function(){
  //   if (ionic.Platform.isIOS()) {
  //     $(".sweet-alert").css({marginTop: '-=50px'});
  //   }
  // });

  // window.addEventListener('native.keyboardhide', function(){
  //   if (ionic.Platform.isIOS()) {
  //     $(".sweet-alert").css({marginTop: '+=100px'});
  //   }
  // });

  $scope.$on('ownShiftSwapSet', function(event, args) {
    swal("Your shift is now up for grabs!", "You can view it in the \"Swaps\" tab.", "success")
    $("fieldset").addClass("hide")
    args.selected.addClass("swap")
    args.selected.attr("notes", args.shift.notes)
    Calendar.updateSwapButtonStatus(args.selected)
  })

  $scope.deleteShift = function() {
    var selected = $(".col.date-col.active")
    var shiftId = selected.attr("data-shift-id")

    if (shiftId) {
      if (selected.hasClass("swap")) {
        swal({
          title: "Woah there!",
          text: "You have already put this shift up for a swap. If you want to delete the shift, the swap will be removed.",
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: true,
          animation: "slide-from-top",
          confirmButtonText: "OK"
        }, function(inputValue) {
          if (inputValue) {
            selected.removeClass("swap")
            continueDeletingShift(shiftId)
          }
        });
        $("fieldset").addClass("hide")
      } else {
        continueDeletingShift(shiftId)
      }
    } else {
      Calendar.highlightNextDay()
    }
  }

  function continueDeletingShift(shiftId) {
    var selectedDate = $(".col.date-col.active").attr("data-date")
    var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");
    for (var i = 0; i < selectedCells.length; i++) {
      $(selectedCells[i]).find(".content-text").text("")
      $(selectedCells[i]).attr("data-shift-id", "")
      $(selectedCells[i]).removeClass("swap")
    };
    Calendar.highlightNextDay()
    Api.deleteShift(shiftId)
  }

  $scope.$on('shiftCreated', function(event, args) {
    var selected = args.selected
    var selectedDate = selected.attr("data-date")
    var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");
    for (var i = 0; i < selectedCells.length; i++) {
      $(selectedCells[i]).attr("data-shift-id", args.shift.id)
      $(selectedCells[i]).attr("data-swappable", args.shift_type.swappable)
      $(selectedCells[i]).attr("data-start-time", General.formatStartTime(args.shift_type))
      $(selectedCells[i]).attr("data-group-name", args.shift.group.name)
    };
  });

  $scope.$on('arrivedOnNextCalendarSlide', function(event, args) {
    Calendar.highlightNextDayFromPreviousSlide(args.nextDay)
  });

  $scope.numKeys = function() {
    return General.numKeys($scope.shiftTypesByGroup)
  }
})