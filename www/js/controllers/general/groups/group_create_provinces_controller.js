angular.module('starter.controllers')

.controller('GroupCreateProvincesCtrl', function($scope, $ionicNavBarDelegate, Locations) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.provinces = Locations.provinces()
  $scope.provinceName = Locations.selectedProvinceName

  $scope.provinceSelected = function(provinceName, provinceId) {
    Locations.selectedProvinceName = provinceName
    Locations.selectedProvinceId = provinceId
  }
})