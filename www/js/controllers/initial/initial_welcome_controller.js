angular.module('starter.controllers')

.controller('InitialWelcomeCtrl', function($scope, $state, Api) {
  if (hasToken()) {
    $state.go('tab.calendar', {}, {reload: true});
  } else {
    Api.initialSignUp = true
  }

  function hasToken() {
    if (Api.userToken()) {
      return true
    } else {
      return false
    }
  }

})