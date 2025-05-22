import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizCreationService, Subject } from './services/quiz-creation.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';


@Component({
  selector: 'app-quiz-creation-form',
  imports: [DrawerComponent, TopbarComponent, ReactiveFormsModule],
  templateUrl: './quiz-creation-form.component.html',
  styles: ``
})
export class QuizCreationFormComponent implements OnInit {
  quizForm: FormGroup;
  subjectDetail?: Subject;

  constructor(
    private fb: FormBuilder,
    private quizCreationService: QuizCreationService,
    private route: ActivatedRoute
  ) {
    this.quizForm = new FormGroup({
      title: new FormControl(""),
      questions: this.fb.array([this.createQuestion()])
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    this.quizCreationService.getSubject(parseInt(param.get("subject_id") ?? "0"))
      .subscribe(res => {
        console.log(res);
        this.subjectDetail = res.data.subject;
      });
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

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }


  getAnswers(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('answers') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  createAnswer(answerText: string = "", correct: boolean = false) {
    return this.fb.group({
      id: crypto.randomUUID(),
      answerText: [answerText],
      correct: [correct]
    });
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

  onSubmit() {
    this.quizCreationService.submitQuiz({
      ...this.quizForm.value,
      subjectId: this.subjectDetail?.id
    })
      .pipe(
        tap(res => {
          console.log(res);
          window
        }),
        catchError(errRes => {
          console.log(errRes);
          return of(null);
        })
      )
      .subscribe();
  }
}
