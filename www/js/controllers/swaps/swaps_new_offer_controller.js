angular.module('starter.controllers')

.controller('SwapsNewOfferCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, Api) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.day = $stateParams.day

  $scope.clearHistory = function() {
    $ionicHistory.clearHistory()
  }
})