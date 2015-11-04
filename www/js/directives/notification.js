angular.module('starter')

.directive('notification', function($timeout, Notification){
  return {
    template: "<div class='notification-box row'><div class='col'>{{message}}</div><div class='col col-center col-10 clear-button-holder'><div class='clear-button' ng-click='clear()'></div></div></div>",
    link: function(scope, element, attrs){
      $timeout(function(){
        clearMessage()
      }, 10000);

      scope.clear = function() {
        clearMessage()
      }

      function clearMessage() {
        element.addClass("ng-hide")
        Notification.message = ""
      }
    }
  }
})

.directive('comment', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/comment.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('joinGroup', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/join_group.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('swapOffered', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/swap_offered.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('swapAccepted', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/swap_accepted.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('swapApproved', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/swap_approved.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('shiftAvailable', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/shift_available.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('swapCancelled', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/swap_cancelled.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('someoneElsesSwapAccepted', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/someone_elses_swap_accepted.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('swapOffersCancelled', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/swap_offers_cancelled.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('general', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/general.html",
    link: function(scope, element, attrs) {
      scope.details = scope.notification.details
    }
  }
})

.directive('bottomContent', function(Notification){
  return {
    templateUrl: "templates/notifications/directives/bottom_content.html",
    link: function(scope, element, attrs) {
      // Something
    }
  }
})