angular.module('starter.controllers')

.controller('InitialWelcomeCtrl', function($scope, $state, Api) {
  if (hasToken()) {
    $state.go('tab.calendar', {}, {reload: true});
  }

  function hasToken() {
    if (Api.userToken()) {
      return true
    } else {
      return false
    }
  }

  Api.initialSignUp = true
})