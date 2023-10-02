// JavaScript for the stopwatch functionality

let startTime;
let intervalId;
let isRunning = false;
let lapNumber = 1;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - (parseInt(minutesDisplay.innerText) * 60000 +
            parseInt(secondsDisplay.innerText) * 1000 +
            parseInt(millisecondsDisplay.innerText));
        intervalId = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
        lapButton.textContent = 'Lap';
    } else {
        clearInterval(intervalId);
        startStopButton.textContent = 'Start';
        lapButton.textContent = 'Reset';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    startTime = null;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    startStopButton.textContent = 'Start';
    lapButton.textContent = 'Lap';
    lapNumber = 1;
    lapList.innerHTML = '';
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}

function lap() {
    if (isRunning) {
        const lapTime = `${minutesDisplay.innerText}:${secondsDisplay.innerText}:${millisecondsDisplay.innerText}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapNumber++;
    } else {
        reset();
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);