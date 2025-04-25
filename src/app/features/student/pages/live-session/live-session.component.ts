import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  imports: [NgClass, CommonModule],
  templateUrl: './live-session.component.html',
  styleUrl: './live-session.component.css'
})
export class LiveSessionComponent {
  schedule = new Date();

  naayKlase = false;

  scoreHistory: ScoreHistory[] = [
    { id: 1, title: 'Midterm Quiz', type: 'Quiz', score: 18, total: 20, date: '2025-04-10' },
    { id: 2, title: 'Final Exam', type: 'Exam', score: 85, total: 100, date: '2025-05-15' },
    { id: 3, title: 'Project: Web Application', type: 'Project', score: 95, total: 100, date: '2025-05-20' },
    { id: 4, title: 'Assignment: Data Structures', type: 'Assignment', score: 19, total: 20, date: '2025-05-25' },
    { id: 5, title: 'Prelim Quiz', type: 'Quiz', score: 15, total: 20, date: '2025-03-12' },
    { id: 6, title: 'Midterm Exam', type: 'Exam', score: 78, total: 100, date: '2025-04-20' }
  ];

  constructor(private router: Router) {}

  reviewAnswers(historyId: number) {
    // this.router.navigate(['/review-answers', historyId]);
  }
}
