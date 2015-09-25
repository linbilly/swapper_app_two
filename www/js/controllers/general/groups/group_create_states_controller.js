angular.module('starter.controllers')

.controller('GroupCreateStatesCtrl', function($scope, $ionicNavBarDelegate, $ionicHistory, $timeout, Locations, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  if (Api.initialSignUp) {
    removeTabs()
  }

  function removeTabs() {
    $(".tab-nav").addClass("tabs-item-hide")
    $timeout(function() {
      $(".scroll-content").removeClass("has-tabs")
    }, 100)
  }

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.states = Locations.states()
  $scope.stateName = Locations.selectedStateName
  $scope.stateId = Locations.selectedStateId

  $scope.stateSelected = function(stateName, stateId) {
    Locations.selectedStateName = stateName
    Locations.selectedStateId = stateId
  }
})