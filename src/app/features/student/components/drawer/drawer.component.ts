import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Course, CourseService } from '../../services/course.service';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-drawer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent implements OnInit, OnDestroy {
  constructor(
    private courseService: CourseService,
    private authService: AuthService
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

  signOut() {
    this.authService.signOut();
    location.reload();
  }


}
