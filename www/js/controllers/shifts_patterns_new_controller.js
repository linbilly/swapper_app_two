angular.module('starter.controllers')

.controller('ShiftsPatternsNewCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Api, TimeAdjuster) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.shiftPattern = {}

  if (!Api.groups) {
    Api.getGroups()
  } else {
    $scope.shiftPattern.group = Api.groupsObj[$stateParams.groupId]
    setup()
  }

  $scope.$on('groupsFetched', function() {
    $scope.shiftPattern.group = Api.groupsObj[$stateParams.groupId]
    setup()
  });

  $scope.upHour = function($event) {
    TimeAdjuster.upHour($event, $scope)
  }

  $scope.upMinute = function($event) {
    TimeAdjuster.upMinute($event, $scope)
  }

  $scope.downHour = function($event) {
    TimeAdjuster.downHour($event, $scope)
  }

  $scope.downMinute = function($event) {
    TimeAdjuster.downMinute($event, $scope)
  }

  function setup() {
    setInitialHours()
    TimeAdjuster.checkNextDayEnd($scope)
  }

  function setInitialHours() {
    $scope.shiftPattern.start_hour = 7
    $scope.shiftPattern.start_minute = 30
    $scope.shiftPattern.end_hour = 19
    $scope.shiftPattern.end_minute = 30
  }

  $scope.createShiftPattern = function(shiftPatternName) {
    var shiftParams = {
      name: shiftPatternName,
      start_hour: $scope.shiftPattern.start_hour,
      start_minute: $scope.shiftPattern.start_minute,
      duration: TimeAdjuster.getDuration($scope)
    }
    Api.createShiftPattern($stateParams.groupId, shiftParams)
  }
})