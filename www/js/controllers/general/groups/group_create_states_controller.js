angular.module('starter.controllers')

.controller('GroupCreateStatesCtrl', function($scope, $ionicNavBarDelegate, Locations) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.states = Locations.states()
  $scope.stateName = Locations.selectedStateName

  $scope.stateSelected = function(stateName, stateId) {
    Locations.selectedStateName = stateName
    Locations.selectedStateId = stateId
  }
})