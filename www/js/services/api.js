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
      Api.user = result.user;
      $rootScope.$broadcast("userCreated");
    });
  }

  Api.getGroups = function() {
    var fetchGroupsUrl = root_url + "groups"
    var params = {
      authentication_token: userToken()
    }
    $.get(fetchGroupsUrl, params).then(function(result) {
      Api.groups = result.groups
      $rootScope.$broadcast("groupsFetched");
    });
  }

  Api.groupDetails = function(id) {
    var fetchGroupsUrl = root_url + "groups/" + id + "/details"
    var params = {
      authentication_token: userToken()
    }
    $.get(fetchGroupsUrl, params).then(function(result) {
      Api.group = result.group
      Api.groupUsers = result.users
      $rootScope.$broadcast("groupDetailsFetched");
    });
  }

  function userToken() {
    return window.localStorage['token']
    // return "a_oBj-m7pF8mQ7ei2Gr_"
  }

  return Api;
});