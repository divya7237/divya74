let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapTimes = [];

// DOM elements
const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapTimesList = document.getElementById("lapTimes");

// Function to format time (HH:MM:SS)
function formatTime(ms) {
  const hours = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Function to update the display
function updateTimeDisplay() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Start or pause the stopwatch
function toggleStartStop() {
  if (isRunning) {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimeDisplay, 1000);
    startStopBtn.textContent = "Pause";
    lapBtn.disabled = false;
  }
  isRunning = !isRunning;
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  startStopBtn.textContent = "Start";
  lapBtn.disabled = true;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  lapTimes = [];
  lapTimesList.innerHTML = "";
}

// Record a lap time
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  lapTimes.push(lapTime);
  const lapItem = document.createElement("li");
  lapItem.innerHTML = `Lap ${lapTimes.length}: <span>${lapTime}</span>`;
  lapTimesList.appendChild(lapItem);
}

// Event listeners
startStopBtn.addEventListener("click", toggleStartStop);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
