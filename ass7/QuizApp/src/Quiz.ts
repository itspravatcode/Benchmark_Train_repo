import { Question } from "./Question.ts";

export class Quiz {
  private questions: Question[];
  private currentQuestionIndex: number;
  private score: number;

  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  getCurrentQuestion(): Question | null {
    return this.questions[this.currentQuestionIndex] || null;
  }

  checkAnswer(answer: string): boolean {
    const isCorrect = this.getCurrentQuestion()?.correctAnswer === answer;
    if (isCorrect) {
      this.score++;
    }
    return isCorrect;
  }

  nextQuestion(): boolean {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      return true;
    }
    return false;
  }

  getScore(): number {
    return this.score;
  }

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  isQuizOver(): boolean {
    return this.currentQuestionIndex >= this.questions.length - 1;
  }
}
