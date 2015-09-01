// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.shifts', {
    url: '/shifts/:tab',
    views: {
      'tab-shifts': {
        templateUrl: 'templates/tab-shifts.html',
        controller: 'ShiftsCtrl'
      }
    }
  })

  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })

  .state('tab.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('tab.general', {
    url: '/general/index',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/index.html',
        controller: 'GeneralCtrl'
      }
    }
  })

  .state('tab.groups', {
    url: '/groups/index',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/groups/index.html',
        controller: 'GroupsCtrl'
      }
    }
  })

  .state('tab.group-detail', {
    url: '/groups/:groupId',
    views: {
      'tab-general': {
        templateUrl: 'templates/group-detail.html',
        controller: 'GroupDetailCtrl'
      }
    }
  })

  .state('tab.group-create', {
    url: '/groups/create',
    views: {
      'tab-general': {
        templateUrl: 'templates/group-create.html',
        controller: 'GroupCreateCtrl'
      }
    }
  })

  .state('tab.shifts-patterns', {
    url: '/general/patterns/index',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/shift_patterns/index.html',
        controller: 'ShiftsPatternsCtrl'
      }
    }
  })

  .state('tab.shifts-patterns-new', {
    url: '/general/patterns/:groupId/new',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/shift_patterns/new.html',
        controller: 'ShiftsPatternsNewCtrl'
      }
    }
  })

  .state('tab.shifts-patterns-detail', {
    url: '/general/patterns/:patternId',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/shift_patterns/detail.html',
        controller: 'ShiftsPatternsDetailCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/general/index');

  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
  $ionicConfigProvider.navBar.alignTitle('center'); // Center's headers for Android

});
