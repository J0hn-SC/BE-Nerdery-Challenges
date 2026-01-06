/*
Challenge 1

"Time difference calculator"

The function timeDifference accepts two positive numbers representing time in seconds. You should modify the function to return the difference between the two times in a human-readable format HH:MM:SS.

Requirements:
- The function should accept two positive numbers representing time in seconds.
- The function should return the absolute difference between the two times.
- The result should be formatted as HH:MM:SS.

Example:

timeDifference(7200, 3400); // Expected output: "01:03:20"

*/

const timeDifference = (a, b) => {
    let difference = Math.abs(a - b);
    let hours = Math.floor(difference / 3600).toString().padStart(2, '0')
    let minutes = Math.floor((difference / 60) % 60 ).toString().padStart(2, '0')
    let seconds =  Math.floor(difference % 60 ).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`

};

module.exports = timeDifference;
