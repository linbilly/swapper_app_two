angular.module('starter.services')

.service('Shift', function(Api) {
  var Shift = {};

  Shift.isInThePast = function(shift) {
    var today = new Date()
    var splitDate = shift.start_date.split("-")
    var shiftStartDate = new Date(splitDate[0], parseInt(splitDate[1]) - 1, splitDate[1]) // Year, Month, Date

    return shiftStartDate < today
  }

  Shift.alreadyAcceptedOffer = function(shift) {
    var alreadyAccepted = false
    for (var i = 0; i < shift.swaps.length; i++) {
      if (shift.swaps[i].state == "Pending approval") {
        alreadyAccepted = true
        break
      }
    };
    return alreadyAccepted
  }

  Shift.removeAlreadyAccepted = function() {
    var available = []
    for (var i = 0; i < Api.shiftsUpForGrabs.length; i++) {
      if (!Shift.alreadyAcceptedOffer(Api.shiftsUpForGrabs[i])) {
        available.push(Api.shiftsUpForGrabs[i])
      }
    };
    Api.shiftsUpForGrabs = available
  }

  return Shift;
})