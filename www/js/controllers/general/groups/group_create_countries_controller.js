angular.module('starter.controllers')

.controller('GroupCreateCountriesCtrl', function($scope, $ionicNavBarDelegate, Locations) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.countries = Locations.countries()
  $scope.countryName = Locations.selectedCountryName

  $scope.countrySelected = function(countryName, countryId) {
    Locations.selectedCountryName = countryName
    Locations.selectedCountryId = countryId
  }
})