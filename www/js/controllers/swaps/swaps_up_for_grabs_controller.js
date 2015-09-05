angular.module('starter.controllers')

.controller('SwapsUpForGrabsCtrl', function($scope, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicHistory, Api, Calendar, General) {
  $ionicNavBarDelegate.showBackButton(false)

  Api.getAllShifts()
  General.upForGrabsController = $scope

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts)
    $scope.$apply()
    $scope.loader = false
    window.localStorage['timeLastReloaded'] = $scope.dateYear
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

  function reloadSlideBox() {
    $ionicSlideBoxDelegate.update()
  }
})