// DOM ELEMENTS
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");

const btnOptions = document.querySelector("#options");
const btnStart = document.querySelector(".btn__start");

const modalOption = document.querySelector(".modal__option");

const checkDarkMode = document.querySelector("#dark-mode");

const mainBoard = document.querySelector(".main");

const gameboard = document.querySelector(".gameboard__container");
const guessBoxes = document.querySelectorAll(".gameboard__box");
const guessRows = document.querySelectorAll(".gameboard__row");

const keyboardContainer = document.querySelector(".keyboard__container");
const keyboardKeys = document.querySelectorAll(".keyboard__key");

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
let playerAnswer = [];
let row = 0;

// Press button to start game and reveal gameboard

// Randomly choose a correct answer and assign to answer as array of letters
answer = answers[Math.floor(Math.random() * answers.length)].split("");

// User input for letters (mouse and keyboard)
// Mouse
keyboardKeys.forEach((key) =>
  key.addEventListener("mousedown", function (e) {
    console.log(e.target.textContent);
  })
);
// User clicked key logged into guessBox in order

// User can delete previous letter

// User plays word
// playerAnswer is gathered as array from guessBoxes

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
