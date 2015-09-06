angular.module('starter.controllers')

.controller('SwapsNewOfferCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.day = $stateParams.day

  Api.getAllShiftsSwappable($stateParams.shiftId)

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }

  $scope.$on('shiftsFetched', function(event, args) {
    Calendar.cannot_swap_shift_dates = args.cannot_swap_shift_dates
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
    $scope.loader = false
  })
})