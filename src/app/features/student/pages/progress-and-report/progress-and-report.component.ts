import { Component } from '@angular/core';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-progress-and-report',
  imports: [DrawerComponent, TopbarComponent, DecimalPipe],
  templateUrl: './progress-and-report.component.html',
  styleUrl: './progress-and-report.component.css'
})
export class ProgressAndReportComponent {
  today = new Date();

  grades = [
    {
      subject: "Mathematics",
      grades: [
        { type: "Quiz 1", score: 85 },
        { type: "Quiz 2", score: 90 },
        { type: "Quiz 3", score: 78 },
        { type: "Quiz 4", score: 92 },
        { type: "Exam", score: 88 }
      ],
      total: (85 * 0.125) + (90 * 0.125) + (78 * 0.125) + (92 * 0.125) + (88 * 0.50)
    },
    {
      subject: "Science",
      grades: [
        { type: "Quiz 1", score: 80 },
        { type: "Quiz 2", score: 85 },
        { type: "Quiz 3", score: 82 },
        { type: "Quiz 4", score: 88 },
        { type: "Exam", score: 91 }
      ],
      total: (80 * 0.125) + (85 * 0.125) + (82 * 0.125) + (88 * 0.125) + (91 * 0.50)
    },
    {
      subject: "English",
      grades: [
        { type: "Quiz 1", score: 78 },
        { type: "Quiz 2", score: 82 },
        { type: "Quiz 3", score: 88 },
        { type: "Quiz 4", score: 90 },
        { type: "Exam", score: 87 }
      ],
      total: (78 * 0.125) + (82 * 0.125) + (88 * 0.125) + (90 * 0.125) + (87 * 0.50)
    },
    {
      subject: "History",
      grades: [
        { type: "Quiz 1", score: 92 },
        { type: "Quiz 2", score: 88 },
        { type: "Quiz 3", score: 85 },
        { type: "Quiz 4", score: 89 },
        { type: "Exam", score: 94 }
      ],
      total: (92 * 0.125) + (88 * 0.125) + (85 * 0.125) + (89 * 0.125) + (94 * 0.50)
    },
    {
      subject: "Computer Science",
      grades: [
        { type: "Quiz 1", score: 95 },
        { type: "Quiz 2", score: 98 },
        { type: "Quiz 3", score: 90 },
        { type: "Quiz 4", score: 96 },
        { type: "Exam", score: 99 }
      ],
      total: (95 * 0.125) + (98 * 0.125) + (90 * 0.125) + (96 * 0.125) + (99 * 0.50)
    },
    {
      subject: "Physical Education",
      grades: [
        { type: "Quiz 1", score: 85 },
        { type: "Quiz 2", score: 88 },
        { type: "Quiz 3", score: 82 },
        { type: "Quiz 4", score: 86 },
        { type: "Exam", score: 90 }
      ],
      total: (85 * 0.125) + (88 * 0.125) + (82 * 0.125) + (86 * 0.125) + (90 * 0.50)
    },
    {
      subject: "Art",
      grades: [
        { type: "Quiz 1", score: 80 },
        { type: "Quiz 2", score: 84 },
        { type: "Quiz 3", score: 86 },
        { type: "Quiz 4", score: 90 },
        { type: "Exam", score: 93 }
      ],
      total: (80 * 0.125) + (84 * 0.125) + (86 * 0.125) + (90 * 0.125) + (93 * 0.50)
    },
    {
      subject: "Music",
      grades: [
        { type: "Quiz 1", score: 89 },
        { type: "Quiz 2", score: 91 },
        { type: "Quiz 3", score: 85 },
        { type: "Quiz 4", score: 87 },
        { type: "Exam", score: 92 }
      ],
      total: (89 * 0.125) + (91 * 0.125) + (85 * 0.125) + (87 * 0.125) + (92 * 0.50)
    },
    {
      subject: "Economics",
      grades: [
        { type: "Quiz 1", score: 83 },
        { type: "Quiz 2", score: 85 },
        { type: "Quiz 3", score: 88 },
        { type: "Quiz 4", score: 86 },
        { type: "Exam", score: 90 }
      ],
      total: (83 * 0.125) + (85 * 0.125) + (88 * 0.125) + (86 * 0.125) + (90 * 0.50)
    }
  ];


}
