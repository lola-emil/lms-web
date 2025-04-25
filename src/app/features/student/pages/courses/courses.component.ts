import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CourseService } from '../../services/course.service';
import { forkJoin, map, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { SubjectRepoService } from '../../../../repositories/subject-repo.service';
import { TeacherSubjectRepoService } from '../../../../repositories/teacher-subject-repo.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-courses',
  imports: [DrawerComponent, TopbarComponent, RouterLink, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit, OnDestroy {

  constructor(
    private courseService: CourseService,
    private teacherSubject: TeacherSubjectRepoService,
    private subjectRepo: SubjectRepoService,
    private authService: AuthService
  ) { }

  page: number = 1;
  pageItems: number = 9;

  subjects: any[] = [];

  courseSubscription?: Subscription;

  ngOnInit(): void {
    this.teacherSubject.get({
      class_section_id: this.authService.getUserDetail().section_id
    })
      .pipe(
        switchMap(tSubjects => {
          const subjectIds = tSubjects.map(val => val.subject_id);

          return forkJoin({
            teacherSubjects: of(tSubjects),
            subjects: this.subjectRepo.get({
              id: subjectIds
            })
          });
        })
      )
      .subscribe(val => {
        const formatted = val.subjects.map(val => {
          return {
            ...val
          };
        });

        this.subjects = formatted;
      });

    this.courseSubscription = this.courseService.get({
      _page: this.page + "",
      _per_page: this.pageItems + ""
    })
      .pipe(
        tap(data => {
          this.courses = (data as any).data;
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.courseSubscription?.unsubscribe();
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
