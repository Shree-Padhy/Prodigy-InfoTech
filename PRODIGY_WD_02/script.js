let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let lapList = document.getElementById("lap-list");
let int = null;
let isRunning = false;
let lapCounter = 1;

// Event listeners for buttons
document.getElementById("start-stop").addEventListener("click", () => {
    if (isRunning) {
        clearInterval(int);
        document.getElementById("start-stop").textContent = "Start";
        document.getElementById("record-lap").disabled = true;
    } else {
        int = setInterval(displayTimer, 10);
        document.getElementById("start-stop").textContent = "Pause/Stop";
        document.getElementById("record-lap").disabled = false;
    }
    isRunning = !isRunning;
});

document.getElementById("lap-reset").addEventListener("click", () => {
    clearInterval(int);
    isRunning = false;
    document.getElementById("start-stop").textContent = "Start";
    document.getElementById("record-lap").disabled = true;
    lapCounter = 1;
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000";
    lapList.innerHTML = "";
});

document.getElementById("record-lap").addEventListener("click", () => {
    let lapTimeItem = document.createElement("li");
    lapTimeItem.textContent = `Lap ${lapCounter}: ${timeRef.innerHTML}`;
    lapList.appendChild(lapTimeItem);
    lapCounter++;
});

// Function to display timer
function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}
