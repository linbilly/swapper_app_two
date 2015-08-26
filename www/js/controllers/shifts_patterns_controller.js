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
    var now = new Date()
    var shiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDay(), shiftType.start_hour, shiftType.start_minute)
    var shiftEnd = new Date(shiftStart.getTime() + shiftType.duration * 60 * 1000)
    var hours = shiftEnd.getHours()
    var minutes = shiftEnd.getMinutes()

    if (shiftEnd.getHours() < 10) {
      hours = "0" + shiftEnd.getHours().toString()
    }

    if (shiftEnd.getMinutes() < 10) {
      minutes = "0" + shiftEnd.getMinutes().toString()
    }

    return hours + ":" + minutes
  }
})