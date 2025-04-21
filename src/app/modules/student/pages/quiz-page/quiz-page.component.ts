import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Questions, QuizService } from '../../services/quiz.service';
import { Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { QuizSessionRepoService } from '../../../../repositories/quiz-session-repo.service';
import { StudentAnswer } from '../../../../repositories/student-answer-repo.service';

@Component({
  selector: 'app-quiz-page',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './quiz-page.component.html',
  styles: ``
})
export class QuizPageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: number[] = [];
  showResult = false;
  score = 0;


  quizId: string | null = null;
  quizSessionId: string | null = null;

  questions: Questions[] = [];

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private quizSessionRepo: QuizSessionRepoService
  ) {
    this.route.queryParams.subscribe(params => {
      this.quizId = params["quiz_id"];
      this.quizSessionId = params["session_id"];
    });
  }


  selectOption(optionIndex: number) {
    this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.calculateScore();
      this.showResult = true;

      let studentAnswers: Partial<StudentAnswer>[] = [];

      this.selectedAnswers.forEach(val => {
        studentAnswers.push({
          answer_id: val,
          quiz_session_id: parseInt(this.quizSessionId ?? "")
        })
      });

      this.quizSessionRepo.finishSession(studentAnswers, parseInt(this.quizSessionId ?? ""))
        .subscribe(val => console.log(val));
    }
  }

  calculateScore() {
    // this.score = this.questions.reduce((acc, q, index) => {
    //   return acc + (q.answer === this.selectedAnswers[index] ? 1 : 0);
    // }, 0);
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedAnswers = [];
    this.showResult = false;
    this.score = 0;
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }


  ngOnInit(): void {
    this.quizService.getQuestions(parseInt(this.quizId ?? "")).subscribe(val => {
      console.log(val);
      this.questions = val;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
