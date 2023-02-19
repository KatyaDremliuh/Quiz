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
    question:
      "Я свой характер закаляю<br>преодолением преград,<br>упорно циркулем рисуя<br>[...]",
    options: ["салат", "квадрат", "закат", "госаппарат"],
    rightAnswer: 1,
  },

  {
    question:
      "Как чуден Нил зимой и летом,<br>и редкий египтянин в нём<br>до середины доплывает<br>[...]",
    options: ["конём", "дождём", "январём", "живьём"],
    rightAnswer: 3,
  },

  {
    question:
      "Билет, вагон и проводница.<br>Гул пассажиров, крепкий чай.<br>Куда приеду, сам не знаю.<br>[...]",
    options: ["Прощай", "Невзначай", "Отвечай!", "Встречай"],
    rightAnswer: 3,
  },

  {
    question:
      "Мой ангел, я, увы, бессилен<br>стереть невежества печать.<br>Мне скучно с Вами о высоком<br>[...]",
    options: ["молчать", "кричать", "заключать", "трамвай"],
    rightAnswer: 0,
  },

  {
    question:
      "Давным-давно ей опротивел<br>и этот лес, и этот мир.<br>Последней радостью вороны<br>был [...]",
    options: ["тандыр", "сыр", "хлеб", "Мойдодыр"],
    rightAnswer: 1,
  },

  {
    question:
      "Я только ради вас на шпильках<br>прошла походкой от бедра.<br>А Вы пустого испугались<br>[...]",
    options: ["я так мудра", "Хандра!", "подведра", "ведра"],
    rightAnswer: 3,
  },

  {
    question:
      "Пришла весна, бежит ручьями<br>снеговиков погибших кровь.<br>А я хожу и поедаю<br>[...]",
    options: ["любовь", "свекровь", "морковь", "бровь"],
    rightAnswer: 2,
  },

  {
    question:
      '"Гипотеза Луны из сыра — <br>фантазия для малышей." — <br>решил международный кворум<br>[...]',
    options: ["мышей", "карандашей", "и диджей", "мужей"],
    rightAnswer: 0,
  },

  {
    question:
      "Аркадий так увлёкся бегом,<br>что только круге на шестом<br>он вспомнил: надо ж оттолкнуться<br>[...]",
    options: ["хвостом", "крестом", "мостом", "шестом"],
    rightAnswer: 3,
  },

  {
    question:
      "Дойдя пешком до края поля,<br>сломив все против и нельзя,<br>ты непременно превратишься<br>[...]",
    options: ["в ниндзя", "дерзя", "в ферзя", "в вампира"],
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
