angular.module('starter.controllers')

.controller('SignUpCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.createUser = function(email, firstName, lastName, password) {
    Api.createUser(email, firstName, lastName, password)
  }

  $scope.$on('userCreated', function(){
  	window.localStorage['token'] =  Api.user.authentication_token;
  })
})