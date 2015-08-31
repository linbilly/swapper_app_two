angular.module('starter.services')

.service('ShiftPopover', function($ionicPopover) {
  var ShiftPopover = {};

  ShiftPopover.renderPopover = function($scope) {
    $scope.popover = $ionicPopover.fromTemplate(ShiftPopover.popoverAsString(), {
      scope: $scope
    });
  }

  ShiftPopover.popoverClicked = function($scope) {
    $scope.popover.hide();
  }

  ShiftPopover.popoverAsString = function() {
    var str = "<ion-popover-view class='shifts-popover'>"
      str += "<ion-content>"
        str += "<div class='list'>"
          str += "<a class='item' href='#/tab/shifts' ng-click='popoverClicked()'>"
            str += "Calendar view"
          str += "</a>"
          str += "<a class='item' href='#/tab/shifts/input' ng-click='popoverClicked()'>"
            str += "Shift input"
          str += "</a>"
          str += "<a class='item' href='#/tab/shifts/patterns' ng-click='popoverClicked()'>"
            str += "Shift patterns"
          str += "</a>"
        str += "</div>"
      str += "</ion-content>"
    str += "</ion-popover-view>"
    return str
  }

  return ShiftPopover;
});