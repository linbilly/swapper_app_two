angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.calendarObjects = Calendar.setupCalendarObjects()

  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.$getByHandle('input').previous()
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.$getByHandle('input').next()
  }
})