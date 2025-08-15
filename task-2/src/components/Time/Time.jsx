import { useEffect, useState } from "react";

function getFormatedTime() {
    return Intl.DateTimeFormat("uk", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(Date.now());
}

const test1 = getFormatedTime();
console.log(test1);

function Time() {
    const [time, setTime] = useState(test1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Update time every 1 sec\
            console.log("set time");
            setTime(getFormatedTime());
        }, 1000);

        // Clear Interval
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return <p>Time: {time}</p>;
}

export default Time;
