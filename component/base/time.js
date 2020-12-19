import React from 'react';



const TimeHandle = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date().getDate();
    const day = days[new Date().getDay()];
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const time = `${hour}:${minutes} ${day},${date} ${monthNames[month -1]} ${year}`;
    return time;
}

export default TimeHandle;