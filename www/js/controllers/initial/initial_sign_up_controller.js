angular.module('starter.controllers')

.controller('InitialSignUpCtrl', function($rootScope, $scope, $ionicNavBarDelegate, $state, $ionicPush, $ionicUser, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  setErrorsToFalse()
  Api.initialSignUp = true

  $scope.createUser = function(email, firstName, lastName, password, sex) {
    if (noErrors(email, firstName, lastName, password, sex)) {
      $scope.loader = true
      Api.createUser(email, firstName, lastName, password, sex)
    }
  }

  $scope.$on('userCreated', function(event, args) {
    if (args && args.error) {
      $scope.emailTakenError = true
      $scope.loader = false
      $scope.$apply()
    } else {
      Api.registerWithPushService()
      window.localStorage['token'] =  Api.user.authentication_token;
      $state.go('groups')
    }
  })

  function setErrorsToFalse() {
    $scope.emailTakenError = false
    $scope.everthingFilledInError = false
    $scope.sexSelectedError = false
  }

  function noErrors(email, firstName, lastName, password, sex) {
    setErrorsToFalse()
    return everythingFilledIn(email, firstName, lastName, password) && sexSelected(sex) && validEmail()
  }

  function everythingFilledIn(email, firstName, lastName, password) {
    var result = email && firstName && lastName && password && email.trim() != "" && firstName.trim() != "" && lastName.trim() != "" && password.trim() != ""
    if (result) {
      return true
    } else {
      $scope.everthingFilledInError = true
      return false
    }
  }

  function sexSelected(sex) {
    if (sex) {
      return true
    } else {
      $scope.sexSelectedError = true
      return false
    }
  }

  function validEmail() {
    return $(".not-valid-email").attr("data-error") == "true"
  }

  $scope.emailErrorCleaner = function(email, formObj) {
    if (!!formObj) {
      return false
    } else {
      return true
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