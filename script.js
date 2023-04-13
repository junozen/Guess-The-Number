"use strict";

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};
const displayHighscore = function (highscore) {
  document.querySelector(".highscore").textContent = highscore;
};
const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

let numberHidden = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = localStorage.getItem("highscore") || 0;
displayHighscore(highscore);
// console.log(highscore);

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  // console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    displayMessage("No number selected! ❌");

    // When guess is correct
  } else if (guess === numberHidden) {
    displayMessage("Correct Number! 🏆");
    document.querySelector(".number").textContent = numberHidden;

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore.toString());
      displayHighscore(highscore);
      // console.log(highscore);
    }

    // When guess is wrong
  } else if (guess !== numberHidden) {
    if (score > 1) {
      displayMessage(guess > numberHidden ? "⬇️ Lower!" : "⬆️ Higher!");
      score--;
      displayScore(score);
    } else {
      displayMessage("You lost the game! 💥");
      displayScore(0);
      document.querySelector("body").style.backgroundColor = "#f54842";
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  numberHidden = Math.trunc(Math.random() * 20) + 1;

  displayMessage("Start guessing...");
  displayScore(score);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#2d2d3d";
  document.querySelector(".number").style.width = "15rem";
});

document.querySelector(".btn-reset").addEventListener("click", function () {
  localStorage.removeItem("highscore");
  displayHighscore(0);
  highscore = 0;
  // console.log(highscore);
});
