angular.module('starter.controllers')

.controller('GroupDetailCtrl', function($scope, $stateParams, Api) {
  $scope.loader = true
  Api.groupDetails($stateParams.groupId)

  $scope.$on('groupDetailsFetched', function() {
    $scope.groupName = Api.group.name
    $scope.users = Api.groupUsers
    $scope.loader = false

    if ($scope.users.length == 0) {
      $scope.message = "Be the first to join this group!"
    } else {
      $scope.message = "This group has " + $scope.users.length + " members. Join to swap your shifts with them!"
    }
  });
})