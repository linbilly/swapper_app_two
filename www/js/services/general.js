angular.module('starter.services')

.service('General', function() {
  var General = {};

  General.clone = function(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  General.zeroPad = function(num) {
    if (parseInt(num) < 10) {
      return "0" + num.toString()
    } else {
      return num.toString()
    }
  }

  General.formatStartTimeFromCalendar = function(shift) {
    if (shift) {
      return General.formatStartTime(shift.shift_type)
    } else {
      return ""
    }
  }

  General.formatStartTime = function(shift_type) {
    return General.zeroPad(shift_type.start_hour) + ":" + General.zeroPad(shift_type.start_minute)
  }

  General.abbreviatedMonth = function(startDate) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    var monthIndex = startDate.split("-")[1]
    return months[parseInt(monthIndex) - 1]
  }

  General.dateFromString = function(startDate) {
    // YYYY-MM-DD
    return startDate.split("-")[2]
  }

  General.findById = function(arr, id) {
    var result = $.grep(arr, function(e){ return e.id == id; });
    return result[0]
  }

  General.stringDateToWords = function(startDate) {
    return General.abbreviatedMonth(startDate) + " " + General.dateFromString(startDate) + ", " + startDate.split("-")[0]
  }

  return General;
})