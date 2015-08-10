angular.module('starter.services')

.factory('ShiftPopover', function($ionicPopover) {
  var ShiftPopover = {};

  ShiftPopover.renderPopover = function($scope) {
    $ionicPopover.fromTemplateUrl('shifts-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });
  }


  ShiftPopover.popoverClicked = function($scope) {
    $scope.popover.hide();
  }

  return ShiftPopover;
});