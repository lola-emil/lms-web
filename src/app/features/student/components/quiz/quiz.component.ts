import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {NgModel, ReactiveFormsModule} from '@angular/forms';

interface Question {
  question: string;
  choices: string[];
  answer: string;
}


@Component({
  selector: 'app-quiz',
  imports: [NgFor, ReactiveFormsModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  questions: Question[] = [
    { question: "Which keyword is used to declare a variable in JavaScript?", choices: ["var", "int", "let", "string"], answer: "var" },
    { question: "Which function is used to print content in JavaScript?", choices: ["console.log()", "print()", "echo()", "document.write()"], answer: "console.log()" },
    { question: "Which symbol is used for single-line comments in JavaScript?", choices: ["//", "/* */", "#", "--"], answer: "//" }
  ];

  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  answers: string[] = [];
  timer: number = 30;
  timerInterval: any;
  showResults: boolean = false;
  score: number = 0;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.clearTimer();
    this.timer = 30;
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  selectAnswer(choice: string) {
    this.selectedAnswer = choice;
    this.answers[this.currentQuestionIndex] = choice;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = this.answers[this.currentQuestionIndex] || '';
      this.startTimer();
    } else {
      this.calculateResults();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = this.answers[this.currentQuestionIndex] || '';
      this.startTimer();
    }
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.selectedAnswer = this.answers[index] || '';
    this.startTimer();
  }

  calculateResults() {
    this.clearTimer();
    this.score = this.answers.filter((ans, i) => ans === this.questions[i].answer).length;
    this.showResults = true;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.score = 0;
    this.showResults = false;
    this.startTimer();
  }
}
