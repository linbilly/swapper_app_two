angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($scope, $ionicPopover, Api, ShiftPopover) {
  ShiftPopover.renderPopover($scope)

  $scope.popoverClicked = function() {
    ShiftPopover.popoverClicked($scope)
  }
})