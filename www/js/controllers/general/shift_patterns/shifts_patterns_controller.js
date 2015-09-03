angular.module('starter.controllers')

.controller('ShiftsPatternsCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, Api, ShiftPopover, Notification, ShiftType) {
  $ionicNavBarDelegate.showBackButton(false)
  ShiftPopover.renderPopover($scope)
  $scope.loader = true;
  $scope.message = Notification.message

  Api.getShiftPatterns()

  $scope.fetchShiftPatterns = function() {
    Api.getShiftPatterns()
  };

  $scope.$on('shiftTypesFetched', function() {
    $scope.groupsWithShiftTypes = Api.groupsWithShiftTypes
    $scope.loader = false;
  });

  $scope.prettyEndTime = function(shiftType) {
    return ShiftType.prettyEndTime(shiftType)
  }
})