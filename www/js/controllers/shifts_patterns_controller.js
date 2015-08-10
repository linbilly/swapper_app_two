angular.module('starter.controllers')

.controller('ShiftsPatternsCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, Api, ShiftPopover) {
  $ionicNavBarDelegate.showBackButton(false)
  ShiftPopover.renderPopover($scope)
  $scope.loader = true;

  $scope.popoverClicked = function() {
    ShiftPopover.popoverClicked($scope)
  }

  $scope.fetchShiftPatterns = function() {
    Api.getShiftPatterns()
  };

  $scope.$on('shiftTypesFetched', function() {
    $scope.groupsWithShiftTypes = JSON.parse(Api.groupsWithShiftTypes)
    $scope.loader = false;
  });
})