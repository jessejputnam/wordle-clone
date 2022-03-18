//! NEEDS REFACTORING AND ORGANIZATION

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

// ----------------------------- DOM ELEMENTS ----------------------------

const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const overlay2 = document.querySelector(".overlay2");

const btnOptions = document.querySelector("#options");
const btnStart = document.querySelector(".btn__start");

const modalOption = document.querySelector(".modal__option");
const modalGameover = document.querySelector(".modal__gameover");
const modalGameoverMessage = document.querySelector(".gameover--message");
const modalGameoverAnswer = document.querySelector(".gameover--answer");
const btnNewgame = document.querySelector(".btn__newgame");

const checkDarkMode = document.querySelector("#dark-mode");

const mainBoard = document.querySelector(".main");

const gameboard = document.querySelector(".gameboard__container");
const guessRows = document.querySelectorAll(".gameboard__row");
const guessBoxes = document.querySelectorAll(".gameboard__box");

const keyboardContainer = document.querySelector(".keyboard__container");
const keyboardKeys = document.querySelectorAll(".keyboard__key");

// ------------------- VISUAL EFFECTS ----------------------

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
  if (modalGameover.classList.contains("full-hidden")) {
    modalOption.classList.remove("modal--visible");
    overlay.classList.add("full-hidden");
  }
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
const init = () => {
  // Variables
  let answer;
  let playerSubmission;
  let activeRow = 0;
  let playerGuess = "";

  // Assign random answer
  answer = answers[Math.floor(Math.random() * answers.length)].split("");
  modalGameoverAnswer.textContent = answer.join("");

  // User input for letters
  keyboardKeys.forEach((key) =>
    key.addEventListener("mousedown", function (e) {
      // -------------- BACK FUNCTIONALITY ----------------

      // Back deletes last selection
      if (e.target.textContent === "BACK") {
        // Delete by creating white space to fill empty guessBoxes
        playerGuess = playerGuess.slice(0, -1).padEnd(5, " ");
        return;
      }

      // -------------- ENTER FUNCTIONALITY ---------------

      // If player hits enter too early, prompt to guess more
      if (e.target.textContent === "ENTER" && playerGuess.length < 5) {
        const checkRow = document.querySelector(`.game__row--${activeRow}`);
        checkRow.classList.add("shake");
        setTimeout(() => checkRow.classList.remove("shake"), 1000);
        return;
      }

      // Enter w/ proper length checks against answer
      if (e.target.textContent === "ENTER") {
        // Lose condition
        if (activeRow === 5 && playerGuess !== answer.join("")) {
          modalGameoverMessage.textContent = "Sorry, chump!";
          modalGameover.classList.remove("full-hidden");
          overlay2.classList.remove("full-hidden");
        }

        // Win condition
        if (playerGuess === answer.join("")) {
          modalGameoverMessage.textContent = "You win!";
          modalGameover.classList.remove("full-hidden");
          overlay2.classList.remove("full-hidden");
        }

        for (let [i, letter] of playerSubmission.entries()) {
          // Correct letter, correct place
          if (letter === answer[i]) {
            document
              .querySelector(`.game__row--${activeRow} > .box${i}`)
              .classList.add("correct-guess");

            keyboardKeys.forEach((key) => {
              if (key.textContent === letter) {
                key.classList.remove("partial-guess");
                key.classList.add("correct-guess");
              }
            });

            continue;
          }

          // Correct letter, wrong place
          if (answer.includes(letter)) {
            document
              .querySelector(`.game__row--${activeRow} > .box${i}`)
              .classList.add("partial-guess");

            keyboardKeys.forEach((key) => {
              if (
                key.textContent === letter &&
                !key.classList.contains("correct-guess")
              )
                key.classList.add("partial-guess");
            });

            continue;
          }

          // Wrong letter
          if (!answer.includes(letter)) {
            document
              .querySelector(`.game__row--${activeRow} > .box${i}`)
              .classList.add("wrong-guess");

            keyboardKeys.forEach((key) => {
              if (key.textContent === letter) key.classList.add("wrong-guess");
            });

            continue;
          }
        }

        // Move down active row, reset player guess
        activeRow++;
        playerGuess = "";
        return;
      }

      // ---------------- USER INPUT FUNCTIONALITY -----------------------

      // Add guess to playerGuess
      if (playerGuess.length < 5) playerGuess += e.target.textContent;
    })
  );

  // ----------------------- VARIABLE UPDATES ------------------------

  // User clicked key logged in order
  document.addEventListener("mouseup", function () {
    // Convert playerGuess to array to be printed to boxes
    playerSubmission = [...playerGuess];

    // Print to box
    for (let [i, char] of playerSubmission.entries()) {
      document.querySelector(
        `.game__row--${activeRow} > .box${i}`
      ).textContent = char;
    }

    // Remove trim to allow player to add to guess
    playerGuess = playerGuess.trim();
  });

  // --------------------- START NEW GAME FUNCTIONALITY ------------------------

  // User starts a new game
  btnNewgame.addEventListener("click", function () {
    playerGuess = "";
    activeRow = 0;
    answer = answers[Math.floor(Math.random() * answers.length)].split("");
    modalGameoverAnswer.textContent = answer.join("");

    modalGameover.classList.add("full-hidden");
    overlay2.classList.add("full-hidden");

    guessBoxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("partial-guess");
      box.classList.remove("correct-guess");
      box.classList.remove("wrong-guess");
    });

    keyboardKeys.forEach((key) => {
      key.classList.remove("partial-guess");
      key.classList.remove("wrong-guess");
      key.classList.remove("correct-guess");
    });
  });
};

// ------------------- USER START GAME FUNCTIONALITY --------------------
btnStart.addEventListener("click", function () {
  btnStart.classList.add("full-hidden");
  mainBoard.classList.remove("hidden");
  init();
});
