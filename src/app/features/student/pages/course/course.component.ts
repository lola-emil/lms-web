import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CourseService } from '../../services/course.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [DrawerComponent, TopbarComponent, CommonModule, RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  title$!: Observable<{ course_name: string; instructor: string }>;

  readonly today = new Date();
  readonly sessionSchedule = new Date("2025-03-08");

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

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.title$ = this.route.params.pipe(
      switchMap(params => this.courseService.getById(params['id']))
    );
  }
}
