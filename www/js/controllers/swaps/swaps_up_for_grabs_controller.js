angular.module('starter.controllers')

.controller('SwapsUpForGrabsCtrl', function($scope, $ionicNavBarDelegate, $timeout, $state, Api, Calendar, General) {
  $ionicNavBarDelegate.showBackButton(false)

  Api.getAllShifts()
  General.upForGrabsController = $scope

  $scope.upForGrabsTabSelected = function() {
    $scope.upForGrabsLoader = true
    $scope.calendarObjects = null
    Api.getAllShifts()
  }

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, args.available_shifts)
    $scope.upForGrabsLoader = false
    $scope.$apply()
  })

  $scope.goToViewAllAsList = function() {
    $state.go('tab.swaps-up-for-grabs-list', {day: "all"}, {reload: true});
  }
})