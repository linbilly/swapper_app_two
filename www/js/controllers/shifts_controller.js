var app = angular.module('starter.controllers')

app.controller('ShiftsCtrl', function($scope, $stateParams, $ionicPopover, Api, ShiftPopover) {
  ShiftPopover.renderPopover($scope)

  $scope.popoverClicked = function() {
    ShiftPopover.popoverClicked($scope)
  }

  if ($stateParams.tab == "input") {
    inputTabActions()
  } else if ($stateParams.tab == "patterns") {
    patternsTabActions()
  } else {
    swapTabActions()
  }

  $scope.swapTabClicked = function() {
    swapTabActions()
  }

  $scope.inputTabClicked = function() {
    inputTabActions()
  }

  $scope.patternsTabClicked = function() {
    patternsTabActions()
  }

  function swapTabActions() {
    $scope.swapTab = true
    $scope.inputTab = false
    $scope.patternsTab = false
    print()
  }

  function inputTabActions() {
    $scope.swapTab = false
    $scope.inputTab = true
    $scope.patternsTab = false
    print()
  }

  function patternsTabActions() {
    $scope.swapTab = false
    $scope.inputTab = false
    $scope.patternsTab = true
    print()
  }

  function print() {
    console.log($scope.swapTab)
    console.log($scope.inputTab)
    console.log($scope.patternsTab)
  }
})