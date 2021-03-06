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

  General.findByHolidayDate = function(arr, date) {
    var result = $.grep(arr, function(e){ return e.date == date; });
    var holidays = []
    for (var i = 0; i < result.length; i++) {
      if ($.inArray(result[i].name, holidays) == -1) {
        holidays.push(result[i].name)
      }
    };
    return holidays.join(", ")
  }

  General.stringDateToWords = function(startDate) {
    return General.abbreviatedMonth(startDate) + " " + General.dateFromString(startDate) + ", " + startDate.split("-")[0]
  }

  General.inArray = function(obj, arr) {
    if (arr) {
      return (arr.indexOf(obj) != -1);
    } else {
      return false
    }
  }

  General.railsDateToCalendarDate = function(startDate) {
    var date = startDate.split("-")
    return parseInt(date[2]) + "-" + parseInt(date[1]) + "-" + parseInt(date[0])
  }

  function dateSort(a, b) {
    if (a.start_date < b.start_date)
      return -1;
    if (a.start_date > b.start_date)
      return 1;
    return 0;
  }

  General.compareByDate = function(arr) {
    return arr.sort(dateSort)
  }

  General.numKeys = function(obj) {
    if (obj) {
      return Object.keys(obj).length
    } else {
      return 0
    }
  }

  jQuery.fn.rotate = function(ele, degreesToAdd) {
    var degrees = degreesToAdd
    var currentTransform = getRotationDegrees(ele)
    if (currentTransform != "none") {
      degrees += parseInt(currentTransform)
    }

    ele.css({'-webkit-transform': 'rotate('+ degrees +'deg)',
             '-moz-transform': 'rotate('+ degrees +'deg)',
             '-ms-transform': 'rotate('+ degrees +'deg)',
             'transform': 'rotate('+ degrees +'deg)'});
    return ele
  };

  function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
  }

  return General;
})