var app = angular.module('starter.services', [])

app.factory('Api', function($http, $rootScope) {
  // var root_url = "http://localhost:3000/api/";
  var root_url = "http://192.168.0.10:3000/api/";
  // var root_url = "https://swapper-app.herokuapp.com/api/";

  var Api = {};

  Api.createUser = function(email, firstName, lastName, password) {
    var createUserUrl = root_url + "users/create"
    var params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }
    $.post(createUserUrl, params).then(function(result) {
      debugger
      // var user = jQuery.parseJSON(result);
      Api.user = result.user;
      $rootScope.$broadcast("userCreated");
    });
  }

  return Api;
});