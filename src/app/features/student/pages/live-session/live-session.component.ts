import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreHistoryService, StudentGrade } from './services/score-history.service';
import { ActivityService } from '../activities/services/activity.service';

interface ScoreHistory {
  id: number;
  title: string;
  type: 'Quiz' | 'Exam' | 'Assignment' | 'Project';
  score: number;
  total: number;
  date: string;
}

@Component({
  selector: 'app-live-session',
  imports: [NgClass, CommonModule, DatePipe],
  templateUrl: './live-session.component.html',
  styleUrl: './live-session.component.css'
})
export class LiveSessionComponent implements OnInit {
  schedule = new Date();

  naayKlase = false;

  // scoreHistory: ScoreHistory[] = [
  //   { id: 1, title: 'Midterm Quiz', type: 'Quiz', score: 18, total: 20, date: '2025-04-10' },
  //   { id: 2, title: 'Final Exam', type: 'Exam', score: 85, total: 100, date: '2025-05-15' },
  //   { id: 3, title: 'Project: Web Application', type: 'Project', score: 95, total: 100, date: '2025-05-20' },
  //   { id: 4, title: 'Assignment: Data Structures', type: 'Assignment', score: 19, total: 20, date: '2025-05-25' },
  //   { id: 5, title: 'Prelim Quiz', type: 'Quiz', score: 15, total: 20, date: '2025-03-12' },
  //   { id: 6, title: 'Midterm Exam', type: 'Exam', score: 78, total: 100, date: '2025-04-20' }
  // ];

  history: StudentGrade[] = [];
  teacherSubjectId?: number;

  constructor(private router: Router,
    private scoreHistoryService: ScoreHistoryService,
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) {
    this.route.parent?.params.subscribe(val => this.teacherSubjectId = parseInt(val['id']));
  }

  ngOnInit(): void {
    this.activityService.getTeacherSubject(this.teacherSubjectId ?? 0)
    .subscribe(res => {
          this.scoreHistoryService.getScores(res.data.studentEnrolledSubject.teacherSubject.id ?? 0)
      .subscribe(res => {
        console.log(res.data.gradePerSubject);

        this.history = res.data.gradePerSubject;
      });
    })
  }

  reviewAnswers(historyId: number) {
    // this.router.navigate(['/review-answers', historyId]);
  }
}
