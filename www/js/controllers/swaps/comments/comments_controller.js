angular.module('starter.controllers')

.controller('CommentsCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicScrollDelegate, Api, General, ShiftType) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  $scope.sending = false

  Api.getComments($stateParams.shiftId)

  $scope.$on('commentsFetched', function(event, args) {
    $scope.shift = args.shift
    $scope.comments = Api.comments
    $scope.loader = false
    $scope.sending = false
    $scope.$apply()
    $ionicScrollDelegate.scrollBottom([true])
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
    var message = $scope.message.trim()
    if (message != "") {
      $scope.sending = true
      var params = {
        message: message,
        shift_id: $scope.shift.id
      }
      Api.createComment(params)
      Api.getComments($stateParams.shiftId)
      $scope.message = ""
    }
  }
})