angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($scope, $ionicPopover, Api) {
  $ionicPopover.fromTemplateUrl('shifts-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.popoverClicked = function() {
    $scope.popover.hide();
  }
})