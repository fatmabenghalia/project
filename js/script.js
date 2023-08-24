// Initialize global variables
let currentQuestionIndex = 0;
let selectedAnswer = null;
let nextButton;
let questionRow;
let userAnswers = []; // Initialize userAnswers array
let questions = [];// Initialize questions array

// Function to start the quiz based on quiz type
function startQuiz(quizType) {
    // Hide the welcome page and show the quiz container
    document.querySelector('.welcome-page').classList.add('hidden');
    document.querySelector('#quiz-container').classList.remove('hidden');

    // Load the appropriate quiz type
    if (quizType === 'multiple-choice') {
        userAnswers = new Array(questions.length); // Initialize userAnswers array
        loadMultipleChoiceQuiz();
    } else if (quizType === 'true-false') {
        loadTrueFalseQuiz();
    } else if (quizType === 'matching') {
        loadMatchingQuiz();
    }
}

// Load the multiple-choice quiz
  function loadMultipleChoiceQuiz() {
    const quizContainer = document.querySelector('#quiz-container');
    quizContainer.innerHTML = ''; // Clear previous content

    // Define the questions for the multiple-choice quiz
    const questions = [
      {
          question: "What is the capital of France?",
          options: ["Paris", "London", "Berlin", "Madrid"],
          correctAnswer: 0
      },
      {
          question: "Which planet is known as the Red Planet?",
          options: ["Mars", "Venus", "Jupiter", "Saturn"],
          correctAnswer: 0
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: 0
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: 0
      },
      
  ];
  

    const currentQuestion = questions[currentQuestionIndex];

    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
        <h3>Question ${currentQuestionIndex + 1}</h3>
        <p>${currentQuestion.question}</p>
        ${currentQuestion.options.map((option, optionIndex) => `
            <label>
                <input type="radio" name="answer" value="${optionIndex}">
                ${option}
            </label>
        `).join('')}
    `;

    questionDiv.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', event => {
          selectedAnswer = event.target.value;
          nextButton.disabled = false;
      });
  });

  quizContainer.appendChild(questionDiv);

   // Create "Next" and "Return to Menu" buttons
   nextButton = document.createElement('button');
   nextButton.className = 'quiz-button';
   nextButton.textContent = 'Next';
   nextButton.disabled = true; // Disable initially

   const returnButton = document.createElement('button');
   returnButton.className = 'quiz-button';
   returnButton.textContent = 'Return to Menu';

   // "Return to Menu" button functionality
   returnButton.addEventListener('click', () => {
       document.querySelector('#quiz-container').classList.add('hidden');
       document.querySelector('.welcome-page').classList.remove('hidden');
   });

   // "Next" button functionality
   nextButton.addEventListener('click', () => {
    userAnswers[currentQuestionIndex] = selectedAnswer;
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadMultipleChoiceQuiz();
    } else {
        const userScore = calculateScore(questions, userAnswers);
        quizContainer.innerHTML = `<p>Your score: ${userScore} out of ${questions.length}</p>`;
    }
});

    // Append buttons to the quiz container
    quizContainer.appendChild(nextButton);
    quizContainer.appendChild(returnButton);
}

// Wait for the page to load and then start the multiple-choice quiz
    document.addEventListener("DOMContentLoaded", function () {
    window.onload = loadMultipleChoiceQuiz;
  
});

// Load the true/false quiz
function loadTrueFalseQuiz() {
  const quizContainer = document.querySelector('#quiz-container');
  quizContainer.innerHTML = ''; // Clear previous content

  // Define the questions for the true/false quiz
  const questions = [
      {
          question: "The Earth is flat.",
          options: ["True", "False"],
          correctAnswer: 1
      },
      {
          question: "Water boils at 100 degrees Celsius.",
          options: ["True", "False"],
          correctAnswer: 0
      },
      // Add more true/false questions...
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.innerHTML = `
      <h3>Question ${currentQuestionIndex + 1}</h3>
      <p>${currentQuestion.question}</p>
      ${currentQuestion.options.map((option, optionIndex) => `
          <label>
              <input type="radio" name="answer" value="${optionIndex}">
              ${option}
          </label>
      `).join('')}
  `;

  questionDiv.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', event => {
          selectedAnswer = event.target.value;
          nextButton.disabled = false;
      });
  });

  quizContainer.appendChild(questionDiv);

  // Create "Next" and "Return to Menu" buttons
  nextButton = document.createElement('button');
  nextButton.className = 'quiz-button';
  nextButton.textContent = 'Next';
  nextButton.disabled = true; // Disable initially

  const returnButton = document.createElement('button');
  returnButton.className = 'quiz-button';
  returnButton.textContent = 'Return to Menu';

  // "Return to Menu" button functionality
  returnButton.addEventListener('click', () => {
      document.querySelector('#quiz-container').classList.add('hidden');
      document.querySelector('.welcome-page').classList.remove('hidden');
  });

  // "Next" button functionality
  nextButton.addEventListener('click', () => {
      userAnswers[currentQuestionIndex] = selectedAnswer;
      if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          loadTrueFalseQuiz();
      } else {
          const userScore = calculateScore(questions, userAnswers);
          quizContainer.innerHTML = `<p>Your score: ${userScore} out of ${questions.length}</p>`;
      }
  });

  // Append buttons to the quiz container
  quizContainer.appendChild(nextButton);
  quizContainer.appendChild(returnButton);
}

// Load the matching quiz
const matchingQuestions = [
  {
      question: "Order the countries from smallest to largest population:",
      options: [
          "Monaco",
          "Iceland",
          "Australia",
          "China"
      ],
      correctOrder: [0, 1, 3, 2] // Correct order of options
  },
  {
    question: "uiheubihveoivjoi",
    options: [
        "Monaco",
        "Iceland",
        "Australia",
        "China"
    ],
    correctOrder: [0, 1, 3, 2] // Correct order of options
},
];

function loadMatchingQuiz() {
  const quizContainer = document.querySelector('#quiz-container');
  quizContainer.innerHTML = ''; // Clear previous content

  const currentQuestion = matchingQuestions[currentQuestionIndex];

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.innerHTML = `
      <h3>Question ${currentQuestionIndex + 1}</h3>
      <p>${currentQuestion.question}</p>
      <div class="ordering-options">
          ${currentQuestion.options.map((option, optionIndex) => `
              <div class="ordering-option"
                   draggable="true"
                   ondragstart="dragStart(event)"
                   data-option-index="${optionIndex}">
                ${option}
              </div>
          `).join('')}
      </div>
  `;

  const orderingOptionDivs = questionDiv.querySelectorAll('.ordering-option');

  let sourceOptionIndex = null; // Store the source option index

  orderingOptionDivs.forEach((optionDiv) => {
      optionDiv.addEventListener('dragstart', (event) => {
          sourceOptionIndex = event.target.getAttribute('data-option-index');
      });

      optionDiv.addEventListener('dragover', (event) => {
          event.preventDefault(); // Prevent default behavior
      });

      optionDiv.addEventListener('drop', (event) => {
          event.preventDefault();
          const targetOptionIndex = event.target.getAttribute('data-option-index');

          // Reorder the options
          const tempOption = currentQuestion.options[sourceOptionIndex];
          currentQuestion.options.splice(sourceOptionIndex, 1);
          currentQuestion.options.splice(targetOptionIndex, 0, tempOption);

          loadMatchingQuiz(); // Reload the quiz to reflect the changes
      });
  });

  // Create "Next" and "Return to Menu" buttons
  const nextButton = document.createElement('button');
  nextButton.className = 'quiz-button';
  nextButton.textContent = 'Next';

  const returnButton = document.createElement('button');
  returnButton.className = 'quiz-button';
  returnButton.textContent = 'Return to Menu';
  returnButton.addEventListener('click', () => {
      document.querySelector('#quiz-container').classList.add('hidden');
      document.querySelector('.welcome-page').classList.remove('hidden');
  });

  //adding "Next" and "Return to Menu" buttons
  quizContainer.appendChild(questionDiv);
  quizContainer.appendChild(nextButton);
  quizContainer.appendChild(returnButton);

  // "Next" button functionality
  nextButton.addEventListener('click', () => {
    // Save the user's order of options
    const userOrder = Array.from(orderingOptionDivs).map(optionDiv =>
        optionDiv.getAttribute('data-option-index')
    );

    userAnswers[currentQuestionIndex] = userOrder;
    if (currentQuestionIndex < matchingQuestions.length - 1) {
        currentQuestionIndex++;
        loadMatchingQuiz();
    } else {
        const userScore = calculateMatchingScore(matchingQuestions, userAnswers);
        quizContainer.innerHTML = `<p>Your score: ${userScore} out of ${matchingQuestions.length}</p>`;
    }
  });
}



function calculateMatchingScore(matchingQuestions, userAnswers) {
  let score = 0;
  matchingQuestions.forEach((question, index) => {
      const userOrder = userAnswers[index].map(text => question.options.findIndex(option => option.matchText === text));
      if (arraysEqual(userOrder, question.correctOrder)) {
          score++;
      }
  });
  return score;
}

// Helper function to check if two arrays are equal
function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}


// Calculate user's score function
function calculateScore(questions, userAnswers) {
  let score = 0;
  questions.forEach((question, index) => {
      if (question.correctAnswer.toString() === userAnswers[index]) {
          score++;
      }
  });
  return score;
}


