import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { catchError, Subscription, of, tap } from 'rxjs';
import { CoursesService, EnrolledSubjectsByStudentIdResponse } from './services/courses.service';

@Component({
  selector: 'app-courses',
  imports: [DrawerComponent, TopbarComponent, RouterLink, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(
    private coursesService: CoursesService,
  ) { }

  page: number = 1;
  pageItems: number = 9;

  subjects?: EnrolledSubjectsByStudentIdResponse;


  ngOnInit(): void {
    this.subscriptions.push(
      this.coursesService.getEnrolledSubjects()
        .pipe(
          tap(val => {
            this.subjects = val.data;
            console.log(val);
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
  }


  today = new Date;

  courses: any = [

  ];

  colors = [
    "#0ea5e9",
    "#10b981",
    "#d946ef",
    "#8b5cf6",
    "#f59e0b",
    "#14b8a6",
    "#f43f5e",
    "#6366f1",
    "#f97316"
  ];

  imgURL = "https://loremflickr.com/200/100?random=";
}
