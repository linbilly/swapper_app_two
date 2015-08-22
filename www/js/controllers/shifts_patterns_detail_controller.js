angular.module('starter.controllers')

.controller('ShiftsPatternsDetailCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, Api, TimeAdjuster, Notification) {
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
    if ($scope.shiftPattern) {
      setEndTime()
      TimeAdjuster.checkNextDayEnd($scope)
      $scope.shiftPatternName = $scope.shiftPattern.name
    }
  }

  function setEndTime() {
    var now = new Date()
    $scope.shiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDay(), $scope.shiftPattern.start_hour, $scope.shiftPattern.start_minute)
    $scope.shiftEnd = new Date($scope.shiftStart.getTime() + $scope.shiftPattern.duration * 60 * 1000)
    $scope.shiftPattern.end_hour = $scope.shiftEnd.getHours()
    $scope.shiftPattern.end_minute = $scope.shiftEnd.getMinutes()
  }

  $scope.saveShiftPattern = function(shiftPatternName) {
    var shiftParams = {
      name: shiftPatternName,
      start_hour: $scope.shiftPattern.start_hour,
      start_minute: $scope.shiftPattern.start_minute,
      duration: TimeAdjuster.getDuration($scope)
    }
    Api.updateShiftPattern($stateParams.patternId, shiftParams)
  }

  $scope.deleteShiftPattern = function() {
    swal({
      title: "Are you sure?",
      text: "Deleting is forever...",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yup!",
    }, function(){
      Api.deleteShiftPattern($stateParams.patternId)
    });
  }

  $scope.$on('shiftTypeUpdated', function(event, args) {
    Notification.message = args.name + " successfully updated"
    $state.go('tab.shifts-patterns', {}, {reload: true});
  });

  $scope.$on('shiftTypeDeleted', function(event, args) {
    Notification.message = args.name + " successfully deleted"
    $state.go('tab.shifts-patterns', {}, {reload: true});
  });
})