angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.calendarObjects = Calendar.setupCalendarObjects()

  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous()
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next()
  }
})