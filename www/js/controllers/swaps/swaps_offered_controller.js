angular.module('starter.controllers')

.controller('SwapsOfferedCtrl', function($scope, $ionicNavBarDelegate, $ionicTabsDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.swapsOfferedTabSelected = function() {
    $scope.swapsOfferedLoader = true
    Api.swapsOffered()
  }

  $scope.$on('swapsOfferedFetched', function(event, args) {
    $scope.swapsOffered = Api.swapsOfferedByUser
    $scope.swapsOfferedByStatus = Api.swapsOfferedByStatus
    $scope.swapsOfferedLoader = false
    $scope.$apply()
  });

  $scope.goToUpForGrabsTab = function() {
    $ionicTabsDelegate._instances[1].select(2) // Within the second set of tabs, go to the third tab
  }
})