angular.module('starter.controllers', [])

.controller('CalendarCtrl', function($rootScope, $scope, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api) {
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
  }

  $scope.highlightACell = function() {
    var currentSlide = $($("ion-slide")[$ionicSlideBoxDelegate.currentIndex()])
    var hightlightedCell = currentSlide.find(".col.date-col.active")
    if (hightlightedCell.length == 0) {
      removeAllHighlightedCells()
      currentSlide.find(".col.date-col").first().addClass("active")
    }
  }

  $scope.$on('goToNextCalendarSlide', function(event, args) {
    $ionicSlideBoxDelegate.next()
    $rootScope.$broadcast("arrivedOnNextCalendarSlide", {nextDay: args.nextDay});
  });

  function removeAllHighlightedCells() {
    $(".dates .active").removeClass("active")
  }
})