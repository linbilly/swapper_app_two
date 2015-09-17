angular.module('starter.controllers')

.controller('CommentsCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Api, General, ShiftType) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  Api.getComments($stateParams.shiftId)

  $scope.$on('commentsFetched', function(event, args) {
    $scope.shift = args.shift
    $scope.comments = Api.comments
    $scope.loader = false
  });

  $scope.stringDateToWords = function(startDate) {
    if (startDate) {
      return General.stringDateToWords(startDate)
    }
  }

  $scope.prettyEndTime = function(shiftType) {
    if (shiftType) {
      return ShiftType.prettyEndTime(shiftType)
    } else {
      // In case shift has not loaded yet
      return ""
    }
  }
})