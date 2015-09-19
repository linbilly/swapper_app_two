angular.module('starter.controllers')

.controller('CommentsCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, $ionicScrollDelegate, Api, General, ShiftType) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true
  $scope.sending = false

  Api.getComments($stateParams.shiftId)

  $scope.$on('commentsFetched', function(event, args) {
    $scope.shift = args.shift
    $scope.comments = Api.comments
    $scope.userId = args.userId
    $scope.loader = false
    $scope.sending = false
    $scope.$apply()
    $ionicScrollDelegate.scrollBottom([true])
  });

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

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
    }
  }

  $scope.$on('commentCreated', function(event, args) {
    Api.getComments($stateParams.shiftId)
    $scope.message = ""
  });

  $scope.$on('commentDeleted', function(event, args) {
    Api.getComments($stateParams.shiftId)
    $scope.message = ""
  });

  $scope.deleteComment = function(commentId) {
    swal({
      title: "Are you sure?",
      text: "This will delete your comment.",
      type: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Yup!",
    }, function(){
      Api.deleteComment(commentId)
    });
    $("fieldset").addClass("hide")
  }

  $scope.showAdditionalDetailsIconClicked = function($event) {
    $(".icon-holder").rotate($(".icon-holder"), 180)
    $scope.showAdditionalDetails = !$scope.showAdditionalDetails
  }
})