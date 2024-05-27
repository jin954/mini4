document.addEventListener('DOMContentLoaded', () => {
    const modes = document.querySelectorAll('input[name="mode"]');
    const clock = document.getElementById('clock');
    const pomodoro = document.getElementById('pomodoro');
    const countdown = document.getElementById('countdown');
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const timerElement = document.getElementById('timer');
    const countdownDisplay = document.getElementById('countdownDisplay');

    let timer;
    let countdownTimer;

    modes.forEach(mode => {
        mode.addEventListener('change', () => {
            clock.classList.remove('active');
            pomodoro.classList.remove('active');
            countdown.classList.remove('active');
            document.getElementById(mode.value).classList.add('active');
        });
    });

    // Clock functionality
    function updateClock() {
        const now = new Date();
        const dateString = now.toDateString();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        dateElement.textContent = dateString;

        if (document.getElementById('time-format').value === '12h') {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        } else {
            timeElement.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    document.getElementById('clock-settings').addEventListener('click', () => {
        document.getElementById('clock-settings-panel').style.display = 'block';
    });

    document.getElementById('close-clock-settings').addEventListener('click', () => {
        document.getElementById('clock-settings-panel').style.display = 'none';
    });

    // Pomodoro functionality
    let pomodoroMinutes = 25;
    let shortBreakMinutes = 5;
    let longBreakMinutes = 15;
    let isPomodoro = true;

    function startPomodoroTimer() {
        let time = pomodoroMinutes * 60;
        timerElement.textContent = formatTime(time);

        timer = setInterval(() => {
            time--;
            timerElement.textContent = formatTime(time);

            if (time <= 0) {
                clearInterval(timer);
                if (isPomodoro) {
                    isPomodoro = false;
                    time = shortBreakMinutes * 60;
                    alert('Time for a short break!');
                } else {
                    isPomodoro = true;
                    time = pomodoroMinutes * 60;
                    alert('Time to get back to work!');
                }
                timerElement.textContent = formatTime(time);
                startPomodoroTimer();
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    document.getElementById('startTimer').addEventListener('click', () => {
        clearInterval(timer);
        startPomodoroTimer();
    });

    document.getElementById('resetTimer').addEventListener('click', () => {
        clearInterval(timer);
        timerElement.textContent = formatTime(pomodoroMinutes * 60);
    });

    document.getElementById('pomodoro-settings').addEventListener('click', () => {
        document.getElementById('pomodoro-settings-panel').style.display = 'block';
    });

    document.getElementById('close-pomodoro-settings').addEventListener('click', () => {
        document.getElementById('pomodoro-settings-panel').style.display = 'none';
    });

    document.getElementById('pomodoroMinutes').addEventListener('change', (event) => {
        pomodoroMinutes = parseInt(event.target.value, 10);
    });

    document.getElementById('shortBreakMinutes').addEventListener('change', (event) => {
        shortBreakMinutes = parseInt(event.target.value, 10);
    });

    document.getElementById('longBreakMinutes').addEventListener('change', (event) => {
        longBreakMinutes = parseInt(event.target.value, 10);
    });

    // Countdown functionality
    let countdownYear = 2024;
    let countdownMonth = 1;
    let countdownDay = 1;
    let countdownHour = 0;
    let countdownMinute = 0;
    let countdownSecond = 0;

    function startCountdownTimer() {
        const countdownDate = new Date(countdownYear, countdownMonth - 1, countdownDay, countdownHour, countdownMinute, countdownSecond).getTime();

        countdownTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('countdown-days').textContent = days;
            document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownDisplay.textContent = 'Countdown Ended';
            }
        }, 1000);
    }

    document.getElementById('startCountdown').addEventListener('click', () => {
        clearInterval(countdownTimer);
        startCountdownTimer();
    });

    document.getElementById('resetCountdown').addEventListener('click', () => {
        clearInterval(countdownTimer);
        document.getElementById('countdown-days').textContent = '0';
        document.getElementById('countdown-hours').textContent = '00';
        document.getElementById('countdown-minutes').textContent = '00';
        document.getElementById('countdown-seconds').textContent = '00';
    });

    document.getElementById('countdown-settings').addEventListener('click', () => {
        document.getElementById('countdown-settings-panel').style.display = 'block';
    });

    document.getElementById('close-countdown-settings').addEventListener('click', () => {
        document.getElementById('countdown-settings-panel').style.display = 'none';
    });

    document.getElementById('countdownYear').addEventListener('change', (event) => {
        countdownYear = parseInt(event.target.value, 10);
    });

    document.getElementById('countdownMonth').addEventListener('change', (event) => {
        countdownMonth = parseInt(event.target.value, 10);
    });

    document.getElementById('countdownDay').addEventListener('change', (event) => {
        countdownDay = parseInt(event.target.value, 10);
    });

    document.getElementById('countdownHour').addEventListener('change', (event) => {
        countdownHour = parseInt(event.target.value, 10);
    });

    document.getElementById('countdownMinute').addEventListener('change', (event) => {
        countdownMinute = parseInt(event.target.value, 10);
    });

    document.getElementById('countdownSecond').addEventListener('change', (event) => {
        countdownSecond = parseInt(event.target.value, 10);
    });
});
