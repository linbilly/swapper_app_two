angular.module('starter.controllers')

.controller('GroupCreateCtrl', function($scope, Api) {
  $scope.loader = true;
  $scope.fetchGroups = function() {
    Api.getGroups()
  };

  $scope.$on('groupsFetched', function() {
    $scope.groups = Api.groups
    $scope.loader = false;
    $scope.$apply();
  });

  $scope.createGroup = function(){
    
  }
})