angular.module('starter.controllers')

.controller('ShiftsPatternsDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  if (!Api.groupsWithShiftTypes) {
    // For testing only - if loading the page directly without first loading shift patterns
    Api.getShiftPatterns()
  } else {
    $scope.shiftPattern = Api.shiftTypes[$stateParams.patternId]
    setEndTime()
    checkNextDayEnd()
  }

  $scope.$on('shiftTypesFetched', function() {
    $scope.shiftPattern = Api.shiftTypes[$stateParams.patternId]
    setEndTime()
    checkNextDayEnd()
  });

  $scope.upHour = function($event) {
    var ele = $($event.target)
    if (ele.hasClass("start")) {
      if ($scope.shiftPattern.start_hour == 23) {
        $scope.shiftPattern.start_hour = 0
      } else {
        $scope.shiftPattern.start_hour = $scope.shiftPattern.start_hour + 1
      }
    } else {
      if ($scope.shiftPattern.end_hour == 23) {
        $scope.shiftPattern.end_hour = 0
      } else {
        $scope.shiftPattern.end_hour = $scope.shiftPattern.end_hour + 1
      }
    }
    checkNextDayEnd()
  }

  $scope.upMinute = function($event) {
    var ele = $($event.target)
    if (ele.hasClass("start")) {
      if ($scope.shiftPattern.start_minute == 55) {
        $scope.shiftPattern.start_minute = 0
      } else {
        $scope.shiftPattern.start_minute = $scope.shiftPattern.start_minute + 5
      }
    } else {
      if ($scope.shiftPattern.end_minute == 55) {
        $scope.shiftPattern.end_minute = 0
      } else {
        $scope.shiftPattern.end_minute = $scope.shiftPattern.end_minute + 5
      }
    }
    checkNextDayEnd()
  }

  $scope.downHour = function($event) {
    var ele = $($event.target)
    if (ele.hasClass("start")) {
      if ($scope.shiftPattern.start_hour == 0) {
        $scope.shiftPattern.start_hour = 23
      } else {
        $scope.shiftPattern.start_hour = $scope.shiftPattern.start_hour - 1
      }
    } else {
      if ($scope.shiftPattern.end_hour == 0) {
        $scope.shiftPattern.end_hour = 23
      } else {
        $scope.shiftPattern.end_hour = $scope.shiftPattern.end_hour - 1
      }
    }
    checkNextDayEnd()
  }

  $scope.downMinute = function($event) {
    var ele = $($event.target)
    if (ele.hasClass("start")) {
      if ($scope.shiftPattern.start_minute == 0) {
        $scope.shiftPattern.start_minute = 55
      } else {
        $scope.shiftPattern.start_minute = $scope.shiftPattern.start_minute - 5
      }
    } else {
      if ($scope.shiftPattern.end_minute == 0) {
        $scope.shiftPattern.end_minute = 55
      } else {
        $scope.shiftPattern.end_minute = $scope.shiftPattern.end_minute - 5
      }
    }
    checkNextDayEnd()
  }

  function setEndTime() {
    var now = new Date()
    $scope.shiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDay(), $scope.shiftPattern.start_hour, $scope.shiftPattern.start_minute)
    $scope.shiftEnd = new Date($scope.shiftStart.getTime() + $scope.shiftPattern.duration * 60 * 1000)
    $scope.shiftPattern.end_hour = $scope.shiftEnd.getHours()
    $scope.shiftPattern.end_minute = $scope.shiftEnd.getMinutes()
  }

  function checkNextDayEnd() {
    if ($scope.shiftPattern.start_hour > $scope.shiftPattern.end_hour) {
      $scope.nextDayEnd = true
    } else if ($scope.shiftPattern.start_hour == $scope.shiftPattern.end_hour && $scope.shiftPattern.start_minute >= $scope.shiftPattern.end_minute) {
      $scope.nextDayEnd = true
    } else {
      $scope.nextDayEnd = false
    }
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