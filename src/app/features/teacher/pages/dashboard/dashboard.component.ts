import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { HelloSvgComponent } from "../../../../shared/svg/hello-svg/hello-svg.component";
import { DatePipe } from '@angular/common';
import { ClassworkSubmissionRepoService } from '../../../../repositories/classwork-submission-repo.service';
import { UserRepoService } from '../../../../repositories/user-repo.service';
import { UserProfileRepoService } from '../../../../repositories/user-profile-repo.service';
import { ClassworkRepoService } from '../../../../repositories/classwork-repo.service';
import { TeacherSubjectRepoService } from '../../../../repositories/teacher-subject-repo.service';
import { AuthService } from '../../../../services/auth.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [DrawerComponent, TopbarComponent, HelloSvgComponent, DatePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {


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

  submissions = [
    {
      name: 'Alice Johnson',
      comment: 'Great assignment, learned a lot!',
      dateSubmitted: '2025-04-25'
    },
    {
      name: 'Brian Smith',
      comment: 'Had some trouble with question 3.',
      dateSubmitted: '2025-04-26'
    },
    {
      name: 'Catherine Lee',
      comment: '',
      dateSubmitted: '2025-04-26'
    },
    {
      name: 'David Kim',
      comment: 'Everything was clear and straightforward.',
      dateSubmitted: '2025-04-27'
    },
    {
      name: 'Ella Martinez',
      comment: 'Submitted late, sorry!',
      dateSubmitted: '2025-04-28'
    }
  ];


  constructor(
    private teacherSubjectRepo: TeacherSubjectRepoService,
    private classworkRepo: ClassworkRepoService,
    private classworkSubmissionRepo: ClassworkSubmissionRepoService,
    private userRepo: UserRepoService,
    private userProfileRepo: UserProfileRepoService,
    private authService: AuthService
  ) { }



}
