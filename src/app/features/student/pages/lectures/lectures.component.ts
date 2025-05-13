import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of, tap, catchError } from 'rxjs';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { SubjectMaterial } from '../../../../repositories/subject-material-repo.service';
import { QuizSession } from '../../../../repositories/quiz-session-repo.service';
import { AuthService } from '../../../../services/auth.service';
import { LecturesService, StudentSubject } from './services/lectures.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lectures',
  standalone: true,
  imports: [RouterLink, NgClass, TitleCasePipe, DatePipe],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  lessons$!: Observable<any>;

  mgaLessons: {
    material: SubjectMaterial,
    sessions: QuizSession[];
  }[] = [];

  studentSubjectId?: number;


  lessons?: StudentSubject;


  // teacherAssignedSubject?: TeacherAssignedSubjectResponse;
  constructor(
    private route: ActivatedRoute,
    private lecturesService: LecturesService
  ) {
    this.route.parent?.params.subscribe(val => this.studentSubjectId = val['id']);
  }

  ngOnInit(): void {
    if (this.studentSubjectId)
      this.subscriptions.push(
        this.lecturesService.getMaterials(this.studentSubjectId)
          .pipe(
            tap(val => {
              // this.teacherAssignedSubject = v  al.data;
              console.log(val);
              this.lessons = val.data.studentEnrolledSubject;
            }),
            catchError(res => {
              console.log(res);
              return of(null);
            })
          )
          .subscribe()
      );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(val => val.unsubscribe());
  }

}
