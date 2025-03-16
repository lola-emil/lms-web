import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HelloSvgComponent } from '../../../../shared/svg/hello-svg/hello-svg.component';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../../../shared/components/topbar/topbar.component';
import { Course, CourseService } from '../../services/course.service';
import { map, Observable, tap } from 'rxjs';
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';

@Component({
  selector: 'app-dashboard',
  imports: [DrawerComponent, DatePipe, HelloSvgComponent, RouterLink, TopbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  today: Date = new Date();


  recents$: Observable<Course[]>;

  constructor(
    private courseService: CourseService,
  ) {
    this.recents$ = this.courseService.get().pipe(map((val: any) => val.data));
  }


  avatar = createAvatar(pixelArt, {
    seed: "Bilat sa Kabayo"
  }).toDataUri();

  progress = [
    { courseName: "Introduction to Angular", progress: 0.75 },
    { courseName: "TypeScript Fundamentals", progress: 0.85 },
    { courseName: "RxJS and Observables", progress: 0.6 },
    { courseName: "Building Reusable Components", progress: 0.4 },
    { courseName: "Angular Routing & Navigation", progress: 0.9 },
    { courseName: "State Management with NgRx", progress: 0.3 },
    { courseName: "Testing in Angular", progress: 0.5 },
    { courseName: "Performance Optimization", progress: 0.2 },
    { courseName: "Authentication & Authorization", progress: 0.7 },
    { courseName: "Deploying Angular Applications", progress: 0.95 }
  ];

  courses = [
    { courseName: "Introduction to Angular", recentLessonName: "Components and Templates" },
    { courseName: "TypeScript Fundamentals", recentLessonName: "Interfaces and Generics" },
    { courseName: "RxJS and Observables", recentLessonName: "Handling Streams with Operators" },
    { courseName: "Building Reusable Components", recentLessonName: "Component Communication" },
    { courseName: "Angular Routing & Navigation", recentLessonName: "Lazy Loading Modules" },
    { courseName: "State Management with NgRx", recentLessonName: "Actions and Reducers" },
    { courseName: "Testing in Angular", recentLessonName: "Unit Testing Services" },
    { courseName: "Performance Optimization", recentLessonName: "Lazy Loading and Change Detection" },
  ];

  colors = [
    "#0ea5e9",
    "#10b981",
    "#d946ef",
    "#8b5cf6",
    "#f59e0b",
  ];

  reminders = [
    {
      description: "Math Midterm Exam",
      date: "2024-06-15",
      type: "exam",
    },
    {
      description: "Weekly Quiz on Angular Directives",
      date: "2024-06-18",
      type: "quiz",
    },
    {
      description: "Live Session: Introduction to TypeScript",
      date: "2024-06-20",
      type: "session",
    },
    {
      description: "Final Exam: Web Development Fundamentals",
      date: "2024-06-30",
      type: "exam",
    },
    {
      description: "Pop Quiz: Database Normalization",
      date: "2024-07-02",
      type: "quiz",
    }
  ];
}
