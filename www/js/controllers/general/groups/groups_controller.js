angular.module('starter.controllers')

.controller('GroupsCtrl', function($scope, $ionicNavBarDelegate, Api, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true;

  Api.getGroups()

  $scope.$on('groupsFetched', function() {
    $scope.groups = Api.groups
    $scope.loader = false;
  });

  if (Notification.message) {
    $scope.message = Notification.message
    Notification.message = null
  }
})