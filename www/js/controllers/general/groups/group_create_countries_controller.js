angular.module('starter.controllers')

.controller('GroupCreateCountriesCtrl', function($scope, $ionicNavBarDelegate, $ionicHistory, $timeout, Locations, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  if (Api.initialSignUp) {
    removeTabs()
  }

  function removeTabs() {
    $(".tab-nav").addClass("tabs-item-hide")
    $timeout(function() {
      $(".scroll-content").removeClass("has-tabs")
    }, 100)
  }

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.countries = Locations.countries()
  $scope.countryName = Locations.selectedCountryName

  $scope.countrySelected = function(countryName, countryId) {
    Locations.selectedCountryName = countryName
    Locations.selectedCountryId = countryId
  }
})