var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $stateParams, $ionicPopover, Api, Calendar) {
  $scope.dateYear = Calendar.dateYear()

  if (Calendar.needReload($scope.dateYear)) {
    loadShifts()
  }
  
  function loadShifts() {
    Api.getAllShifts()
    $scope.loader = true
  }

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts)
    $scope.$apply()
    $scope.loader = false
    window.localStorage['timeLastReloaded'] = $scope.dateYear
    Calendar.highlightToday()
  })
})