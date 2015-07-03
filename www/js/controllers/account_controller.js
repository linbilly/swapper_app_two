angular.module('starter.controllers', [])

.controller('AccountCtrl', function($scope, Api) {
  $scope.createUser = function(email, firstName, lastName, password) {
    Api.createUser(email, firstName, lastName, password)
  }
})