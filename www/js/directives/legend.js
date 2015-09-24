angular.module('starter')

.directive('shiftTypesLegend', function(){
  return {
    templateUrl: "templates/shared/legend/shift_types.html",
    link: function(scope, element, attrs) {
      // Something custom
    }
  }
})

.directive('generalLegend', function(){
  return {
    templateUrl: "templates/shared/legend/general.html",
    link: function(scope, element, attrs) {
      // Something custom
    }
  }
})