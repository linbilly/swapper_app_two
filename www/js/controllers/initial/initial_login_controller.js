angular.module('starter.controllers')

.controller('InitialLoginCtrl', function($rootScope, $scope, $ionicNavBarDelegate, $state, $ionicPush, $ionicUser, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  setErrorsToFalse()
  Api.initialSignUp = false

  $scope.loginUser = function(email, password) {
    if (noErrors(email, password)) {
      $scope.loader = true
      Api.loginUser(email, password)
    }
  }

  $scope.$on('userLoggedIn', function(event, args) {
    if (args && args.error) {
      $scope.loginError = true
      $scope.loader = false
      $scope.$apply()
    } else {
      Api.registerWithPushService()
      window.localStorage['token'] =  Api.user.authentication_token;
      if (args.has_group) {
        $state.go("tab.calendar")
      } else {
        $state.go('groups')
      }
    }
  })

  function setErrorsToFalse() {
    $scope.loginError = false
    $scope.everthingFilledInError = false
  }

  function noErrors(email, password) {
    setErrorsToFalse()
    return everythingFilledIn(email, password)
  }

  function everythingFilledIn(email, password) {
    var result = email && password && email.trim() != "" && password.trim() != ""
    if (result) {
      return true
    } else {
      $scope.everthingFilledInError = true
      return false
    }
  }

  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    if (data.token) {
      var params = {
        user_id: Api.user.id,
        ionic_user_token: data.token,
        platform: ionic.Platform.platform()
      }
      Api.updateUserWithIonicDetails(params)
    }
  });
})