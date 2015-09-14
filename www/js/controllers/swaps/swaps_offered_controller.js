angular.module('starter.controllers')

.controller('SwapsOfferedCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  $scope.swapsOfferedTabSelected = function() {
    console.log("Swaps offered")
  }
})