import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { Quiz, QuizPageService } from './services/quiz-page.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

type SessionAnswer = {
  id: number;
  questionText: string;
  answers: {
    id: number;
    answerText: string;
    selected: boolean;
  }[];
};

@Component({
  selector: 'app-quiz-page',
  imports: [DrawerComponent, TopbarComponent, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './quiz-page.component.html',
  styles: ``
})
export class QuizPageComponent implements OnInit {
  @ViewChild("confirmationModal") confirmationModal!: ElementRef<HTMLDialogElement>;

  quiz?: Quiz;

  quizId: number;
  teacherSubjectId: number;
  studentSubjectId: number;

  answerForm: FormGroup = new FormGroup({
    answers: new FormArray([])
  });

  constructor(
    private quizService: QuizPageService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.quizId = parseInt(this.route.snapshot.queryParamMap.get("quiz_id") ?? "");
    this.teacherSubjectId = parseInt(this.route.snapshot.queryParamMap.get("teacherSubjectId") ?? "");
    this.studentSubjectId = parseInt(this.route.snapshot.queryParamMap.get("studentSubjectId") ?? "");
  }

  get answersArray(): FormArray {
    return this.answerForm.get('answers') as FormArray;
  }


  showModal() {
    this.confirmationModal.nativeElement.showModal();
  }

  closeModal() {
    this.confirmationModal.nativeElement.close();
  }


  ngOnInit(): void {
    this.quizService.getQuiz(this.quizId)
      .subscribe(res => {
        this.quiz = res.data.quiz;

        this.answerForm = this.fb.group({
          answers: this.fb.array(this.quiz?.questions.map(() => this.fb.control('')))
        });
      });
  }


  finishQuiz() {
    const user = this.authService.getUserDetail();

    const answers = this.answerForm.value.answers;

    const body = this.quiz?.questions.map((val, index) => ({
      id: val.id,
      answer: answers[index]
    }))!;

    this.closeModal();
    this.quizService.finishQuiz({
      id: this.quizId,
      studentId: user.id,
      answers: body,
      teacherSubjectId: this.teacherSubjectId
    })
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/student', 'courses', this.teacherSubjectId]);
      });
  }

}
