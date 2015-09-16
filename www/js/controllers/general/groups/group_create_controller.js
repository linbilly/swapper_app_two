angular.module('starter.controllers')

.controller('GroupCreateCtrl', function($scope, $state, $ionicNavBarDelegate, Api, Notification) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.createGroup = function (groupName){
    Api.createGroup(groupName)
    Notification.message = groupName + " successfully created."
    $state.go('tab.groups', {}, {reload: true});
  }
})