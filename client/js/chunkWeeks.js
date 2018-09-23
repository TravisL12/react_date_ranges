"use strict";

export default function(dates) {
  const weeks = [];
  const daysInWeek = 7;
  const weekCount = Math.ceil(dates.length / daysInWeek);

  for (var i = 0; i < weekCount; i++) {
    let weekIdx = i * daysInWeek;
    let days = dates.slice(weekIdx, weekIdx + daysInWeek);
    weeks.push(days);
  }
  return weeks;
}
