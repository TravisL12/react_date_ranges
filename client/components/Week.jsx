import React from 'react';

function buildDays (dates) {
    return dates.map((date, j) => {
        return date === null ? <li key={j} className='week--tile none'></li> : date;
    });
}

export default function Week (props) {
    return <ul key={props.idx} className={'week week-' + (props.idx + 1)}>{buildDays(props.dates)}</ul>
}
