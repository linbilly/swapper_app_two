angular.module('starter.controllers')

.controller('GroupsCtrl', function($scope, Api) {
  $scope.fetchGroups = function() {
    Api.getGroups()
  }
})