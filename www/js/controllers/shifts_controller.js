angular.module('starter.controllers')

.controller('ShiftsCtrl', function($scope, $ionicPopover, Api) {
  $ionicPopover.fromTemplateUrl('shifts-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
})