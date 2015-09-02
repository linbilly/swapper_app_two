angular.module('starter.controllers', [])

.controller('CalendarCtrl', function($rootScope, $scope, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api, Calendar, General) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous()
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next()
  }

  $scope.dateSelected = function($event) {
    removeAllHighlightedCells()

    var ele = null
    if ($($event.target).hasClass("date-col")) {
      ele = $($event.target)
    } else {
      ele = $($event.target).parents(".date-col")
    }
    var selectedDate = ele.attr("data-date")
    var selectedCells = $(".dates").find("[data-date='" + selectedDate + "']");
    for (var i = 0; i < selectedCells.length; i++) {
      $(selectedCells[i]).addClass("active")
    };
    
    updateNotes(ele)
    Calendar.updateSwapButtonStatus(ele)
  }

  $scope.highlightACell = function() {
    var currentSlide = $($("ion-slide")[$ionicSlideBoxDelegate.currentIndex()])
    var hightlightedCell = currentSlide.find(".col.date-col.active")
    if (hightlightedCell.length == 0) {
      removeAllHighlightedCells()
      var nextDay = currentSlide.find(".col.date-col").first()
      nextDay.addClass("active")
      Calendar.updateSwapButtonStatus(nextDay)
    }
  }

  $scope.$on('goToNextCalendarSlide', function(event, args) {
    $ionicSlideBoxDelegate.next()
    $rootScope.$broadcast("arrivedOnNextCalendarSlide", {nextDay: args.nextDay});
  });

  function removeAllHighlightedCells() {
    $(".dates .active").removeClass("active")
  }

  $scope.formatStartTime = function(shift) {
    var str = General.formatStartTimeFromCalendar(shift)
    return str
  }

  function updateNotes(ele) {
    var notes = ele.attr("data-notes")
    if (notes) {
      $(".notes-display .actual-note").text(notes)
      Calendar.emptyNote = false
    } else {
      Calendar.emptyNote = true
    }
  }
})