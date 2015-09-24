var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $stateParams, $ionicPopover, $timeout, $ionicModal, Api, Calendar) {
  $scope.dateYear = Calendar.dateYear()

  if (Api.initialSignUp) {
    swal("You're good to go!", "Now input your shifts to start swapping", "success")
    $("fieldset").addClass("hide")
    Api.initialSignUp = false
  }

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


  $ionicModal.fromTemplateUrl('templates/shared/legend/legend_calendar.html', {
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