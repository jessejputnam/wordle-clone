// Answer Choices
const answers = [
  "COULD",
  "THEIR",
  "FIELD",
  "WOULD",
  "OTHER",
  "THOSE",
  "TRADE",
  "GOING",
  "YOUNG",
  "TOTAL",
  "NORSE",
  "ODORS",
  "ADORE",
  "AGILE",
  "ALOHA",
  "AMITY",
  "EXTRA",
  "NOBLE",
  "MAGIC",
  "MERIT",
  "PIOUS",
  "QUIET",
  "UNITY",
  "ZESTY",
  "YEARN",
];

// DOM ELEMENTS
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");

const btnOptions = document.querySelector("#options");
const btnStart = document.querySelector(".btn__start");

const modalOption = document.querySelector(".modal__option");

const checkDarkMode = document.querySelector("#dark-mode");

const mainBoard = document.querySelector(".main");

const gameboard = document.querySelector(".gameboard__container");
const guessRows = document.querySelectorAll(".gameboard__row");
const guessBoxes = document.querySelectorAll(".gameboard__box");

const keyboardContainer = document.querySelector(".keyboard__container");
const keyboardKeys = document.querySelectorAll(".keyboard__key");

// Dark Mode Option
btnOptions.addEventListener("click", function () {
  if (!modalOption.classList.contains("modal--visible")) {
    modalOption.classList.add("modal--visible");
    overlay.classList.remove("full-hidden");
  } else {
    modalOption.classList.remove("modal--visible");
    overlay.classList.add("full-hidden");
  }
});

overlay.addEventListener("click", () => {
  modalOption.classList.remove("modal--visible");
  overlay.classList.add("full-hidden");
});

checkDarkMode.addEventListener("mouseup", function () {
  if (!checkDarkMode.checked) {
    body.classList.add("dark-mode-enabled");
    keyboardKeys.forEach((key) => key.classList.add("dark-mode-enabled"));
  } else {
    body.classList.remove("dark-mode-enabled");
    keyboardKeys.forEach((key) => key.classList.remove("dark-mode-enabled"));
  }
});

// ------------------------ GAMEPLAY ---------------------------
let answer;
let playerSubmission;
let activeRow = 0;
let playerGuess = "";

// Press button to start game and reveal gameboard

// Randomly choose a correct answer and assign to answer as array of letters
answer = answers[Math.floor(Math.random() * answers.length)].split("");

// User input for letters
keyboardKeys.forEach((key) =>
  key.addEventListener("mousedown", function (e) {
    // Back deletes last selection
    if (e.target.textContent === "BACK") {
      // Delete by creating white space to fill empty guessBoxes
      playerGuess = playerGuess.slice(0, -1).padEnd(5, " ");
      return;
    }

    // Enter ------
    if (e.target.textContent === "ENTER") return;

    if (playerGuess.length < 5) playerGuess += e.target.textContent;
  })
);

// User clicked key logged as  in order
document.addEventListener("mouseup", function () {
  // Convert playerGuess to array to be printed to boxes
  playerSubmission = [...playerGuess];

  //
  for (let [i, char] of playerSubmission.entries()) {
    document.querySelector(`.game__row--${activeRow} > .box${i}`).textContent =
      char;
  }

  // Remove trim to allow player to add to guess
  playerGuess = playerGuess.trim();
});

// User plays word

// Check each letter of playerAnswer against answer
// if letter is in word but wrong place -> box turns orange
// same letter on keyboard -> orange

// if letter in is word and right place -> box turns green
// same letter on keyboard -> green

// if letter is not in word -> box turns dark gray
// same letter on keyboard -> dark gray

// if row < 5 then row++
// Win condition
// if all letters are correct in correct spot gameover modal appears with message
// if not all correct by row 5, gameover modal appears with message
