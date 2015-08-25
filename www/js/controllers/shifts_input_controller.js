angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.shiftTypes = ["Dx", "Nx"]
})