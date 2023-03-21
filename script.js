'use strict';
// Selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const resetScoreZero = document.querySelector('.score');
const resetCurrentScoreZero = document.querySelector('.current-score');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();

const swithPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Initial condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
// Rolling functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Gnerate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    //   2. display the roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3.check for 1 : then swith the player if the dice is 1
    if (dice !== 1) {
      // add the dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch the player
      swithPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if the score >= 100
    if (scores[activePlayer] >= 100) {
      // if true end the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // false swith the player
      swithPlayer();
    }
  }
});
// Ressetting the game
btnNew.addEventListener('click', init);
