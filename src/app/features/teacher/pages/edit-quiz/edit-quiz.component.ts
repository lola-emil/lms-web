import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditQuizService, Quiz, TeacherSubject } from './services/edit-quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

type Toast = {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in ms
  message: string;
};

@Component({
  selector: 'app-edit-quiz',
  imports: [DrawerComponent, TopbarComponent, ReactiveFormsModule],
  templateUrl: './edit-quiz.component.html',
  styles: ``
})
export class EditQuizComponent implements OnInit {
  quizForm: FormGroup;
  subjectDetail?: TeacherSubject;
  quizId?: number;

  quiz?: Quiz;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private editQuizService: EditQuizService,
    private router: Router
  ) {
    this.quizForm = new FormGroup({
      title: new FormControl(""),
      questions: this.fb.array([this.createQuestion()])
    });

    this.route.params.subscribe(val => this.quizId = parseInt(val['id']));
  }

  ngOnInit(): void {
    this.editQuizService.getQuiz(this.quizId ?? 0)
      .subscribe(res => {
        const quiz = res.data.subjectMaterial;
        this.quiz = quiz;

        this.quizForm = new FormGroup({
          quizId: new FormControl(this.quizId),
          title: new FormControl(quiz.title),
          questions: this.fb.array(quiz.questions.map(val => {
            return this.fb.group({
              id: [val.id],
              questionText: [val.questionText,],
              type: [val.type, Validators.required],
              answers: this.fb.array(val.answers.map(val => {
                return this.fb.group({
                  id: [val.id],
                  answerText: [val.answerText],
                  correct: [val.isCorrect]
                });
              }))
            });
          }))
        });
      });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  getAnswers(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('answers') as FormArray;
  }


  createQuestion() {
    return this.fb.group({
      id: crypto.randomUUID(),
      questionText: ['',],
      type: ['MULTIPLE_CHOICE', Validators.required],
      answers: this.fb.array([
        this.createAnswer(), // Start with two answers
        this.createAnswer()
      ])
    });
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }



  onQuestionTypeChange(questionGroup: AbstractControl) {
    const type = questionGroup.get('type')?.value;
    const answers = questionGroup.get('answers') as FormArray;

    answers.clear();
    if (type == "TRUE_FALSE") {
      answers.push(this.createAnswer("True"));
      answers.push(this.createAnswer("False"));
    } else if (type == "SHORT_ANSWER") {
      answers.push(this.createAnswer("", true));
    }
    else {
      answers.push(this.createAnswer());
      answers.push(this.createAnswer());
    }
  }


  createAnswer(answerText: string = "", correct: boolean = false) {
    return this.fb.group({
      id: crypto.randomUUID(),
      answerText: [answerText],
      correct: [correct]
    });
  }

  addAnswer(qIndex: number) {
    this.getAnswers(qIndex).push(this.createAnswer());
  }

  removeAnswer(qIndex: number, id: string) {
    const answersArray = this.getAnswers(qIndex);
    const index = answersArray.controls.findIndex(a => a.value.id === id);
    if (index > -1 && answersArray.length > 1) {
      answersArray.removeAt(index);
    }
  }


  removeQuestion(id: string) {
    const index = this.questions.controls.findIndex(q => q.value.id === id);
    if (index > -1 && this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  submitInProgress = false;

  onSubmit() {
    this.submitInProgress = true;

    this.editQuizService.editQuiz(this.quizForm.value)
      .pipe(
        tap(res => {
          console.log(res);
          this.submitInProgress = false;
          this.addToast({
            message: "Quiz updated successfully"
          });

          setTimeout(() => {
            this.router.navigate(['/teacher', 'loads', this.quiz?.teacherSubjectId])
          }, 1500);
        }),
        catchError(errRes => {
          console.log(errRes);
          this.submitInProgress = false;
          return of(null);
        })
      ).subscribe();
  }


  toastMessages: Toast[] = [];

  removeToast(index: number) {
    this.toastMessages.splice(index, 1);
  }

  addToast(toast: Toast) {
    this.toastMessages.push(toast);
    setTimeout(() => this.removeToast(this.toastMessages.length - 1), toast.duration || 3000);
  }

}
