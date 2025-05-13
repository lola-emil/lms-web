import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CourseService } from '../../services/course.service';
import { Observable, switchMap } from 'rxjs';
import { SubjectRepoService } from '../../../../repositories/subject-repo.service';
import { TeacherSubjectRepoService } from '../../../../repositories/teacher-subject-repo.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { MeetingSession } from '../../../teacher/pages/subject-detail/services/meeting.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [DrawerComponent, TopbarComponent, CommonModule, RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  title$!: Observable<{ course_name: string; instructor: string; }>;

  readonly today = new Date();
  readonly sessionSchedule = new Date();
  // new Date("2025-03-08");

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

  angTitle = "";

  teacherSubjectId?: number;
  matchedMeetingSession?: MeetingSession;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {

    this.route.params.subscribe(val => {
      this.teacherSubjectId = val['id'];
    });
  }


  ngOnInit(): void {
    this.http.get<MeetingSession>(`${environment.apiURL}/zoom/get-live-session`, {
      params: {
        teacher_subject_id: this.teacherSubjectId + ""
      }
    }).subscribe(val => {
      this.matchedMeetingSession = val;
      console.log(val);
    });
  }

  isSessionUpcoming(): boolean {
    return new Date(this.sessionSchedule) > new Date();
  }

  isSessionToday(): boolean {
    if (!this.sessionSchedule) return false;

    const sessionDate = new Date(this.sessionSchedule);
    const today = new Date();

    return sessionDate.toDateString() === today.toDateString();
  }
}
