angular.module('starter.controllers')

.controller('GroupsCtrl', function($scope, $ionicNavBarDelegate, Api, Notification, General) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true;

  Api.getGroups()

  $scope.$on('groupsFetched', function(event, args) {
    $scope.groups = Api.groups
    $scope.userId = args.userId
    $scope.loader = false;
    $scope.$apply()
  });

  if (Notification.message) {
    $scope.message = Notification.message
    Notification.message = null
  }

  $scope.hasUser = function(group) {
    var users = General.findById(group.users, $scope.userId)
    if (users) {
      return true
    } else {
      return false
    }
  }
})