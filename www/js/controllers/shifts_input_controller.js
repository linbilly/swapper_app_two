angular.module('starter.controllers')

.controller('ShiftsInputCtrl', function($scope, $ionicPopover, $ionicNavBarDelegate, Api, ShiftPopover) {
  $ionicNavBarDelegate.showBackButton(false)
  ShiftPopover.renderPopover($scope)
  setupCalendarObjects()

  function startEndDateObjects() {
    var today = new Date();
    var startDate = new Date();
    var endDate = new Date();
    startDate.setFullYear(today.getFullYear() - 1)
    endDate.setFullYear(today.getFullYear() + 1)
    return {
      today: today,
      start: startDate,
      end: endDate
    }
  }

  function setupCalendarObjects() {
    var calendarObjects = []
    var startEndDates = startEndDateObjects()
    var currentDate = new Date();
    for (var i = -12; i < 13; i++) { // 25 is for 25 months (1 year ahead and 1 year behind)
      var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      firstDay = addMonths(firstDay, i)

      var title = monthNames(firstDay.getMonth()) + " " + firstDay.getFullYear()
      var rows = fillRows(firstDay)

      calendarObjects.push({
        title: title,
        rows: rows
      })
    };
    $scope.calendarObjects = calendarObjects
  }

  function addMonths(dateObj, num) {
    dateObj.setMonth(dateObj.getMonth() + num)
    return dateObj;
  }

  function monthNames(index) {
    var names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return names[index]
  }

  function fillRows(firstDay) {
    var firstRowDayOfWeekStart = firstDay.getDay()
    var days = daysInMonth(firstDay)
    var rowsRequired = calcRowsRequired(firstDay, firstRowDayOfWeekStart, days)
    var rows = []
    var dayCount = 1

    for (var i = 0; i <= rowsRequired; i++) {
      var row = []

      if (i == 0) {

        for (var dayOfWeek = 0; dayOfWeek < firstRowDayOfWeekStart; dayOfWeek++) {
          var tempDate = clone(firstDay)
          tempDate.setDate(tempDate.getDate() - firstRowDayOfWeekStart + dayOfWeek)
          row.push({
            dayNum: tempDate.getDate(),
            isInCurrentMonth: false
          })
        };

        for (var dayOfWeek = firstRowDayOfWeekStart; dayOfWeek < 7; dayOfWeek++) {
          row.push({
            dayNum: dayCount,
            isInCurrentMonth: true
          })
          dayCount += 1
        };

      } else {

        var nextMonthDayCount = 1

        for (var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          if (dayCount <= days) {
            row.push({
              dayNum: dayCount,
              isInCurrentMonth: true
            })
            dayCount += 1
          } else {
            row.push({
              dayNum: nextMonthDayCount,
              isInCurrentMonth: false
            })
            nextMonthDayCount += 1
          }
        };
      }
      rows.push(row)
    };
    return rows
  }

  function fillFirstRow() {

  }

  function calcRowsRequired(firstDay, firstRowDayOfWeekStart, days) {
    var daysToSubtract = 7 - firstRowDayOfWeekStart
    var daysRemaining = days - daysToSubtract
    return Math.ceil(daysRemaining / 7)
  }

  function daysInMonth(firstDay) {
    // Note - months here are 1-based (that's why we add 1)
    return new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate();
  }

  $scope.popoverClicked = function() {
    ShiftPopover.popoverClicked($scope)
  }

  function clone(obj) {
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
})