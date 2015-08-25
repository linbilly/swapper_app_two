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

.config(function($stateProvider, $urlRouterProvider) {

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

  .state('tab.groups', {
    url: '/groups',
    views: {
      'tab-groups': {
        templateUrl: 'templates/tab-groups.html',
        controller: 'GroupsCtrl'
      }
    }
  })

  .state('tab.group-create', {
    url: '/groups/create',
    views: {
      'tab-groups': {
        templateUrl: 'templates/group-create.html',
        controller: 'GroupCreateCtrl'
      }
    }
  })

  .state('tab.group-detail', {
    url: '/groups/:groupId',
    views: {
      'tab-groups': {
        templateUrl: 'templates/group-detail.html',
        controller: 'GroupDetailCtrl'
      }
    }
  })

  .state('tab.shifts', {
    url: '/shifts/:tab',
    views: {
      'tab-shifts': {
        templateUrl: 'templates/tab-shifts.html',
        controller: 'ShiftsCtrl'
      }
    }
  })

  .state('tab.shifts-input', {
    url: '/shifts/input',
    views: {
      'tab-shifts': {
        templateUrl: 'templates/shifts-input.html',
        controller: 'ShiftsInputCtrl'
      }
    }
  })

  .state('tab.shifts-patterns', {
    url: '/shifts/patterns',
    views: {
      'tab-shifts': {
        templateUrl: 'templates/shifts-patterns.html',
        controller: 'ShiftsPatternsCtrl'
      }
    }
  })

  .state('tab.shifts-patterns-detail', {
    url: '/shifts/patterns/:patternId',
    views: {
      'tab-shifts': {
        templateUrl: 'templates/shifts-patterns-detail.html',
        controller: 'ShiftsPatternsDetailCtrl'
      }
    }
  })

  .state('tab.shifts-patterns-new', {
    url: '/shifts/patterns/:groupId/new',
    views: {
      'tab-shifts': {
        templateUrl: 'templates/shifts-patterns-new.html',
        controller: 'ShiftsPatternsNewCtrl'
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

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/groups');

});
