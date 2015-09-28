angular.module('starter.controllers')

.controller('ShiftsPatternsCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, $ionicHistory, Api, ShiftPopover, Notification, ShiftType) {
  $ionicNavBarDelegate.showBackButton(false)
  ShiftPopover.renderPopover($scope)
  $scope.loader = true;
  if (Notification.message) {
    $scope.message = Notification.message
    Notification.message = null
  }

  if (Api.initialSignUp) {
    swal("You're good to go!", "Now you need to create some shift patterns before you can start inputting shifts", "success")
    $("fieldset").addClass("hide")
    Api.initialCreatingNewGroup = false
    Api.initialSignUp = false

    $ionicHistory.clearHistory()

    $(".tab-nav").removeClass("tabs-item-hide")
    $(".scroll-content").addClass("has-tabs")
  }

  Api.getShiftPatterns()

  $scope.fetchShiftPatterns = function() {
    Api.getShiftPatterns()
  };

  $scope.$on('shiftTypesFetched', function() {
    $scope.groupsWithShiftTypes = Api.groupsWithShiftTypes
    $scope.loader = false
    $scope.$apply()
  });

  $scope.prettyEndTime = function(shiftType) {
    return ShiftType.prettyEndTime(shiftType)
  }
})