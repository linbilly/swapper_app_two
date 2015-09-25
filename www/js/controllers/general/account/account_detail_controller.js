angular.module('starter.controllers')

.controller('AccountDetailCtrl', function($scope, $ionicNavBarDelegate, $state, Api, Notification) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.loader = true

  Api.getUser()
  setErrorsToFalse()

  $scope.$on('userFetched', function(event, args) {
    $scope.user = Api.user
    $scope.firstName = $scope.user.first_name
    $scope.lastName = $scope.user.last_name
    $scope.sex = $scope.user.sex
    $scope.loader = false
    $scope.$apply()
  })

  $scope.updateUser = function(firstName, lastName, sex) {
    if (noErrors(firstName, lastName, sex)) {
      $scope.loader = true

      var params = {
        first_name: firstName,
        last_name: lastName,
        sex: sex
      }
      Api.updateUser(params)
    }
  }

  $scope.$on('userUpdated', function(event, args) {
    Notification.message = "Account successfully updated"
    $state.go('tab.general', {}, {reload: true});
  })

  function setErrorsToFalse() {
    $scope.everthingFilledInError = false
    $scope.sexSelectedError = false
  }

  function noErrors(firstName, lastName, sex) {
    setErrorsToFalse()
    return everythingFilledIn(firstName, lastName) && sexSelected(sex)
  }

  function everythingFilledIn(firstName, lastName) {
    var result = firstName && lastName && firstName.trim() != "" && lastName.trim() != ""
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
})