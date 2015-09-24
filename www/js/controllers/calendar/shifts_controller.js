var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $stateParams, $ionicPopover, $timeout, $ionicModal, Api, Calendar) {
  $scope.dateYear = Calendar.dateYear()
  // $scope.shiftType = ShiftType

  if (Calendar.needReload($scope.dateYear)) {
    $scope.loader = true
    loadShifts()
  }
  
  function loadShifts() {
    Api.getAllShifts()
  }

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
    $scope.loader = false
    window.localStorage['timeLastReloaded'] = $scope.dateYear
    $timeout(function() {
      Calendar.highlightToday()
    }, 500)
  })


  $ionicModal.fromTemplateUrl('templates/shared/legend.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openLengendModal = function() {
    $scope.shiftTypesByGroup = Api.inputButtonsByGroup
    $scope.modal.show()
  }

  $scope.closeLengendModal = function() {
    $scope.modal.hide()
  }
})