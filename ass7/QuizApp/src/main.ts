import { Quiz } from "./Quiz.ts";
import { fetchQuestions } from "./api.ts";

const quiz = new Quiz();

const questionDisplay = document.getElementById("question-display")!;
const answerButtons = document.getElementById("answer-buttons")!;
const nextQuestionButton = document.getElementById("next-question")!;
const currentScoreDisplay = document.getElementById("current-score")!;
const highScoreDisplay = document.getElementById("high-score")!;
const quizStatusDisplay = document.getElementById("quiz-status")!;
const restartQuizButton = document.getElementById("restart-quiz")!;

function displayQuestion() {
  const currentQuestion = quiz.getCurrentQuestion();
  if (!currentQuestion) return;

  questionDisplay.textContent = currentQuestion.question;
  answerButtons.innerHTML = "";

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => handleAnswer(choice));
    answerButtons.appendChild(button);
  });

  updateScoreDisplay();
}

function handleAnswer(choice: string) {
  quiz.checkAnswer(choice);
  Array.from(answerButtons.children).forEach((button) => {
    (button as HTMLButtonElement).disabled = true;
    if (
      (button as HTMLButtonElement).textContent ===
      quiz.getCurrentQuestion()?.correctAnswer
    ) {
      (button as HTMLButtonElement).style.backgroundColor = "green";
      (button as HTMLButtonElement).style.color = "white";
    } else if ((button as HTMLButtonElement).textContent === choice) {
      (button as HTMLButtonElement).style.backgroundColor = "red";
      (button as HTMLButtonElement).style.color = "white";
    }
  });
  nextQuestionButton.classList.remove("hidden");
  updateScoreDisplay();
}

function updateScoreDisplay() {
  currentScoreDisplay.textContent = `Score: ${quiz.getScore()}`;
  const highScore = getHighScore();
  highScoreDisplay.textContent = `High Score: ${highScore}`;
}

function displayFinalScore() {
  questionDisplay.classList.add("hidden");
  answerButtons.classList.add("hidden");
  nextQuestionButton.classList.add("hidden");
  restartQuizButton.classList.remove("hidden");
  quizStatusDisplay.textContent = `Quiz Completed! Final Score: ${quiz.getScore()}`;
  quizStatusDisplay.classList.remove("hidden");
  saveHighScore(quiz.getScore());
  updateScoreDisplay();
}

function saveHighScore(score: number) {
  const highScore = getHighScore();
  if (score > highScore) {
    localStorage.setItem("highScore", score.toString());
  }
}

function getHighScore(): number {
  return parseInt(localStorage.getItem("highScore") || "0", 10);
}

function restartQuiz() {
  quiz.resetQuiz();
  quizStatusDisplay.classList.add("hidden");
  restartQuizButton.classList.add("hidden");
  questionDisplay.classList.remove("hidden");
  answerButtons.classList.remove("hidden");
  nextQuestionButton.classList.add("hidden");
  fetchQuestions().then((questions) => {
    quiz.setQuestions(questions);
    displayQuestion();
  });
}

// Event Listeners
nextQuestionButton.addEventListener("click", () => {
  if (quiz.nextQuestion()) {
    displayQuestion();
    nextQuestionButton.classList.add("hidden");
  } else {
    displayFinalScore();
  }
});

restartQuizButton.addEventListener("click", restartQuiz);

// Initialize Quiz
fetchQuestions().then((questions) => {
  quiz.setQuestions(questions);
  displayQuestion();
  updateScoreDisplay();
});
