angular.module('starter.controllers')

.controller('ShiftsPatternsNewCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, Api, ShiftType, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.shiftPattern = {}
  $scope.actionButtonText = "Create"
  $scope.loader = false
  $scope.shiftPattern.swappable = true
  $scope.shiftPattern.entireDay = false

  Api.getGroups()

  $scope.$on('groupsFetched', function() {
    $scope.shiftPattern.group = Api.groupsObj[$stateParams.groupId]
    setup()
    $scope.$apply()
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
    setInitialHours()
    ShiftType.checkNextDayEnd($scope)
  }

  function setInitialHours() {
    $scope.shiftPattern.start_hour = 7
    $scope.shiftPattern.start_minute = 30
    $scope.shiftPattern.end_hour = 19
    $scope.shiftPattern.end_minute = 30
  }

  $scope.createShiftPattern = function(shiftPatternName, abbreviation) {
    $scope.inputError = false
    $scope.abbInputError = false
    $scope.lengthError = false

    if (ShiftType.noErrors($scope, shiftPatternName, abbreviation)) {
      $scope.loader = true
      $scope.actionButtonText = "Creating"

      var start_hour = null
      var start_minute = null
      var duration = null

      if ($scope.shiftPattern.entireDay) {
        start_hour = 0
        start_minute = 0
        duration = 1435
      } else {
        start_hour = $scope.shiftPattern.start_hour
        start_minute = $scope.shiftPattern.start_minute
        duration = ShiftType.getDuration($scope)
      }

      var shiftParams = {
        name: shiftPatternName,
        abbreviation: abbreviation,
        start_hour: start_hour,
        start_minute: start_minute,
        duration: duration,
        swappable: $scope.shiftPattern.swappable
      }
      Api.createShiftPattern($stateParams.groupId, shiftParams)
      $scope.shiftPatternName = "" // Clear it out in case user wants to create another one
    }
  }

  $scope.$on('shiftTypeCreated', function(event, args) {
    $scope.actionButtonText = "Create"
    $scope.loader = false
    Notification.message = args.name + " successfully created"
    $state.go('tab.shifts-patterns', {}, {reload: true});
  });
})