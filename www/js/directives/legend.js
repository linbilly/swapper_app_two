angular.module('starter')

.directive('shiftTypesLegend', function(Notification){
  return {
    templateUrl: "templates/shared/legend/shift_types.html",
    link: function(scope, element, attrs) {
      // Something custom
    }
  }
})