angular.module('starter.controllers')

.controller('InitialGroupsDetailCtrl', function($scope, $state, $stateParams, $ionicNavBarDelegate, Api) {
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
    $scope.buttonClicked = !$scope.buttonClicked
    Api.joinGroup($stateParams.groupId)
  }

  $scope.$on('groupJoined', function() {
    if (!Api.initialCreatingNewGroup) {
      $state.go("tab.calendar")
    }
  });

  $scope.leaveGroup = function() {
    Api.leaveGroup($stateParams.groupId)
  }

  $scope.$on('leftGroup', function() {
    Api.groupDetails($stateParams.groupId)
  });
})