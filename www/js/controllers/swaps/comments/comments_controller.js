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

  $scope.sendMessage = function() {
    var params = {
      message: $scope.message,
      shift_id: $scope.shift.id
    }
    Api.createComment(params)
  }

  $scope.jsTime = function(rubyTime) {
    // 2015-09-17T16:25:37.973Z
    var date = new Date(rubyTime.split(".")[0])
    return date
  }
})