angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Api, Calendar) {
  $ionicNavBarDelegate.showBackButton(false)


  $scope.$on('shiftTypesFetched', function(event, args) {
    $scope.shiftTypes = Api.inputButtons
    highlightToday()
  });

  function highlightToday() {
    var today = new Date()
    var todayCell = $(".dates").find("[data-date='" + today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear() + "']");
    todayCell.addClass("active")
  }

  $scope.createShift = function($event) {
    var ele = $($event.target)
    var abbreviation = ele.text().trim()
    var selected = $(".col.date-col.active")
    var shiftParams = {
      shift_type_id: ele.attr("data-shift-type-id"),
      group_id: ele.attr("data-group-id"),
      start_date: selected.attr("data-date")
    }
    Api.createShift(shiftParams, selected, abbreviation)
  }

  $scope.$on('shiftCreated', function(event, args) {
    args.selected.find(".content-text").text(args.abbreviation)
  });
})