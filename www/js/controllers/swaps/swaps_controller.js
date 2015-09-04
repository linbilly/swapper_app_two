angular.module('starter.controllers')

.controller('SwapsCtrl', function($rootScope, $scope, $ionicNavBarDelegate, Api, General, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  if (Notification.message) {
    $scope.message = Notification.message
    Notification.message = null
  }

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.url == "/swaps/index") {
      Api.getOwnShiftsWithSwaps()
    }
  })
})