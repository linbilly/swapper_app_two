angular.module('starter.controllers')

.controller('InitialGroupsDetailCtrl', function($scope, $state, $stateParams, $ionicNavBarDelegate, $ionicHistory, Api) {
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

  $scope.$on('groupJoined', function() {
    if (!Api.initialCreatingNewGroup) {
      $state.go("tab.calendar")
    }
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