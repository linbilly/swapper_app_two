angular.module('starter.controllers')

.controller('InitialWelcomeCtrl', function($scope, $state, Api) {
  Api.initialSignUp = true
})