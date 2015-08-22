angular.module('starter.services')

.factory('ShiftType', function() {
  var ShiftType = {};

  ShiftType.upHour = function($event, $scope) {
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
    ShiftType.checkNextDayEnd($scope)
  }

  ShiftType.upMinute = function($event, $scope) {
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
    ShiftType.checkNextDayEnd($scope)
  }

  ShiftType.downHour = function($event, $scope) {
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
    ShiftType.checkNextDayEnd($scope)
  }

  ShiftType.downMinute = function($event, $scope) {
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
    ShiftType.checkNextDayEnd($scope)
  }

  ShiftType.checkNextDayEnd = function($scope) {
    if ($scope.shiftPattern.start_hour > $scope.shiftPattern.end_hour) {
      $scope.nextDayEnd = true
    } else if ($scope.shiftPattern.start_hour == $scope.shiftPattern.end_hour && $scope.shiftPattern.start_minute >= $scope.shiftPattern.end_minute) {
      $scope.nextDayEnd = true
    } else {
      $scope.nextDayEnd = false
    }
  }

  ShiftType.getDuration = function($scope) {
    var minutes = 0
    if ($scope.nextDayEnd) {
      minutes += (24 - $scope.shiftPattern.start_hour) * 60
      minutes += $scope.shiftPattern.end_hour * 60
    } else {
      minutes += ($scope.shiftPattern.end_hour - $scope.shiftPattern.start_hour) * 60
    }
    return ShiftType.minutesDifference(minutes, $scope)
  }

  ShiftType.minutesDifference = function(minutes, $scope) {
    if ($scope.shiftPattern.end_minute > $scope.shiftPattern.start_minute) {
      minutes += $scope.shiftPattern.end_minute - $scope.shiftPattern.start_minute
    } else {
      minutes -= $scope.shiftPattern.start_minute - $scope.shiftPattern.end_minute
    }
    return minutes
  }

  ShiftType.checkNameFilledIn = function(shiftParams) {
    if (typeof shiftParams === "undefined") {
      return false
    } else if (shiftParams.trim() == "") {
      return false
    } else {
      return true
    }
  }

  return ShiftType;
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