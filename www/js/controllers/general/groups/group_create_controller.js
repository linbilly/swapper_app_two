angular.module('starter.controllers')

.controller('GroupCreateCtrl', function($scope, $state, $ionicNavBarDelegate, Api, Notification, Locations, Group) {
  $ionicNavBarDelegate.showBackButton(false)
  clearErrors()

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
    clearErrors()
    if (noErrors(groupName)) {
      Api.createGroup(groupName)
      Notification.message = groupName + " successfully created."
      clearAllSavedValues()
      $state.go('tab.groups', {}, {reload: true});
    }
  }

  $scope.storeGroupTitle = function(groupTitle) {
    Group.groupTitle = groupTitle
  }

  function clearAllSavedValues() {
    Group.groupTitle = null
    Locations.selectedCountryName = null
    Locations.selectedCountryId = null
    Locations.selectedProvinceName = null
    Locations.selectedProvinceId = null
    Locations.selectedStateName = null
    Locations.selectedStateId = null
  }

  function noErrors(groupName) {
    return groupNameFilledIn(groupName) && countrySelected() && provinceSelectedIfRequired() && stateSelectedIfRequired()
  }

  function clearErrors() {
    $scope.groupNameError = false
    $scope.countryError = false
    $scope.provinceError = false
    $scope.stateError = false
  }

  function groupNameFilledIn(groupName) {
    if (groupName.trim() == "") {
      $scope.groupNameError = true
      return false
    } else {
      return true
    }
  }

  function countrySelected() {
    if (Locations.selectedCountryName) {
      return true
    } else {
      $scope.countryError = true
      return false
    }
  }

  function provinceSelectedIfRequired() {
    if (Locations.selectedCountryId == "ca") {
      if (Locations.selectedProvinceName) {
        return true
      } else {
        $scope.provinceError = true
        return false
      }
    } else {
      return true
    }
  }

  function stateSelectedIfRequired() {
    if (Locations.selectedCountryId == "us") {
      if (Locations.selectedStateName) {
        return true
      } else {
        $scope.stateError = true
        return false
      }
    } else {
      return true
    }
  }
})