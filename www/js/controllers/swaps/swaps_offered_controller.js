angular.module('starter.controllers')

.controller('SwapsOfferedCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.swapsOfferedTabSelected = function() {
    $scope.loader = true
    Api.swapsOffered()
  }

  $scope.$on('swapsOfferedFetched', function(event, args) {
    $scope.swapsOffered = Api.swapsOfferedByUser
    $scope.loader = false
  });
})