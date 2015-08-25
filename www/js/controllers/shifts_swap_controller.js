angular.module('starter.controllers')

.controller('ShiftsSwapCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.calendarObjects = Calendar.setupCalendarObjects()

  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.$getByHandle('swap').previous()
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.$getByHandle('swap').next()
  }
})