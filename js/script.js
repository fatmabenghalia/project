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
          question: "What does HTML stand for",
          options: ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "Hyperlink and Text Markup Language", "High Technical Markup Language"],
          correctAnswer: 1
      },
      {
          question: "Which language is used for styling web pages?",
          options: ["JavaScript", "HTML", "Python", "CSS"],
          correctAnswer: 3
      },
      {
        question: "Which tag is used to create an ordered list in HTML?",
        options: ["ul", "li", "ol", "dl"],
        correctAnswer: 2
      },
      {
        question: "What is the purpose of CSS?",
        options: ["To add interactivity to web pages", "To structure the content of web pages", "To style the presentation of web pages", "To define the functionality of web pages"],
        correctAnswer: 2
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
      let feedback = "";

      if (userScore === questions.length) {
          feedback = "Congratulations! You got a perfect score!";
      } else if (userScore >= questions.length / 2) {
          feedback = "Great job! You did well!";
      } else {
          feedback = "Keep practicing. You can improve!";
      }

      quizContainer.innerHTML = `
          <p>Your score: ${userScore} out of ${questions.length}</p>
          <p>${feedback}</p>
      `;
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
          question: "JavaScript is a server-side scripting language.",
          options: ["True", "False"],
          correctAnswer: 1
      },
      {
          question: "The 'header' element is used for defining the main content of a webpage.",
          options: ["True", "False"],
          correctAnswer: 1
      },
      {
        question: "CSS stands for Cascading Style Sheets. ",
        options: ["True", "False"],
        correctAnswer: 0
    },
    {
      question: "The 'div' element is used to create an inline-level container. ",
      options: ["True", "False"],
      correctAnswer: 1
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
        loadTrueFalseQuiz();
    } else {
        const userScore = calculateScore(questions, userAnswers);
        let feedback = "";

        if (userScore === questions.length) {
            feedback = "Congratulations! You got a perfect score!";
        } else if (userScore >= questions.length / 2) {
            feedback = "Great job! You did well!";
        } else {
            feedback = "Keep practicing. You can improve!";
        }

        quizContainer.innerHTML = `
            <p>Your score: ${userScore} out of ${questions.length}</p>
            <p>${feedback}</p>
        `;
    }
  });

  // Append buttons to the quiz container
  quizContainer.appendChild(nextButton);
  quizContainer.appendChild(returnButton);
}

// Load the matching quiz
const matchingQuestions = [
  {
      question: "Arrange the following web development languages in order of their typical use in building a webpage, starting with the earliest stage:",
      options: [
          "JavaScript",
          "HTML",
          "CSS"
      ],
      correctOrder: [2, 0, 1] // Correct order of options
  },
  {
    question: "Place the following tags in the order they appear in the basic structure of an HTML document:",
    options: [
        "body",
        "head",
        "html"
    ],
    correctOrder: [2, 1, 0] // Correct order of options
  },
  {
    question: "Order the following CSS values based on increasing specificity:",
    options: [
        "Class selector",
        "Tag selector",
        "ID selector"
    ],
    correctOrder: [1, 0, 2 ] // Correct order of options
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

// ... (rest of the code)


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


