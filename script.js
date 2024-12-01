'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;
// 🟢🔵🟡🟠🟣🔴
const initialization = function () {
  //  امتیازی که به هر بازیکن ثبت می شود .⬇⬇
  //در اینجا با توجه به ایندکس ، ایندکس صفر بازیکن اول و ایندکس 1 بازیکن دوم است .
  scores = [0, 0];
  //بازیکنی که نوبتش هست بازی کند .⬇⬇
  activePlayer = 0;
  //امتیازی که بازیکن در هر راند بدست می اورد . ⬇⬇
  currentScore = 0;
  // این متغییر در جهت ادامه دادن بازی یا اتمام بازی استفاده می شود .  ⬇⬇
  // اگر مقدار صحیح باشد بازی ادامه دارد و اگر مقدار غلط باشد بازی تمام می شود . ⬇⬇
  playing = true;

  //امتیاز هر بازیکن که در ابتدا باید صفر باشد .⬇⬇
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initialization();
// 🟢🔵🟡🟠🟣🔴
// refactoring of switch of player ⬇⬇
const switchPlayer = function () {
  // امتیاز فعلی بازیکن فعال صفر می شود .⬇⬇
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // شرطی برای تغییر بازیکن ها نوشته شده . اگر بازیکن اول باشد تغییر کند به بازیکن دوم و در غیر این صورت بازیکن اول باشد ⬇⬇
  activePlayer = activePlayer === 0 ? 1 : 0;
  // امتیاز فعلی ریسیت می شود ⬇⬇
  currentScore = 0;
  // استایل بازیکن فعال تغییر می کند . ⬇⬇
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// 🟢🔵🟡🟠🟣🔴
//وقتی دکمه را فشار می دهیم ⬇⬇
btnRoll.addEventListener('click', function () {
  if (playing) {
    //عددی به صورت رندوم از یک تا شش انتخاب می شود ⬇⬇
    const dice = Math.trunc(Math.random() * 6) + 1;
    //تاس نمایش داده می شود ⬇⬇
    diceEl.classList.remove('hidden');
    //با توجه به عدد و متغییر خط 27 تصویر تاس مرتبط به عدد نمایش داده می شود . ⬇⬇
    diceEl.src = `dice-${dice}.png`;
    //اگر عدد مساوی و برابر با یک نبود ⬇⬇
    if (dice !== 1) {
      //امتیاز تاس به امتیاز فعلی اضافه می شود .⬇⬇
      currentScore += dice;
      // در اینجا بازیکنی که فعال هست امتیاز فعلیش را آپدیت می کند ⬇⬇
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
    // در اینجا در صورتی که عدد تاس یک بشود ⬇⬇
    else {
      switchPlayer();
    }
  }
});
// 🟢🔵🟡🟠🟣🔴
btnHold.addEventListener('click', function () {
  if (playing) {
    // دریافت امتیاز ⬇⬇
    scores[activePlayer] += currentScore;
    //ثبت امتیاز دریافت شده ⬇⬇
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // اگر بازیکن حداقل امتیاز را برای برنده شدن دریافت کند⬇⬇
    if (scores[activePlayer] >= 10) {
      // مقدار متغییر غلط می شود و بازی تمام می شود ⬇⬇
      playing = false;
      // تغییر استایل برای بازیکن برنده ⬇⬇
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // در صورت دریافت امتیاز حداقل برای برنده شدن تغییر بازیکن ⬇⬇
    else {
      switchPlayer();
    }
  }
});
// 🟢🔵🟡🟠🟣🔴
btnNew.addEventListener('click', initialization);
