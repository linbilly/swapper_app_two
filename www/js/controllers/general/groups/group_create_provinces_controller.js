angular.module('starter.controllers')

.controller('GroupCreateProvincesCtrl', function($scope, $ionicNavBarDelegate, $ionicHistory, $timeout, Locations, Api) {
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

  $scope.provinces = Locations.provinces()
  $scope.provinceName = Locations.selectedProvinceName

  $scope.provinceSelected = function(provinceName, provinceId) {
    Locations.selectedProvinceName = provinceName
    Locations.selectedProvinceId = provinceId
  }
})