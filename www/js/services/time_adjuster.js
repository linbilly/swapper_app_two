angular.module('starter.services')

.factory('TimeAdjuster', function() {
  var TimeAdjuster = {};

  TimeAdjuster.upHour = function($event, $scope) {
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
    TimeAdjuster.checkNextDayEnd($scope)
  }

  TimeAdjuster.upMinute = function($event, $scope) {
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
    TimeAdjuster.checkNextDayEnd($scope)
  }

  TimeAdjuster.downHour = function($event, $scope) {
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
    TimeAdjuster.checkNextDayEnd($scope)
  }

  TimeAdjuster.downMinute = function($event, $scope) {
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
    TimeAdjuster.checkNextDayEnd($scope)
  }

  TimeAdjuster.checkNextDayEnd = function($scope) {
    if ($scope.shiftPattern.start_hour > $scope.shiftPattern.end_hour) {
      $scope.nextDayEnd = true
    } else if ($scope.shiftPattern.start_hour == $scope.shiftPattern.end_hour && $scope.shiftPattern.start_minute >= $scope.shiftPattern.end_minute) {
      $scope.nextDayEnd = true
    } else {
      $scope.nextDayEnd = false
    }
  }

  TimeAdjuster.getDuration = function($scope) {
    var minutes = 0
    if ($scope.nextDayEnd) {
      minutes += (24 - $scope.shiftPattern.start_hour) * 60
      minutes += $scope.shiftPattern.end_hour * 60
    } else {
      minutes += ($scope.shiftPattern.end_hour - $scope.shiftPattern.start_hour) * 60
    }
    return TimeAdjuster.minutesDifference(minutes, $scope)
  }

  TimeAdjuster.minutesDifference = function(minutes, $scope) {
    if ($scope.shiftPattern.end_minute > $scope.shiftPattern.start_minute) {
      minutes += $scope.shiftPattern.end_minute - $scope.shiftPattern.start_minute
    } else {
      minutes -= $scope.shiftPattern.start_minute - $scope.shiftPattern.end_minute
    }
    return minutes
  }

  return TimeAdjuster;
});