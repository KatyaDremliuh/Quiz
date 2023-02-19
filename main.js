// All answer options
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");

const optionElements = document.querySelectorAll(".option"); // All our options

const question = document.getElementById("question");

const numberOfCurrentQuestion = question.getElementById("number-of-question");
const countOfQuestions = question.getElementById("number-of-all-questions");

let indexOfCurrentQuestion;
const indexOfPage = 0;

const answersTracker = document.getElementById("answers-tracker"); // обертка для трекера
const btnNext = document.getElementById("btn-next");

let score = 0;

const correctAnswer = document.getElementById("correct-answer-modalwidow");
const numberOfAllQuestions2 = correctAnswer.getElementById(
  "number-of-all-questions-modalwidow"
);
const btnTryAgain = document.getElementById("btn-try-again");
