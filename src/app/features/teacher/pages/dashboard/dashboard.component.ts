import { Component } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../../../shared/components/topbar/topbar.component";
import { HelloSvgComponent } from "../../../../shared/svg/hello-svg/hello-svg.component";
import { AsyncPipe, DatePipe } from '@angular/common';
import { Submission, SubmissionsService } from '../../services/submissions.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [DrawerComponent, TopbarComponent, HelloSvgComponent, DatePipe, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  item = {
    date: new Date()
  }

  submissions: Observable<Submission[]>;
  constructor(
    private submissionService: SubmissionsService
  ) {
    this.submissions = this.submissionService.get().pipe(map((val: any) => val.data))
  }

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
