angular.module('starter.controllers')

.controller('GroupsCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true;
  $scope.fetchGroups = function() {
    Api.getGroups()
  };

  $scope.$on('groupsFetched', function() {
    $scope.groups = Api.groups
    $scope.loader = false;
  });
})