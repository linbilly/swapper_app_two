angular.module('starter.services')

.service('Shift', function() {
  var Shift = {};

  Shift.isInThePast = function(shift) {
    var today = new Date()
    var splitDate = shift.start_date.split("-")
    var shiftStartDate = new Date(splitDate[0], parseInt(splitDate[1]) - 1, splitDate[1]) // Year, Month, Date

    return shiftStartDate < today
  }

  return Shift;
})