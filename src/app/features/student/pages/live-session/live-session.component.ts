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
    this.scoreHistoryService.getScores(this.teacherSubjectId ?? 0)
      .subscribe(res => {
        console.log("scores", res.data.gradePerSubject);
        this.history = res.data.gradePerSubject;
      });
  }

  reviewAnswers(historyId: number) {
    // this.router.navigate(['/review-answers', historyId]);
  }
}
