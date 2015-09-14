angular.module('starter.controllers')

.controller('SwapsOfferedCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.swapsOfferedTabSelected = function() {
    Api.swapsOffered()
  }

  $scope.$on('swapsOfferedFetched', function(event, args) {
    // $scope.swapsOffered = Api.swapsOfferedByUser
    $scope.swapsOfferedByStatus = Api.swapsOfferedByStatus
    $scope.loader = false
  });
})