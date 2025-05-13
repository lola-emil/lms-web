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
    private authService: AuthService
  ) {}

  courseSubscription?: Subscription;
  courses: Course[] = [];

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.courseSubscription?.unsubscribe();
  }

  signOut() {
    this.authService.signOut();
    location.reload();
  }


}
