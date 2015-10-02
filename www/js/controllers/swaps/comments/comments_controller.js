angular.module('starter.controllers')

.controller('CommentsCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, $ionicScrollDelegate, $state, Api, General, ShiftType) {
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
    removeFooterClasses()
    $ionicScrollDelegate.scrollBottom([true])
  });

  function removeFooterClasses() {
    // Otherwise CSS gets F'd up. But need this for iOS keyboard to work properly.
    $(".comments-page-footer").removeClass("bar")
    $(".comments-page-footer").removeClass("bar-footer")
    $(".comments-page-footer").removeClass("has-tabs")
  }

  $scope.goBack = function() {
    if ($ionicHistory.backTitle() == "Notifications") {
      $state.go("tab.swaps")
    } else {
      $ionicHistory.goBack();
    }
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
    // $(".icon-holder").rotate($(".icon-holder"), 180)
    if ($(".icon-holder").hasClass("icon-flipped")) {
      $(".icon-holder").removeClass("icon-flipped")
    } else {
      $(".icon-holder").addClass("icon-flipped")
    }
    $scope.showAdditionalDetails = !$scope.showAdditionalDetails
  }

  $scope.multiline = function(message) {
    return message.replace(/\n/g, "<br/>")
  }
})