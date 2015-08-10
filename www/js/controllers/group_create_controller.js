angular.module('starter.controllers')

.controller('GroupCreateCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.createGroup = function (groupName){
    Api.createGroup(groupName)
  }

})