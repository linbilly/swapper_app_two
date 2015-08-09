angular.module('starter.controllers')

.controller('GroupDetailCtrl', function($scope, $stateParams, Api) {
  $scope.loader = true
  Api.groupDetails($stateParams.groupId)

  $scope.$on('groupDetailsFetched', function() {
    $scope.groupName = Api.group.name
    $scope.users = Api.groupUsers
    $scope.loader = false
    $scope.groupHasUser = Api.userPartOfGroup

    if ($scope.groupHasUser) {
      $scope.message = "This group has " + $scope.users.length + " members... and you're one of them! Having fun swapping shifts!"
    } else {
      if ($scope.users.length == 0) {
        $scope.message = "Be the first to join this group!"
      } else {
        $scope.message = "This group has " + $scope.users.length + " members. Join to swap your shifts with them!"
      }
    }
    $scope.$apply()
  });

  $scope.joinGroup = function() {
    Api.joinGroup($stateParams.groupId)
  }

  $scope.$on(['groupJoined'], function() {
    Api.groupDetails($stateParams.groupId)
  });

  $scope.leaveGroup = function() {
    Api.leaveGroup($stateParams.groupId)
  }

  $scope.$on('leftGroup', function() {
    Api.groupDetails($stateParams.groupId)
  });
})