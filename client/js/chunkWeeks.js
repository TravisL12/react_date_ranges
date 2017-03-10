'use strict';

export default function (dates) {
    let weeks = [],
        daysInWeek = 7,
        weekCount = Math.ceil(dates.length / daysInWeek);

    for (var i = 0; i < weekCount; i++) {
        let weekIdx = i * daysInWeek;
        let days = dates.slice(weekIdx, weekIdx + daysInWeek);
        weeks.push(days);
    }
    return weeks;
}
