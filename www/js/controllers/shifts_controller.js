var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $stateParams, $ionicPopover, Api, Calendar) {

  function loadShifts() {
    Api.getAllShifts()
    $scope.loader = true
  }

  $scope.$on('shiftsFetched', function(event, args) {
    $scope.calendarObjects = Calendar.setupCalendarObjects(args.shifts)
    $scope.$apply()
    $scope.loader = false
  })

  if ($stateParams.tab == "input") {
    loadShifts()
    inputTabActions()
  } else if ($stateParams.tab == "patterns") {
    patternsTabActions()
  } else {
    loadShifts()
    swapTabActions()
  }

  function needToLoadShifts() {
    return $stateParams.tab == "patterns" && !$scope.calendarObjects
  }

  $scope.swapTabClicked = function() {
    if (needToLoadShifts()) {
      loadShifts()
    }
    swapTabActions()
  }

  $scope.inputTabClicked = function() {
    if (needToLoadShifts()) {
      loadShifts()
    }
    inputTabActions()
  }

  $scope.patternsTabClicked = function() {
    patternsTabActions()
  }

  function swapTabActions() {
    $(".calender-display").removeClass("hide")
    
    $(".swap-tab-contents").removeClass("hide")
    $(".input-tab-contents").addClass("hide")
    $(".patterns-tab-contents").addClass("hide")

    $(".swap-tab").addClass("active")
    $(".input-tab").removeClass("active")
    $(".patterns-tab").removeClass("active")
  }

  function inputTabActions() {
    $(".calender-display").removeClass("hide")

    $(".swap-tab-contents").addClass("hide")
    $(".input-tab-contents").removeClass("hide")
    $(".patterns-tab-contents").addClass("hide")

    $(".swap-tab").removeClass("active")
    $(".input-tab").addClass("active")
    $(".patterns-tab").removeClass("active")
  }

  function patternsTabActions() {
    $(".calender-display").addClass("hide")

    $(".swap-tab-contents").addClass("hide")
    $(".input-tab-contents").addClass("hide")
    $(".patterns-tab-contents").removeClass("hide")

    $(".swap-tab").removeClass("active")
    $(".input-tab").removeClass("active")
    $(".patterns-tab").addClass("active")
  }
})