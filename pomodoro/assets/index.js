const btnWork = document.getElementById("btnWork");
const btnBreak = document.getElementById("btnBreak");
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const statusMessage = document.getElementById("statusMessage");

let timer;
let timeLeft;
let isPaused;
let currentMode;

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaingSeconds).padStart(
    2,
    "0"
  )}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  document.title = formatTime(timeLeft);
}

function switchMode(newMode) {
  currentMode = newMode;
  isPaused = false;
  clearInterval(timer);

  if (currentMode === "work") {
    timeLeft = WORK_DURATION;
    statusMessage.textContent = "Hora de focar!!";
    btnWork.classList.add("active");
    btnBreak.classList.remove("active");
  } else {
    timeLeft = BREAK_DURATION;
    statusMessage.textContent = "Hora de descansar!";
    btnWork.classList.remove("active");
    btnBreak.classList.add("active");
  }

  updateDisplay();
  startButton.style.display = "inline-block";
  pauseButton.style.display = "none";
}

function startTimer() {
  if (timer <= 0) {
    switchMode(currentMode);
  }

  isPaused = false;

  startButton.style.display = "none";
  pauseButton.style.display = "inline-block";
  statusMessage.textContent =
    currentMode === "work" ? "Focando..." : "Pausando...";

  timer = setInterval(() => {
    if (isPaused) return;

    timeLeft--;

    console.log(timeLeft);
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      switchMode(currentMode === "work" ? "break" : "work");

      startButton.style.display = "inline-block";
      pauseButton.style.display = "none";
      statusMessage.textContent += " Sessão concluída!";
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  startButton.style.display = "inline-block";
  pauseButton.style.display = "none";
  statusMessage.textContent += " Sessão pausada!";
}

function resetTimer() {
  clearInterval(timer);
  isPaused = false;
  switchMode(currentMode);
  startButton.style.display = "inline-block";
  pauseButton.style.display = "none";
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

btnWork.addEventListener("click", () => {
  if (currentMode !== "work") {
    clearInterval(timer);
    switchMode("work");
  }
});

btnBreak.addEventListener("click", () => {
  if (currentMode !== "break") {
    clearInterval(timer);
    switchMode("break");
  }
});

switchMode("work");
