angular.module('starter.controllers')

.controller('GroupCreateCtrl', function($scope, $state, $ionicNavBarDelegate, Api, Notification, Locations, Group) {
  $ionicNavBarDelegate.showBackButton(false)

  displayGroupTitle()
  displayCountry()

  function displayGroupTitle() {
    if (Group.groupTitle) {
      $scope.groupTitle = Group.groupTitle
    } else {
      $scope.groupTitle = ""
    }
  }

  function displayCountry() {
    if (Locations.selectedCountryName) {
      $scope.country = Locations.selectedCountryName
    } else {
      $scope.country = "Please select"
    }
  }

  $scope.createGroup = function (groupName){
    Api.createGroup(groupName)
    Notification.message = groupName + " successfully created."
    Group.groupTitle = null
    $state.go('tab.groups', {}, {reload: true});
  }

  $scope.storeGroupTitle = function(groupTitle) {
    Group.groupTitle = groupTitle
  }
})