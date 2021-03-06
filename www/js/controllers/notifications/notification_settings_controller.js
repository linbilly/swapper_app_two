angular.module('starter.controllers')

.controller('NotificationSettingsCtrl', function($scope, $ionicHistory, $ionicNavBarDelegate, Api) {
  $ionicNavBarDelegate.showBackButton(false)

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  Api.notificationSettings()

  $scope.$on('notificationSettingsFetched', function() {
    $scope.notificationSettings = Api.userNotificationSettings
    $scope.loader = false
    $scope.$apply()
  });

  $scope.toggleChanged = function() {
    var params = {
      notification_settings: $scope.notificationSettings
    }
    Api.updateNotificationSettings(params)
  }
})