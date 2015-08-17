angular.module('starter.controllers')

.controller('ShiftsPatternsDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  if (!Api.groupsWithShiftTypes) {
    // For testing only - if loading the page directly without first loading shift patterns
    Api.getShiftPatterns()
  } else {
    $scope.shiftPattern = Api.shiftTypes[$stateParams.patternId]
  }

  $scope.$on('shiftTypesFetched', function() {
    $scope.shiftPattern = Api.shiftTypes[$stateParams.patternId]
  });
})