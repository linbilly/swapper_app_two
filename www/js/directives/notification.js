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
});