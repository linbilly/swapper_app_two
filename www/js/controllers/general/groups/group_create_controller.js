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
      var params = {
        group_name: groupName,
        country: Locations.selectedCountryName,
        country_code: Locations.selectedCountryId,
        province_state: provinceState(),
        province_state_code: provinceStateId()
      }

      Api.createGroup(params)
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

  function provinceState() {
    if (Locations.selectedProvinceName) {
      return Locations.selectedProvinceName
    } else if (Locations.selectedStateName) {
      return Locations.selectedStateName
    } else {
      return null
    }
  }

  function provinceStateId() {
    if (Locations.selectedProvinceId) {
      return Locations.selectedProvinceId
    } else if (Locations.selectedStateId) {
      return Locations.selectedStateId
    } else {
      return null
    }
  }
})