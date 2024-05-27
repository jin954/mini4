document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const clockElement = document.getElementById('clock');
    const pomodoroElement = document.getElementById('pomodoro');
    const countdownElement = document.getElementById('countdown');
    const switchInputs = document.querySelectorAll('.switch input[name="mode"]');

    const timeFormatSelect = document.getElementById('time-format');
    const showSecondsCheckbox = document.getElementById('show-seconds');
    const bgColorSelect = document.getElementById('bg-color');
    const textColorSelect = document.getElementById('text-color');

    const pomodoroMinutesInput = document.getElementById('pomodoroMinutes');
    const shortBreakMinutesInput = document.getElementById('shortBreakMinutes');
    const longBreakMinutesInput = document.getElementById('longBreakMinutes');
    const bgColorPomodoroSelect = document.getElementById('bg-color-pomodoro');
    const textColorPomodoroSelect = document.getElementById('text-color-pomodoro');

    const countdownYearInput = document.getElementById('countdownYear');
    const countdownMonthInput = document.getElementById('countdownMonth');
    const countdownDayInput = document.getElementById('countdownDay');
    const countdownHourInput = document.getElementById('countdownHour');
    const countdownMinuteInput = document.getElementById('countdownMinute');
    const countdownSecondInput = document.getElementById('countdownSecond');
    const bgColorCountdownSelect = document.getElementById('bg-color-countdown');
    const textColorCountdownSelect = document.getElementById('text-color-countdown');

    const clockSettingsPanel = document.getElementById('clock-settings-panel');
    const pomodoroSettingsPanel = document.getElementById('pomodoro-settings-panel');
    const countdownSettingsPanel = document.getElementById('countdown-settings-panel');

    const clockSettingsButton = document.getElementById('clock-settings');
    const pomodoroSettingsButton = document.getElementById('pomodoro-settings');
    const countdownSettingsButton = document.getElementById('countdown-settings');

    const closeClockSettingsButton = document.getElementById('close-clock-settings');
    const closePomodoroSettingsButton = document.getElementById('close-pomodoro-settings');
    const closeCountdownSettingsButton = document.getElementById('close-countdown-settings');

    let timerInterval;
    let countdownInterval;

    // Switch between modes
    switchInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
                switch (input.value) {
                    case 'clock':
                        clockElement.classList.add('active');
                        pomodoroElement.classList.remove('active');
                        countdownElement.classList.remove('active');
                        break;
                    case 'pomodoro':
                        clockElement.classList.remove('active');
                        pomodoroElement.classList.add('active');
                        countdownElement.classList.remove('active');
                        break;
                    case 'countdown':
                        clockElement.classList.remove('active');
                        pomodoroElement.classList.remove('active');
                        countdownElement.classList.add('active');
                        break;
                }
            }
        });
    });

    // Update clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const date = now.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

        let formattedTime = timeFormatSelect.value === '24h'
            ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
            : `${(hours % 12 || 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}`;

        if (showSecondsCheckbox.checked) {
            formattedTime += `:${seconds.toString().padStart(2, '0')}`;
        }

        document.getElementById('date').textContent = date;
        document.getElementById('time').textContent = formattedTime;
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Timer functionality
    let pomodoroTimer;
    let isRunning = false;

    const timerDisplay = document.getElementById('timer');
    const startTimerButton = document.getElementById('startTimer');
    const resetTimerButton = document.getElementById('resetTimer');

    let remainingTime = pomodoroMinutesInput.value * 60;

    function updateTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startPomodoro() {
        if (!isRunning) {
            isRunning = true;
            pomodoroTimer = setInterval(() => {
                if (remainingTime > 0) {
                    remainingTime--;
                    updateTimerDisplay();
                } else {
                    clearInterval(pomodoroTimer);
                    isRunning = false;
                }
            }, 1000);
        }
    }

    function resetPomodoro() {
        clearInterval(pomodoroTimer);
        isRunning = false;
        remainingTime = pomodoroMinutesInput.value * 60;
        updateTimerDisplay();
    }

    startTimerButton.addEventListener('click', startPomodoro);
    resetTimerButton.addEventListener('click', resetPomodoro);

    updateTimerDisplay();

    // Countdown functionality
    const countdownDisplay = document.getElementById('countdownDisplay');
    const startCountdownButton = document.getElementById('startCountdown');
    const resetCountdownButton = document.getElementById('resetCountdown');

    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date(
            countdownYearInput.value,
            countdownMonthInput.value - 1,
            countdownDayInput.value,
            countdownHourInput.value,
            countdownMinuteInput.value,
            countdownSecondInput.value
        );

        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = '00:00:00:00';
        } else {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('countdown-days').textContent = days;
            document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
        }
    }

    startCountdownButton.addEventListener('click', () => {
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    });

    resetCountdownButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        document.getElementById('countdown-days').textContent = '0';
        document.getElementById('countdown-hours').textContent = '00';
        document.getElementById('countdown-minutes').textContent = '00';
        document.getElementById('countdown-seconds').textContent = '00';
    });

    // Settings handling
    clockSettingsButton.addEventListener('click', () => {
        clockSettingsPanel.style.display = 'block';
    });

    pomodoroSettingsButton.addEventListener('click', () => {
        pomodoroSettingsPanel.style.display = 'block';
    });

    countdownSettingsButton.addEventListener('click', () => {
        countdownSettingsPanel.style.display = 'block';
    });

    closeClockSettingsButton.addEventListener('click', () => {
        clockSettingsPanel.style.display = 'none';
    });

    closePomodoroSettingsButton.addEventListener('click', () => {
        pomodoroSettingsPanel.style.display = 'none';
    });

    closeCountdownSettingsButton.addEventListener('click', () => {
        countdownSettingsPanel.style.display = 'none';
    });

    // Apply settings
    function applyClockSettings() {
        document.body.style.backgroundColor = bgColorSelect.value;
        document.body.style.color = textColorSelect.value;
    }

    function applyPomodoroSettings() {
        document.body.style.backgroundColor = bgColorPomodoroSelect.value;
        document.body.style.color = textColorPomodoroSelect.value;
    }

    function applyCountdownSettings() {
        document.body.style.backgroundColor = bgColorCountdownSelect.value;
        document.body.style.color = textColorCountdownSelect.value;
    }

    [timeFormatSelect, showSecondsCheckbox, bgColorSelect, textColorSelect].forEach(element => {
        element.addEventListener('change', applyClockSettings);
    });

    [pomodoroMinutesInput, shortBreakMinutesInput, longBreakMinutesInput, bgColorPomodoroSelect, textColorPomodoroSelect].forEach(element => {
        element.addEventListener('change', applyPomodoroSettings);
    });

    [countdownYearInput, countdownMonthInput, countdownDayInput, countdownHourInput, countdownMinuteInput, countdownSecondInput, bgColorCountdownSelect, textColorCountdownSelect].forEach(element => {
        element.addEventListener('change', applyCountdownSettings);
    });

    applyClockSettings();
    applyPomodoroSettings();
    applyCountdownSettings();
});
