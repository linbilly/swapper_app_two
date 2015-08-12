angular.module('starter.controllers')

.controller('ShiftsPatternsCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, Api, ShiftPopover) {
  $ionicNavBarDelegate.showBackButton(false)
  ShiftPopover.renderPopover($scope)
  $scope.loader = true;

  $scope.$on('$ionicView.enter', function(){
    Api.getShiftPatterns()
  });

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