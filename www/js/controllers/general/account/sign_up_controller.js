angular.module('starter.controllers')

.controller('SignUpCtrl', function($scope, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.createUser = function(email, firstName, lastName, password, sex) {
    Api.createUser(email, firstName, lastName, password, sex)
  }

  $scope.$on('userCreated', function(){
  	window.localStorage['token'] =  Api.user.authentication_token;
  })
})