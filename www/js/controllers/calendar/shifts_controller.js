var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $stateParams, $ionicPopover, $timeout, $interval, $ionicModal, $ionicHistory, $state, Api, Calendar) {
  $scope.dateYear = Calendar.dateYear()

  if (!hasToken()) {
    $state.go('initial', {}, {reload: true});
  } else if (Calendar.needReload($scope.dateYear)) {
    $scope.loader = true
    loadShifts()
  }

  function hasToken() {
    if (Api.userToken()) {
      return true
    } else {
      Api.initialSignUp = false
      return false
    }
  }

  if (Api.initialSignUp) {
    swal("You're good to go!", "Now input your shifts to start swapping", "success")
    $("fieldset").addClass("hide")
    Api.initialSignUp = false

    $ionicHistory.clearHistory()

    $(".tab-nav").removeClass("tabs-item-hide")
    $(".scroll-content").addClass("has-tabs")
  }
  
  function loadShifts() {
    Api.getAllShifts()
  }

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts, {})
    $scope.loader = false
    window.localStorage['timeLastReloaded'] = $scope.dateYear
    $scope.setupInterval = $interval(function() {
      Calendar.highlightToday()
      if ($(".date-col.active").length > 0 || $(".calendar-index-page").length == 0) {
        $interval.cancel($scope.setupInterval)
      }
    }, 100)
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