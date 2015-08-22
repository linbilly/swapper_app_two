angular.module('starter')

.directive('notification', function($timeout){
  return {
    template: "<div class='notification-box row'><div class='col'>{{message}}</div><div class='col col-center col-10 clear-button-holder'><div class='clear-button' ng-click='clear()'></div></div></div>",
    link: function(scope, element, attrs){
      $timeout(function(){
        element.remove();
      }, 5000);

      scope.clear = function() {
        element.remove()
      }
    }
  }
});