angular.module('starter.controllers')

.controller('ShiftsPatternsCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, Api, ShiftPopover) {
  $ionicNavBarDelegate.showBackButton(false)
  ShiftPopover.renderPopover($scope)
  $scope.loader = true;
  $scope.message = Api.message

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
    $scope.groupsWithShiftTypes = Api.groupsWithShiftTypes
    $scope.loader = false;
  });
})