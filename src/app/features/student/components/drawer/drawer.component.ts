import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course, CourseService } from '../../services/course.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-drawer',
  imports: [RouterLink],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent implements OnInit, OnDestroy {
  constructor(
    private courseService: CourseService
  ) {}

  courseSubscription?: Subscription;
  courses: Course[] = [];

  ngOnInit(): void {
    this.courseSubscription =  this.courseService.get()
    .pipe(
      tap(val => {
        const data: Course[] = (val as any).data;
        this.courses = data;
      })
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.courseSubscription?.unsubscribe();
  }


}
