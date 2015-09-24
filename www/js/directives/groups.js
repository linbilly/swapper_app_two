angular.module('starter')

.directive('newGroup', function(){
  return {
    templateUrl: "templates/shared/groups/new_group.html",
    link: function(scope, element, attrs) {
      // Something custom
    }
  }
})

.directive('groupList', function(Api){
  return {
    templateUrl: "templates/shared/groups/group_list.html",
    link: function(scope, element, attrs) {
      if (Api.initialSignUp) {
        scope.detailLinkRoot = "#/initial/groups-detail/"
      } else {
        scope.detailLinkRoot = "#/tab/general/groups/"
      }
    }
  }
})

.directive('groupDetail', function(Api){
  return {
    templateUrl: "templates/shared/groups/group_detail.html",
    link: function(scope, element, attrs) {
      // Something custom
    }
  }
})