angular.module('starter.services')

.service('Api', function($http, $rootScope, General) {
  $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  // var root_url = "http://localhost:3000/api/";
  // var root_url = "http://192.168.1.66:3000/api/";
  var root_url = "https://swapper-app.herokuapp.com/api/";

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
      Api.groups = JSON.parse(result.groups)
      makeGroupsEasyToQuery()
      $rootScope.$broadcast("groupsFetched", {userId: result.user_id});
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
    Api.inputButtonsByGroup = {}
    // Api.inputButtons = []
    for (var groupIndex = 0; groupIndex < Api.groupsWithShiftTypes.length; groupIndex++) {
      if (Api.groupsWithShiftTypes[groupIndex].shift_types.length > 0) {
        for (var shiftTypeIndex = 0; shiftTypeIndex < Api.groupsWithShiftTypes[groupIndex].shift_types.length; shiftTypeIndex++) {
          var shiftType = Api.groupsWithShiftTypes[groupIndex].shift_types[shiftTypeIndex]
          var group = Api.groupsWithShiftTypes[groupIndex]

          Api.shiftTypes[shiftType.id] = shiftType
          Api.shiftTypes[shiftType.id]["group"] = group

          if (!Api.inputButtonsByGroup[group.name]) {
            Api.inputButtonsByGroup[group.name] = []
          }

          Api.inputButtonsByGroup[group.name].push({
            abbreviation: shiftType.abbreviation,
            id: shiftType.id,
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
      $rootScope.$broadcast("shiftsFetched", {shifts: Api.shifts, available_shifts: result.available_shifts})
    });
  }

  Api.getAllShiftsSwappable = function(shiftId) {
    var getAllShiftsSwappableForDayUrl = root_url + "shifts/swappable"
    var params = {
      authentication_token: userToken(),
      shift_id: shiftId
    }
    $.get(getAllShiftsSwappableForDayUrl, params).then(function(result) {
      Api.shiftsSwappable = makeShiftsEasyToQuery(JSON.parse(result.shifts))
      $rootScope.$broadcast(
        "swappableShiftsFetched",
        {
          shifts: Api.shiftsSwappable,
          cannot_swap_shift_dates: result.cannot_swap_shift_dates,
          shift_owner: result.shift_owner,
          shift_up_for_swap: result.shift_up_for_swap,
          swap: result.swap
        }
      )
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

  Api.cancelOwnShiftToSwap = function(shiftId) {
    var cancelOwnShiftToSwapUrl = root_url + "shifts/" + shiftId + "/cancel-swap"
    var params = {
      authentication_token: userToken()
    }
    $.post(cancelOwnShiftToSwapUrl, params).then(function(result){
      $rootScope.$broadcast("ownShiftSwapCancelled", {shift: result.shift, shiftType: result.shift_type});
    });
  }

  // Swaps
  // ===========================================================================

  Api.getOwnShiftsWithSwaps = function() {
    var ownShiftsWithSwapsUrl = root_url + "shifts/swaps"
    var params = {
      authentication_token: userToken()
    }
    $.get(ownShiftsWithSwapsUrl, params).then(function(result) {
      Api.ownShiftsWithSwaps = JSON.parse(result.shifts)
      sortOwnShiftsByStatus()
      $rootScope.$broadcast("ownShiftsWithSwapsFetched")
    });
  }

  Api.getShiftsUpForGrabs = function(day) {
    var getShiftsUpForGrabsUrl = root_url + "shifts/available"
    var params = {
      authentication_token: userToken(),
      day: day
    }
    $.get(getShiftsUpForGrabsUrl, params).then(function(result) {
      Api.shiftsUpForGrabs = result.shifts
      $rootScope.$broadcast("shiftsUpForGrabsFetched")
    });
  }

  Api.offerToSwap = function(shiftParams) {
    var offerToSwapUrl = root_url + "swaps/create"
    shiftParams["authentication_token"] = userToken()
    $.post(offerToSwapUrl, shiftParams).then(function(result){
      $rootScope.$broadcast("offeredToSwap");
    });
  }

  Api.updateSwap = function(shiftParams, swapId) {
    var updateSwapUrl = root_url + "swaps/" + swapId + "/update"
    shiftParams["authentication_token"] = userToken()
    $.post(updateSwapUrl, shiftParams).then(function(result){
      $rootScope.$broadcast("updatedSwap");
    });
  }

  Api.acceptOfferedSwap = function(params, swapId) {
    var acceptOfferedSwapUrl = root_url + "swaps/" + swapId + "/accept"
    params["authentication_token"] = userToken()
    $.post(acceptOfferedSwapUrl, params).then(function(result){
      $rootScope.$broadcast("swapAccepted");
    });
  }

  Api.cancelOfferedShift = function(params) {
    var cancelOfferedShiftUrl = root_url + "swaps/cancel-offered-shift"
    params["authentication_token"] = userToken()
    $.post(cancelOfferedShiftUrl, params).then(function(result){
      $rootScope.$broadcast("offeredShiftCancelled");
    });
  }

  Api.cancelAllOfferedShifts = function(params) {
    var cancelAllOfferedShiftsUrl = root_url + "swaps/cancel-all-offered-shifts"
    params["authentication_token"] = userToken()
    $.post(cancelAllOfferedShiftsUrl, params).then(function(result){
      $rootScope.$broadcast("allOfferedShiftsCancelled");
    });
  }

  function sortOwnShiftsByStatus() {
    var ownShiftsByStatusObj = {}
    var openStatus = "Open"
    var pendingApprovalStatus = "Pending approval"
    ownShiftsByStatusObj[openStatus] = []
    ownShiftsByStatusObj[pendingApprovalStatus] = []
    
    for (var i = 0; i < Api.ownShiftsWithSwaps.length; i++) {
      if (Api.ownShiftsWithSwaps[i].has_accepted_a_swap) {
        ownShiftsByStatusObj[pendingApprovalStatus].push(Api.ownShiftsWithSwaps[i])
      } else {
        ownShiftsByStatusObj[openStatus].push(Api.ownShiftsWithSwaps[i])
      }
    };
    Api.ownShiftsByStatus = ownShiftsByStatusObj
  }

  Api.swapsOffered = function() {
    var swapsOfferedUrl = root_url + "swaps/offered"
    var params = {
      authentication_token: userToken()
    }
    $.get(swapsOfferedUrl, params).then(function(result) {
      Api.swapsOfferedByUser = result.swaps
      sortSwapsOfferedByStatus()
      $rootScope.$broadcast("swapsOfferedFetched")
    });
  }

  function sortSwapsOfferedByStatus() {
    var swapsOfferedByStatusObj = {}
    var openStatus = "Pending acceptance"
    var pendingApprovalStatus = "Pending approval"
    swapsOfferedByStatusObj[openStatus] = []
    swapsOfferedByStatusObj[pendingApprovalStatus] = []

    for (var i = 0; i < Api.swapsOfferedByUser.length; i++) {
      Api.swapsOfferedByUser[i]["start_date"] = Api.swapsOfferedByUser[i].shift.start_date
    };

    Api.swapsOfferedByUser = General.compareByDate(Api.swapsOfferedByUser)
    
    for (var i = 0; i < Api.swapsOfferedByUser.length; i++) {
      if (Api.swapsOfferedByUser[i].state == pendingApprovalStatus) {
        swapsOfferedByStatusObj[pendingApprovalStatus].push(Api.swapsOfferedByUser[i])
      } else {
        swapsOfferedByStatusObj[openStatus].push(Api.swapsOfferedByUser[i])
      }
    };
    Api.swapsOfferedByStatus = swapsOfferedByStatusObj
  }

  Api.approveSwap = function(shiftId) {
    var approveSwapUrl = root_url + "shifts/" + shiftId + "/approve-swap"
    var params = {
      authentication_token: userToken()
    }
    $.post(approveSwapUrl, params).then(function(result){
      $rootScope.$broadcast("swapApproved");
    });
  }

  // Comments
  // ===========================================================================

  Api.getComments = function(shiftId) {
    var getCommentsUrl = root_url + "comments/" + shiftId
    var params = {
      authentication_token: userToken()
    }
    $.get(getCommentsUrl, params).then(function(result){
      Api.comments = result.comments
      $rootScope.$broadcast("commentsFetched", {shift: result.shift, userId: result.user_id});
    });
  }

  Api.createComment = function(params) {
    var createCommentUrl = root_url + "comments/create"
    params["authentication_token"] = userToken()
    $.post(createCommentUrl, params).then(function(result){
      $rootScope.$broadcast("commentCreated");
    });
  }

  Api.deleteComment = function(commentId) {
    var deleteCommentUrl = root_url + "comments/" + commentId + "/destroy"
    var params = {
      authentication_token: userToken()
    }
    $.ajax({
      url: deleteCommentUrl,
      method: "DELETE",
      data: params
    })
    .done(function() {
      $rootScope.$broadcast("commentDeleted");
    })
  }

  // General
  // ===========================================================================

  function userToken() {
    // return window.localStorage['token']
    
    // return "CQPaAJxziaKRLyE6FNWX" // Localhost User 1
    // return "Ak5UcAzym3aqVZPprvy9" // Localhost User 2
    // return "4g4RyXo1SH_ZmsgJw97A" // Localhost User 3

    // return "nwj3NX4n3d3kBbmuTAWs" // Heroku User 1
    return "wQ7JkBUoEZ5Gy_r2Fy7t" // Heroku User 2
    // return "wuEQyRAGMzV_qszBvS5c" // Heroku User 3
  }

  return Api;
});