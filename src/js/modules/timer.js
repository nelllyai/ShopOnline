const timerBlock = document.querySelector('[data-timer-deadline]');

if (timerBlock) {
  const deadline = new Date(timerBlock.dataset.timerDeadline).getTime();

  timerBlock.classList.add('timer');

  timerBlock.innerHTML = `
    <p class="timer__title">До конца акции:</p>
    <div class="timer__list">
      <p class="timer__item timer__item_days">
        <span class="timer__counter timer__counter_days"></span>
        <span class="timer__units timer__units_days"></span>
      </p>
      <p class="timer__item timer__item_hours">
        <span class="timer__counter timer__counter_hours"></span>
        <span class="timer__units timer__units_hours"></span>
      </p>
      <p class="timer__item timer__item_minutes">
        <span class="timer__counter timer__counter_minutes"></span>
        <span class="timer__units timer__units_minutes"></span>
      </p>
      <p class="timer__item timer__item_seconds">
        <span class="timer__counter timer__counter_seconds"></span>
        <span class="timer__units timer__units_seconds"></span>
      </p>
    </div>
  `;

  const counterDays = timerBlock.querySelector('.timer__counter_days');
  const counterHours = timerBlock.querySelector('.timer__counter_hours');
  const counterMinutes = timerBlock.querySelector('.timer__counter_minutes');
  const counterSeconds = timerBlock.querySelector('.timer__counter_seconds');

  const unitsDays = timerBlock.querySelector('.timer__units_days');
  const unitsHours = timerBlock.querySelector('.timer__units_hours');
  const unitsMinutes = timerBlock.querySelector('.timer__units_minutes');
  const unitsSeconds = timerBlock.querySelector('.timer__units_seconds');

  const getTimeRemaining = () => {
    const currentDate = Date.now() + (180 + new Date().getTimezoneOffset()) * 60 * 1000;
    const timeRemaining = deadline - currentDate;

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return { timeRemaining, seconds, minutes, hours, days };
  }

  const getDeclension = (counter, type) => {
    if (counter > 10 && counter < 20) {
      if (type === 'day') {
        return 'дней';
      } else if (type === 'hours') {
        return 'часов';
      } else if (type === 'minutes') {
        return 'минут';
      } else {
        return 'секунд';
      }
    } else if (counter % 10 === 1) {
      if (type === 'day') {
        return 'день';
      } else if (type === 'hours') {
        return 'час';
      } else if (type === 'minutes') {
        return 'минута';
      } else {
        return 'секунда';
      }
    } else if (counter % 10 === 2 || counter % 10 === 3 || counter % 10 === 4) {
      if (type === 'day') {
        return 'дня';
      } else if (type === 'hours') {
        return 'часа';
      } else if (type === 'minutes') {
        return 'минуты';
      } else {
        return 'секунды';
      }
    } else {
      if (type === 'day') {
        return 'дней';
      } else if (type === 'hours') {
        return 'часов';
      } else if (type === 'minutes') {
        return 'минут';
      } else {
        return 'секунд';
      }
    }
  }

  const start = () => {
    const timer = getTimeRemaining();

    if (timer.days <= 0) {
      document.querySelector('.timer__item_days').style.display = 'none';
      counterSeconds.textContent = timer.seconds > 9 ?
        timer.seconds : '0' + timer.seconds;
      unitsSeconds.textContent = getDeclension(timer.seconds, 'seconds');
    }

    counterDays.textContent = timer.days;
    unitsDays.textContent = getDeclension(timer.days, 'day');

    counterHours.textContent = timer.hours > 9 ?
      timer.hours : '0' + timer.hours;
    unitsHours.textContent = getDeclension(timer.hours, 'hours');

    counterMinutes.textContent = timer.minutes > 9 ?
      timer.minutes : '0' + timer.minutes;
    unitsMinutes.textContent = getDeclension(timer.minutes, 'minutes');

    const timerId = setTimeout(start, 1000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(timerId);
      timerBlock.innerHTML = '';
    }
  }

  start();
}