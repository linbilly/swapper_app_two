angular.module('starter.controllers')

.controller('GeneralCtrl', function($scope, $ionicNavBarDelegate, Api, Notification) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.createUser = function(email, firstName, lastName, password) {
    Api.createUser(email, firstName, lastName, password)
  }

  $scope.$on('userCreated', function(){
    window.localStorage['token'] =  Api.user.authentication_token;
  })

  if (Notification.message) {
    $scope.message = Notification.message
    Notification.message = null
  }
})