var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $ionicPopover, Api, ShiftPopover) {
  ShiftPopover.renderPopover($scope)

  $scope.popoverClicked = function() {
    ShiftPopover.popoverClicked($scope)
  }
})