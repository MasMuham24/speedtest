let mili = 0, sec = 0, isStart = false, timerInterval;

const startTimer = () => {
  if (isStart) return;
  timerInterval = setInterval(() => {
    if (sec === 999 && mili === 59) return stopTimer();
    mili = (mili + 1) % 100;
    if (!mili) sec++;
    renderTimer();
  }, 10);
  isStart = true;
};

const stopTimer = () => (clearInterval(timerInterval), isStart = false);

const resetTimer = () => {
  stopTimer();
  mili = sec = 0;
  renderTimer();
};

const renderTimer = () => {
  ["mili", "sec"].forEach((id, i) => 
    document.getElementById(id).innerText = String([mili, sec][i]).padStart(i ? 3 : 2, "0"));
};

["start", "stop", "reset"].forEach(id => 
  document.getElementById(id).addEventListener("click", eval(id + "Timer")));
