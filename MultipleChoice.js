const welcomeContainer = document.querySelector(".welcome-container");
const quizContainer = document.querySelector(".quiz-container");
const startButton = document.getElementById("start-button");
const questionElement = document.createElement("div");
const optionsContainer = document.createElement("div");
const submitButton = document.createElement("button");
let userScore = 0;
let currentQuestionIndex = 0;

startButton.addEventListener("click", function() {
  welcomeContainer.style.display = "none";
  quizContainer.style.display = "block";
  userScore = 0;
  currentQuestionIndex = 0;
  displayQuestion(currentQuestionIndex);
});

function displayQuestion(questionIndex) {
  // Same questionData array as before
const questionData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Madrid", "Berlin"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the largest mammal?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      answer: "Blue Whale"
    },
    // Add more question data objects here
  ];

  function displayResult() {
    quizContainer.innerHTML = "";
    const resultElement = document.createElement("p");
    resultElement.textContent = `Quiz completed! Your score: ${userScore} out of ${questionData.length}`;
    quizContainer.appendChild(resultElement);
  }

  const currentQuestion = questionData[questionIndex];
  questionElement.innerHTML = `<h2>${currentQuestion.question}</h2>`;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer${questionIndex}" value="option${String.fromCharCode(65 + index)}">
      ${option}
    `;
    optionsContainer.appendChild(label);
    optionsContainer.appendChild(document.createElement("br"));
  });

  if (questionIndex < questionData.length - 1) {
    submitButton.textContent = "Next";
    submitButton.addEventListener("click", function() {
      const selectedOption = document.querySelector(`input[name='answer${questionIndex}']:checked`);
      if (selectedOption) {
        displayQuestion(questionIndex + 1);
      }
    });
  } else {
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", function() {
      const selectedOption = document.querySelector(`input[name='answer${questionIndex}']:checked`);
      if (selectedOption) {
        calculateScore();
        displayResult();
      }
    });
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsContainer);
  quizContainer.appendChild(submitButton);
}

function calculateScore() {
  const questionData = [
    // ... same questionData array as before
  ];
  for (let i = 0; i < questionData.length; i++) {
    const selectedOption = document.querySelector(`input[name='answer${i}']:checked`);
    if (selectedOption) {
      const selectedAnswer = selectedOption.value;
      if (selectedAnswer === questionData[i].answer) {
        userScore++;
      }
    }
  }
}

