angular.module('starter.controllers')

.controller('SwapsOwnDetailCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory, Api, General, ShiftType, Notification) {
  $ionicNavBarDelegate.showBackButton(false)
  $scope.loader = true

  if (Api.ownShiftsWithSwaps) {
    $scope.loader = false
    $scope.shift = General.findById(Api.ownShiftsWithSwaps, $stateParams.shiftId)
  } else {
    // In case user jumps straight to the detail page
    Api.getOwnShiftsWithSwaps()
  }

  $scope.$on('ownShiftsWithSwapsFetched', function(event, args) {
    $scope.shift = General.findById(Api.ownShiftsWithSwaps, $stateParams.shiftId)
    $scope.$apply()
    $scope.loader = false
  });

  $scope.prettyEndTime = function(shiftType) {
    if (shiftType) {
      return ShiftType.prettyEndTime(shiftType)
    } else {
      // In case shift has not loaded yet
      return ""
    }
  }

  $scope.cancelOwnSwap = function() {
    swal({
      title: "Are you sure?",
      text: "This shift will no longer be up for grabs by others",
      type: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Yup!",
    }, function(){
      Api.cancelOwnShiftToSwap($stateParams.shiftId)
    });
  }

  $scope.$on('ownShiftSwapCancelled', function(event, args) {
    Notification.message = "Your swap for " + args.shiftType.name + " on " + General.stringDateToWords(args.shift.start_date) + " has been cancelled"
    $state.go('tab.swaps', {}, {reload: true});
    $ionicHistory.clearHistory()
  });
})