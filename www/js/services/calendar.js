angular.module('starter.services')

.service('Calendar', function($rootScope, $ionicSlideBoxDelegate, General, Notification, Api) {
  var Calendar = {};

  Calendar.highlightToday = function() {
    var today = new Date()
    var todayCell = $(".dates").find("[data-date='" + today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear() + "']");
    todayCell.addClass("active")
  }

  Calendar.highlightNextDay = function() {
    var selected = $(".col.date-col.active")
    var currentSlide = $($("ion-slide")[$ionicSlideBoxDelegate.currentIndex()])
    var visibleSelected = currentSlide.find(".col.date-col.active")
    selected.removeClass("active")

    if (visibleSelected.next().length == 0) { // if last date in row
      if (visibleSelected.parents(".row").next().length == 0) { // if last date in month
        var todayInText = visibleSelected.attr("data-date")
        $rootScope.$broadcast("goToNextCalendarSlide", {nextDay: nextDayInText(todayInText)});
      } else {
        visibleSelected.parents(".row").next().find(".col.date-col").first().addClass("active")
      }
    } else {
      selected.next().addClass("active")
    }
  }

  Calendar.highlightNextDayFromPreviousSlide = function(date) {
    $(".col.date-col.active").removeClass("active")
    var nextDay = $(".dates").find("[data-date='" + date + "']");
    nextDay.addClass("active")
  }

  function nextDayInText(today) {
    var splitDate = today.split("-")
    var currentDate = new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]) // Year, Month, Date
    var nextDate = new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]) // Year, Month, Date
    nextDate.setDate(currentDate.getDate() + 1)
    return nextDate.getDate() + "-" + (nextDate.getMonth() + 1) + "-" + nextDate.getFullYear()
  }

  Calendar.setupCalendarObjects = function(shifts) {
    var calendarObjects = []
    var startEndDates = startEndDateObjects()
    var currentDate = new Date();
    for (var i = -3; i < 12; i++) { // 25 is for 25 months (1 year ahead and 1 year behind)
      var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      firstDay = addMonths(firstDay, i)

      var title = monthNames(firstDay.getMonth()) + " " + firstDay.getFullYear()
      var rows = fillRows(firstDay, shifts)

      calendarObjects.push({
        title: title,
        rows: rows
      })
    };
    return calendarObjects
  }

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

  function addMonths(dateObj, num) {
    dateObj.setMonth(dateObj.getMonth() + num)
    return dateObj;
  }

  function monthNames(index) {
    var names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return names[index]
  }

  function fillRows(firstDay, shifts) {
    var firstRowDayOfWeekStart = firstDay.getDay()
    var days = daysInMonth(firstDay)
    var rowsRequired = calcRowsRequired(firstDay, firstRowDayOfWeekStart, days)
    var rows = []
    var dayCount = 1

    for (var i = 0; i <= rowsRequired; i++) {
      var row = []

      if (i == 0) {

        for (var dayOfWeek = 0; dayOfWeek < firstRowDayOfWeekStart; dayOfWeek++) {
          var tempDate = General.clone(firstDay)
          tempDate.setDate(tempDate.getDate() - firstRowDayOfWeekStart + dayOfWeek)
          row.push({
            dayNum: tempDate.getDate(),
            month: tempDate.getMonth() + 1,
            year: tempDate.getFullYear(),
            isInCurrentMonth: false,
            shift: shifts[formatedShiftDate(tempDate, tempDate.getDate())]
          })
        };

        for (var dayOfWeek = firstRowDayOfWeekStart; dayOfWeek < 7; dayOfWeek++) {
          row.push({
            dayNum: dayCount,
            month: firstDay.getMonth() + 1,
            year: firstDay.getFullYear(),
            isInCurrentMonth: true,
            shift: shifts[formatedShiftDate(firstDay, dayCount)]
          })
          dayCount += 1
        };

      } else {

        var nextMonthDayCount = 1

        for (var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          if (dayCount <= days) {
            row.push({
              dayNum: dayCount,
              isInCurrentMonth: true,
              month: firstDay.getMonth() + 1,
              year: firstDay.getFullYear(),
              shift: shifts[formatedShiftDate(firstDay, dayCount)]
            })
            dayCount += 1
          } else {
            var nextMonth = General.clone(firstDay)
            nextMonth = addMonths(nextMonth, 1)
            row.push({
              dayNum: nextMonthDayCount,
              month: nextMonth.getMonth() + 1,
              year: nextMonth.getFullYear(),
              isInCurrentMonth: false,
              shift: shifts[formatedShiftDate(nextMonth, nextMonthDayCount)]
            })
            nextMonthDayCount += 1
          }
        };
      }
      rows.push(row)
    };
    return rows
  }

  function formatedShiftDate(dateObj, day) {
    return dateObj.getFullYear().toString() + "-" + zeroPad(dateObj.getMonth() + 1) + "-" + zeroPad(day)
  }

  function zeroPad(num) {
    if (num < 10) {
      return "0" + num.toString()
    } else {
      return num.toString()
    }
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

  Calendar.dateYear = function() {
    var today = new Date()
    var dateYear = today.getMonth() + "-" + today.getFullYear()
    return dateYear
  }

  Calendar.needReload = function(dateYear) {
    // return window.localStorage['timeLastReloaded'] != dateYear
    return true
    // return false
  }

  return Calendar;
})