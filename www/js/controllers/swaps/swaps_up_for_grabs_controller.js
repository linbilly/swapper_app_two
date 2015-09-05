angular.module('starter.controllers')

.controller('SwapsUpForGrabsCtrl', function($scope, $ionicNavBarDelegate, $timeout, Api, Calendar, General) {
  $ionicNavBarDelegate.showBackButton(false)

  Api.getAllShifts()
  General.upForGrabsController = $scope

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts)
    $scope.$apply()
    $scope.loader = false
    Calendar.highlightToday()
  })

  $scope.upForGrabsTabSelected = function() {
    $scope.loader = true
    $scope.calendarObjects = null
    Api.getAllShifts()

    $timeout(function() {
      Calendar.highlightToday()
    }, 500)
  }
})