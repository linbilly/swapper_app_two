angular.module('starter.controllers')

.controller('GroupDetailCtrl', function($scope, $stateParams, Api) {
  $scope.loader = true
  Api.groupDetails($stateParams.groupId)

  $scope.$on('groupDetailsFetched', function() {
    $scope.groupName = Api.group.name
    $scope.users = Api.groupUsers
    $scope.loader = false
  });
})