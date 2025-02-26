import { Component } from '@angular/core';
import { DrawerComponent } from "../../../shared/components/drawer/drawer.component";
import { CommonModule, DatePipe } from '@angular/common';
import { TopbarComponent } from "../../../shared/components/topbar/topbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [DrawerComponent, TopbarComponent, CommonModule, RouterModule, DatePipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  today = new Date();
  sessionSchedule = new Date("2025-03-08");
  upcomingActivities = [
    {
      title: "Algebra Quiz",
      date: "2025-02-26",
      type: "quiz",
      description: "A short quiz covering basic algebraic expressions."
    },
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
