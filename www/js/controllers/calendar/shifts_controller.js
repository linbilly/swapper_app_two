var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $stateParams, $ionicPopover, Api, Calendar) {
  $scope.dateYear = Calendar.dateYear()
  $scope.calendar = Calendar
  $scope.calendar.emptyNote = true

  if (Calendar.needReload($scope.dateYear)) {
    $scope.loader = true
    loadShifts()
  }
  
  function loadShifts() {
    Api.getAllShifts()
  }

  $scope.$on('shiftsFetched', function(event, args) {
    console.log("shifts controller")
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
    $scope.loader = false
    window.localStorage['timeLastReloaded'] = $scope.dateYear
    Calendar.highlightToday()
  })
})