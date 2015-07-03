angular.module('starter.controllers', [])

.controller('AccountCtrl', function($scope, Api) {
  $scope.createUser = function() {
    Api.createUser($scope)
  }
})