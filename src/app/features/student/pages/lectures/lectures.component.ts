import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of, tap, catchError } from 'rxjs';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { LecturesService, StudentSubject, TeacherSubject } from './services/lectures.service';
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

  studentSubjectId?: number;


  lessons?: TeacherSubject;


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
              this.lessons = val.data.teacherSubject;
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
