import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CourseService } from '../../services/course.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [DrawerComponent, TopbarComponent, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.get()
    .pipe(
      tap(data => {
        console.log("Data fetched successfully");
        this.courses = data;
      })
    ).subscribe();
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

  imgURL =  "https://loremflickr.com/200/100?random=";
}
