import React from 'react';

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function WeekHeader() {
    return (
        <div className="month--header">
            {dayNames.map((day, idx) => {
                return (
                    <div key={idx.toString()} className="month--header-day">{day}</div>
                );
            })}
        </div>
    )
}
