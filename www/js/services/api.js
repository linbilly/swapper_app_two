var app = angular.module('starter.services', [])

app.factory('Api', function($http, $rootScope) {
  var root_url = "http://localhost:3000/api/";
  // var root_url = "https://swapper-app.herokuapp.com/api/";

  var Api = {};

  Api.createUser = function($scope) {
    var createUserUrl = root_url + "users/create"
    var params = {
      first_name: $scope.firstName,
      last_name: $scope.lastName,
      email: $scope.email,
      password: $scope.password
    }
    $http.post(createUserUrl, {params: params}).then(function(result) {
      var user = jQuery.parseJSON(result.data.phrase);
      Api.user = user;
      $rootScope.$broadcast("userCreated");
    });
  }

  return Api;
});