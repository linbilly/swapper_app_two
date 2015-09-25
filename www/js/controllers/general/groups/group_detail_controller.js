angular.module('starter.controllers')

.controller('GroupDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  $scope.buttonClicked = false
  Api.groupDetails($stateParams.groupId)

  $scope.$on('groupDetailsFetched', function() {
    $scope.group = Api.group
    $scope.users = Api.groupUsers
    $scope.loader = false
    $scope.buttonClicked = false
    $scope.groupHasUser = Api.userPartOfGroup
    $scope.$apply()
  });

  $scope.joinGroup = function() {
    $scope.loader = true
    $scope.buttonClicked = !$scope.buttonClicked
    Api.joinGroup($stateParams.groupId)
  }

  $scope.$on(['groupJoined'], function() {
    $scope.loader = false
    Api.groupDetails($stateParams.groupId)
    $scope.$apply()
  });

  $scope.leaveGroup = function() {
    $scope.loader = true
    Api.leaveGroup($stateParams.groupId)
  }

  $scope.$on('leftGroup', function() {
    $scope.loader = false
    Api.groupDetails($stateParams.groupId)
    $scope.$apply()
  });
})