angular.module('starter.controllers')

.controller('CalendarCtrl', function($scope, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous()
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next()
  }

  $scope.dateSelected = function($event) {
    $(".dates .active").removeClass("active")

    var ele = null
    if ($($event.target).hasClass("date-col")) {
      ele = $($event.target)
    } else {
      ele = $($event.target).parents(".date-col")
    }
    ele.addClass("active")
  }
})