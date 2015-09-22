angular.module('starter.controllers')

.controller('GroupCreateCtrl', function($scope, $state, $ionicNavBarDelegate, Api, Notification, Locations, Group) {
  $ionicNavBarDelegate.showBackButton(false)

  displayGroupTitle()
  displayCountry()
  displayProvince()
  displayState()

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
      $scope.countryId = Locations.selectedCountryId
    } else {
      $scope.country = "Please select"
    }
  }

  function displayProvince() {
    if (Locations.selectedProvinceName) {
      $scope.province = Locations.selectedProvinceName
      $scope.provinceId = Locations.selectedProvinceId
    } else {
      $scope.province = "Please select"
    }
  }

  function displayState() {
    if (Locations.selectedStateName) {
      $scope.state = Locations.selectedStateName
      $scope.stateId = Locations.selectedStateId
    } else {
      $scope.state = "Please select"
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