import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HelloSvgComponent } from '../../../../shared/svg/hello-svg/hello-svg.component';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { Course, CourseService } from '../../services/course.service';
import { catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { DashboardService, EnrolledSubjectsByStudentIdResponse, TeacherSubjectSection } from './services/dashboard.service';
import { AvatarService } from '../../../../services/avatar.service';

@Component({
  selector: 'app-dashboard',
  imports: [DrawerComponent, HelloSvgComponent, RouterLink, TopbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  today: Date = new Date();

  recents$: Observable<Course[]>;
  subjects?: EnrolledSubjectsByStudentIdResponse;


  enrolledSubjects?: TeacherSubjectSection[] = [];

  constructor(
    private courseService: CourseService,
    private dashboardService: DashboardService,
    private avatarService: AvatarService
  ) {
    this.recents$ = this.courseService.get().pipe(map((val: any) => val.data));
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dashboardService.getEnrolledSubjects()
        .pipe(
          tap(val => {
            this.subjects = val.data;
            console.log(val.data.enrolledSubjectsByStudentId);
          }),
          catchError(res => {
            console.log(res);
            return of(null);
          })
        )
        .subscribe()
    );

    this.dashboardService.getActivities()
      .subscribe(res => {
        console.log(res);
      });

    this.dashboardService.getEnrolledSection()
      .subscribe(res => {
        console.log(res);
        const studentSection = res.data.studentCurrentEnrolledSection[0];

        this.dashboardService.getSubjects(studentSection.classSectionId)
        .subscribe(res => {
          console.log("Mga Subjects", res.data.teacherSubjectSectionsPerSection);

          this.enrolledSubjects = res.data.teacherSubjectSectionsPerSection;
        });
      });

  }

  ngOnDestroy(): void {
  }

  avatar(seed: any) {
    return this.avatarService.avatar(seed);
  }

}
