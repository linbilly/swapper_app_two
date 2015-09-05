angular.module('starter.controllers')

.controller('SwapsUpForGrabsCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.upForGrabsTabSelected = function() {
    Api.getShiftsUpForGrabs()
  }

  $scope.$on('shiftsUpForGrabsFetched', function(event, args) {
    $scope.shiftsUpForGrabs = Api.shiftsUpForGrabs
    $scope.$apply()
    $scope.loader = false
  });
})