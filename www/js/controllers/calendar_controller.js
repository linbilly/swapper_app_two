angular.module('starter.controllers')

.controller('CalendarCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.calendarObjects = Calendar.setupCalendarObjects()

  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous()
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next()
  }

  $scope.dateSelected = function($event) {
    $(".active").removeClass("active")
    
    var ele = null
    if ($($event.target).hasClass("date-col")) {
      ele = $($event.target)
    } else {
      ele = $($event.target).parents(".date-col")
    }
    ele.addClass("active")
  }
})