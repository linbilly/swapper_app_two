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

  // ===========================================================
  // Calendar
  // ===========================================================

  .state('tab.calendar', {
    url: '/calendar/index',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/calendar/index.html',
        controller: 'ShiftsCtrl'
      }
    }
  })

  // ===========================================================
  // Swaps
  // ===========================================================

  .state('tab.swaps', {
    url: '/swaps/index',
    views: {
      'tab-swaps': {
        templateUrl: 'templates/swaps/index.html',
        controller: 'SwapsCtrl'
      }
    }
  })

  .state('tab.swaps-own-detail', {
    url: '/swaps/own/:shiftId/detail',
    views: {
      'tab-swaps': {
        templateUrl: 'templates/swaps/own-detail.html',
        controller: 'SwapsOwnDetailCtrl'
      }
    }
  })

  .state('tab.swaps-up-for-grabs-list', {
    url: '/swaps/up-for-grabs/:day/list',
    views: {
      'tab-swaps': {
        templateUrl: 'templates/swaps/up-for-grabs-list.html',
        controller: 'SwapsUpForGrabsListCtrl'
      }
    }
  })

  .state('tab.swaps-new-offer', {
    url: '/swaps/up-for-grabs/offer/:shiftId/:day/new',
    views: {
      'tab-swaps': {
        templateUrl: 'templates/swaps/new-offer.html',
        controller: 'SwapsNewOfferCtrl'
      }
    }
  })

  // ===========================================================
  // General
  // ===========================================================

  .state('tab.general', {
    url: '/general/index',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/index.html',
        controller: 'GeneralCtrl'
      }
    }
  })

  // ===========================================================
  // General / Groups
  // ===========================================================

  .state('tab.groups', {
    url: '/general/groups/index',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/groups/index.html',
        controller: 'GroupsCtrl'
      }
    }
  })

  .state('tab.group-create', {
    url: '/general/groups/create',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/groups/new.html',
        controller: 'GroupCreateCtrl'
      }
    }
  })

  .state('tab.group-detail', {
    url: '/general/groups/:groupId',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/groups/detail.html',
        controller: 'GroupDetailCtrl'
      }
    }
  })

  // ===========================================================
  // General / Shift Patterns
  // ===========================================================

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

  // ===========================================================
  // General / Shift Patterns
  // ===========================================================

  .state('tab.account', {
    url: '/general/account/new',
    views: {
      'tab-general': {
        templateUrl: 'templates/general/account/new.html',
        controller: 'SignUpCtrl'
      }
    }
  })

  // ===========================================================
  // Fallback
  // ===========================================================

  $urlRouterProvider.otherwise('/tab/general/index');

  // ===========================================================
  // General Configurations
  // ===========================================================

  $ionicConfigProvider.tabs.position("bottom"); // Place tabs at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); // Make tabs all look the same across all OS
  $ionicConfigProvider.navBar.alignTitle('center'); // Center headers for Android
});
