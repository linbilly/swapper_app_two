angular.module('starter.services')

.service('Api', function($http, $rootScope) {
  $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  var root_url = "http://localhost:3000/api/";
  // var root_url = "http://192.168.1.66:3000/api/";
  // var root_url = "https://swapper-app.herokuapp.com/api/";

  var Api = {};

  // Users
  // ===========================================================================

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

  // Groups
  // ===========================================================================

  Api.getGroups = function() {
    var fetchGroupsUrl = root_url + "groups"
    var params = {
      authentication_token: userToken()
    }
    $.get(fetchGroupsUrl, params).then(function(result) {
      Api.groups = result.groups
      makeGroupsEasyToQuery()
      $rootScope.$broadcast("groupsFetched");
    });
  }

  Api.createGroup = function(groupName) {
    var createGroupUrl = root_url + "groups/create"
    var params = {
      authentication_token: userToken(),
      name: groupName
    }
    $.post(createGroupUrl, params).then(function(result){
      $rootScope.$broadcast("groupCreated");
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
      Api.userPartOfGroup = result.has_user
      $rootScope.$broadcast("groupDetailsFetched");
    });
  }

  Api.joinGroup = function(id) {
    var joinGroupUrl = root_url + "groups/" + id + "/join"
    var params = {
      authentication_token: userToken()
    }
    $.post(joinGroupUrl, params).then(function(result){
      $rootScope.$broadcast("groupJoined");
    });
  }

  Api.leaveGroup = function(id) {
    var leaveGroupUrl = root_url + "groups/" + id + "/leave"
    var params = {
      authentication_token: userToken()
    }

    $.ajax({
      url: leaveGroupUrl,
      method: "DELETE",
      data: params
    })
    .done(function() {
      $rootScope.$broadcast("leftGroup");
    })
  }

  function makeGroupsEasyToQuery() {
    Api.groupsObj = {}
    for (var groupIndex = 0; groupIndex < Api.groups.length; groupIndex++) {
      Api.groupsObj[Api.groups[groupIndex].id] = Api.groups[groupIndex]
    };
  }

  // Shift types / patterns
  // ===========================================================================

  Api.getShiftPatterns = function() {
    var fetchShiftPatternsUrl = root_url + "shift-types"
    var params = {
      authentication_token: userToken()
    }
    $.get(fetchShiftPatternsUrl, params).then(function(result) {
      Api.groupsWithShiftTypes = result.shift_types
      makeShiftTypesEasyToQuery()
      $rootScope.$broadcast("shiftTypesFetched");
    });
  }

  Api.createShiftPattern = function(groupId, shiftParams) {
    var createShiftPatternUrl = root_url + "shift-types/" + groupId + "/create"
    shiftParams["authentication_token"] = userToken()
    shiftParams["group_id"] = groupId
    $.post(createShiftPatternUrl, shiftParams).then(function(result){
      $rootScope.$broadcast("shiftTypeCreated", {name: result.shift_type.name});
    });
  }

  Api.updateShiftPattern = function(id, shiftParams) {
    var updateShiftPatternUrl = root_url + "shift-types/" + id + "/update"
    shiftParams["authentication_token"] = userToken()
    $.ajax({
      url: updateShiftPatternUrl,
      method: "PUT",
      data: shiftParams
    })
    .done(function(result) {
      $rootScope.$broadcast("shiftTypeUpdated", {name: result.shift_type.name});
    })
  }

  Api.deleteShiftPattern = function(id) {
    var deleteShiftPatternUrl = root_url + "shift-types/" + id + "/delete"
    $.ajax({
      url: deleteShiftPatternUrl,
      method: "DELETE",
      data: {
        authentication_token: userToken()
      }
    })
    .done(function(result) {
      $rootScope.$broadcast("shiftTypeDeleted", {name: result.shift_type.name});
    })
  }

  function makeShiftTypesEasyToQuery() {
    Api.shiftTypes = {}
    Api.inputButtons = []
    for (var groupIndex = 0; groupIndex < Api.groupsWithShiftTypes.length; groupIndex++) {
      if (Api.groupsWithShiftTypes[groupIndex].shift_types.length > 0) {
        for (var shiftTypeIndex = 0; shiftTypeIndex < Api.groupsWithShiftTypes[groupIndex].shift_types.length; shiftTypeIndex++) {
          var shiftType = Api.groupsWithShiftTypes[groupIndex].shift_types[shiftTypeIndex]
          var group = Api.groupsWithShiftTypes[groupIndex]

          Api.shiftTypes[shiftType.id] = shiftType
          Api.shiftTypes[shiftType.id]["group"] = group

          Api.inputButtons.push({
            abbreviation: shiftType.abbreviation,
            shiftTypeId: shiftType.id,
            groupId: group.id
          })
        };
      }
    };
  }

  // Shifts
  // ===========================================================================

  Api.getAllShifts = function() {
    var getAllShiftsUrl = root_url + "shifts"
    var params = {
      authentication_token: userToken()
    }
    $.get(getAllShiftsUrl, params).then(function(result) {
      Api.shifts = makeShiftsEasyToQuery(JSON.parse(result.shifts))
      $rootScope.$broadcast("shiftsFetched", {shifts: Api.shifts})
    });
  }

  function makeShiftsEasyToQuery(shifts) {
    var easyShifts = {}
    for (var i = 0; i < shifts.length; i++) {
      easyShifts[shifts[i].start_date] = shifts[i]
    };
    return easyShifts
  }

  Api.createShift = function(shiftParams, selected) {
    var createShiftUrl = root_url + "shifts/create"
    shiftParams["authentication_token"] = userToken()
    $.post(createShiftUrl, shiftParams).then(function(result){
      $rootScope.$broadcast("shiftCreated", {selected: selected, shift: result.shift, shift_type: result.shift_type});
    });
  }

  Api.deleteShift = function(shiftId) {
    var deleteShiftUrl = root_url + "shifts/" + shiftId + "/delete"
    $.ajax({
      url: deleteShiftUrl,
      method: "DELETE",
      data: {
        authentication_token: userToken()
      }
    })
  }

  Api.setOwnShiftToSwap = function(shiftParams, shiftId, selected) {
    var setOwnShiftToSwapUrl = root_url + "shifts/" + shiftId + "/swap"
    shiftParams["authentication_token"] = userToken()
    $.post(setOwnShiftToSwapUrl, shiftParams).then(function(result){
      $rootScope.$broadcast("ownShiftSwapSet", {selected: selected, shift: result.shift});
    });
  }

  // General
  // ===========================================================================

  function userToken() {
    // return window.localStorage['token']
    return "NFBtc6CZ1FxuDZUtgsvz" // Localhost
    // return "-Hx86xtNJ_w5QxM4o9Eu" // Heroku
  }

  return Api;
});