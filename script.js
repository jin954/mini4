document.addEventListener('DOMContentLoaded', function () {
    // Clock elements
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const clockSettingsButton = document.getElementById('clock-settings');
    const clockSettingsPanel = document.getElementById('clock-settings-panel');
    const timeFormatSelect = document.getElementById('time-format');
    const showSecondsCheckbox = document.getElementById('show-seconds');
    const bgColorSelect = document.getElementById('bg-color');
    const textColorSelect = document.getElementById('text-color');
    const closeClockSettingsButton = document.getElementById('close-clock-settings');

    // Pomodoro elements
    const pomodoroElement = document.getElementById('pomodoro');
    const timerElement = document.getElementById('timer');
    const startTimerButton = document.getElementById('startTimer');
    const resetTimerButton = document.getElementById('resetTimer');
    const pomodoroSettingsButton = document.getElementById('pomodoro-settings');
    const pomodoroSettingsPanel = document.getElementById('pomodoro-settings-panel');
    const pomodoroMinutesInput = document.getElementById('pomodoroMinutes');
    const shortBreakMinutesInput = document.getElementById('shortBreakMinutes');
    const longBreakMinutesInput = document.getElementById('longBreakMinutes');
    const bgColorPomodoroSelect = document.getElementById('bg-color-pomodoro');
    const textColorPomodoroSelect = document.getElementById('text-color-pomodoro');
    const closePomodoroSettingsButton = document.getElementById('close-pomodoro-settings');
    const pomodoroModeButton = document.getElementById('pomodoroMode');
    const shortBreakModeButton = document.getElementById('shortBreakMode');
    const longBreakModeButton = document.getElementById('longBreakMode');

    // Countdown elements
    const countdownElement = document.getElementById('countdown');
    const countdownDisplay = document.getElementById('countdownDisplay');
    const startCountdownButton = document.getElementById('startCountdown');
    const resetCountdownButton = document.getElementById('resetCountdown');
    const countdownSettingsButton = document.getElementById('countdown-settings');
    const countdownSettingsPanel = document.getElementById('countdown-settings-panel');
    const countdownYearInput = document.getElementById('countdownYear');
    const countdownMonthInput = document.getElementById('countdownMonth');
    const countdownDayInput = document.getElementById('countdownDay');
    const countdownHourInput = document.getElementById('countdownHour');
    const countdownMinuteInput = document.getElementById('countdownMinute');
    const countdownSecondInput = document.getElementById('countdownSecond');
    const bgColorCountdownSelect = document.getElementById('bg-color-countdown');
    const textColorCountdownSelect = document.getElementById('text-color-countdown');
    const closeCountdownSettingsButton = document.getElementById('close-countdown-settings');

    // Switch elements
    const modeSwitch = document.querySelectorAll('input[name="mode"]');

    let currentMode = 'clock';
    let timerInterval;
    let countdownInterval;

    // Initialize the clock
    function updateClock() {
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        const dateStr = now.toLocaleDateString('ja-JP', dateOptions);
        let timeStr;
        if (timeFormatSelect.value === '24h') {
            timeStr = now.toLocaleTimeString('ja-JP', { hour12: false });
        } else {
            timeStr = now.toLocaleTimeString('ja-JP', { hour12: true });
        }
        if (!showSecondsCheckbox.checked) {
            timeStr = timeStr.slice(0, -3);
        }
        dateElement.textContent = dateStr;
        timeElement.textContent = timeStr;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Switch between modes
    modeSwitch.forEach((radio) => {
        radio.addEventListener('change', function () {
            currentMode = this.value;
            clockElement.classList.remove('active');
            pomodoroElement.classList.remove('active');
            countdownElement.classList.remove('active');
            clearInterval(timerInterval);
            clearInterval(countdownInterval);

            if (currentMode === 'clock') {
                clockElement.classList.add('active');
            } else if (currentMode === 'pomodoro') {
                pomodoroElement.classList.add('active');
                updatePomodoroTimerDisplay();
            } else if (currentMode === 'countdown') {
                countdownElement.classList.add('active');
                updateCountdownDisplay();
            }
        });
    });

    // Clock settings
    clockSettingsButton.addEventListener('click', () => {
        clockSettingsPanel.style.display = 'block';
    });

    closeClockSettingsButton.addEventListener('click', () => {
        clockSettingsPanel.style.display = 'none';
        document.body.style.backgroundColor = bgColorSelect.value;
        document.body.style.color = textColorSelect.value;
    });

    // Pomodoro timer functionality
    let pomodoroDuration = parseInt(pomodoroMinutesInput.value) * 60;
    let shortBreakDuration = parseInt(shortBreakMinutesInput.value) * 60;
    let longBreakDuration = parseInt(longBreakMinutesInput.value) * 60;
    let remainingTime = pomodoroDuration;
    let isPomodoroRunning = false;

    function updatePomodoroTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
        const seconds = (remainingTime % 60).toString().padStart(2, '0');
        timerElement.textContent = `${minutes}:${seconds}`;
    }

    function startPomodoroTimer() {
        if (isPomodoroRunning) return;
        isPomodoroRunning = true;
        timerInterval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updatePomodoroTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isPomodoroRunning = false;
            }
        }, 1000);
    }

    function resetPomodoroTimer() {
        clearInterval(timerInterval);
        isPomodoroRunning = false;
        remainingTime = pomodoroDuration;
        updatePomodoroTimerDisplay();
    }

    startTimerButton.addEventListener('click', startPomodoroTimer);
    resetTimerButton.addEventListener('click', resetPomodoroTimer);

    // Pomodoro settings
    pomodoroSettingsButton.addEventListener('click', () => {
        pomodoroSettingsPanel.style.display = 'block';
    });

    closePomodoroSettingsButton.addEventListener('click', () => {
        pomodoroSettingsPanel.style.display = 'none';
        pomodoroDuration = parseInt(pomodoroMinutesInput.value) * 60;
        shortBreakDuration = parseInt(shortBreakMinutesInput.value) * 60;
        longBreakDuration = parseInt(longBreakMinutesInput.value) * 60;
        remainingTime = pomodoroDuration;
        document.body.style.backgroundColor = bgColorPomodoroSelect.value;
        document.body.style.color = textColorPomodoroSelect.value;
        updatePomodoroTimerDisplay();
    });

    pomodoroModeButton.addEventListener('click', () => {
        pomodoroModeButton.classList.add('active');
        shortBreakModeButton.classList.remove('active');
        longBreakModeButton.classList.remove('active');
        remainingTime = pomodoroDuration;
        updatePomodoroTimerDisplay();
    });

    shortBreakModeButton.addEventListener('click', () => {
        pomodoroModeButton.classList.remove('active');
        shortBreakModeButton.classList.add('active');
        longBreakModeButton.classList.remove('active');
        remainingTime = shortBreakDuration;
        updatePomodoroTimerDisplay();
    });

    longBreakModeButton.addEventListener('click', () => {
        pomodoroModeButton.classList.remove('active');
        shortBreakModeButton.classList.remove('active');
        longBreakModeButton.classList.add('active');
        remainingTime = longBreakDuration;
        updatePomodoroTimerDisplay();
    });

    // Countdown functionality
    function updateCountdownDisplay() {
        const targetDate = new Date(
            countdownYearInput.value,
            countdownMonthInput.value - 1,
            countdownDayInput.value,
            countdownHourInput.value,
            countdownMinuteInput.value,
            countdownSecondInput.value
        );
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            countdownDisplay.textContent = "00:00:00:00";
            clearInterval(countdownInterval);
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
            const minutes = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
            const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
            countdownDisplay.textContent = `${days}:${hours}:${minutes}:${seconds}`;
        }
    }

    function startCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);
        updateCountdownDisplay();
        countdownInterval = setInterval(updateCountdownDisplay, 1000);
    }

    function resetCountdown() {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "00:00:00:00";
    }

    startCountdownButton.addEventListener('click', startCountdown);
    resetCountdownButton.addEventListener('click', resetCountdown);

    // Countdown settings
    countdownSettingsButton.addEventListener('click', () => {
        countdownSettingsPanel.style.display = 'block';
    });

    closeCountdownSettingsButton.addEventListener('click', () => {
        countdownSettingsPanel.style.display = 'none';
        document.body.style.backgroundColor = bgColorCountdownSelect.value;
        document.body.style.color = textColorCountdownSelect.value;
    });
});
