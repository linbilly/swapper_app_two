var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $stateParams, $ionicPopover, Api, Calendar) {

  loadShifts()
  
  function loadShifts() {
    Api.getAllShifts()
    $scope.loader = true
  }

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts)
    $scope.$apply()
    $scope.loader = false
    Calendar.highlightToday()
  })
})