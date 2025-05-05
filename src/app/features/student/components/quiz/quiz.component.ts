import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Question, QuestionsRepoService } from '../../../../repositories/questions-repo.service';
import { Choice, ChoicesRepoService } from '../../../../repositories/choice-repo.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { SubjectMaterialRepoService } from '../../../../repositories/subject-material-repo.service';
import { QuizSessionRepoService } from '../../../../repositories/quiz-session-repo.service';
import { AuthService } from '../../../../services/auth.service';

interface KatungQuestion {
  question: Question,
  choices: Choice[];
};


@Component({
  selector: 'app-quiz',
  imports: [NgFor, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  quizTitle: string = "";
  quizId!: number;

  constructor(
    private subjectMaterialRepo: SubjectMaterialRepoService,
    private questionRepo: QuestionsRepoService,
    private choiceRepo: ChoicesRepoService,
    private quizSessionRepo: QuizSessionRepoService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.route.params.subscribe(param => {
      this.subjectMaterialRepo.get({
        id: param["id"]
      }).subscribe(val => {
        this.quizTitle = val[0].title;
        this.quizId = val[0].id;
      });
    });
  }

  questions: KatungQuestion[] = [];


  currentQuestionIndex: number = 0;
  selectedAnswer!: Choice;
  answers: Choice[] = [];
  timer: number = 30;
  timerInterval: any;
  showResults: boolean = false;
  score: number = 0;

  ngOnInit(): void {
    this.quizSessionRepo.get({
      student_id: this.authService.getUserDetail().id,
      quiz_id: this.quizId
    }).subscribe(val => {
      console.log("session", val);

      this.score = val[0].score;
      this.showResults = true;
    });

    this.questionRepo.get({
      subject_item_id: this.quizId
    })
      .pipe(
        switchMap(questions => {
          const questionIds = questions.map(val => val.id);

          return forkJoin({
            questions: of(questions),
            choices: this.choiceRepo.get({
              question_id: questionIds
            })
          });
        })
      )
      .subscribe(val => {
        const formatted = val.questions.map(q => {
          const choices = val.choices.filter(choice => choice.question_id == q.id);

          return {
            question: q,
            choices
          };
        });

        this.questions = formatted;
      });

  }

  startTimer() {
    this.clearTimer();
    this.timer = 30;
    // this.timerInterval = setInterval(() => {
    //   this.timer--;
    //   if (this.timer === 0) {
    //     this.nextQuestion();
    //   }
    // }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  selectAnswer(choice: Choice) {
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
    // this.clearTimer();
    // this.score = this.answers.filter((ans, i) => ans === this.questions[i]).length;
    // this.showResults = true;

    this.quizSessionRepo.post({
      selectedAnswers: this.answers,
      questions: this.questions,
      student_id: this.authService.getUserDetail().id,
      quiz_id: this.quizId
    }).subscribe((val: any) => {
      this.score = val.score;
      this.showResults = true;
    });



    // alert("Madafak");
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.score = 0;
    this.showResults = false;
    this.startTimer();
  }
}
