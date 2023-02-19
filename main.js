// All answer options
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");

const optionElements = document.querySelectorAll(".option"); // All our options

const question = document.getElementById("question");

const numberOfQuestion = document.getElementById("number-of-question");
const countOfQuestions = document.getElementById("number-of-all-questions");

let indexOfQuestion;
let indexOfPage = 0;

const answersTracker = document.getElementById("answers-tracker"); // обертка для трекера
const btnNext = document.getElementById("btn-next");

let score = 0;

const correctAnswer = document.getElementById("correct-answer");
const numberOfAllQuestions2 = document.getElementById(
  "number-of-all-questions"
);
const btnTryAgain = document.getElementById("btn-try-again");

const listOfQuestions = [
  {
    question: "111",
    options: ["as", "da", "fds", "qw"],
    rightAnswer: 2,
  },

  {
    question: "222",
    options: ["aerts", "da", "fdrets", "qw"],
    rightAnswer: 2,
  },

  {
    question: "333",
    options: ["tyuij7as", "detyja", "fds", "qw"],
    rightAnswer: 2,
  },

  {
    question: "44",
    options: ["tyuij7as", "detyja", "fds", "qw"],
    rightAnswer: 2,
  },
];

numberOfAllQuestions2.innerHTML = listOfQuestions.length;

const load = () => {
  question.innerHTML = listOfQuestions[indexOfQuestion].question;

  option1.innerHTML = listOfQuestions[indexOfQuestion].options[0];
  option2.innerHTML = listOfQuestions[indexOfQuestion].options[1];
  option3.innerHTML = listOfQuestions[indexOfQuestion].options[2];
  option4.innerHTML = listOfQuestions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1;
  indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * listOfQuestions.length);

  let hitDuplicate = false;
  if (indexOfPage == listOfQuestions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == listOfQuestions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == listOfQuestions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

// удаление всех классов со всех ответов
const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  listOfQuestions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Выберите один из вариантов ответов");
  } else {
    randomQuestion();
    enableOptions();
  }
};

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = listOfQuestions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", () => {
  tryAgain();
});

btnNext.addEventListener("click", () => {
  validate();
});

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});
