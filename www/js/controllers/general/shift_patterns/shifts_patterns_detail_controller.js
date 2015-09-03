angular.module('starter.controllers')

.controller('ShiftsPatternsDetailCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, Api, ShiftType, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.actionButtonText = "Save"
  $scope.buttonClicked = false

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
    ShiftType.upHour($event, $scope)
  }

  $scope.upMinute = function($event) {
    ShiftType.upMinute($event, $scope)
  }

  $scope.downHour = function($event) {
    ShiftType.downHour($event, $scope)
  }

  $scope.downMinute = function($event) {
    ShiftType.downMinute($event, $scope)
  }

  function setup() {
    if ($scope.shiftPattern) {
      setEndTime()
      ShiftType.checkNextDayEnd($scope)
      $scope.shiftPatternName = $scope.shiftPattern.name
      $scope.abbreviation = $scope.shiftPattern.abbreviation
    }
  }

  function setEndTime() {
    var now = new Date()
    $scope.shiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDay(), $scope.shiftPattern.start_hour, $scope.shiftPattern.start_minute)
    $scope.shiftEnd = new Date($scope.shiftStart.getTime() + $scope.shiftPattern.duration * 60 * 1000)
    $scope.shiftPattern.end_hour = $scope.shiftEnd.getHours()
    $scope.shiftPattern.end_minute = $scope.shiftEnd.getMinutes()
  }

  $scope.saveShiftPattern = function(shiftPatternName, abbreviation) {
    $scope.inputError = false
    $scope.abbInputError = false
    $scope.lengthError = false
    
    if (ShiftType.noErrors($scope, shiftPatternName, abbreviation)) {
      $scope.buttonClicked = true
      $scope.actionButtonText = "Saving"
      var shiftParams = {
        name: shiftPatternName,
        abbreviation: abbreviation,
        start_hour: $scope.shiftPattern.start_hour,
        start_minute: $scope.shiftPattern.start_minute,
        duration: ShiftType.getDuration($scope)
      }
      Api.updateShiftPattern($stateParams.patternId, shiftParams)
    }
  }

  $scope.deleteShiftPattern = function() {
    swal({
      title: "Are you sure?",
      text: "Any shifts with this pattern will also be deleted.",
      type: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Yup!",
    }, function(){
      Api.deleteShiftPattern($stateParams.patternId)
    });
    $("fieldset").addClass("hide")
  }

  $scope.$on('shiftTypeUpdated', function(event, args) {
    $scope.actionButtonText = "Save"
    $scope.buttonClicked = false
    Notification.message = args.name + " successfully updated"
    $state.go('tab.shifts-patterns', {}, {reload: true});
  });

  $scope.$on('shiftTypeDeleted', function(event, args) {
    Notification.message = args.name + " successfully deleted"
    $state.go('tab.shifts-patterns', {}, {reload: true});
  });
})