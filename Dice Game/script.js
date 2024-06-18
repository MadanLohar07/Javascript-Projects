'use strict';

// Selecting Elements...
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scor0El = document.querySelector('#score--0');
const scor1El = document.querySelector('#score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const diceEl = document.querySelector('.dice');

// Declaring the Variables...
let scores, currentScore, activePlayer, playing;

// Starting Conditions...
const init = () => {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  scor0El.textContent = 0;
  scor1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

// Functionality for Switching Player...
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Adding Functionality to Dice roll button...
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating Random Number...
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display Number...
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for if num is 1 or not...
    if (dice !== 1) {
      // add num to current score...
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch Player...
      switchPlayer();
    }
  }
});

// Adding Functionality to Hold button...
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add Current Score to the total Score...
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check the score if >=100 or not...
    if (scores[activePlayer] >= 100) {
      // player Win...
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch Player...
      switchPlayer();
    }
  }
});

// Adding Functionality to New Game button...
btnNew.addEventListener('click', init);
