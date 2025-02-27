import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CourseModuleService } from '../../services/course-module.service';
import { tap } from 'rxjs';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  imports: [DrawerComponent, TopbarComponent, CommonModule, RouterModule, DatePipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  title: string = "";
  instructor: string = "";

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id")!;
    this.courseService.getById(id)
    .pipe(
      tap(data => {
        console.log("fetch successful", data);
        this.title = data.course_name;
        this.instructor = data.instructor;
      })
    ).subscribe();
  }

  today = new Date();

  sessionSchedule = new Date("2025-03-08");

  upcomingActivities = [
    {
      title: "Geometry Assignment",
      date: "2025-02-28",
      type: "assignment",
      description: "Solve problems related to angles and shapes."
    },
    {
      title: "Periodical Exam",
      date: "2025-03-25",
      type: "exam",
      description: "The final exam covering all major topics discussed in the course."
    }
  ];
}
