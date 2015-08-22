angular.module('starter.controllers')

.controller('ShiftsPatternsDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Api, TimeAdjuster) {
  $ionicNavBarDelegate.showBackButton(false)

  if (!Api.groupsWithShiftTypes) {
    // For testing only - if loading the page directly without first loading shift patterns
    Api.getShiftPatterns()
  } else {
    $scope.shiftPattern = Api.shiftTypes[$stateParams.patternId]
    setup()
  }

  $scope.$on('shiftTypesFetched', function() {
    $scope.shiftPattern = Api.shiftTypes[$stateParams.patternId]
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
    setEndTime()
    TimeAdjuster.checkNextDayEnd($scope)
    $scope.shiftPatternName = $scope.shiftPattern.name
  }

  function setEndTime() {
    var now = new Date()
    $scope.shiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDay(), $scope.shiftPattern.start_hour, $scope.shiftPattern.start_minute)
    $scope.shiftEnd = new Date($scope.shiftStart.getTime() + $scope.shiftPattern.duration * 60 * 1000)
    $scope.shiftPattern.end_hour = $scope.shiftEnd.getHours()
    $scope.shiftPattern.end_minute = $scope.shiftEnd.getMinutes()
  }

  $scope.saveShiftPattern = function() {
    var shiftParams = {
      name: $scope.shiftPatternName,
      start_hour: $scope.shiftPattern.start_hour,
      start_minute: $scope.shiftPattern.start_minute,
      duration: TimeAdjuster.getDuration($scope)
    }
    Api.updateShiftPattern($stateParams.patternId, shiftParams)
  }
})

.filter('numberFixedLen', function () {
  return function (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    if (isNaN(num) || isNaN(len)) {
      return n;
    }
    num = ''+num;
    while (num.length < len) {
      num = '0'+num;
    }
    return num;
  };
});