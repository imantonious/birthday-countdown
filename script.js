// DOM elements
const backgroundYear = document.getElementById("year");
const birthdayText = document.getElementById("birthday");
const countdownText = document.getElementById("countdown");
const daysText = document.getElementById("days");
const hoursText = document.getElementById("hours");
const loading = document.getElementById("loading");
const minutesText = document.getElementById("minutes");
const secondsText = document.getElementById("seconds");

// birthday stuff
const currentYear = new Date().getFullYear();
const currentDate = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// gets birthday variables...
const selectedDOB =
  window.location.search || `${new Date().getFullYear()}-01-01`; // sets default to new year if no date is provided
let dob = selectedDOB.split("-");
dob.shift(); // removes year
const dobDay = dob[1]; // gets last element which is the day number
const dobMonth = monthNames[parseInt(dob[0]) - 1]; // gets the name of the month based on first element of dob which is the month number
console.log(selectedDOB, dob);
const birthday = new Date(`${dobMonth} ${dobDay} ${currentYear} 00:00:00`);

let dayString;

/**  sets string of date ie. 22nd, 31st, 3rd.*/
function setDayString(num) {
  switch (num) {
    case 1:
    case 11:
    case 21:
    case 31:
      dayString = num + "st";
      break;
    case 2:
    case 12:
    case 22:
      dayString = num + "nd";
      break;
    case 3:
    case 13:
    case 23:
      dayString = num + "rd";
      break;
    default:
      dayString = num + "th";
      break;
  }
}

setDayString(birthday.getDate());

birthdayText.innerHTML = `${monthNames[birthday.getMonth()]} ${dayString}`;

// Set background year
backgroundYear.innerText =
  currentDate > birthday ? currentYear + 1 : currentYear;

// checks if birthday is in the past and corrects year
if (
  birthday.getMonth() <= currentDate.getMonth() &&
  birthday.getDate() <= currentDate.getDate()
) {
  birthday.setFullYear(currentYear + 1);
}

function updateCountdown() {
  const currentTime = new Date();
  const difference = birthday - currentTime;

  // math determining maths stuff
  const day = Math.floor(difference / 1000 / 60 / 60 / 24);
  const hour = Math.floor(difference / 1000 / 60 / 60) % 24;
  const minute = Math.floor(difference / 1000 / 60) % 60;
  const second = Math.floor(difference / 1000) % 60;

  // add values to DOM
  daysText.innerHTML = day;
  hoursText.innerHTML = hour < 10 ? "0" + hour : hour;
  minutesText.innerHTML = minute < 10 ? "0" + minute : minute;
  secondsText.innerHTML = second < 10 ? "0" + second : second;
}

// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

// Run every second
setInterval(updateCountdown, 1000);
