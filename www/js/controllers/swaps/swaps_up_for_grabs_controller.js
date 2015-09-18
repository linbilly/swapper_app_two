angular.module('starter.controllers')

.controller('SwapsUpForGrabsCtrl', function($scope, $ionicNavBarDelegate, $timeout, $state, Api, Calendar, General) {
  $ionicNavBarDelegate.showBackButton(false)

  Api.getAllShifts()
  General.upForGrabsController = $scope

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, args.available_shifts)
    $scope.$apply()
    $scope.loader = false
  })

  $scope.upForGrabsTabSelected = function() {
    $scope.loader = true
    $scope.calendarObjects = null
    Api.getAllShifts()
  }

  $scope.goToViewAllAsList = function() {
    $state.go('tab.swaps-up-for-grabs-list', {day: "all"}, {reload: true});
  }
})