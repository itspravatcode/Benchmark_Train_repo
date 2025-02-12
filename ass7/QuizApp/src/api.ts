import { Question } from "./Question.ts";
import { decodeHTML, shuffle } from "./helpers.ts";

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
  );
  const data = await response.json();
  return data.results.map((q: any) => ({
    question: decodeHTML(q.question),
    choices: shuffle(
      [...q.incorrect_answers, q.correct_answer].map(decodeHTML)
    ),
    correctAnswer: decodeHTML(q.correct_answer),
  }));
}
