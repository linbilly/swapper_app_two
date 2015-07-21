angular.module('starter.controllers')

.controller('GroupCreateCtrl', function($scope, Api) {
  $scope.createGroup = function (groupName){
    Api.createGroup(groupName)
  }

})